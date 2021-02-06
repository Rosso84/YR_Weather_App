# About YR_Weather_App

A basic app that fetches weather forecast using Yr.no's APi  with vanilla Javascript, Html and CSS.

## requirements
You only need a text editor such as Atom or VsCode. Both is free, but i recommend the last one. 
Atom: 

https://atom.io/

VsCode:

https://code.visualstudio.com/



## how to run
Normally you would need an API-key in order to get access to APi's, but in this case you only need to identify your self by adding your email or github id in order to fetch weather forecast from Yr.no. Without this you might get shut out because it is important for them to have control over who is using their API's in case of overload of requests and you MUST identify your self with real email or github.

In order to do so, navigate to yr-app.js and replace your github id inside:


´´´javascriptconst getCityByName = async(userInput) => {
    const url = `${proxyUrl}/https://www.yr.no/api/v0/locations/suggest?language=nb&q=${userInput}`;
    const response = await fetch(url, {
        headers: {

             /*this header is required by Yr.no in order for them to track usages in case of overload
            (read terms of service: https://developer.yr.no/doc/TermsOfService/),
            but you need to replace with your own id.
            */
            "User-Agent": "rosso84.github.io https://github.com/Rosso84"
        
        }

    });
    return await response.json();
};
´´´

Next thing you need to do is to go to :

https://cors-anywhere.herokuapp.com/corsdemo

And request for temporary access to Herokus CORS (Cross origin Resource Sharing) server by clicking on the 'request teporary access to the demo server'.

Now all you need to do is finding the index.html file inside root folder and double click on it. Type a City and you should get the weather forecast with information about:

-which day it is by date

-what temprature it is at max and minimum

-if the sky is clear/cloudy

-and precipitation in mm
