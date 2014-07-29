function load() {
  var currentYear = new Date().getFullYear();//从一个日期（默认为当天所在年月日）中找出年份
  var yr = document.getElementById("year");
  for (var i = 1970; i < 2050; i++){
    var option = document.createElement("option");
    yr.appendChild(option);
    option.value = i;
    option.text = i;
    if (i == currentYear) {
      option.selected = true;
    }
  }
  var currentMonth = new Date().getMonth() + 1;//从一个日期（默认为当天所在年月日）中找出月份
  var mh = document.getElementById("month");
  for (var i = 1; i <= 12; i++){
    var option = document.createElement("option");
    mh.appendChild(option);
    option.value = i;
    option.text = i;
    if (i == currentMonth) {
      option.selected = true;
    }
  }
  var syear = yr.value;   //所选年份
  var smonth = mh.value;  //所选月份
  var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31);   //每个月的天数
  function getdays(smonth,syear) {    //判断并调整2月份天数
    if ((smonth == 2) && ((syear % 4 == 0) && (syear % 100 != 0) || (syear % 400 == 0))) {
      return 29;
    }
    else return daysInMonth[smonth - 1];
  }
  var days = getdays(smonth,syear);          //选中的当月有多少天
  var pdays = getdays(smonth - 1,syear);         //dyas in the previous month
  var add = 1;
  var setday = new Date(syear,smonth - 1,1).getDay();  //设置目标年月第一天在星期几（0-6对应周日到周六）
  var tag_tbody = document.getElementById("content");
  for (var i = 0; i <= 6; i++) {
    for (var j = 0; j < 7; j++) {
      if (setday > 0) {
        tag_tbody.rows[i].cells[j].textContent = pdays - setday + 1;
        setday -= 1;
      }
      else if ((setday == 0)&&(add <= days)) {
        tag_tbody.rows[i].cells[j].textContent = add;
        add += 1;
         var getj = j;   //get the last j in the current month setting
         var geti = i;   //get the last i in the current month setting 
      }
    }
  }
  for (var addn = 1; addn < 7 - getj; addn += 1) {
    tag_tbody.rows[geti].cells[getj + addn].textContent = addn;
  }
}

function change() {
  
  var yr = document.getElementById("year");
  var syear = yr.value;   //所选年份
  var mh = document.getElementById("month");
  var smonth = mh.value;  //所选月份
  var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31);   //每个月的天数
  function getdays(smonth,syear) {
    if ((smonth == 2) && ((syear % 4 == 0) && (syear % 100 != 0) || (syear % 400 == 0))) {
      return 29;
    }
    else if (smonth == 0) {
      return getdays(12,syear - 1);
    }
    else return daysInMonth[smonth - 1];
  }
  var days = getdays (smonth,syear);          //选中的当月有多少天
  var pdays = getdays(smonth - 1,syear);         //dyas in the previous month
  var add = 1;
  var setday = new Date(syear,smonth - 1,1).getDay();  //设置目标年月第一天在星期几（0-6对应周日到周六）  
  var tag_tbody = document.getElementById("content");
  for (var m = 0; m <= 6; m++) {
    tag_tbody.rows[5].cells[m].textContent = "";
  } 
  for (var i = 0; i <= 6; i++) {
    for (var j = 0; j < 7; j++) {
      if (setday > 0) {
        tag_tbody.rows[i].cells[j].textContent = pdays - setday + 1;
        setday -= 1;
      }
      else if ((setday == 0)&&(add <= days)) {
        tag_tbody.rows[i].cells[j].textContent = add;
        add += 1;
        var getjj = j;   //get the last j in the current month setting
        var getii = i;   //get the last i in the current month setting
      }
    }
  }
    for (var addn = 1; addn < 7 - getjj; addn += 1) {
     tag_tbody.rows[getii].cells[getjj + addn].textContent = addn;
    }
}
