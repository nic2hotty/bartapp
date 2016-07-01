
// on load get all the station names

 var xhrStation = new XMLHttpRequest();
                            xhrStation.open("GET", "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V", false);
                            xhrStation.send();
xhrStation = xhrStation.responseXML;

var xmlStation = xhrStation;

var cars = ["BMW", "Volvo", "Saab", "Ford"];

// parse names and populate them in html with 4 code value

 var responseCont = xmlStation.getElementsByTagName("name");

var carTest;

 var txt = "";
 
 x = xmlStation.getElementsByTagName("name");

var y = document.getElementById("selectNumber");
var option; 
// var station;
 
for (i = 0; i < x.length; i++) {

   // add option value in, need to adjust this to include i
   option = document.createElement("option"); 

   option.text = x[i].childNodes[0].nodeValue;

   option.value = x[i].nextSibling.textContent;
   
   y.add(option, y[-i]);

  
  }
  
 //function for dropdown to select station and get abbrv for api call to get realtime info
  
 var station;
 //specific station request based on 4 code value
 var bartUrl;
 var xhr;
 var xml;
 
 // nicTip - define it as "" to avoid starting with undefined
 
 var timeTable = ""; 
 var selectedText;
 var nicXML;
 var xmlDestination;
 
 // the main fucntion that calls bart times
 
 function getBartTimes() {
   
   console.log("get bart times initated");
      
      //get abrev to make request
    station = document.getElementById("selectNumber").value;

    stationFull = document.getElementById("selectNumber");
    
    selectedText = stationFull.options[stationFull.selectedIndex].text;

    bartUrl = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + station + "&key=MW9S-E7SL-26DU-VV8V";
    
    // make request when station/url is selected
 
 xhr = new XMLHttpRequest();
                            xhr.open("GET", bartUrl, false);
                            xhr.send();
xhr = xhr.responseXML;

xml = xhr.getElementsByTagName("estimate");
xmlDestination = xhr.getElementsByTagName("etd");


     console.log(xmlDestination[0].childNodes[4].children[0].innerHTML);




//  this is the code for if i want the station name header at the top of the list of times, since the station name is already in the dropdown it seems a little redundant....: timeTable = "<h3>" +  selectedText + "</h3>" + "<br>" ;






  

// nicTip - DONT FORGET TO USE += in a for loop !!!!

   for (i = 0; i < xmlDestination.length; i++){
     
    
    console.log(xmlDestination[i].childNodes[3].children[0].innerHTML);
    console.log("loop starting");
           
      
      

  
       timeTable += "<h3>" + xmlDestination[i].childNodes[0].innerHTML + "</h3>" + "<br>" + xmlDestination[i].childNodes[3].children[0].innerHTML + "," + " " + xmlDestination[i].childNodes[4].children[0].innerHTML + "," + " " + xmlDestination[i].childNodes[5].children[0].innerHTML + " " + "MIN" + "<br>" + xmlDestination[i].childNodes[5].children[3].innerHTML + " " + "car train" + "<br>";
       
       document.getElementById("trainArriving").innerHTML = " ";
       document.getElementById("nicTesting").innerHTML = timeTable;  
       

      
       
      } // end for loop 
      
    
         var timeCheck = document.getElementById("nicTesting");
       console.log("hey there" + timeCheck.innerText); 
       
         // reg ex matching for leaving
      
       var re = /Leaving/gi;
       var str = timeCheck.innerText;
         
         if ( str.search(re) == -1 ){
               console.log("Does not contain Leaving" );
                   console.log(timeCheck.innerText );
                 console.log("end" );
            }
            
            else
            {
               console.log("Contains Leaving" );
               console.log(timeCheck.innerText );
               console.log("end" );
                 

          document.getElementById("trainArriving").innerHTML = "<h1>" + xmlDestination[0].childNodes[0].innerHTML + "</h1>"  + "<br>" + "<h2>" + "10 car train" + "</h2>"; //xmlDestination[i].childNodes[5].children[3].innerHTML ; 
           document.getElementById("nicTesting").innerHTML = " ";
          

               
            }
            
      // end reg ex matching
       

 // begin if else statement to see if any of the values are eqaul to leaving
 

 
 // end if else statement 
       
       
 } // end function getBartTimes
 
 
 // begin function on selecting from the bart station dropdown
 
 function selectDrop () {
   
   console.log("get train times initiated");
        timeTable = ""; 
        getBartTimes();
        
        // call every 30 seconds
        
     setInterval(function() {getBartTimes();}, 30000);
   
    
  }
  
  

  
  
  // end function dropdown 
  
  // station abreviation


function myFunction(xml) {
   
return xml.getElementsByTagName("color")[0];

}


