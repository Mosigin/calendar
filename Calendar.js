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
  var startDay = new Date(selectedYear,selectedMonth - 1, 1).getDay();
  //设置目标月第一天是星期几（0-6对应周日到周六）  
  var tagTbody = document.getElementById("content");
  var add = 1;
  var addm = 1;
  for (var i = 0; i < 11; i += 2) {
    for (var j = 0; j < 7; j++) {
      if (startDay > 0) {
        tagTbody.rows[i].cells[j].textContent = daysInPreMonth - startDay + 1;
        tagTbody.rows[i].cells[j].style.backgroundColor = 'white';
        startDay -= 1;
      }
      else if ((startDay == 0)&&(add <= daysInCurMonth) && (selectedMonth == currentMonth) && (add == currentDay)) {
        tagTbody.rows[i].cells[j].style.backgroundColor = '#F9F9F9';
        tagTbody.rows[i].cells[j].textContent = add;
        add += 1;
      }
      else if ((startDay == 0)&&(add <= daysInCurMonth)) {
        tagTbody.rows[i].cells[j].textContent = add;
        tagTbody.rows[i].cells[j].style.backgroundColor = 'white';
        add += 1;
      }
      else if ((startDay == 0)&&(add > daysInCurMonth)) {
         tagTbody.rows[i].cells[j].textContent = addm;
         tagTbody.rows[i].cells[j].style.backgroundColor = 'white';
         addm +=1
      }
    }
  }
  
  var tagTbody = document.getElementById("content");
  var startDay = new Date(selectedYear,selectedMonth - 1, 1).getDay();
  var daysInPreMonth = new Date(selectedYear,selectedMonth - 1,0).getDate();
  var daysInCurMonth = new Date(selectedYear,selectedMonth,0).getDate();
  var add = 1;
  var addm = 1;
  var cc  =new CalendarConverter;
  
  for (var i = 1; i < 12; i += 2) {
    for (var j = 0; j < 7; j++) {
      var result1 = cc.solar2lunar(new Date(selectedYear, selectedMonth - 2, daysInPreMonth - startDay + 1 ));
      var result2 = cc.solar2lunar(new Date(selectedYear, selectedMonth - 1, add ));
      var result3 = cc.solar2lunar(new Date(selectedYear, selectedMonth , addm));
      
      if ((startDay > 0) && (result1.lunarFestival == '') && (result1.solarTerms == '')) {
        tagTbody.rows[i].cells[j].textContent = result1.lunarDay ;
        startDay -= 1;
      }
      else if ((startDay > 0) &&(result1.lunarFestival == '') && (result1.solarTerms != '') ){
        tagTbody.rows[i].cells[j].textContent = result1.solarTerms;
        startDay -= 1;
      }
      else if ((startDay > 0) && (result1.lunarFestival != '') ){
        tagTbody.rows[i].cells[j].textContent = result1.lunarFestival;
        startDay -= 1;
      }
      else if ((startDay == 0)&&(add <= daysInCurMonth) && (result2.lunarFestival == '') && (result2.solarTerms == '')) {
        tagTbody.rows[i].cells[j].textContent = result2.lunarDay;
        add += 1;
      }
      else if ((startDay == 0)&&(add <= daysInCurMonth) && (result2.lunarFestival == '') && (result2.solarTerms != ''))  {
        tagTbody.rows[i].cells[j].textContent = result2.solarTerms;
        add += 1;
      }
      else if ((startDay == 0)&&(add <= daysInCurMonth) && (result2.lunarFestival != '')) {
        tagTbody.rows[i].cells[j].textContent = result2.lunarFestival;
        add += 1;
      }
      else if ((startDay == 0)&&(add > daysInCurMonth) && (result3.lunarFestival == '') && (result3.solarTerms == '')) {
         tagTbody.rows[i].cells[j].textContent = result3.lunarDay;
         addm +=1
      }
      else if ((startDay == 0)&&(add > daysInCurMonth) && (result3.lunarFestival == '') && (result3.solarTerms != '')) {
        tagTbody.rows[i].cells[j].textContent = result3.solarTerms;
         addm +=1
      }
      else if ((startDay == 0)&&(add > daysInCurMonth) && (result3.lunarFestival != '')) {
         tagTbody.rows[i].cells[j].textContent = result3.lunarFestival;
         addm +=1
      }
    }
  }
  solarftvset();
}


function solarftvset(){
  var cYear = document.getElementById("year");
  var selectedYear = cYear.value;   //所选年份
  var cMonth = document.getElementById("month");
  var selectedMonth = cMonth.value;  //所选月份(1~12)
  var tagTbody = document.getElementById("content");
  function setftl(month,day,chineseName) {
    var tagTbody = document.getElementById("content");
    var cYear = document.getElementById("year");
    var selectedYear = cYear.value;   //所选年份
    var cMonth = document.getElementById("month");
    var selectedMonth = cMonth.value;  //所选月份(1~12)
    var setl = new Date(selectedYear,month - 1, 1).getDay() + day - 1;
    if (selectedMonth == month) {
      var setr = 1;
      for (;setl>6;setl -= 7) {
        setr +=2;
      }
    tagTbody.rows[setr].cells[setl].textContent = chineseName;
    }
  }
  setftl(1,1,"元旦");
  setftl(2, 14, "情人");
  setftl(3,8,"妇女");
  setftl(3,12,"植树");
  setftl(4,1,"愚人");
  setftl(5,1,"劳动");
  setftl(5,4,"青年");
  setftl(6, 1,"儿童");
  setftl(7,1,"建党");
  setftl(8,1,"建军");
  setftl(9,10,"教师");
  setftl(10,1,"国庆");
  setftl(12,25,"圣诞");
}



