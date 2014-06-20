"use strict";

$(function() {

	$("#searchButton").on("click", function(e) {

		e.preventDefault();

		clear_results();

		var userInput = $("#searchTerm").val();

		var request = {
			url: "http://www.omdbapi.com/",
			type: "get",
			dataType: "json",
			data: {
				s: userInput
			}
		};

		var response = $.ajax(request);

		response.done(function(data) {
			$.each(data["Search"], function(index, movie) {
				var imdbid = movie["imdbID"];
				console.log(imdbid);

				var li = $("<li data-imdbid= " + imdbid + ">" + movie["Title"]  +"</li>")

				$(".results").append(li);
			});
		});
	});

    $(".results").delegate("li", "click", function(e) {

				var imdbid = $(e.target).data("imdbid")

				var request = {
					url: "http://www.omdbapi.com/",
					type: "get",
					dataType: "json",
					data: {
						i: imdbid
					}
				}

				var response =  $.ajax(request)
				response.done(function(data) {
					console.log(data["Poster"]);
					$("#image").attr("src", data["Poster"] )
				})
	});

	function clear_results()
	{
		$(".results").empty();
		$("#image").attr("src","")
	
	};

});