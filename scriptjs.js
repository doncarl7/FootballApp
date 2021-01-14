var attributes = ["TackleLost", "TackleWon", "Interception", "Blocks", "AerialDuelWon", "AerialDuelLost", "Save", "Punch", "Pass", "PassFailed",
  "ThroughBall", "ProgressivePass", "KeyPass", "Assist", "ShotOnTarget", "ShotOffTarget", "GoalConceded", "GoalScored"
];

var players = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11"];

var currPlayer = 0;

var duration = 0;

var playerAndActionsMap = new Map();

var player1ActionMap = new Map();

class player {
  constructor(plNumber, name) {
    this.plNumber = plNumber;
    this.name = name;
  }

  setTimeAndAction(action, time) {
    var actionText = action;
    console.log(actionText);
    eval(
      "if( this." + actionText + " === undefined){" +
      "this." + actionText + " = time;" +
       "}"+
       "else{" +
       "console.log(time);"+
       "this."+actionText+" = this."+actionText+".concat(',',time);"+
      "}"
    );
  }
}

var player1Obj, player2Obj, player3Obj, player4Obj, player5Obj, player6Obj, player7Obj, player8Obj, player9Obj, player10Obj, player11Obj;

function attributeCounter(attributeIndex) {
  var playerAttributeId = currPlayer + attributes[attributeIndex];
  document.getElementById(playerAttributeId).innerHTML = parseInt(document.getElementById(playerAttributeId).innerHTML) + 1;
  storeTimeStamp(currPlayer, attributes[attributeIndex]);

}

function choosePlayer(playerNumber) {
  console.log(playerNumber);
  currPlayer = players[playerNumber];
  console.log(currPlayer);
}

function changeThePlayerName() {
  var number = currPlayer.substr(1);
  var pNum = "player" + number;
  var sNum = "shirt" + number;

  var elements = document.getElementsByClassName(pNum);
  var pName = document.getElementById('playerNameChange').value;
  for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = pName;
  }

  var shirtElements = document.getElementsByClassName(sNum);
  var pShirtNum = document.getElementById('playerNumberChange').value;
  for(var i = 0; i < shirtElements.length ; i++){
    shirtElements[i].innerHTML = shirtElements[i].innerHTML + '('+pShirtNum+')';
  }
  eval(pNum + "Obj" + "=" + "new " + "player(pNum,pName);");
}

function changeURL() {
  var video = document.getElementById("video");
  var newURL = document.getElementById("URL").value;
  console.log("The New URL" + newURL);
  console.log("The Current URL" + document.getElementById("currentURL").src);
  document.getElementById("currentURL").src = newURL;
  console.log("The Current URL post change" + document.getElementById("currentURL").src);
  video.addEventListener('loadedmetadata', function() {
    duration = video.duration;
    document.getElementById("showTime").innerHTML = duration;
  });
  video.load();
}

function storeTimeStamp(currPlayer, action) {
  console.log(storeTimeStamp);
  console.log(currPlayer);
  console.log(action);
  var video1 = document.getElementById("video");
  console.log(video1.currentTime);
  var playerAction = currPlayer + " -> " + action + " in " + video1.currentTime;
  document.getElementById("showTime").innerHTML = playerAction;
  var timeWOSeconds = video1.currentTime.toString().split(".")[0];
  addActionStorageTable(currPlayer, action , timeWOSeconds);

  switch (currPlayer) {
    case "P1":
      player1Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P2":
      player2Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P3":
      player3Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P4":
      player4Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P5":
      player5Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P6":
      player6Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P7":
      player7Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P8":
      player8Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P9":
      player9Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P10":
      player10Obj.setTimeAndAction(action, timeWOSeconds);
      break;
    case "P11":
      player11Obj.setTimeAndAction(action, timeWOSeconds);
      break;

  }
}

function populateActionAndTime(dropdown){
  console.log("Entered the populate Action and Time");
  var pl = dropdown.options[dropdown.selectedIndex].value;
  var actionMap = getActionAndTimeMap(pl);
  console.log(actionMap);
  var size = actionMap.size;
  console.log(size);
  var dynTable = document.getElementById("dynamicActionTable");
  dynTable.innerHTML = "";
  actionMap.forEach(function(value , key){
    console.log(key);
    console.log(value);

      var tableRow = document.createElement("tr");
      var tableData1 = document.createElement("td");
      var tableData2 = document.createElement("td");
      tableData1.innerHTML = key;
      tableData2.innerHTML = actionMap.get(key);
      tableRow.appendChild(tableData1);
      tableRow.appendChild(tableData2);
      dynTable.appendChild(tableRow);
  });
}

function getActionAndTimeMap(pl){
  switch(pl){
    case "P1":
      return new Map(Object.entries(player1Obj));
    case "P2":
      return new Map(Object.entries(player2Obj));
    case "P3":
      return new Map(Object.entries(player3Obj));
    case "P4":
      return new Map(Object.entries(player4Obj));
    case "P5":
      return new Map(Object.entries(player5Obj));
    case "P6":
      return new Map(Object.entries(player6Obj));
    case "P7":
      return new Map(Object.entries(player7Obj));
    case "P8":
      return new Map(Object.entries(player8Obj));
    case "P9":
      return new Map(Object.entries(player9Obj));
    case "P10":
      return new Map(Object.entries(player10Obj));
    case "P11":
      return new Map(Object.entries(player11Obj));
  }
}

// function setPlayBackRate(speed){
//   var video = document.getElementById("video");
//   video.playbackRate = speed;
//   video.play();
//   //alert(video.playbackrate);
// }

function addActionStorageTable(actionCurrPlayer,actionAttribute , timeInSeconds){
  var number = actionCurrPlayer.substr(1);
  var className = "player" + number;
  var playerName = document.getElementsByClassName(className)[0].innerHTML;

  var actStorageId = document.getElementById('ActionStorageTable');
  var actTableRow = document.createElement("tr");
  var actTableData1 = document.createElement("td");
  var actTableData2 = document.createElement("td");
  var actTableData3 = document.createElement("td");

  actTableData1.innerHTML = playerName;
  actTableData2.innerHTML = actionAttribute;
  actTableData3.innerHTML = timeInSeconds;

  actTableRow.appendChild(actTableData1);
  actTableRow.appendChild(actTableData2);
  actTableRow.appendChild(actTableData3);
  actStorageId.appendChild(actTableRow);
}

function testButtonAction(){
  console.log("Hello");
  for( var i=0 ; i<10000 ; i++){
    attributeCounter(0);
  }
}

window.onload = function(){
  console.log("Hello2");

}

function setPlayBackRate(){
  console.log("Hello");

  var video = document.getElementById("video");
  var pbr = document.getElementById("pbr");
  var currPbr = document.getElementById("currentPbr");

  currPbr.innerHTML = pbr.value;
  video.playbackRate = pbr.value;

}
