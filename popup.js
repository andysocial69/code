document.addEventListener('DOMContentLoaded', function(){
  var button = document.getElementById('button');
  var container = document.getElementById('container');
  var Value = getEmailPromise();
  var user = Promise.all([Value]).then(function(data) {
                console.log(data[0]);
                document.getElementById('users').innerHTML += " <b>" + data[0] + "</b>";
                userMail = data[0];
            });
  button.addEventListener('click', function(){
    var firstNameletter = document.getElementById("fname").value;
    var lastNameletter = document.getElementById("lname").value;
    var dateofbirst = document.getElementById("dob").value;
    let fnum = getNum(firstNameletter);
    let lnum = getNum(lastNameletter);
    let validDob = isInt(dateofbirst);
    if (fnum === 'Invalid Entry' || lnum === 'Invalid Entry' || !validDob || document.getElementById("dob").value.length < 6){
        if(!validDob || document.getElementById("dob").value.length < 6){
          document.getElementById("p1").innerHTML = "<b> Invalid DOB! <br> Please enter a valid 6 digit date.";
        } else{
          document.getElementById("p1").innerHTML = "<b> Invalid Entry for First Letter of the First or Last Name<br> Please enter a valid value";
      }
    } else{
        document.getElementById("p1").innerHTML = "<b> Alternate SSN: 9"  + fnum + lnum + dateofbirst + "</b>";
      }
  }, false);
},  false);

$(document).ready(function(){
  if(typeof(chrome.runtime.getManifest) == 'function'){
    var manifest = chrome.runtime.getManifest();
    var version = manifest.version;
    document.getElementById('version').innerHTML += "<b> " +manifest.version +"</b>";
  }
  var os = detectOS();
  var browser = getBrowser();
  var btnBugReport = $('.btn-bug').click(function(event){
    event.preventDefault();
    console.log(event);
    var $this = $(this);
    var url = 'https://docs.google.com/a/mshs.org/forms/d/1ImzK1O4k3jWVu-lRXJa1y4ds6X1Gz770DnDeyP--ZEk/viewform?entry.1233208764&entry.363071237=' +version +'&entry.1715202183='+os +'&entry.72312352='+browser;
    var windowName = "Report a Bug!";
    var windowSize = $this.data("data-popup");
    window.open(url,windowName, windowSize);
  });
});
/**
* Gets the browser name or returns an empty string if unknown.
* This function also caches the result to provide for any
* future calls this function has.
*
* @returns {string}
*/
function getBrowser(){
  // Return cached result if avalible, else get result then cache it.
  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
  var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0+
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  // At least Safari 3+: "[object HTMLElementConstructor]"
  var isChrome = !!window.chrome && !isOpera;// Chrome 1+
  var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

  return (
      isOpera ? 'Opera' :
      isFirefox ? 'Firefox' :
      isSafari ? 'Safari' :
      isChrome ? 'Chrome' :
      isIE ? 'Internet+Explorer' :
      '');
};

/**
* Gets the operating system name or returns default value if unknown.
*
* @returns {string}
*/
function detectOS(){
  var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
  return OSName
};

function isInt(dateofbirst) {
  var x;
  return isNaN(dateofbirst) ? !1 : (x = parseFloat(dateofbirst), (0 | x) === x);
}

function getNum(letter) {
  let id = letter;
  let retturnvalue = '';
  console.log("Inside the function");
  switch (id){
    case 'a':
    case 'A':
    case 'b':
    case 'B':
    case 'c':
    case 'C':
      retturnvalue = '1';
      break;
    case 'd':
    case 'D':
    case 'e':
    case 'E':
    case 'f':
    case 'F':
      retturnvalue = '2';
      break;
    case 'g':
    case 'G':
    case 'h':
    case 'H':
    case 'i':
    case 'I':
      retturnvalue = '3';
      break;
    case 'j':
    case 'J':
    case 'k':
    case 'K':
    case 'l':
    case 'L':
      retturnvalue = '4';
      break;
    case 'm':
    case 'M':
    case 'n':
    case 'N':
    case 'o':
    case 'O':
      retturnvalue = '5';
      break;
    case 'p':
    case 'P':
    case 'q':
    case 'Q':
    case 'r':
    case 'R':
      retturnvalue = '6';
      break;
    case 's':
    case 'S':
    case 't':
    case 'T':
    case 'u':
    case 'U':
      retturnvalue = '7';
      break;
    case 'v':
    case 'V':
    case 'w':
    case 'W':
    case 'x':
    case 'X':
      retturnvalue = '8';
      break;
    case 'y':
    case 'Y':
    case 'z':
    case 'Z':
      retturnvalue = '9';
      break;
    default:
      retturnvalue = 'Invalid Entry'
      break;
  }
  return retturnvalue;
}

function getEmailPromise(sendResponse) {
    return new Promise(function(resolve, reject) {
        chrome.identity.getProfileUserInfo(function(userinfo) {
            resolve(userinfo.email);
        });
    });
}