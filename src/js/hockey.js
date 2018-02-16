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
    `<div class="game">
      <span class="status">${game['status']['abstractGameState']}</span>
      <div class="team">
          <img class="logo" src="assets/${fetchLogoPaths(game['teams']['away']['team']['name'])}">
          <div class="name">${game['teams']['away']['team']['name']}</div>
          <div class="abbr">${teams[game['teams']['away']['team']['name']]['abbr']}</div>
          <div class="score">${game['teams']['away']['score']}</div>
      </div>
      <div class="team">
          <img class="logo" src="assets/${fetchLogoPaths(game['teams']['home']['team']['name'])}">
          <div class="name">${game['teams']['home']['team']['name']}</div>
          <div class="abbr">${teams[game['teams']['home']['team']['name']]['abbr']}</div>
          <div class="score">${game['teams']['home']['score']}</div>
      </div>
    </div>`
  );
}

var createNoScheduledGames = function() {
  document.getElementById('container').innerHTML = '';
  document.getElementById('container').appendChild(document.createRange().createContextualFragment(
    `<div></div><h2 class="no-match-card">No Scheduled Games</h2><div></div>`
  ));
}

var fetchLogoPaths = function(teamName) {
  if (teams[teamName]) {
    return teams[teamName]["logo"];
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
  document.getElementById('container').innerHTML = '';

  for (let game of games) {
    document.getElementById('container').appendChild(createNHLGame(game));
  }
}
