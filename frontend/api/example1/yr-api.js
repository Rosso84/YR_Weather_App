//import {attributes} from './attributes'  fails




/**
 * To make things cleaner I started off to store these attributes in a separate file 
 * (see attributes.js), but got import issues. 
 * There are several solutions to this like adding type="module" inside <script>, 
 * but then I got Cors issues (cross origin resources sharing). I didn't want to
 * spend too much time on this just to organise my code, but for solutions see: 
 * https://stackoverflow.com/questions/19059580/client-on-node-js-uncaught-referenceerror-require-is-not-defined 
 * 
 */
var inputField = document.querySelector('.input_text');
var searchButton = document.querySelector('.submit');
var cityHeader = document.querySelector('#name');

var date1 = document.querySelector('.date');
var temp = document.querySelector('.temp');
var precipitation = document.querySelector('.precipitation');
var clouds = document.querySelector('.clouds');

var date2 = document.querySelector('.date2');
var temp2 = document.querySelector('.temp2');
var precipitation2 = document.querySelector('.precipitation2');
var clouds2 = document.querySelector('.clouds2');

var date3 = document.querySelector('.date3');
var temp3 = document.querySelector('.temp3');
var precipitation3 = document.querySelector('.precipitation3');
var clouds3 = document.querySelector('.clouds3');

var date4 = document.querySelector('.date4');
var temp4 = document.querySelector('.temp4');
var precipitation4 = document.querySelector('.precipitation4');
var clouds4 = document.querySelector('.clouds4');

var date5 = document.querySelector('.date5');
var temp5 = document.querySelector('.temp5');
var precipitation5 = document.querySelector('.precipitation5');
var clouds5 = document.querySelector('.clouds5');



/**
 Yr.no's API url comes in 3 formats 
 (see https://developer.yr.no/doc/locationforecast/HowTO/)
 To fetch in json format we must use 'compact' in the url e.g:  
 https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60&lon=11.
 Using this does not require CORS (Cross Origin Resource Sharing), but
 it requires you to provide geo positions 'lat' and 'lon' for each area to fetch.
 To illustrate this see api/example2/yr-api-compact.js.
 To avoid using geo positions I used chrome devtools to monitor Yr.no's website to find their own 
 url which receives location by city name. But here we need CORS.
 
 I use the proxyUrl because browsers blocks standard requests that are not being done
 by yr.no them selves and I did not want to use other soulutions Passport.
 Using CORS through Herokus proxy server will accept all the data, and then return it back 
 to us. So you need to do a request for permission to use their proxy at: 
 https://cors-anywhere.herokuapp.com/corsdemo    
*/      

const proxyUrl = "https://cors-anywhere.herokuapp.com";

const buttonHandler = async() => {

    const userInput = inputField.value;

    //This will fetch the desired city and 4 other near cities
    const cityInfo = await getCityByName(userInput);
        console.log(cityInfo);
    
    const location = cityInfo._links.location[0].href;
    const weatherUrl = `${proxyUrl}/https://www.yr.no/${location}/forecast`;
    const weatherDetail = await getForecasts(weatherUrl);
        console.log(weatherDetail);
 
    //forecast today
    var dateToday = weatherDetail['dayIntervals']['0']['start'];
    dateToday = dateToday.substring(0, dateToday.length - 15);  /*TODO: Use Date formater instead as this could become expensive*/ 
    var tempTodayMin = weatherDetail['dayIntervals']['0']['temperature']['min'];
    var tempTodayMax = weatherDetail['dayIntervals']['0']['temperature']['max'];
    var cloudToday = weatherDetail['dayIntervals']['0']['sixHourSymbols']['2']; //TODO: fix cloud null values based on dayTimeperiod sixHourSymbols:{'2'}(replaced with '0','1','2' or '3')
    var precipitationToday = weatherDetail['dayIntervals']['0']['precipitation']['value'];
        
        console.log('temp today max/min: ' + tempTodayMax + '/' + tempTodayMin);
        console.log('precipitation : '+ precipitationToday + 'mm')
        console.log('cloud : '+ cloudToday)
        console.log('Date : '+ dateToday)

    
    //forecast day2
    var dateDay2 = weatherDetail['dayIntervals']['1']['start'];
    dateDay2 = dateDay2.substring(0, dateDay2.length - 15); 
    var day2TempMin = weatherDetail['dayIntervals']['1']['temperature']['min'];
    var day2TempMax = weatherDetail['dayIntervals']['1']['temperature']['max'];
    var day2Cloud = weatherDetail['dayIntervals']['1']['sixHourSymbols']['2'];
    var day2Precipitation = weatherDetail['dayIntervals']['1']['precipitation']['value'];

    //forecast day3
    var dateDay3 = weatherDetail['dayIntervals']['2']['start'];
    dateDay3 = dateDay3.substring(0, dateDay3.length - 15); 
    var day3TempMin = weatherDetail['dayIntervals']['2']['temperature']['min'];
    var day3TempMax = weatherDetail['dayIntervals']['2']['temperature']['max'];
    var day3Cloud = weatherDetail['dayIntervals']['2']['sixHourSymbols']['2'];
    var day3Precipitation = weatherDetail['dayIntervals']['2']['precipitation']['value'];

    //forecast day4
    var dateDay4 = weatherDetail['dayIntervals']['3']['start'];
    dateDay4 = dateDay4.substring(0, dateDay4.length - 15); 
    var day4TempMin = weatherDetail['dayIntervals']['3']['temperature']['min'];
    var day4TempMax = weatherDetail['dayIntervals']['3']['temperature']['max'];
    var day4Cloud = weatherDetail['dayIntervals']['3']['sixHourSymbols']['2'];
    var day4Precipitation = weatherDetail['dayIntervals']['3']['precipitation']['value'];

    //forecast day5
    var dateDay5 = weatherDetail['dayIntervals']['4']['start'];
    dateDay5 = dateDay5.substring(0, dateDay5.length - 15); 
    var day5TempMin = weatherDetail['dayIntervals']['4']['temperature']['min'];
    var day5TempMax = weatherDetail['dayIntervals']['4']['temperature']['max'];
    var day5Cloud = weatherDetail['dayIntervals']['4']['sixHourSymbols']['2'];
    var day5Precipitation = weatherDetail['dayIntervals']['4']['precipitation']['value'];

    //City header name
    var cityName = cityInfo['_embedded']['location']['0']['name'];
    cityHeader.innerHTML = cityName ;
    inputField.value ="";

    //populate card1
    date1.innerHTML = "Date: " + dateToday;
    temp.innerHTML = "Temp max/min: " + tempTodayMax + '/' + tempTodayMin;
    clouds.innerHTML = "cloud: " + cloudToday;
    precipitation.innerHTML = "precipitation : " + precipitationToday + "mm";
    
    //populate card2
    date2.innerHTML = "Date: " + dateDay2;
    temp2.innerHTML = "Temp max/min: " + day2TempMax + '/' + day2TempMin;
    clouds2.innerHTML = "cloud: " + day2Cloud;
    precipitation2.innerHTML = "precipitation : " + day2Precipitation + "mm";
    
    //populate card3
    date3.innerHTML = "Date: " + dateDay3;
    temp3.innerHTML = "Temp max/min: " + day3TempMax + '/' + day3TempMin;
    clouds3.innerHTML = "cloud: " + day3Cloud;
    precipitation3.innerHTML = "precipitation : " + day3Precipitation + "mm";
    
    //populate card4
    date4.innerHTML = "Date: " + dateDay4;
    temp4.innerHTML = "Temp max/min: " + day4TempMax + '/' + day4TempMin;
    clouds4.innerHTML = "cloud: " + day4Cloud;
    precipitation4.innerHTML = "precipitation : " + day4Precipitation + "mm";

    //populate card5
    date5.innerHTML = "Date: " + dateDay5;
    temp5.innerHTML = "Temp max/min: " + day5TempMax + '/' + day5TempMin;
    clouds5.innerHTML = "cloud: " + day5Cloud;
    precipitation5.innerHTML = "precipitation : " + day5Precipitation + "mm";
  
};


const getCityByName = async(userInput) => {

    const url = `${proxyUrl}/https://www.yr.no/api/v0/locations/suggest?language=nb&q=${userInput}`;
    const response = await fetch(url, {
        headers: {

            /*this header is required by Yr.no in order for them to track usages in case of overload
            (read terms of service: https://developer.yr.no/doc/TermsOfService/),
            but you need to replace with your own id (use a real one, not a fake one).
            */
            "User-Agent": "yourGithubName.github.io https://github.com/YourGithubUserName"
        
        }

    });
    return await response.json();
};



const getForecasts = async(url) => {

    const response = await fetch(url, {
        headers: {
            /*this header is required by Yr.no in order for them to track usages in case of overload
            (read terms of service: https://developer.yr.no/doc/TermsOfService/),
            but you need to replace with your own id (use a real one, not a fake one).
            */
            "User-Agent": "yourGithubName.github.io https://github.com/yourGithubName"
        }
    });
    return await response.json();
};

searchButton.addEventListener("click", buttonHandler);

