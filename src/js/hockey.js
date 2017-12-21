var date = new Date();
var currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + 23;
var NHL_API = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${currentDate}&endDate=${currentDate}`;

var fetchSchedule = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', NHL_API, true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.response)['dates'][0]['games'];
      if (data) {
        createNHLGames(data);
      } else {
        createNHLGames(response[0]['games']);
      }
    } else {
      console.log("Error Loading Games");
    }
  }
  xhr.send();
}

var createNHLGame = function(game) {
  console.log(game);
  return document.createRange().createContextualFragment(
    `<div class="col-md-4 match-card">
      <div class="row match-status"><div class="col-12 text-center">${game['status']['abstractGameState']}</div></div>
      <div class="row team">
          <img class="col-2 logo" src="assets/${fetchSVG(game['teams']['away']['team']['name'])}" alt="logo">
          <div class="col-8">${game['teams']['away']['team']['name']}</div>
          <div class="col-2 text-center">${game['teams']['away']['score']}</div>
      </div>
      <div class="row team">
          <img class="col-2 logo" src="assets/${fetchSVG(game['teams']['home']['team']['name'])}" alt="logo">
          <div class="col-8">${game['teams']['home']['team']['name']}</div>
          <div class="col-2 text-center">${game['teams']['home']['score']}</div>
      </div>
    </div>`
  );
}

var createNoScheduleGames = function() {}

var createNHLGames = function(games) {
  console.log(games);
  var gamesElt = document.getElementById('games');
  var row = document.createElement('div');

  if (games) {
    gamesElt.innerHTML = '';
    row.className = 'row';
    while (games.length) {
      row.appendChild(createNHLGame(games.shift()));
      if (row.childNodes.length == 3) {
        console.log('true');
        gamesElt.appendChild(row);
        row = document.createElement('div');
        row.className = 'row';
      }
      console.log(games.length);
    }
    gamesElt.appendChild(row);
  } else {
    gamesElt.innerHTML = createNoScheduleGames();
  }
}

var fetchSVG = function(name) {
  console.log(name.split(" ").join("_") + ".svg");
  return name.split(" ").join('_') + ".svg";
}

window.onload = function() {
  fetchSchedule();
}