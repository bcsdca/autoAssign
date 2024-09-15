function getRandomCharacters() {
  // Define the characters to pick from
  var characters = ['A', 'B', 'C', 'D'];
  
  // Randomly determine the number of characters to pick (1 to 4)
  var numToPick = Math.floor(Math.random() * 4) + 1;

  // Shuffle the array and pick the first numToPick elements
  var shuffledCharacters = shuffleArray(characters).slice(0, numToPick);
    
  // Join the characters into a single string
  var result = shuffledCharacters.join(',');

  // Log the result or return it
  Logger.log(result);
  return result;
}

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.sort();
}
