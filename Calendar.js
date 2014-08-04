function load() {
  var cYear = document.getElementById("year");
  var cMonth = document.getElementById("month");
  var currentYear = new Date().getFullYear();//从一个日期（默认为当天所在年月日）中找出年份
  for (var i = 1970; i < 2050; i++){
    var option = document.createElement("option");
    cYear.appendChild(option);
    option.value = i;
    option.text = i;
    if (i == currentYear) {
      option.selected = true;
    }
  }
  var currentMonth = new Date().getMonth() + 1;//从一个日期（默认为当天所在年月日）中找出月份
  for (var i = 1; i <= 12; i++){
    var option = document.createElement("option");
    cMonth.appendChild(option);
    option.value = i;
    option.text = i;
    if (i == currentMonth) {
      option.selected = true;
    }
  }
  change();
}
function reSetCal() {
  var cYear = document.getElementById("year");
  var cMonth = document.getElementById("month");
  cYear.value = new Date().getFullYear();
  cMonth.value = new Date().getMonth() + 1;
  change();
}

var gConverter = new CalendarConverter;

var gSolarFestivals = {
  "1-1": "元旦",
  "2-14": "情人",
  "3-8": "妇女",
  "3-12": "植树",
  "4-1": "愚人",
  "5-1": "劳动",
  "5-4": "青年",
  "6-1": "儿童",
  "7-1": "建党",
  "8-1": "建军",
  "9-10": "教师",
  "10-1": "国庆",
  "12-25": "圣诞"
};

function showFestivalOrLunar(solarDate) {
  var month = solarDate.getMonth() + 1;
  var day = solarDate.getDate();
  var key = month + '-' + day;
  if (gSolarFestivals[key]) {
    return gSolarFestivals[key];
  }

  var result = gConverter.solar2lunar(solarDate);
  if (result.lunarFestival) {
    return result.lunarFestival;
  }
  else if (result.solarTerms) {
    return result.solarTerms;
  }
  else {
    return result.lunarDay;
  }
}

function change() {
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth() + 1;
  var currentDay = new Date().getDate();
  var cYear = document.getElementById("year");
  var cMonth = document.getElementById("month");
  var selectedYear = cYear.value;   //所选年份
  var selectedMonth = cMonth.value;  //所选月份(1~12)
  var daysInCurMonth = new Date(selectedYear,selectedMonth,0).getDate();
  var daysInPreMonth = new Date(selectedYear,selectedMonth - 1,0).getDate();
  
  // 该月1日的星期数
  var startDay = new Date(selectedYear,selectedMonth - 1, 1).getDay();
  
  // 日历第一天的Date对象值
  var date = new Date(selectedYear,selectedMonth - 1, 1 - startDay);
  var tagTbody = document.getElementById("content");
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      // 公历的day in month.
      var day = date.getDate();
      var lunar = showFestivalOrLunar(date);
      var isToday = date.getFullYear() == currentYear &&
                    date.getMonth() == currentMonth &&
                    day == currentDay;
      var cell = tagTbody.rows[row].cells[col];
      cell.style.backgroundColor = isToday ? '#F9F9F9' : 'white';
      cell.innerHTML = day +  '<br/>' + lunar;
      date.setDate(day + 1);
    }
  }
}




