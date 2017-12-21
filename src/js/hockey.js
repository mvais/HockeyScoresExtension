var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var currentDate = year + "-" + month + "-" + day;
var NHL_API = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${currentDate}&endDate=${currentDate}`;

var fetchSchedule = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', NHL_API, true);
  console.log(NHL_API);
  xhr.onload = function() {
    if (xhr.status == 200) {
      if (JSON.parse(xhr.response)['dates'][0]) {
        createNHLGames(JSON.parse(xhr.response)['dates'][0]['games']);
      } else {
        createNHLGames([]);
      }
    } else {
      console.log("Error Loading Games");
    }
  }
  xhr.send();
}

var createNHLGame = function(game) {
  return document.createRange().createContextualFragment(
    `<div class="col-lg-4 col-sm-12 match-card">
      <div class="row match-status"><div class="col-12 text-center">${game['status']['abstractGameState']}</div></div>
      <div class="row team home-team">
          <img class="col-lg-2 col-sm-2 logo" src="assets/${fetchSVG(game['teams']['away']['team']['name'])}" onerror="javascript:this.src='assets/NHL.svg'" alt="logo">
          <div class="col-lg-9 col-sm-8 team-name">${game['teams']['away']['team']['name']}</div>
          <div class="col-lg-1 col-sm-2 team-score text-center">${game['teams']['away']['score']}</div>
      </div>
      <div class="row team away-team">
          <img class="col-lg-2 col-sm-2 logo" src="assets/${fetchSVG(game['teams']['home']['team']['name'])}" onerror="javascript:this.src='assets/NHL.svg'" alt="logo">
          <div class="col-lg-9 col-sm-8 team-name">${game['teams']['home']['team']['name']}</div>
          <div class="col-lg-1 col-sm-2 team-score text-center">${game['teams']['home']['score']}</div>
      </div>
    </div>`
  );
}

var createNoScheduleGames = function() {
  return document.createRange().createContextualFragment(
    `
    <div class="container text-center">
      <h2 class="no-match-card">No Scheduled Games</h2>
    </div>
    `
  )
}

var createNHLGames = function(games) {
  var gamesElt = document.getElementById('games');
  var row = document.createElement('div');
  console.log(games);
  if (games.length > 0) {
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
  } else {
    gamesElt.innerHTML = '';
    gamesElt.appendChild(createNoScheduleGames());
  }
}

var fetchSVG = function(name) {
  return name.split(" ").join('_') + ".svg";
}

window.onload = function() {
  fetchSchedule();
}

var formatAPI = function(newDate) {
  NHL_API = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${newDate}&endDate=${newDate}`;
}

// Date Selection Code
document.getElementById('decreaseYear').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-year').value);
  document.getElementById('selected-year').value = value - 1;
  year = value - 1;
  formatAPI(year + "-" + month + "-" + day);
  fetchSchedule();
}

document.getElementById('increaseYear').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-year').value);
  document.getElementById('selected-year').value = parseInt(value) + 1;
  year = value + 1;
  formatAPI(year + "-" + month + "-" + day);
  fetchSchedule();
}

document.getElementById('increaseMonth').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-month').value);

  if (value == 12) {
    value = 0;
  }

  document.getElementById('selected-month').value = parseInt(value) + 1;
  month = value + 1;
  formatAPI(year + "-" + month + "-" + day);
  fetchSchedule();
}

document.getElementById('decreaseMonth').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-month').value);
  if (value == 1) {
    value = 13;
  }
  document.getElementById('selected-month').value = value - 1;
  month = value - 1;
  formatAPI(year + "-" + month + "-" + day);
  fetchSchedule();
}

document.getElementById('increaseDay').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-day').value);
  let selectedMonth = parseInt(document.getElementById('selected-month').value);
  let selectedYear = parseInt(document.getElementById('selected-year').value);

  if (value + 1 > new Date(selectedYear, selectedMonth, 0).getDate()) {
    value = 0;
  }
  document.getElementById('selected-day').value = parseInt(value) + 1;
  day = value + 1;
  formatAPI(year + "-" + month + "-" + day);
  fetchSchedule();
}

document.getElementById('decreaseDay').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-day').value);
  let selectedMonth = parseInt(document.getElementById('selected-month').value);
  let selectedYear = parseInt(document.getElementById('selected-year').value);

  if (value == 1) {
    value = new Date(selectedYear, selectedMonth, 0).getDate() + 1
  }
  document.getElementById('selected-day').value = parseInt(value) - 1;
  day = value - 1;
  formatAPI(year + "-" + month + "-" + day);
  fetchSchedule();
}