Date.prototype.addHours= function(value){
    var hours = Number.parseFloat(value)
    this.setHours(this.getHours() + hours);
    return this;
}

function gmtChange(self, inline){
  var value = self.value;
  var time_elements = document.querySelectorAll(' div[talk_time_utc]');
  var i;
  for (i=0; i < time_elements.length; i++){
    var item = time_elements[i];
    var start_datetime = (new Date(item.getAttribute(`talk_time_utc`))).addHours(value);
    var duration = Number.parseFloat(item.getAttribute('duration'));
    var end_datetime = new Date(start_datetime).addHours(duration);
    var s_yy = start_datetime.getUTCFullYear();
    var s_mm = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].at(start_datetime.getUTCMonth());
    var s_date = start_datetime.getUTCDate();
    var s_day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].at(start_datetime.getUTCDay());
    var date = `${s_day} ${s_mm} ${s_date} ${s_yy}`;
    var s_hh = start_datetime.getUTCHours().toString().padStart(2,0);
    var s_mm = start_datetime.getUTCMinutes().toString().padStart(2,0);
    var e_hh = end_datetime.getUTCHours().toString().padStart(2,0);
    var e_mm = end_datetime.getUTCMinutes().toString().padStart(2,0);
    item.innerHTML = inline  ? `<p>&#128467; ${date} &nbsp &nbsp &#128337; ${s_hh}:${s_mm} - ${e_hh}:${e_mm}</p>`
                             : `<p>&#128467; ${date}</p><p>&#128337; ${s_hh}:${s_mm} - ${e_hh}:${e_mm}</p>`;
  }

  sessionStorage.setItem("timezone", value);
}

function setupTalkTimes(inline=false){
  var tz_offcet = (-1)*(new Date()).getTimezoneOffset()/60;
  var tz_selector = document.getElementById('timezone-offset');
  if (sessionStorage.getItem("timezone")){
    tz_selector.value = sessionStorage.getItem("timezone");
  }
  else {
    var tz_options = tz_selector.children;
    var i;
    for (i=0; i < tz_options.length; i++){
      var tz_option = tz_options[i];
      if (Number.parseFloat(tz_option.value) == tz_offcet){
        tz_selector.value = tz_option.value;
        break;
      }
    }
  }

  gmtChange(tz_selector, inline);
}
