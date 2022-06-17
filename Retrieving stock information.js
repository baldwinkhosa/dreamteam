var theURL = "https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=X&outputsize=compact&datatype=json&interval=1min&apikey=fe0d415354msh1a2685b0980df82p15f6fdjsnee0a5bede820";

$(document).ready(function() {
  $("#stockIndicator").show();
  doAjax(theURL);

  $('.ajaxtrigger').click(function() {
    $("#stockIndicator").show();
    doAjax(theURL);
    return false;
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
  }

  function doAjax(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      contentType: "application/json",
      success: function(data) {

        var symbol = data['Meta Data']['2. Symbol']
        var lastRefreshed = data['Meta Data']['3. Last Refreshed']
        var lastTradePriceOnly = data['Time Series (1min)'][lastRefreshed]['4. close']
        var lastVolume = data['Time Series (1min)'][lastRefreshed]['5. volume']

        $('#stockSymbol').html(symbol);
        $('#stockAsk').html(lastTradePriceOnly);
        $('#stockVolume').html(numberWithCommas(lastVolume));
        $("#stockIndicator").hide();
      }
    });
  }
});