//select Elements
var teamContainer = document.querySelector(".container")
var teams = setTeams(getTeamsArray())
var spot1 = document.querySelector(".opp1")
var spot2 = document.querySelector(".opp2")
var play = document.querySelector(".play")
var playing = document.querySelectorAll(".playing")
var vs = document.querySelector(".vs")
var win = document.querySelector(".winner")

//game states
var round = 1
var match = 0
var place = "player1"
var currentPlayers = []
var x = 0;
var winner
var rounds = createRounds(teams)

//function definitions
function toggle(elem, tog){
  elem.classList.toggle(tog)
}

function setTeams(teamsArray){
  teamContainer.innerHTML = ""
  var temp = []
  var length = teamsArray.length-1
  for(var i=length; i>(length-8); i--){
    var random = Math.floor(Math.random()*(i+1))
    teamContainer.innerHTML += teamsArray[random]
    temp.push(teamsArray.splice(random, 1))
  }
  return document.querySelectorAll('.team')
}

function createRounds(teams){
  return {
    round1: [
      {player1: teams[0], player2: teams[1], spot: "spot9"},
      {player1: teams[2], player2: teams[3], spot: "spot10"},
      {player1: teams[4], player2: teams[5], spot: "spot11"},
      {player1: teams[6], player2: teams[7], spot: "spot12"}
    ],
    round2:[
      {player1: "", player2: "", spot: "spot13"},
      {player1: "", player2: "", spot: "spot14"}
    ],
    round3:[
      {player1: "", player2: "", spot: "spot15"}
    ],
    round4:[
      {player1: ""}
    ]
  }
}

function setSpots(teams){
  teams.forEach(function(team, index){
    toggle(teams[index], `spot${index+1}`)
  })
  play.disabled = false
}

function returnToOriginal(){
  setTimeout(function(){
    win.classList.toggle("hide")
    vs.classList.toggle("hide")
    spot1.textContent = ""
    spot2.textContent = ""
    round = 1
    match = 0
    place = "player1"
    currentPlayers = []
    x = 0;
    teams =setTeams(getTeamsArray())
    rounds = createRounds(teams)
    setSpots(teams)
    setPlayers()
    playing.forEach(function(p){
      toggle(p, "hide")
    })
  }, 3000)
}

function gameOver(){
  play.disabled = true
  playing.forEach(function(p){
    toggle(p, "hide")
  })
  toggle(vs, "hide")
  toggle(win, "hide")
  returnToOriginal()
}

function setPlayers(){
  currentPlayers = [rounds[`round${round}`][match].player1, rounds[`round${round}`][match].player2 ]
  playing.forEach(function(p, i){
    p.textContent = currentPlayers[i].dataset.name
  })
}

function changePlayer(){
  if(place === "player1"){
    place = "player2"
  } else {
    place = "player1"
    x++
  }
  setPlayers()
}

function nextMatch(){
  round++
  match = 0
  changePlayer()
  return 
}

function changeMatch(){
  if(round == 3){
    gameOver()
    return 
  }
  if(match >= rounds[`round${round}`].length-1){
    nextMatch()
    x = 0
    return
  }
  match++
  changePlayer()

}

function moveTeam(winner, spot){
  var oldSpot = winner.classList[1]
  toggle(winner, oldSpot)
  toggle(winner, spot)
}

function playGame(round, match, place){
  var score1 = Math.random()
  var score2 = Math.random()
  
  if(score1 > score2){
    spot1.textContent = Math.ceil(score1*7)
    spot2.textContent = Math.ceil(score2*7)-1
    rounds[`round${round+1}`][x][place] = currentPlayers[0]
  }
  if(score1 < score2){
    spot2.textContent = Math.ceil(score2*7)
    spot1.textContent = Math.ceil(score1*7)-1
    rounds[`round${round+1}`][x][place] = currentPlayers[1]
  }

  return rounds[`round${round+1}`][x][place]
}

//Event Listeners
play.addEventListener("click", function(e){
  winner = playGame(round, match, place)
  moveTeam(winner, rounds[`round${round}`][match]["spot"])
  changeMatch()
})

setSpots(teams)
setPlayers()