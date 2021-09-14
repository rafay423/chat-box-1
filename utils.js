var users = [];

var rooms = { };

var possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,./-=";

function userJoin(id, name, room) {

  let user = { id, name, room };

  users.push(user);

  return user;

};

function userLeave(id, name, room) {

  let user = { id, name, room };

  users.splice(users.indexOf(user), 1);

  return user;

};


function getCurrentUser(id) {

  return users.find(user => user.id === id);

}

function getAllUsersFromRoom(room) {

  return users.filter(user => user.room === room);

}

function cmdHandler(cmd, { author, response } = { }) {

  var result;

  if (cmd == "/code") {

    result = author.room;

  } else if (cmd == "/date") {

    result = new Date().toLocaleDateString();

  }

  return result;

}

function codeGenerator(length) {

  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  var text = "";

  for (let i = 0; i < length; i++) {

    text += letters.charAt(Math.floor(Math.random() * letters.length));

  }

  return text;

};


function randomNum(max, min = 0) {

  return Math.floor(Math.random() * (max - min)) + min;

};

module.exports = {

  rooms,
  users,
  userJoin,
  randomNum,
  userLeave,
  cmdHandler,
  codeGenerator,
  getCurrentUser,
  possibleLetters,
  getAllUsersFromRoom,

};