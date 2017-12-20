var date = new Date();
var currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
var NHL_API = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${currentDate}&endDate=${currentDate}`;

var createNHLGameCard = function(game) {
  var frag = document.createRange().createContextualFragment(
    `<div class="col-md-3 card">
      <div class="row team align-items-center">
        <div class="col-md-8">${game["teams"]["away"]["team"]["name"]}</div>
        <div class="col-md-4 text-center">${game["teams"]["away"]["score"]}</div>
      </div>
      <div class="row team align-items-center">
        <div class="col-md-8">${game["teams"]["home"]["team"]["name"]}</div>
        <div class="col-md-4 text-center">${game["teams"]["home"]["score"]}</div>
      </div>
    </div>`
  );
  return frag;
}

var createNHLGames = function(games) {
  // TODO: Add a condition for day for no games
  // TODO: Improve this code, seems a bit messy to me
  console.log(games);
  document.getElementById('games').innerHTML = '';
  if (games.length) {
    var row = document.createElement('div');
    row.className = 'row justify-content-around';

    for (game of games) {
      if (row.childNodes.length == 3) {
        document.getElementById('games').appendChild(row);
        row = document.createElement('div');
        row.className = 'row justify-content-around';
      }
      row.appendChild(createNHLGameCard(game));
    }
    // Creates filler cards to evenly space cards out
    while (row.childNodes.length < 3) {
      var filler = document.createElement('div');
      filler.className = 'col-md-3 card invisible';
      row.appendChild(filler);
    }
    document.getElementById('games').appendChild(row);
  }
  else {
    document.getElementById("games").innerHTML = '<div class="container text-center"><p>No Games Today</p></div>'
  }
}

document.getElementById("datepicker").onchange = function() {
  let currentDate = document.getElementById("datepicker").value;
  let NHL_API = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${currentDate}&endDate=${currentDate}`;
  document.getElementById('datepicker').value = currentDate;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', NHL_API, true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.response)['dates'][0];
      if (data) {
        createNHLGames(JSON.parse(xhr.response)['dates'][0]['games']);
      } else {
        createNHLGames([]);
      }
    } else {
      console.log('Error Loading Games');
    }
  }
  xhr.send();
};

window.onload = function () {
  document.getElementById('datepicker').value = currentDate;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', NHL_API, true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.response)['dates'][0];
      if (data) {
        createNHLGames(JSON.parse(xhr.response)['dates'][0]['games']);
      } else {
        createNHLGames([]);
      }
    } else {
      console.log('Error Loading Games');
    }
  }
  xhr.send();
}