function getRandomCharacters2_4() {
  var chars = ['A', 'B', 'C', 'D'];
  var numChars = Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4
  var result = [];

  while (result.length < numChars) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    var randomChar = chars[randomIndex];
    if (result.indexOf(randomChar) === -1) {
      result.push(randomChar);
    }
  }

  //var resultArray = Array.from(result);
  var resultSort = result.sort().join(',');

  // Log the result or return it
  //console.log(arguments.callee.name + ": The random char array return is %s", JSON.stringify(resultArraySort));
  return resultSort;
}

