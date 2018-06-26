function leavingTime(college) { //finds the amount of time before the next bus leaves
                                //from the selected college
    
    
    var i, nextLeavingTime, tag, date, day;
    var nextTime, currentTime;
    var arrNextTime, topSentence;
    var found;

    
    
    //create the tag to search table times by
    tag = getTag(college);
    
    //get the times relevant to the tag
    arrNextTime = document.getElementsByClassName(tag);
    
    //get the current time (in military time)
    currentTime = getTime();
    
    //get the amount of time until the next bus leaves, stored in var found
    found = findNextTime(arrNextTime, currentTime);
    
    
    //push the amount of time until the next bus leaves to the page
    nextLeavingTime = document.getElementsByClassName("nextLeavingTime"); 
    topSentence = document.getElementsByClassName("topNext");
    for(i = 0; i < nextLeavingTime.length; i++) {
        if(parseInt(found) == 0) { //the bus is leaving now
            nextLeavingTime[i].innerHTML = "now";
            topSentence[i].innerHTML = "The next bus is leaving";
        }
        else {
            nextLeavingTime[i].innerHTML = found;
             topSentence[i].innerHTML = "The next bus is leaving in";
        }
    }     
    
}

function findNextTime(array, now) {
    var i, nextTime, found;
    
    for(i = 0; i < array.length; i++) {
        nextTime = convertTime12to24(array[i].innerHTML);
        if(compareTimes(nextTime, now) > 0) { //if the next time is greater than the                                                     //current time
            //mark the next time to leave
            //for css purposes
            array[i].id = "nextToLeave";
            found = subtractTimes(nextTime, now);
               
            return found;
        }
        //get rid of mark next to leave
        array[i].id.replace(" nextToLeave", "");
    } 
}

function compareTimes(later, now) { //checks if one time occurs after another
                                    //returns a 1 if the "later" time is later than "now" time
                                    //returns a 0 if not
    
    //get rid of the colon so you can operate as ints 
    let [laterHours, laterMinutes] = later.split(':');
    let [nowHours, nowMinutes] = now.split(':');
    
    var found;
    
    
    if(((parseInt(laterHours) >= 0 && parseInt(laterHours) <= 2) && (parseInt(nowHours) >= 12))) {
        found = 1;
    }
    else {
        if((parseInt(laterHours) == parseInt(nowHours)) && (parseInt(laterMinutes) >= parseInt(nowMinutes))) {
            return 1;
        }
        else if(parseInt(laterHours) > parseInt(nowHours)) {
            return 1;
        }
        else {
            found = 0;
        }
    }
    
    return found;
      
}

function subtractTimes(later, now) { //finds the difference in time between later and now (later -                                       //now)
    var difference, hours, minutes;
    
    //get rid of the colon so you can operate as ints 
    let [laterHours, laterMinutes] = later.split(':');
    let [nowHours, nowMinutes] = now.split(':');
    
    //check for AM difference -- wraparaound needed?
    if((laterHours <= 11) && (nowHours >= 12)) { //is later AM and now PM?
        hours = (laterHours - nowHours) + 24;
    }
    else {
        hours = laterHours - nowHours;
    }
    minutes = laterMinutes - nowMinutes;
    
    
    if(minutes < 0) {          //wraparound needed for minutes
                               //example: 22:30 - 21:50
                               //should be 40 minutes, not 1 hour and -20 minutes
        hours = hours * 60;
        minutes = hours + minutes;
        hours = 0;
        if(minutes > 60) {
            while(minutes > 60) {
                minutes -= 60;
                hours++;
            }
        }
    }
    
    
    if(hours == 0) {
        return minutes + " minutes";
    }
    else {    
        return hours + " hours and " + minutes + " minutes";
    }
    
}


//source: https://stackoverflow.com/questions/15083548/convert-12-hour-hhmm-am-pm-to-24-hour-hhmm
function convertTime12to24(time12h) { //convert to military time
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (modifier === 'PM' && hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  

  return hours + ':' + minutes;
}



function getTag(str) { //returns the searchable tag
    var tag, date, day;
    
    tag = str.substr(0,1); //either a B or an H
    date = new Date();
    day = date.getDay();
    return tag +  day;
}


function getTime() { //returns the current hours and minutes, in military time
    var date, hour, minute;
    
    date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
  
    
    if(minute < '10') {
        minute = '0' + minute;
    }
    
    return hour + ":" + minute;
}


// source: https://www.w3schools.com/howto/howto_js_tabs.asp
function openCollege(nm, collegeName, college) {
        // Declare all variables
        var i, tabContent, tablinks;
        var returnButton;
    
        leavingTime(college);
     

        // Get all elements with class="tabcontent" and hide them
        tabContent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinksCollege");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(collegeName).style.display = "block";
        nm.currentTarget.className += " active";
}


    function openSchedule(dy, dySchedule, college) {
        // Declare all variables
        var i, tabContent, tablinks;
    
        leavingTime(college);

        // Get all elements with class="tabcontent" and hide them
        tabContent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(dySchedule).style.display = "block";
        dy.currentTarget.className += " active";
    }
    

// THE ALARM FUNCTIONALITIES -------------------------------------------------------------------
	var customAlarms = [];
	var fromMain = 0;
	var custom = 0;

    function setAlarm(college, day, time) {
        //source: https://www.w3schools.com/jsref/prop_win_sessionstorage.asp
		var presetTime = sessionStorage.getItem("presetTime");
        if(presetTime != undefined) {
            //source: https://www.w3schools.com/jsref/met_win_confirm.asp
			var okOrCancel = confirm("Set an alarm " + presetTime + " minutes before the bus leaving from " + college + " on " + day + " at " + time + "?");
		} else {
			var okOrCancel = confirm("Set an alarm leaving from " + college + " on " + day + " at " + time + "?");
		}
        
        if(okOrCancel == 0) { //they clicked cancel, so cancel changing the page to the alarms page
            var cancel = document.getElementById("setAlarm");
            cancel.onclick = event.preventDefault();            
        }
        else {
            sessionStorage.setItem("time", convertTime12to24(time));
			sessionStorage.setItem("college", college);
			sessionStorage.setItem("day", day);
			custom = 0;
			fromMain = 1;


			sessionStorage.setItem("needToSaveTime", 1);
        }   

    }

function forInterval(){
	var i = 0;
	var length = customAlarms.length;
	while(i<length){
		setToHappen(customAlarms[i]);
		i = i+1;
	}
}
				 
//https://stackoverflow.com/questions/11936816/call-a-function-after-complete-page-load?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa




    function setPresetAlarm() {
        var presetTime = sessionStorage.getItem("presetTime");
        if(presetTime != undefined) {
            findTimeForAlarm();
		}
    }

    var count = 0; //the number of alarms that have been set

    function findTimeForAlarm() { 
        var busTime = sessionStorage.getItem("time");
        
        var presetTime = sessionStorage.getItem("presetTime");
		var presetAlarm = addTimes(busTime, presetTime);
        sessionStorage.setItem("presetAlarm", presetAlarm);
		var presetTimeBool = sessionStorage.setItem("presetTimeBool", 1);
    }



    function addTimes(time1, time2) { //add time1 to time2
        //convert time1 to military time
        time1 = convertTime12to24(time1);
        
        //separate the minutes from the hours from time1
        var parse = time1.split(":");
        var hours = parse[0];
        var minutes = parse[1];
        
        
        //see if the preset is only for minutes
        if(time2 < 60) {
            if(parseInt(minutes) - parseInt(time2) == 0) { //an hour must be added to time1
                hours = parseInt(hours) - 1;
                if(parseInt(hours) == 24) {
                    hours = 0;
                }
				if(parseInt(minutes) < 10){
					minutes = "0" + minutes;
				}

                return hours + ":" + minutes;
            }
            if(parseInt(minutes) - parseInt(time2) < 0) { //an hour and change must be added to time1
                hours = parseInt(hours) - 1;
                if(parseInt(hours) == 24) {
                    hours = 0;
                }
                minutes = (parseInt(minutes) - parseInt(time2)) + 60;
				if(parseInt(minutes) < 10){
					minutes = "0" + minutes;
				}

                return hours + ":" + minutes;
            }
            else { //only the minutes must be changed
                minutes = parseInt(minutes) - parseInt(time2);
				if(parseInt(minutes) < 10){
					minutes = "0" + minutes;
				}

                return hours + ":" + minutes;
            }
        }
        else if(parseInt(time2) == 60) { //an hour must be added to time1
            hours = parseInt(hours) - 1;
            if(parseInt(hours) == 24) {
                    hours = 0;
                }
			if(parseInt(minutes) < 10){
					minutes = "0" + minutes;
				}

            return hours + ":" + minutes;
        }
        else if(parseInt(time2) == 120) { //2 hours must be added to time1
            hours = parseInt(hours) - 2;
            if(parseInt(hours) == 24) {
                    hours = 0;
            }
			if(parseInt(minutes) < 10){
				minutes = "0" + minutes;
			}

            return hours + ":" + minutes;
        }
        else {
            alert("ERROR: INVALID PRESET VALUE");
            return -1;
        }
    }
    
  
//THE PRESET ALARM BUTTONS ------------------------------------------------------------
	function fiveminute(college, day, time) {
        sessionStorage.setItem("presetTime", 5);
    }

	function tenminute() {
        sessionStorage.setItem("presetTime", 10);
    }

	function fifteenminute() {
        sessionStorage.setItem("presetTime", 15);
    }

	function thirtyminute() {
        sessionStorage.setItem("presetTime", 30);
    }

	function hour() {
        sessionStorage.setItem("presetTime", 60);
    }

	function twohours() {       
        sessionStorage.setItem("presetTime", 120);
    }


document.addEventListener('DOMContentLoaded', function() { //does an alarm need to go off?
		setPresetAlarm();
		sessionStorage.getItem("needToSaveTime");
		if(sessionStorage.getItem("needToSaveTime") == 1){
			saveTime();
		}
		sessionStorage.getItem("presetTimeBool");
		if(sessionStorage.getItem("presetTimeBool") == 1){
			saveTime();
		}
		setInterval(function(){ 
			forInterval();
			 }, 10000);
}, false);



// https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript

function saveTime(){ //put the alarm in My Alarms section

	if(custom == 1){
		var collegeSelection = document.getElementById("collegeSelection");
		var whichCollege = collegeSelection.options[collegeSelection.selectedIndex].value;
		var weekday = document.getElementById("weekday");
		var whichWeekday = weekday.options[weekday.selectedIndex].text;
		var times = document.getElementById("alarmtime");
		var whatTime = times.value;
		custom = 0;
	}
	if(sessionStorage.getItem("needToSaveTime") == 1){
		var whatTime = sessionStorage.getItem("time");
		var whichWeekday = sessionStorage.getItem("day");
		var whichCollege = sessionStorage.getItem("college");
		sessionStorage.setItem("needToSaveTime", 0);
	}
	if(sessionStorage.getItem("presetTimeBool") == 1){
		var whatTime = sessionStorage.getItem("presetAlarm");
		var whichWeekday = sessionStorage.getItem("day");
		var whichCollege = sessionStorage.getItem("college");
		sessionStorage.setItem("presetTimeBool", 0);
	}

	
	if(whichCollege == "Bryn Mawr"){
		if(whichWeekday == "Monday"){
			var target = document.getElementById("BMCMonCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Tuesday"){
			var target = document.getElementById("BMCTuesCustom");
			target.innerText += whatTime + "\n";
		} 
		if(whichWeekday == "Wednesday"){
			var target = document.getElementById("BMCWedCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Thursday"){
			var target = document.getElementById("BMCThursCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Friday"){
			var target = document.getElementById("BMCFriCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Saturday"){
			var target = document.getElementById("BMCSatCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Saturday Night"){
			var target = document.getElementById("BMCSatNightCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Sunday"){
			var target = document.getElementById("BMCSunCustom");
			target.innerText += whatTime + "\n";
		}
	}
	if(whichCollege == "Haverford"){

		if(whichWeekday == "Monday"){
			var target = document.getElementById("HCMonCustom");
			target.innerText += whatTime + "\n";

		}
		if(whichWeekday == "Tuesday"){
			var target = document.getElementById("HCTuesCustom");
			target.innerText += whatTime + "\n";
		} 
		if(whichWeekday == "Wednesday"){
			var target = document.getElementById("HCWedCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Thursday"){
			var target = document.getElementById("HCThursCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Friday"){
			var target = document.getElementById("HCFriCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Saturday"){
			var target = document.getElementById("HCSatCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Saturday Night"){
			var target = document.getElementById("HCSatNightCustom");
			target.innerText += whatTime + "\n";
		}
		if(whichWeekday == "Sunday"){
			var target = document.getElementById("HCSunCustom");
			target.innerText += whatTime + "\n";
		}
	}
	customAlarms.push(whatTime);
}



function customSaveTime(){
		var collegeSelection = document.getElementById("collegeSelection");
		var whichCollege = collegeSelection.options[collegeSelection.selectedIndex].value;
		var weekday = document.getElementById("weekday");
		var whichWeekday = weekday.options[weekday.selectedIndex].text;
		var times = document.getElementById("alarmtime");
		var whatTime = times.value;

	var didyoudoit;
	didyoudoit = document.getElementById("didyoudoitdiv");
	didyoudoit.innerText = "You submitted a new custom alarm for the bus at " + whichCollege.toUpperCase() + " on " + whichWeekday.toUpperCase() + " at " +whatTime.toUpperCase() + ".";
	setTimeout(function() {
  		didyoudoit.innerText = "";
	}, 3000);

	custom = 1;
	saveTime();

}


var d =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Saturday Night"][(new Date()).getDay()]
$("select").val(d);


// https://stackoverflow.com/questions/780995/settimeout-but-for-a-given-time
// https://stackoverflow.com/questions/41597213/comparing-current-time-with-input-time-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

function setToHappen(userTime){ //make the alarm actually go off
	var weekday = document.getElementById("weekday");
	var whichWeekday = weekday.options[weekday.selectedIndex].value;
	var date = new Date();
	var m = date.getMinutes();
	var h = date.getHours();
	if(h == '0') {h = 24;}


	var currentTime = h+"."+m;  
	console.log(currentTime);

		// get input time
		var time = userTime.split(":");
		var hour = time[0];
		if(hour == '00') {hour = 24}
		var min = time[1];
		if(min<10){min = min/1;}


		var inputTime = hour+"."+min;
		console.log(inputTime);

		if(date.getDay() == whichWeekday){
			if(currentTime == inputTime){
				var audio = new Audio('beep.mp3');
				audio.play(); 
				alert("One of your blue bus alarms is going off!");

			}
		

	}
	
}

function help(){ //help instructions
	alert("To view buses leaving from Bryn Mawr, click on the tab reading 'Buses from Bryn Mawr'. To view buses leaving from Haverford, click on the tab reading 'Buses from Haverford'. Once you are within a tab, blubus will tell you when the soonest bus is leaving from your college of choice. If you'd like to see the full schedule on a certain day, click on a weekday within the college of your choice. Blubus will then allow you to see which buses are leaving from that college on that day and set alarms based off of those buses' leaving times and your pre-set alarm settings. To adjust your preset alarm settings, click on the button reading 'Preset Alarm Settings'. To set a customized alarm rather than set an alarm based off a blue bus, click on the button reading 'Set Custom Alarms.' To view your already set alarms, click the button reading 'View My Alarms.'");
}

function gotoAlarms(){
	location.href="alarm clock.html";
}
