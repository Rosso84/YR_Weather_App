

/**
 * This solution uses Compact format.
 * If you want to try this solution make sure you changed src inside <script> in index.html
 * result wil only be output to console.
 */


var searchButton = document.querySelector('.submit');


const cities = {
    city1: {
        lat: 60,
        lon: 11
    },
    //so on with city2 etc..
}


const buttonHandler = async() => {

    const cityInfo = await getCityByLatLong(
        cities["city1"].lat, cities["city1"].lon
        );
        console.log(cityInfo);
};


const getCityByLatLong = async(lat, lon) => {
        
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
   
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
  

searchButton.addEventListener("click", buttonHandler);

