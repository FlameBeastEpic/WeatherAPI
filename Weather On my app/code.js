onEvent("btnSubmit", "click", function() {
  showResults();
});

onEvent("btnTryAgain", "click", function() {
  setText("N", "...loading...");
});

function showResults() {
  setText("lblCity", getText("txtCity"));
  hideElement("imgSky");
  hideElement("btnTryAgain");
  setScreen("screenResults");
  setText("lblWeatherText", "");
  var apiKey = "xGZwn7uYOKzi0KyucVp7adxbSgeFAGeD";
  var locationKeyURL = (("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + apiKey) + "&q=") + getText("txtCity");
  //console.log(locationKeyURL); 
  startWebRequest(locationKeyURL, function(status, type, content) {
      if(status == 200){
        var dataObj = JSON.parse(content);
       //console.log(JSON.stringify(dataObj));
        var locationKey = dataObj[0].Key;
        if(locationKey.length > 1){
          var conditionsURL = "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=" + apiKey; 
          startWebRequest(conditionsURL, function(status, type, content) {
            if(status == 200){
             console.log("DATA: " + content);
              var dataObj = JSON.parse(content);
              setText("lblTemp", (dataObj[0].Temperature.Imperial).Value + "F");
              setText("lblWeatherText", dataObj[0].WeatherText);
              var iconInt = dataObj[0].WeatherIcon;
              var iconString = iconInt;
              if(iconInt < 10){
                iconString = "0" + iconInt;
              }
              var iconURL = "https://developer.accuweather.com/sites/default/files/" + iconString + "-s.png";
              setImageURL("imgSky", iconURL);
              showElement("imgSky");
            }else{
              setText("lblTemp", "API ERROR!");
            }
          });
        }
      }else{
        setText("lblTemp", "API ERROR!");
      }
      showElement("btnTryAgain");
  });  
}
// 
