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

	    	// Variable for the buttons
	      	var martialArtsBtn = $("<button>");
	      	// Adds classes for styling and manipulation
	      	martialArtsBtn.addClass("martialArt btn btn-lg btn-inverse");
	      	// Adds date-name to be used in later Ajax call
	      	martialArtsBtn.attr("data-name", martialArts[i]);
	      	// Gives the buttons their titles
	        martialArtsBtn.text(martialArts[i]);
	        // Appends buttons to the div
	        $("#apButtons").append(martialArtsBtn);
	      }
    }

    // This function pushes the new subject to the array and recalls the renderButtons function
      $("#add-subject").on("click", function(event) {

        event.preventDefault();

        martialArtsBtn = $("#new-subject").val().trim();
 
        martialArts.push(martialArtsBtn);

        console.log(martialArts)

        $("#new-subject").val("");

        renderButtons();
      });

      // This function retrieves the data-name and queries with an Ajax call to the API
      function showPictures (event) {

      	event.preventDefault();
      	// Variable for the query search
      	var martialArtSearch = $(this).attr("data-name");
		// var apiKey = "eb3194d2efdd4d4d9d7a47a9eff216f2";
		// Query that includes parameters, API-key and search variable
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        martialArtSearch + "&api_key=eb3194d2efdd4d4d9d7a47a9eff216f2&limit=10";
		      	// Ajax call to the Giphy API to retrieve data
		      	$.ajax({
		        url: queryURL,
		        method: 'GET'
		      }).done(function(response) {
		        console.log(response);
		        // Variable for the response data so it can be accessed
		        var results = response.data;

		        // Loop to iterate over the results of the Ajax call
		        for (var i = 0; i < results.length; i++) {
		        	// If/else clause that restricts the results to g or pg only rated gifs
		        	if (results[i].rating !== "r") {
			        	// Variable for creating divs to put the data in
			        	var martialArtsDiv = $("<div>");
			        	// Variable to display the picture's rating
			        	var p = $("<p class='listing'>").text("Rating: " + results[i].rating);
			        	// Variable to display the gif data
			        	var martialArtsImage = $("<img>");
			        	// Method to add the images' source to the image variable
			        	martialArtsImage.attr("src", results[i].images.fixed_height.url);
			        	// Adds the data-attribute for the animated version
			        	martialArtsImage.attr("data-animate", results[i].images.fixed_height.url);
			        	// Adds the data-attribute for the still version
			        	martialArtsImage.attr("data-still", results[i].images.fixed_height_still.url);
			        	// Adds and sets the animated default data-state so it can be toggled later
			        	martialArtsImage.attr("data-state", "animate");
			        	// Adds bootstrap classes for styling
			        	martialArtsImage.addClass("gif img-responsive img-rounded");
			        	// Appends the image to the div
	            		martialArtsDiv.append(martialArtsImage);
	            		// Appends the listing variable to the div
	            		martialArtsDiv.append(p);

	            		// Appends the data divs to the pictures div
	            		$("#pictures").prepend(martialArtsDiv);
            		}
		        }
		  	});
		  }

		// Calls the showPictures function
		$(document).on("click", ".martialArt", showPictures);

		// This function resets the app without using refresh
		function reset(event) {
			prevent.preventDefault();
			clear();
			renderButtons();
		}

		$(document).on("click", "#reset-btn", reset);

		// This function resets the app without using refresh
		function clear(event) {
			event.preventDefault();
			$("#pictures").empty();
		}

		$(document).on("click", "#clear-btn", clear);

		// This function stops and starts the gif upon clicking
		function gifClick (event) {

			event.preventDefault();

			console.log("clicked gif");
		   	//Stores the current data-state in a variable for if/else clause
		    var state = $(this).attr("data-state");
		    // If/else statement which toggles between animated and still versions
		    if (state === "still") {
		      // Changes the source to data-animate if state is still
		      $(this).attr("src", $(this).attr("data-animate"));
		      // Changes the data-state to animate
		      $(this).attr("data-state", "animate");
		    } else {
		      // Changes the source to data-still if state is active
		      $(this).attr("src", $(this).attr("data-still"));
		      // Changes the data-state to still
		      $(this).attr("data-state", "still");
	  		}
	      }

		// Click which calls the gifClick function
	    $(document).on("click", ".gif", gifClick);

	    // The initial call and rendering of the button array
		renderButtons();
});