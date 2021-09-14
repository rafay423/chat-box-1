const Database = require("@replit/database")
const db = new Database()

const { User } = require("./users.js");

const { encrypter, decrypter } = require("./encrypter.js");

const http = require("http");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/client"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req, res) => {

  res.sendFile("/client/logup.html")

})

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

const log = console.log;

const PORT= process.env['PORT'];

var NAME;

var clients = {  };
var ROOMS = {  };
var playerList = []
const { rooms, users, userJoin, randomNum, userLeave, cmdHandler, codeGenerator, getCurrentUser, possibleLetters, getAllUsersFromRoom } = require("./utils.js");

db.get("Ray").then(val => log(val));
db.get("rafay").then(val => log(val));
db.get("sameer").then(val => log(val));
db.get("hammad").then(val => log(val));

(async () => {

  io.sockets.on("connection", async (socket) => {

  var userName;

  console.log("connected");
  
  app.post("/signup", async (req, res) => {

    var keys = await db.list();
    
    res.redirect(`/login.html`);

  });

  app.post("/login", async (req, res) => {

    var keys = await db.list();

    if(keys.includes(req.body.name)){

      var data = await db.get(req.body.name);

      if(decrypter(data["password"]) == req.body.password){

        NAME = req.body.name;

        userName = req.body.name;
        
        // res.redirect("/logup.html?name=" + encodeURIComponent(encrypter(NAME)));

        res.redirect("/profile?name=" + encodeURIComponent(encrypter(NAME)))

      }

    }

  });

  app.get("/profile", async (req, res) => {

    var name = decrypter( decodeURIComponent( req.query.name ) )

    var data = await db.get(name);
    
    res.render("index", { data })

  })

  app.get("/chat", (req, res) => {

    let room = decrypter(decodeURIComponent(req.query.code));
    let name = decrypter(decodeURIComponent(req.query.name));

    log(room + " m m m " + name)

    if(rooms[room] == "created"){

      userName = name;

      var user = userJoin(socket.id, name, room);

      let data = { name: name, room: room };

      log(data);
      

      res.sendFile(__dirname + "/client/chat.html");

    }

  })
  


  socket.on("name", (msg) => {

    var user = getCurrentUser(socket.id);

    console.log(msg);
    userName = msg;
    playerList.push(userName);
    
    // io.to(user.room).emit("name", msg);

  });

  
  socket.on("ko", data => {

    if(rooms[data.room] == "created"){

      var user = userJoin(socket.id, data.name, data.room);

      socket.join(data.room);

      clients[socket.id] = "inRoom";

      socket.emit("display", user.room);

      ROOMS[user.room].push(socket.id);

      userName = user.name;

      io.to(data.room).emit("ko", user.name);

    }else{

      io.to(socket.id).emit("msg", `room not exists.`);

    }

  })

  socket.on("talk", (msg, data) => {

    var user = getCurrentUser(socket.id);

    console.log(msg);

    let m = userName + " : " + msg;

    io.to(data.room).emit("talk", (m))
    

  });



  socket.on("create", () => {

    const room = codeGenerator(5);

    if (rooms[room] == undefined) {

      rooms[room] = "created";

      socket.join(room);

      socket.emit("display", room);

      console.log(`${room} is created.`);

      ROOMS[room] = [];

      io.to(room).emit("display", room);

      socket.emit("join", { name: NAME, room: room });



    }
    rooms[room] = "created";

  })

  // socket.on("k", data =>{

  //   console.log(data)

  //   io.to(data.room).emit("k", userName);

  // })


  socket.on("join", data => {

    if (rooms[data.room] == "created") {

        socket.join(data.room);

        var user = userJoin(socket.id, data.name, data.room);

        console.log(data.room + " pppp");

        clients[socket.id] = "inRoom";

        ROOMS[user.room].push(socket.id);

        clients[socket.id] = "inRoom";

        socket.emit("display", user.room);

    } else if (rooms[user.room] != "created") {

      io.to(socket.id).emit("msg", `room not exists.`);

    }

    log(users);

  })


  socket.on("offline", name => {

    let left = userLeave(user.id, user.name, user.room);

    io.to(user.room).emit("offline", name);

  })


  socket.on("disconnect", () => {

    let name = userName ? userName : "";

    // let id = userName ? socket.id : "";


    console.log(`${userName} disconnected`);

    if (clients[socket.id]) {

      var user = getCurrentUser(socket.id)

      playerList.splice(playerList.indexOf(userName), 1);

      let name = userName;

      io.emit("offline", name)

      delete clients[socket.id];

    }


  });


})



})()

// var __users__  = await Database.get("main");
// log(__users__)








server.on("error", err => {

  log(err);

})

server.listen( PORT, () => {

  log(`listening on ${PORT}`);

})