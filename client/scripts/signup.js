const socket = io();

// if ([...passField].some(char => char == char.toLowerCase() && char != char.toUpperCase()) && [...passField].some(char => char != char.toLowerCase() && char == char.toUpperCase()) && [...passField].some(char => !isNaN(char * 1))) passwordSpan.innerHTML = "";
//   else passwordSpan.innerHTML = (passwordSpan.innerHTML == "") ? `Your Password must Contain 1 Uppercase and 1 Lowercase Alphabet and 1 Digit!" : "You Password must contain atleast 6 characters, 1 Uppercase and 1 Lowercase Alphabet and 1 Digit!`: "";
