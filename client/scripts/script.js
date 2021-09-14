var __PROFILE = {

  name: "",
  img: "",
  friends: [],
  sent_requests: [],
  recieved_requests: []

};

var matches = {
  '0': '`',
  '1': 'n',
  '2': '~',
  '3': 'o',
  '4': 't',
  '5': 'u',
  '6': '}',
  '7': 'v',
  '8': '{',
  '9': '|',
   a: '/',
   b: 'q',
   c: 'f',
   d: 's',
   e: 'r',
   f: 'c',
   g: 'w',
   h: 'i',
   i: 'h',
   j: 'p',
   k: 'l',
   l: 'k',
   m: '-',
   n: '1',
   o: '3',
   p: 'j',
   q: 'b',
   r: 'e',
   s: 'd',
   t: '4',
   u: '5',
   v: '7',
   w: 'g',
   x: '[',
   y: '(',
   z: '$',
   A: 'U',
   B: '*',
   C: '!',
   D: '@',
   E: '#',
   F: '^',
   G: '&',
   H: ')',
   I: '?',
   J: '.',
   K: ',',
   L: '<',
   M: '>',
   N: ':',
   O: ';',
   P: "'",
   Q: '_',
   R: 'V',
   S: 'X',
   T: 'Z',
   U: 'A',
   V: 'R',
   W: '%',
   X: 'S',
   Y: '+',
   Z: 'T',
  ' ': '=',
  '\n': '【',
  "-" : "m",
  "+" : "Y",
  "_" : "Q",
  "!" : "C",
  "@" : "D",
  "#" : "E",
  "$" : "z",
  "%" : "W",
  "^" : "F",
  "&" : "G",
  "*" : "B",
  "(" : "y",
  ")" : "H",
  ";" : "O",
  ":" : "N",
  "." : "J",
  "," : "K",
  "/" : "a",
  "?" : "I",
  "<" : "L",
  ">" : "M",
  "{" : "8",
  "}" : "6",
  "'" : "P",
  "`" : "0",
  "~" : "2"
};

function encrypter( string ){

  let str = string.split("");

  var arr = "";

  for( let i = 0; i < string.length; i++ ){

    arr += matches[string[i]];

  }

  return arr;

};

function decrypter( encrypted_text ){

  let str = encrypted_text.split("");

  var arr="";

  var keys = Object.keys(matches);

  var vals = Object.values(matches);

  for( let i of str ){

    arr += keys[vals.indexOf(i)]

  }

  return arr;

};




var socket = io();

var URL = new URLSearchParams(window.location.search);

var UserName = decrypter(decodeURIComponent(URL.get("name")));

__PROFILE.name = UserName;

let name = document.querySelector("input#name")

var sendbtn = document.querySelector("input#send");

var typing = document.querySelector("p#typing")

var roomdiv = document.querySelector("div#room");

var joinbtn = document.querySelector("input#join");

var codeinput = document.querySelector("input#code");

var createbtn = document.querySelector("input#create");

var codepara = document.querySelector("p#code");

var overlay1 = document.querySelector("div#profile");

var overlay1CloseBtn = document.querySelector("div#profile a.closebtn");

var overlay1OpenBtn = document.querySelector("button#show");

var playerlist;

var prefix = "/";

var cmds = ["code", "date"];

var code_;

var log = console.log;

socket.on("display", code=>{

  codepara.innerHTML = code;

  code_ = code;

  location.href = `https://chat-box-1.rafayuchiha.repl.co/chat?code=${encodeURIComponent(encrypter(code_))}&name=${encodeURIComponent(encrypter(UserName))}`;

})

joinbtn.onclick = (e) =>{

  roomdiv.style.display = "none";

  let data = { name:UserName, room:codeinput.value.length == 5 ? codeinput.value : codepara.innerText };

  socket.emit("join", data);
  
  socket.emit("name", UserName);

}

createbtn.onclick = (e) =>{

  let data = JSON.parse(localStorage.getItem("data"));

  roomdiv.style.display = "none";

  socket.emit("create");
  
  socket.emit("name", UserName);
  
}


joinbtn.onmouseover = (e)=>{

  e.target.style.background = "#7EC8E3";

  e.target.style.color = "#050A30";

  console.log(1);


}

joinbtn.onmouseout = (e)=>{

  e.target.style.background = "#050A30";

  e.target.style.color = "#7EC8E3";

}

codeinput.oninput = (e) => {

  let data = { name:UserName, room:codeinput.value.length == 5 ? codeinput.value : codepara.innerText };

  localStorage.setItem("data", JSON.stringify(data));

}

// sendbtn.onclick=()=>{
//   if(name.value){
//     let data = { name:URL.get("name"), room:codeinput.value.length == 5 ? codeinput.value : codepara.innerText };

//     localStorage.setItem("data", JSON.stringify(data));

//     UserName = URL.get("name");
    
//   }
// }


// socket.on("talk", msg=>{
//   let text = msg.split(":");
//   let name = text.shift();
//   text.join("")
//   let msag = text;
//   let li = document.createElement("li")
//   li.innerHTML = `<span class='name'>${name}</span><span class='time'>${ new Date().toLocaleTimeString()}</span><span class='msg'>${msag}</span> `
//   ul.appendChild(li);
//     ul.scroll(0, ul.scrollHeight*2);
// })


// socket.on("typing", (msg, a, name)=>{

//   typing.innerText = msg;
//   playerlist = a;

//   for(pa of document.querySelectorAll("p")){
//     if(pa.className != name){
//       let p = document.createElement("p");
//       p.className = name;
//       document.body.appendChild(p)
//     }
//   }

// })


// socket.on("note", msg=>{

//   let li = document.createElement("li")
//   li.innerHTML = msg
//   ul.appendChild(li);

//   ul.scroll(0, ul.scrollHeight*2);

// })

socket.on("name",(msg)=>{
  console.log(msg)
})


socket.on("msg" , msg =>{
  alert(msg);
})

overlay1OpenBtn.onclick = () => {

  overlay1.style.width = "37%";

};

overlay1CloseBtn.onclick = () => {

  overlay1.style.width = "0%";

};

const showroom = () => {

  roomdiv.style.display = "block";

};

const closeroom = () => {

  roomdiv.style.display = "none";

};

var PROFILENAME = document.querySelector("div.overlay-content p#name");

var PROFILEIMG = document.querySelector(".overlay-content img#img");

PROFILENAME.innerHTML = __PROFILE.name;

// PROFILEIMG.src = __PROFILE.img;