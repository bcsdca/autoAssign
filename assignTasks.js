function assignTasks(runOption) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var startRow = 2; // Or sheet.getLastRow() if you want to determine dynamically
  var endRow = 14; // Or sheet.getLastRow() if you want to determine dynamically

  sheet.getRange(startRow + 1, 2, 12, sheet.getLastColumn()).clearContent();

  const workerCount = new Map();

  const startingWorkerQueue = sheet.getRange("C2").getValue().split(",");
  var workerQueue = startingWorkerQueue;
  workerQueue.forEach(worker => workerCount.set(worker, 0));

  let previousAssignedWorker = null;

  for (let row = startRow; row <= endRow; row++) {

    var availableQueueAddress = 'B' + row;
    var workerQueueAddress = 'C' + row;
    var nextWorkerQueueAddress = 'C' + (row + 1);
    var assignedWorkerAddress = 'D' + row;
    var workerTaskCountAddress = 'E' + row;

    var workerQueue = sheet.getRange(workerQueueAddress).getValue().split(",");
    var availableQueueValue = getRandomCharacters1_4();
    sheet.getRange(availableQueueAddress).setValue(availableQueueValue);
    var availableQueue = availableQueueValue.split(",");

    const dateAddress = "A" + row;
    const dateValue = sheet.getRange(dateAddress).getValue();
    const date = Utilities.formatDate(new Date(dateValue), Session.getScriptTimeZone(), 'MM/dd/yyyy');

    //console.log(`${arguments.callee.name}: row %d: running in %s mode, workerQueue: %s, based on worker counts: %s, available queue: %s on %s`, row, runOption, JSON.stringify(workerQueue), mapToString(workerCount), JSON.stringify(availableQueue), date);

    const assignedWorker = assignWorker(workerQueue, availableQueue, previousAssignedWorker);

    if (assignedWorker) {
      sheet.getRange(assignedWorkerAddress).setValue(assignedWorker);
      sheet.getRange(workerTaskCountAddress).setValue(mapToString(workerCount));

      //increment the workerCount regardless of the runOption
      workerCount.set(assignedWorker, (workerCount.get(assignedWorker) || 0) + 1);

      previousAssignedWorker = assignedWorker;
      workerQueue = rotateQueue(workerQueue, assignedWorker);

      //sorting the workerQueue only for the "balance" runOption
      if (runOption === "balance") {
        workerQueue.sort((a, b) => (workerCount.get(a) || 0) - (workerCount.get(b) || 0));
      }

      if (row < endRow) {
        sheet.getRange(nextWorkerQueueAddress).setValue(workerQueue.join(','));
      }
      //console.log(`${arguments.callee.name}: After assigning worker ${assignedWorker}, the updated workerQueue for next week : ${JSON.stringify(workerQueue)}, previousAssignedWorker: ${previousAssignedWorker}`);
    } else {
      //console.log(`No available worker found for row ${row}. Worker queue: ${JSON.stringify(workerQueue)}, availableQueue: ${JSON.stringify(availableQueue)}`);
      return;
    }
  }
  return workerCount;
}


function assignWorker(workerQueue, availableQueue, previousAssignedWorker) {
  let assignedWorker = null;

  for (const worker of workerQueue) {
    if (availableQueue.length === 1 && availableQueue[0] === worker) {
      assignedWorker = worker;
      //console.log(`${arguments.callee.name}: Only one worker ${worker} found in availableQueue: ${JSON.stringify(availableQueue)}. Assigning worker without choice.`);
      break;
    } else if (availableQueue.includes(worker) && previousAssignedWorker !== worker) {
      assignedWorker = worker;
      //console.log(`${arguments.callee.name}: Worker ${worker} was assigned, the previous assigned worker = ${previousAssignedWorker}, the availableQueue = ${JSON.stringify(availableQueue)}, the workerQueue = ${JSON.stringify(workerQueue)}`);
      break;
    } else if (!availableQueue.includes(worker)) {
      //console.log(`${arguments.callee.name}: Worker ${worker} not found in availableQueue: ${JSON.stringify(availableQueue)}. Trying next worker.`);
    } else if (previousAssignedWorker === worker) {
      //console.log(`${arguments.callee.name}: Worker ${worker} was assigned last week. Trying next worker.`);
    }
  }

  if (assignedWorker) {
    //console.log(`${arguments.callee.name}: Assigning worker ${assignedWorker}, with workerQueue: ${JSON.stringify(workerQueue)}, availableQueue: ${JSON.stringify(availableQueue)}, previousAssignedWorker: ${previousAssignedWorker}`);
  }

  return assignedWorker;
}

function rotateQueue(queue, worker) {
  const newQueue = queue.filter(w => w !== worker);
  newQueue.push(worker);
  return newQueue;
}

function mapToString(map) {
  return Array.from(map.entries()).map(([key, value]) => `${key}=${value}`).join(',');
}
