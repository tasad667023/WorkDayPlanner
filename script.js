var standardWorkDay = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
  };

  $(document).ready(function(){
    if(!localStorage.getItem('standardWorkDay')) {
      dailyTasks(standardWorkDay);
    } else {
      dailyTasks(JSON.parse(localStorage.getItem('standardWorkDay')));
    }
  })

  var counter = 1;
for(const property in standardWorkDay) {
  var taskTest = "#task-test" + counter;
  $(taskTest).text(standardWorkDay[property]);
  var timeId = "#time" + counter;
  var presentHour = moment().hour();
  var timeString = $(timeId).text();
  var timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < presentHour) {
    $(textEntry).addClass("past-hour");
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future-hour");
  } else {
    $(textEntry).addClass("present-hour");
  }
  counter ++;
}

$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveScheduleTasks(hourString, value);
  });

  function hourNumberFromHourString(hourString) {
    switch(hourString) {
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }

  function loadData() {
    result = localStorage.getItem('standardWorkDay')
    return (result ? result : standardWorkDay);
  }
  
  function startLocalStorage() {
    localStorage.setItem('standardWorkDay', JSON.stringify(standardWorkDay));
  };
  
  function saveTaskToLocalStorage(dayObject) {
    localStorage.setItem('standardWorkDay', JSON.stringify(dayObject));
  }
  
  function saveSchedule(hourString, val) {
    if(!localStorage.getItem('standardWorkDay')) {
        startLocalStorage();
    }
  
    var workingHours = JSON.parse(localStorage.getItem('standardWorkDay'));
    workingHours[hourString] = val
  
    saveTaskToLocalStorage(workingHours);
  }
  
  function dailyTasks(dayObj) {
    $(".calendar-row").each(function(index) {
      var res = $(this).children("div");
      $(this).children("textarea").text(dayObj[res.text()]);
    })
  }