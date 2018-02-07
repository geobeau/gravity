actionScheduler = [];
frameCounter = 0;

function scheduleActions(time, action){
  actionScheduler.push({"time": time,"action":action});
}

function runScheduler(){
  actionTmp = actionScheduler.slice(0)
  for (var i=0; i < actionTmp.length; i++) {
    actionTmp[i]["time"] -= tickDuration;
    if (actionTmp[i]["time"] <= 0){
      executeAction(actionTmp[i]["action"]);
      actionScheduler.splice(actionScheduler.indexOf(actionTmp[i]),1);
    }
  }
}

function executeAction(action){
  switch(action["actionType"]){
    case "burn":
      actionBurn(action["options"]);
      break;
    case "rcs":
      actionRCS(action["options"]);
      break;
  }
}

function actionBurn(options){
  rocketEnginePush(options["impulsion"]/100000);

  options["burnTime"] -= tickDuration;
  if(options["burnTime"] > 0){
    // We reschedule the burn for next tick
    scheduleActions(0,{"actionType":"burn","options":options})
  }
}

function actionRCS(options){
  rocketRCSPush(options["impulsion"]/100000);

  options["burnTime"] -= tickDuration;
  if(options["burnTime"] > 0){
    // We reschedule the burn for next tick
    scheduleActions(0,{"actionType":"rcs","options":options})
  }
}
