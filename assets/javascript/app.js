$(document).ready(function(){
	
	var martialArts = [ "tae kwon do", "karate", "aikido", 
						"ju-jitsu", "muay thai", "krav maga",
						"brazilian jiu-jitsu", "judo", "kali"];

	function renderButtons() {

		$("#apButtons").empty();
	

	    for (var i = 0; i < martialArts.length; i++) {

	      	var martialArtsBtn = $("<button>");
	      	martialArtsBtn.addClass("martialArt btn btn-lg btn-inverse");
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

      function showPictures (event) {

      	event.preventDefault();

      	var martialArtSearch = $(this).attr("data-name");
		// var apiKey = "eb3194d2efdd4d4d9d7a47a9eff216f2";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        martialArtSearch + "&api_key=eb3194d2efdd4d4d9d7a47a9eff216f2&limit=10";
		      $.ajax({
		        url: queryURL,
		        method: 'GET'
		      }).done(function(response) {
		        console.log(response);
		        var results = response.data;

		        for (var i = 0; i < results.length; i++) {

		        	var martialArtsDiv = $("<div>");
		        	var p = $("<p>").text("Rating: " + results[i].rating);
		        	var martialArtsImage = $("<img>");
		        	martialArtsImage.attr("src", results[i].images.fixed_height.url);
		        	martialArtsDiv.append(p);
            		martialArtsDiv.append(martialArtsImage);

            		$("#pictures").prepend(martialArtsDiv);
		        }
		  	});
		  }
		  
		$(document).on("click", ".martialArt", showPictures);

		renderButtons();
});