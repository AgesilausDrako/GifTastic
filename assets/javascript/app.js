$(document).ready(function(){
	
	var martialArts = [ "tae kwon do", "karate", "aikido", 
						"ju-jitsu", "muay thai", "krav maga",
						"brazilian jiu-jitsu", "judo", "kali"];

	function renderButtons() {

		$("#apButtons").empty();
	

	    for (var i = 0; i < martialArts.length; i++) {

	      	var martialArtsBtn = $("<button>");
	      	martialArtsBtn.addClass("martialArt");
	      	martialArtsBtn.attr("data-name", martialArts[i]);
	        martialArtsBtn.text(martialArts[i]);
	        $("#apButtons").append(martialArtsBtn);

	      }
    }

    // This function handles events where one button is clicked
      $("#add-subject").on("click", function(event) {
        event.preventDefault();


        martialArtsBtn = $("#new-subject").val().trim();

 
        martialArts.push(martialArtsBtn);
        console.log(martialArts)

  
        renderButtons();
      });				
	// var newButton = $("#apButtons");

    // Here we use jQuery's custom .each method to loop through the object and immediately create divs.
    // $.each(martialArts, function(number, martialArt){
    //   newButton.append("<div>" + martialArts + "</div>")
    // });

	//var api_key = ;
	// var queryURL = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

 //      $.ajax({
 //        url: queryURL,
 //        method: 'GET'
 //      }).done(function(response) {
 //        console.log(response);
 //  });
    renderButtons();

});