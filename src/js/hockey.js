var year  = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var day   = new Date().getDate();

window.onload = function() {
  document.getElementById('selected-year').value  = year;
  document.getElementById('selected-month').value = month;
  document.getElementById('selected-day').value   = day;
  loadSchedule();
}

var createNHLGame = function(game) {
  return document.createRange().createContextualFragment(
    `<div class="col-lg-4 col-sm-12 col-12 match-card">
      <div class="row match-status"><div class="col-12 text-center">${game['status']['abstractGameState']}</div></div>
      <div class="row team home-team">
          <img class="col-lg-2 col-sm-2 col-2 logo" src="assets/${fetchLogoPaths(game['teams']['away']['team']['name'])}">
          <div class="col-lg-9 col-sm-8 col-8 team-name">${game['teams']['away']['team']['name']}</div>
          <div class="col-lg-1 col-sm-2 col-2 team-score text-center">${game['teams']['away']['score']}</div>
      </div>
      <div class="row team away-team">
          <img class="col-lg-2 col-sm-2 col-2 logo" src="assets/${fetchLogoPaths(game['teams']['home']['team']['name'])}">
          <div class="col-lg-9 col-sm-8 col-8 team-name">${game['teams']['home']['team']['name']}</div>
          <div class="col-lg-1 col-sm-2 col-2 team-score text-center">${game['teams']['home']['score']}</div>
      </div>
    </div>`
  );
}

var createNoScheduledGames = function() {
  document.getElementById('games').innerHTML = '';
  document.getElementById('games').appendChild(document.createRange().createContextualFragment(
    `<div class="container text-center">
      <h2 class="no-match-card">No Scheduled Games</h2>
     </div>`
  ));
}

var fetchLogoPaths = function(teamName) {

  if (logoPaths[teamName]) {
    return logoPaths[teamName];
  }
  return 'NHL.svg';
}

var formatAPI = function() {
  return `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${year}-${month}-${day}&endDate=${year}-${month}-${day}`;
}

var loadSchedule = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', formatAPI(), true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      if (JSON.parse(xhr.response)['dates'][0]) {
        createNHLGames(JSON.parse(xhr.response)['dates'][0]['games']);
      } else {
        createNoScheduledGames();
      }
    } else {
      console.log("Error Loading Games");
    }
  }
  xhr.send();
}

var createNHLGames = function(games) {
  var gamesElt = document.getElementById('games');
  var row = document.createElement('div');

  gamesElt.innerHTML = '';
  row.className = 'row';
  while (games.length) {
    row.appendChild(createNHLGame(games.shift()));
    if (row.childNodes.length == 3) {
      gamesElt.appendChild(row);
      row = document.createElement('div');
      row.className = 'row';
    }
  }
  gamesElt.appendChild(row);
}

// Date Selection Code
document.getElementById('decreaseYear').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-year').value);
  document.getElementById('selected-year').value = value - 1;
  year = value - 1;
  loadSchedule();
}

document.getElementById('increaseYear').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-year').value);
  document.getElementById('selected-year').value = parseInt(value) + 1;
  year = value + 1;
  loadSchedule();
}

document.getElementById('increaseMonth').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-month').value);

  if (value == 12) {
    value = 0;
  }

  document.getElementById('selected-month').value = parseInt(value) + 1;
  month = value + 1;

  if (day > new Date(year, month, 0).getDate()) {
    day = new Date(year, month, 0).getDate();
    document.getElementById('selected-day').value = new Date(year, month, 0).getDate();
  }

  loadSchedule();
}

document.getElementById('decreaseMonth').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-month').value);
  if (value == 1) {
    value = 13;
  }
  document.getElementById('selected-month').value = value - 1;
  month = value - 1;

  if (day > new Date(year, month, 0).getDate()) {
    day = new Date(year, month, 0).getDate();
    document.getElementById('selected-day').value = new Date(year, month, 0).getDate();
  }

  loadSchedule();
}

document.getElementById('increaseDay').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-day').value);
  let month = parseInt(document.getElementById('selected-month').value);
  let year = parseInt(document.getElementById('selected-year').value);

  if (value + 1 > new Date(year, month, 0).getDate()) {
    value = 0;
  }
  document.getElementById('selected-day').value = parseInt(value) + 1;
  day = value + 1;
  loadSchedule();
}

document.getElementById('decreaseDay').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-day').value);
  let month = parseInt(document.getElementById('selected-month').value);
  let year = parseInt(document.getElementById('selected-year').value);

  if (value == 1) {
    value = new Date(year, month, 0).getDate() + 1
  }
  document.getElementById('selected-day').value = parseInt(value) - 1;
  day = value - 1;
  loadSchedule();
}

logoPaths = {
  "Anaheim Ducks": "Anaheim_Ducks.svg",
  "Arizona Coyotes": "Arizona_Coyotes.svg",
  "Boston Bruins" : "Boston_Bruins.svg",
  "Buffalo Sabres" : "Buffalo_Sabres.svg",
  "Calgary Flames" : "Calgary_Flames.svg",
  "Carolina Hurricanes" : "Carolina_Hurricanes.svg",
  "Chicago Blackhawks" : "Chicago_Blackhawks.svg",
  "Colorado Avalanche" : "Colorado_Avalanche.svg",
  "Columbus Blue Jackets" : "Columbus_Blue_Jackets.svg",
  "Dallas Stars" : "Dallas_Stars.svg",
  "Detroit Red Wings" : "Detroit_Red_Wings.svg",
  "Edmonton Oilers" : "Edmonton_Oilers.svg",
  "Florida Panthers" : "Florida_Panthers.svg",
  "Los Angeles Kings" : "Los_Angeles_Kings.svg",
  "Minnesota Wild" : "Minnesota_Wild.svg",
  "Montréal Canadiens" : "Montréal_Canadiens.svg",
  "Nashville Predators" : "Nashville_Predators.svg",
  "New Jersey Devils" : "New_Jersey_Devils.svg",
  "New York Islanders" : "New_York_Islanders.svg",
  "New York Rangers" : "New_York_Rangers.svg",
  "Ottawa Senators" : "Ottawa_Senators.svg",
  "Philadelphia Flyers" : "Philadelphia_Flyers.svg",
  "Phoenix Coyotes" : "Phoenix_Coyotes.svg",
  "Pittsburgh Penguins" : "Pittsburgh_Penguins.svg",
  "San Jose Sharks" : "San_Jose_Sharks.svg",
  "St. Louis Blues" : "St._Louis_Blues.svg",
  "Tampa Bay Lightning" : "Tampa_Bay_Lightning.svg",
  "Toronto Maple Leafs" : "Toronto_Maple_Leafs.svg",
  "Vancouver Canucks" : "Vancouver_Canucks.svg",
  "Vegas Golden Knights" : "Vegas_Golden_Knights.svg",
  "Washington Capitals" : "Washington_Capitals.svg",
  "Winnipeg Jets" : "Winnipeg_Jets.svg",
  "Winnipeg Jets (1979)" : "Winnipeg_Jets_(1979).svg"
}