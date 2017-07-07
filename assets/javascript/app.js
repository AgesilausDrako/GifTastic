// Ready function whichs ensures no JS is used until the document is fully loaded
$(document).ready(function(){
	
	// Initial array
	var martialArts = [ "tae kwon do", "karate", "aikido", 
						"ju-jitsu", "muay thai", "krav maga",
						"brazilian jiu-jitsu", "judo", "kali"];

	// Function to empty the button space and render the buttons from the array
	function renderButtons() {
		// Ensures no reduplication of the original array
		$("#apButtons").empty();
	
		// The loop which iterates through the array and creates the buttons
	    for (var i = 0; i < martialArts.length; i++) {

	      	var martialArtsBtn = $("<button>");
	      	martialArtsBtn.addClass("martialArt btn btn-lg btn-inverse");
	      	martialArtsBtn.attr("data-name", martialArts[i]);
	        martialArtsBtn.text(martialArts[i]);
	        $("#apButtons").append(martialArtsBtn);

	      }
    }

    // This function pushes the new subject to the array and recalls the renderButtons function
      $("#add-subject").on("click", function(event) {

        event.preventDefault();

        martialArtsBtn = $("#new-subject").val().trim();
 
        martialArts.push(martialArtsBtn);

        console.log(martialArts)

        renderButtons();
      });

      // This function retrieves the data-name and queries with an Ajax call to the API
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
		        	var p = $("<p class='listing'>").text("Rating: " + results[i].rating);
		        	var martialArtsImage = $("<img>");
		        	martialArtsImage.attr("src", results[i].images.fixed_height.url);
		        	martialArtsImage.attr("data-animate", results[i].source);
		        	martialArtsImage.attr("data-still", results[i].source.replace(".gif", "_s.gif"));
		        	martialArtsImage.attr("data-state", "still");
		        	martialArtsImage.addClass("gif img-responsive img-rounded");
            		martialArtsDiv.append(martialArtsImage);
            		martialArtsDiv.append(p);

            		// The data pictures are appended to the div
            		$("#pictures").prepend(martialArtsDiv);
		        }
		  	});
		  }

		// Calls the showPictures function
		$(document).on("click", ".martialArt", showPictures);

		// This function resets the app without using refresh
		function reset() {
			$("#pictures").empty();
			renderButtons();
		}

		// This function stops and starts the gif upon clicking
		function gifClick (event) {

			event.preventDefault();
			
			console.log("clicked gif");
		   
		    var state = $(this).attr("data-state");
		    
		    if (state === "still") {
		      $(this).attr("src", $(this).attr("data-animate"));
		      $(this).attr("data-state", "animate");
		    } else {
		      $(this).attr("src", $(this).attr("data-still"));
		      $(this).attr("data-state", "still");
	  		}
	      }

		// Click which calls the gifClick function
	    $(document).on("click", ".gif", gifClick);

	    // The initial call and rendering of the button array
		renderButtons();
});