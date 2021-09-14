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

var btn = document.querySelector("input#submit");

var text = document.querySelector("input#msg");

var ul = document.querySelector("ul");

var divchat = document.querySelector("div#chatbox")

var codepara = document.querySelector("p#code");

var playerlist;

var prefix = "/";

var cmds = ["code", "date"];

var code_;

var log = console.log;

var _user;

var URL = new URLSearchParams(window.location.search);

var name_ = decrypter(URL.get("name"));
var room_ = decrypter(URL.get("code"));

var _data = { name: name_, room: room_ };

localStorage.setItem("data", JSON.stringify(_data));

var data = JSON.parse(localStorage.getItem("data"));

socket.emit("ko", data);

socket.on("ko", msg=>{
  let li = document.createElement("li")
  li.innerHTML = msg + " is connected";
  ul.appendChild(li);
  
    ul.scroll(0, ul.scrollHeight*2);

})

socket.on("display", code=>{

  codepara.innerHTML = code;

  code_ = data.room;

})

socket.on("k", msg=>{
  let li = document.createElement("li")
  li.innerHTML = msg + " is connected";
  ul.appendChild(li);
  
    ul.scroll(0, ul.scrollHeight*2);

})

socket.on("offline", name=>{
  let li = document.createElement("li")
  li.innerHTML = name + " is disconnected";
  ul.appendChild(li);
  
    ul.scroll(0, ul.scrollHeight*2);
})

socket.on("name", msg=>{
  let li = document.createElement("li")
  li.innerHTML = msg + " is connected";
  ul.appendChild(li);
  
    text.value = "";
    ul.scroll(0, ul.scrollHeight*2);

})


socket.on("talk", (msg, names)=>{
  let text = msg.split(":");
  let name = text.shift();
  
  text.join("")
  let msag = text;
  let li = document.createElement("li")
  li.innerHTML = `<span class='name'>${name}</span><span class='time'>${ new Date().toLocaleTimeString()}</span><span class='msg'>${msag}</span> `
  ul.appendChild(li);
    ul.scroll(0, ul.scrollHeight*2);
})


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


socket.on("msg" , msg =>{
  alert(msg);
})

socket.on("note", msg=>{

  let li = document.createElement("li")
  li.innerHTML = msg
  ul.appendChild(li);

  ul.scroll(0, ul.scrollHeight*2);

})



btn.onclick = () =>{
  if(text.value != "" && text.value != " " && text.value != undefined && text.value.trim().length){
    socket.emit("talk",text.value, data)
    text.value = "";
    text.focus();
    ul.scroll(0, ul.scrollHeight*2);
  }
  
}

text.onkeydown=e=>{
    
    if(e.key == "Enter" && text.value != undefined && text.value.trim().length){

        e.preventDefault();
        socket.emit("talk", text.value, data)
        text.value = "";
        text.focus();
        ul.scroll(0, ul.scrollHeight*2);
      

      

    }
  
  
}