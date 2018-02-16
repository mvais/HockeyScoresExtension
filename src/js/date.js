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