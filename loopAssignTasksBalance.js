function loopAssignTasksBalance() {
  const lowLimit = 2;
  const highLimit = 4;
  const iterations = 50;
  const runOption = "balance";
  
  console.log(arguments.callee.name + ": Looping in the \"%s\" mode, for \"%d\" loops", runOption, iterations);
  
  for (i = 0; i < iterations; i++) {
             
    workerCount = assignTasks(runOption)
    var aCount = workerCount.get("A");
    var bCount = workerCount.get("B");
    var cCount = workerCount.get("C");
    var dCount = workerCount.get("D");

    console.log(arguments.callee.name + ": run%d: A=%d, B=%d, C=%d, D=%d", i, aCount, bCount, cCount, dCount);

    if (aCount < lowLimit || aCount > highLimit || bCount < lowLimit || bCount > highLimit || cCount < lowLimit || cCount > highLimit || dCount < lowLimit || dCount > highLimit) {
      console.log(arguments.callee.name + ": Stop!!! run%d reaches either the high or low limit", i);
      break;
    }
  }
}
