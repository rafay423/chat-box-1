const matches = JSON.parse(process.env['po']);

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





module.exports = {

  encrypter,
  decrypter

};