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

function change() {
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
        startDay -= 1;
      }
      else if ((startDay == 0)&&(add <= daysInCurMonth)) {
        tagTbody.rows[i].cells[j].textContent = add;
        add += 1;
      }
      else if ((startDay == 0)&&(add > daysInCurMonth)) {
         tagTbody.rows[i].cells[j].textContent = addm;
         addm +=1
      }
    }
  }
    
  ftvset();
}


function ftvset(){
  var cYear = document.getElementById("year");
  var selectedYear = cYear.value;   //所选年份
  var cMonth = document.getElementById("month");
  var selectedMonth = cMonth.value;  //所选月份(1~12)
  var tagTbody = document.getElementById("content");
  var yuandan = new Date(selectedYear,0, 1).getDay();
  var qingren = new Date(selectedYear,1, 1).getDay() + 13;
  var funv = new Date(selectedYear,2, 1).getDay() + 7;
  var zhishu = new Date(selectedYear,2, 1).getDay() + 11;
  var yuren = new Date(selectedYear,3, 1).getDay();
  var laodong = new Date(selectedYear,4, 1).getDay();
  var qingnian = new Date(selectedYear,4, 1).getDay() + 3;
  
  function setftl(month,day,chineseName) {
    var cYear = document.getElementById("year");
    var selectedYear = cYear.value;   //所选年份
    var cMonth = document.getElementById("month");
    var selectedMonth = cMonth.value;  //所选月份(1~12)
    var tagTbody = document.getElementById("content");
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
  setftl(6, 1, "儿童");
  setftl(7,1,"建党");
  setftl(8,1,"建军");
  setftl(9,10,"教师");
  setftl(10,1,"国庆");
  setftl(12,25,"圣诞");
  
  var momDayMonth = new Date(selectedYear,4, 1).getDay();
  if ((momDayMonth == 0) && (selectedMonth == 5)) {
    tagTbody.rows[3].cells[0].textContent = "母亲";
  }
  else if(selectedMonth == 5) {
    tagTbody.rows[5].cells[0].textContent = "母亲";
  }
  var dadDayMonth = new Date(selectedYear,5, 1).getDay();
  if ((dadDayMonth == 0) && (selectedMonth == 6)) {
    tagTbody.rows[5].cells[0].textContent = "父亲";
  }
  else if (selectedMonth == 6){
    tagTbody.rows[7].cells[0].textContent = "父亲";
  }

  
}
     
