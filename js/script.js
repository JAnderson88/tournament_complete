//select Elements
var teamContainer = document.querySelector(".container");
var teams = setTeams(getTeamsArray());
var spot1 = document.querySelector(".opp1");
var spot2 = document.querySelector(".opp2");
var play = document.querySelector(".play");
var playing = document.querySelectorAll(".playing");
var vs = document.querySelector(".vs");
var win = document.querySelector(".winner");

//game states
var round = 1;
var match = 0;
var place = "player1";
var currentPlayers = [];
var holder = 0;
var rounds = createRounds(teams);

//function definitions
function setTeams(teamsArray, MAXPLAYERS = 8) {
  teamContainer.innerHTML = "";
  var temp = [];
  var length = teamsArray.length - 1;
  for (var i = length; i > (length - MAXPLAYERS); i--) {
    var random = Math.floor(Math.random() * (i + 1));
    teamContainer.innerHTML += teamsArray[random];
    temp.push(teamsArray.splice(random, 1));
  }
  return document.querySelectorAll('.team');
}

function createRounds(teams) {
  return {
    round1: [
      { player1: teams[0], player2: teams[1], spot: "spot9" },
      { player1: teams[2], player2: teams[3], spot: "spot10" },
      { player1: teams[4], player2: teams[5], spot: "spot11" },
      { player1: teams[6], player2: teams[7], spot: "spot12" }
    ],
    round2: [
      { player1: "", player2: "", spot: "spot13" },
      { player1: "", player2: "", spot: "spot14" }
    ],
    round3: [
      { player1: "", player2: "", spot: "spot15" }
    ],
    round4: [
      { player1: "" }
    ]
  }
}

function setSpots(teams) {
  teams.forEach(function (team, index) {
    team.classList.toggle(`spot${index + 1}`);
  })
  play.disabled = false;
}

function setPlayers() {
  currentPlayers = [rounds[`round${round}`][match].player1, rounds[`round${round}`][match].player2];
  playing.forEach(function (p, i) {
    p.textContent = currentPlayers[i].dataset.name;
  })
}

function playGame(round, place, holder) {
  var score1 = Math.random();
  var score2 = Math.random();

  if (score1 > score2) {
    spot1.textContent = Math.ceil(score1 * 7);
    spot2.textContent = Math.ceil(score2 * 7) - 1;
    rounds[`round${round + 1}`][holder][place] = currentPlayers[0];
  }
  if (score1 < score2) {
    spot2.textContent = Math.ceil(score2 * 7);
    spot1.textContent = Math.ceil(score1 * 7) - 1;
    rounds[`round${round + 1}`][holder][place] = currentPlayers[1];
  }

  return rounds[`round${round + 1}`][holder][place];
}

function moveTeam(winner, newSpot) {
  var oldSpot = winner.classList[1];
  winner.classList.toggle(oldSpot);
  winner.classList.toggle(newSpot);
}

function changePlayer() {
  if (place === "player1") {
    place = "player2";
  } else {
    place = "player1";
    holder++;
  }
}

function changeMatch() {
  if (match >= rounds[`round${round}`].length - 1) {
    round++;
    match = 0;
    holder = 0;
    return
  }
  match++;
}

function gameOver() {
  play.disabled = true;
  playing.forEach(function (p) {
    p.classList.toggle("hide");
  })
  vs.classList.toggle("hide");
  win.classList.toggle("hide");
}

function returnToOriginal() {
  setTimeout(function () {
    win.classList.toggle("hide");
    vs.classList.toggle("hide");
    spot1.textContent = "";
    spot2.textContent = "";
    round = 1;
    match = 0;
    place = "player1";
    currentPlayers = [];
    holder = 0;
    teams = setTeams(getTeamsArray());
    rounds = createRounds(teams);
    setSpots(teams);
    setPlayers();
    playing.forEach(function (p) {
      p.classList.toggle("hide");
    });
  }, 3000);
}

//Event Listeners
play.addEventListener("click", function (e) {
  var winner = playGame(round, place, holder)
  moveTeam(winner, rounds[`round${round}`][match]["spot"])
  if (round === 3) {
    gameOver();
    returnToOriginal();
  }
  if (round < 3) {
    changePlayer();
    changeMatch();
    setPlayers();
  }
})

setSpots(teams)
setPlayers()