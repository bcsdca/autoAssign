function testGetRandomChars() {

  var chars = ['A', 'B', 'C', 'D'];
  var numChars = Math.floor(Math.random() * 4) + 1; // Randomly select between 1 and 4
  var result = new Set();

  while (result.size < numChars) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    result.add(chars[randomIndex]);
    }

  var resultArray = Array.from(result);

  Logger.log(JSON.stringify(resultArray));
  //return result.join('');
}