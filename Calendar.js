function load() {
  var yr = document.getElementById("year");
  var mh = document.getElementById("month");
  var currentYear = new Date().getFullYear();//从一个日期（默认为当天所在年月日）中找出年份
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
  for (var i = 1; i <= 12; i++){
    var option = document.createElement("option");
    mh.appendChild(option);
    option.value = i;
    option.text = i;
    if (i == currentMonth) {
      option.selected = true;
    }
  }
  var selectedyear = yr.value;   //所选年份
  var selectedmonth = mh.value;  //所选月份(1~12)
  var daysincurmonth = new Date(selectedyear,selectedmonth,0).getDate();
  var daysinpremonth = new Date(selectedyear,selectedmonth - 1,0).getDate();
  var startday = new Date(selectedyear,selectedmonth - 1,1).getDay();  //设置目标月第一天是星期几（0-6对应周日到周六）  
  var tag_tbody = document.getElementById("content");
  var add = 1;
  var addm = 1;
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      if (startday > 0) {
        tag_tbody.rows[i].cells[j].textContent = daysinpremonth - startday + 1;
        startday -= 1;
      }
      else if ((startday == 0)&&(add <= daysincurmonth)) {
        tag_tbody.rows[i].cells[j].textContent = add;
        add += 1;
      }
      else if ((startday == 0)&&(add > daysincurmonth)) {
         tag_tbody.rows[i].cells[j].textContent = addm;
         addm +=1
      }
    }
  }
}

 function change() {
    var yr = document.getElementById("year");
    var mh = document.getElementById("month");
    var selectedyear = yr.value;   //所选年份
    var selectedmonth = mh.value;  //所选月份
  var daysincurmonth = new Date(selectedyear,selectedmonth,0).getDate();
  var daysinpremonth = new Date(selectedyear,selectedmonth - 1,0).getDate();
    var add = 1;
    var addm = 1;
    var startday = new Date(selectedyear,selectedmonth - 1,1).getDay();  //设置目标月第一天是星期几（0-6对应周日到周六）  
    var tag_tbody = document.getElementById("content");
    for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      if (startday > 0) {
        tag_tbody.rows[i].cells[j].textContent = daysinpremonth - startday + 1;
        startday -= 1;
      }
      else if ((startday == 0)&&(add <= daysincurmonth)) {
        tag_tbody.rows[i].cells[j].textContent = add;
        add += 1;
      }
      else if ((startday == 0)&&(add > daysincurmonth)) {
         tag_tbody.rows[i].cells[j].textContent = addm;
         addm +=1
      }
    }
  }
}
