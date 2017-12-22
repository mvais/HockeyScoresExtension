var selectedYear  = new Date().getFullYear();
var selectedMonth = new Date().getMonth() + 1;
var selectedDay   = new Date().getDate();
var selectedDate  = selectedYear + "-" + selectedMonth + "-" + selectedDay;

window.onload = function() {
  document.getElementById('selected-year').value  = selectedYear;
  document.getElementById('selected-month').value = selectedMonth;
  document.getElementById('selected-day').value   = selectedDay;
  loadSchedule();
}

var createNHLGame = function(game) {
  return document.createRange().createContextualFragment(
    `<div class="col-lg-4 col-sm-12 match-card">
      <div class="row match-status"><div class="col-12 text-center">${game['status']['abstractGameState']}</div></div>
      <div class="row team home-team">
          <img class="col-lg-2 col-sm-2 logo" src="assets/${fetchLogo(game['teams']['away']['team']['name'])}" alt="logo">
          <div class="col-lg-9 col-sm-8 team-name">${game['teams']['away']['team']['name']}</div>
          <div class="col-lg-1 col-sm-2 team-score text-center">${game['teams']['away']['score']}</div>
      </div>
      <div class="row team away-team">
          <img class="col-lg-2 col-sm-2 logo" src="assets/${fetchLogo(game['teams']['home']['team']['name'])}" alt="logo">
          <div class="col-lg-9 col-sm-8 team-name">${game['teams']['home']['team']['name']}</div>
          <div class="col-lg-1 col-sm-2 team-score text-center">${game['teams']['home']['score']}</div>
      </div>
    </div>`
  );
}

var createNoScheduledGames = function() {
  return document.createRange().createContextualFragment(
    `<div class="container text-center">
      <h2 class="no-match-card">No Scheduled Games</h2>
     </div>`
  );
}

var fetchLogo = function(teamName) {
  return teamName.split(" ").join('_') + ".svg";
}

var loadSchedule = function() {
  // return createNHLGames  (JSON.parse(TEST_DATA)['dates'][0]['games']);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', NHL_API, true);
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


var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var currentDate = year + "-" + month + "-" + day;
var NHL_API = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${currentDate}&endDate=${currentDate}`;

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
    gamesElt.appendChild(createNoScheduledGames());
  }
}

var fetchSVG = function(name) {
  return name.split(" ").join('_') + ".svg";
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
  loadSchedule();
}

document.getElementById('increaseYear').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-year').value);
  document.getElementById('selected-year').value = parseInt(value) + 1;
  year = value + 1;
  formatAPI(year + "-" + month + "-" + day);
  loadSchedule();
}

document.getElementById('increaseMonth').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-month').value);

  if (value == 12) {
    value = 0;
  }

  document.getElementById('selected-month').value = parseInt(value) + 1;
  month = value + 1;
  formatAPI(year + "-" + month + "-" + day);
  loadSchedule();
}

document.getElementById('decreaseMonth').onclick = function(element) {
  let value = parseInt(document.getElementById('selected-month').value);
  if (value == 1) {
    value = 13;
  }
  document.getElementById('selected-month').value = value - 1;
  month = value - 1;
  formatAPI(year + "-" + month + "-" + day);
  loadSchedule();
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
  loadSchedule();
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
  loadSchedule();
}




TEST_DATA = `
{
  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2017. All Rights Reserved.",
  "totalItems" : 15,
  "totalEvents" : 0,
  "totalGames" : 15,
  "totalMatches" : 0,
  "wait" : 10,
  "dates" : [ {
    "date" : "2017-12-23",
    "totalItems" : 15,
    "totalEvents" : 0,
    "totalGames" : 15,
    "totalMatches" : 0,
    "games" : [ {
      "gamePk" : 2017020543,
      "link" : "/api/v1/game/2017020543/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-23T18:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 13,
            "losses" : 14,
            "ot" : 7,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 17,
            "name" : "Detroit Red Wings",
            "link" : "/api/v1/teams/17"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 18,
            "losses" : 10,
            "ot" : 5,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 6,
            "name" : "Boston Bruins",
            "link" : "/api/v1/teams/6"
          }
        }
      },
      "venue" : {
        "name" : "TD Garden",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020543/content"
      }
    }, {
      "gamePk" : 2017020544,
      "link" : "/api/v1/game/2017020544/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-23T18:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 20,
            "losses" : 10,
            "ot" : 6,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 52,
            "name" : "Winnipeg Jets",
            "link" : "/api/v1/teams/52"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 18,
            "losses" : 13,
            "ot" : 4,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 2,
            "name" : "New York Islanders",
            "link" : "/api/v1/teams/2"
          }
        }
      },
      "venue" : {
        "name" : "Barclays Center",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020544/content"
      }
    }, {
      "gamePk" : 2017020552,
      "link" : "/api/v1/game/2017020552/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T00:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 15,
            "losses" : 15,
            "ot" : 4,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 8,
            "name" : "Montréal Canadiens",
            "link" : "/api/v1/teams/8"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 16,
            "losses" : 17,
            "ot" : 2,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 22,
            "name" : "Edmonton Oilers",
            "link" : "/api/v1/teams/22"
          }
        }
      },
      "venue" : {
        "name" : "Rogers Place",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020552/content"
      }
    }, {
      "gamePk" : 2017020545,
      "link" : "/api/v1/game/2017020545/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T00:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 18,
            "losses" : 13,
            "ot" : 3,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 30,
            "name" : "Minnesota Wild",
            "link" : "/api/v1/teams/30"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 25,
            "losses" : 7,
            "ot" : 2,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 14,
            "name" : "Tampa Bay Lightning",
            "link" : "/api/v1/teams/14"
          }
        }
      },
      "venue" : {
        "name" : "Amalie Arena",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020545/content"
      }
    }, {
      "gamePk" : 2017020546,
      "link" : "/api/v1/game/2017020546/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T00:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 11,
            "losses" : 14,
            "ot" : 8,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 9,
            "name" : "Ottawa Senators",
            "link" : "/api/v1/teams/9"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 13,
            "losses" : 16,
            "ot" : 5,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 13,
            "name" : "Florida Panthers",
            "link" : "/api/v1/teams/13"
          }
        }
      },
      "venue" : {
        "name" : "BB&T Center",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020546/content"
      }
    }, {
      "gamePk" : 2017020547,
      "link" : "/api/v1/game/2017020547/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T00:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 17,
            "losses" : 12,
            "ot" : 5,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 16,
            "name" : "Chicago Blackhawks",
            "link" : "/api/v1/teams/16"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 20,
            "losses" : 9,
            "ot" : 5,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 1,
            "name" : "New Jersey Devils",
            "link" : "/api/v1/teams/1"
          }
        }
      },
      "venue" : {
        "name" : "Prudential Center",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020547/content"
      }
    }, {
      "gamePk" : 2017020548,
      "link" : "/api/v1/game/2017020548/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T00:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 21,
            "losses" : 14,
            "ot" : 1,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 10,
            "name" : "Toronto Maple Leafs",
            "link" : "/api/v1/teams/10"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 19,
            "losses" : 12,
            "ot" : 4,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 3,
            "name" : "New York Rangers",
            "link" : "/api/v1/teams/3"
          }
        }
      },
      "venue" : {
        "name" : "Madison Square Garden",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020548/content"
      }
    }, {
      "gamePk" : 2017020549,
      "link" : "/api/v1/game/2017020549/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T00:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 15,
            "losses" : 13,
            "ot" : 8,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 24,
            "name" : "Anaheim Ducks",
            "link" : "/api/v1/teams/24"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 18,
            "losses" : 15,
            "ot" : 3,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 5,
            "name" : "Pittsburgh Penguins",
            "link" : "/api/v1/teams/5"
          }
        }
      },
      "venue" : {
        "name" : "PPG Paints Arena",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020549/content"
      }
    }, {
      "gamePk" : 2017020550,
      "link" : "/api/v1/game/2017020550/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T00:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 8,
            "losses" : 19,
            "ot" : 7,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 7,
            "name" : "Buffalo Sabres",
            "link" : "/api/v1/teams/7"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 15,
            "losses" : 12,
            "ot" : 7,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 12,
            "name" : "Carolina Hurricanes",
            "link" : "/api/v1/teams/12"
          }
        }
      },
      "venue" : {
        "name" : "PNC Arena",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020550/content"
      }
    }, {
      "gamePk" : 2017020551,
      "link" : "/api/v1/game/2017020551/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T00:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 15,
            "losses" : 12,
            "ot" : 7,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 4,
            "name" : "Philadelphia Flyers",
            "link" : "/api/v1/teams/4"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 21,
            "losses" : 13,
            "ot" : 2,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 29,
            "name" : "Columbus Blue Jackets",
            "link" : "/api/v1/teams/29"
          }
        }
      },
      "venue" : {
        "name" : "Nationwide Arena",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020551/content"
      }
    }, {
      "gamePk" : 2017020555,
      "link" : "/api/v1/game/2017020555/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T01:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 22,
            "losses" : 12,
            "ot" : 1,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 15,
            "name" : "Washington Capitals",
            "link" : "/api/v1/teams/15"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 22,
            "losses" : 9,
            "ot" : 2,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 54,
            "name" : "Vegas Golden Knights",
            "link" : "/api/v1/teams/54"
          }
        }
      },
      "venue" : {
        "name" : "T-Mobile Arena",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020555/content"
      }
    }, {
      "gamePk" : 2017020554,
      "link" : "/api/v1/game/2017020554/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T01:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 16,
            "losses" : 15,
            "ot" : 3,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 21,
            "name" : "Colorado Avalanche",
            "link" : "/api/v1/teams/21"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 7,
            "losses" : 24,
            "ot" : 5,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 53,
            "name" : "Arizona Coyotes",
            "link" : "/api/v1/teams/53"
          }
        }
      },
      "venue" : {
        "name" : "Gila River Arena",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020554/content"
      }
    }, {
      "gamePk" : 2017020553,
      "link" : "/api/v1/game/2017020553/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T01:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 21,
            "losses" : 9,
            "ot" : 4,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 18,
            "name" : "Nashville Predators",
            "link" : "/api/v1/teams/18"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 19,
            "losses" : 14,
            "ot" : 3,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 25,
            "name" : "Dallas Stars",
            "link" : "/api/v1/teams/25"
          }
        }
      },
      "venue" : {
        "name" : "American Airlines Center",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020553/content"
      }
    }, {
      "gamePk" : 2017020556,
      "link" : "/api/v1/game/2017020556/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T03:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 22,
            "losses" : 13,
            "ot" : 2,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 19,
            "name" : "St. Louis Blues",
            "link" : "/api/v1/teams/19"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 15,
            "losses" : 16,
            "ot" : 5,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 23,
            "name" : "Vancouver Canucks",
            "link" : "/api/v1/teams/23"
          }
        }
      },
      "venue" : {
        "name" : "Rogers Arena",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020556/content"
      }
    }, {
      "gamePk" : 2017020557,
      "link" : "/api/v1/game/2017020557/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2017-12-24T03:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 22,
            "losses" : 10,
            "ot" : 4,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 26,
            "name" : "Los Angeles Kings",
            "link" : "/api/v1/teams/26"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 18,
            "losses" : 11,
            "ot" : 4,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 28,
            "name" : "San Jose Sharks",
            "link" : "/api/v1/teams/28"
          }
        }
      },
      "venue" : {
        "name" : "SAP Center at San Jose",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020557/content"
      }
    } ],
    "events" : [ ],
    "matches" : [ ]
  } ]
}
`