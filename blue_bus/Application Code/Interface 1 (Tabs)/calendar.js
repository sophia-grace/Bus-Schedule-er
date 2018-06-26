
function leavingTime(college) {
    var i, nextLeavingTime, tag, date, day;
    var nextTime, currentTime;
    var arrNextTime;
    var found;

    
    
    //find the next bus to leave
    tag = getTag(college);
    arrNextTime = document.getElementsByClassName(tag);
    currentTime = getTime();
    
    found = findNextTime(arrNextTime, currentTime);
    
 
    
  
    nextTime = "7:55 AM";
    currentTime = "11:54 PM";
    found = compareTimes(convertTime12to24(nextTime), convertTime12to24(currentTime));
    
    
    
    nextLeavingTime = document.getElementsByClassName("nextLeavingTime");    
    for(i = 0; i < nextLeavingTime.length; i++) {
        nextLeavingTime[i].innerHTML = found;
    }  
      
}



function findNextTime(array, now) {
    var i, nextTime, found;
        
    
    for(i = 0; i < array.length; i++) {
        nextTime = convertTime12to24(array[i].innerHTML);
        if(compareTimes(nextTime, now) > 0) { //if the next time is greater than the                                                     //current time
           // found = subtractTimes(nextTime, now);
          //  return found;
            return nextTime;
        }
    } 
    
   // return found;
}

function compareTimes(later, now) { //checks if one time occurs after another
                                    //returns a 1 if the "later" time is later than "now" time
                                    //returns a 0 if not
    
    //get rid of the colon so you can operate as ints 
    let [laterHours, laterMinutes] = later.split(':');
    let [nowHours, nowMinutes] = now.split(':');
    
    
   
    
    if((laterHours >= nowHours)) {
        return 1;
    }
    else if(((laterHours < nowHours) && (laterHours == 00 && (nowHours >= 12))) || (((laterHours == 01 && (nowHours >= 12)) || (laterHours == 02 && (nowHours >= 12))))) {
        return 1;
    }
    else {
        return 0;
    }
      
}

function subtractTimes(later, now) { //finds the difference in time between later and now (later -                                       //now)
    var difference, hours, minutes;
    
    //get rid of the colon so you can operate as ints 
    //source: https://www.w3schools.com/jsref/jsref_split.asp
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


/* source: https://stackoverflow.com/questions/15083548/convert-12-hour-hhmm-am-pm-to-24-hour-hhmm */
function convertTime12to24(time12h) { //convert to military time
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  

  return hours + ':' + minutes;
}



function getTag(str) { //returns the searchable tag
    var tag, date, day;
    
    //source: https://www.w3schools.com/jsref/jsref_substring.asp
    tag = str.substr(0,1); //either a B or an H
    
    //source: https://www.w3schools.com/jsref/jsref_obj_date.asp
    date = new Date();
    day = date.getDay();
    return tag + day;
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



function convertMinutes(time) {
    var j, hour, minute, converted;
    // source: https://www.w3schools.com/jsref/jsref_search.asp
    j = time.search(":");
    //source: https://www.w3schools.com/jsref/jsref_substring.asp
    hour = parseInt(time.substr(0, j));
    minute = parseInt(time.substr(j + 1));
    hour = hour * 60;
    converted = hour + minute;
    return converted;
}


/* source: https://www.w3schools.com/howto/howto_js_tabs.asp */
function openCollege(nm, collegeName, college) {
        // Declare all variables
        var i, tabContent, tablinks;
    
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


/* source: https://www.w3schools.com/howto/howto_js_tabs.asp */
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