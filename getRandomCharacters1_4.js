function getRandomCharacters1_4() {
  var chars = ['A', 'B', 'C', 'D'];
  var numChars = Math.floor(Math.random() * 4) + 1; // Randomly select between 1 and 4
  var result = new Set();

  while (result.size < numChars) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    result.add(chars[randomIndex]);
    }

  var resultArray = Array.from(result);
  var resultArraySort = resultArray.sort().join(',');

  // Log the result or return it
  //console.log(arguments.callee.name + ": The random char array return is %s", JSON.stringify(resultArraySort));
  return resultArraySort;
}

