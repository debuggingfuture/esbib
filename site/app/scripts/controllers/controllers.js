define(['angular'], function() {
	'use strict';

	var controllers = {};

	// 	function MainCtrl($scope) {

	// 	$scope.world = "World";
	// }

	controllers.QueryCtrl = function($scope, $http, esQueryService) {
		console.log('Qurey Ctrl Hello World');
		console.log('scope');
		console.log($scope);
		console.log('esQueryService');
		console.log(esQueryService);

		// console.log(ejsResource);


		var fieldsToReturn = ["title", "author", "year"];
		// var mltFields = ["file_as_attachment.image_exif.creation_date",
		// 	"file_as_attachment.image_exif.model",
		// 	"file_as_attachment.image_exif.image_height",
		// 	"file_as_attachment.image_exif.image_width",
		// 	"file_as_attachment.author",
		// 	"file_meta.mimeType"
		// ];



		$scope.search = function() {
			var resultsCallBack = function(results) {
				$scope.results = results;
				// $scope.getFacet();
			};

			//TODO query need to be process, e.g. for casse sensitive
			esQueryService.queryES($scope.query, fieldsToReturn, resultsCallBack);
			// var query = ejs.QueryStringQuery($scope.query);

			/* a function to display results */

			//use watch instead in case of directives?

			// $http.get('http://localhost:9200/mydocs/_search?q=' + $scope.query + '&fields=file_attachment').success(function(data) {
			// 	console.log(data);
			// 	$scope.results = data.hits.hits;


			// });
			// $scope.results = client
			// 	.query(oQuery.query($scope.queryTerm || '*'))
			// 	.doSearch();
		};

		//must be dropbox
		//better do file type
		// $scope.getFacet = function() {
		// 	console.log('get facet');

		// 	var facetCb = function() {
		// 		console.log('facet');
		// 	}

		// 	var r = ejs.Request()
		// 		.indices('stackoverflow')
		// 		.types('question')
		// 		.facet(
		// 			ejs.TermsFacet('providers')
		// 			.field('file_meta.provider')
		// 			.size(10));

		// 	r.doSearch(facetCb);
		// }

		// $scope.getSearchResultFacet = function(query) {
		// 	console.log('get facet');

		// 	var facetCb = function(r) {
		// 		console.log('Search Result Facet');
		// 		console.log(r);
		// 		$scope.facetResult = r.facets.mimeType.terms;
		// 		$scope.facetResultFacet = r.facets.mimeType;

		// 		//override result for all
		// 	}


		// 	// 

		// 	// var facet = ejs.QueryFacet(ejs.FieldQuery("file_as_attachment.checksum", ));
		// 	var facet = ejs.TermsFacet('mimeType')
		// 		.field('file_meta.mimeType')
		// 		.size(5);
		// 	if (query) {
		// 		facet = facet.facetFilter(
		// 			ejs.QueryFilter(query)
		// 		)
		// 	}

		// 	var r = ejs.Request()
		// 		.indices(index)
		// 		.types(type)

		// 	r.doSearch(facetCb);
		// }


		// $scope.filterSearchByType = function(results, type) {
		// 	console.log('filter search by type' + type);
		// 	$scope.onTypeFilter = !$scope.onTypeFilter;
		// 	console.log('onFilter:' + $scope.onTypeFilter)
		// 	$scope.typeFilter = type;
		// 	//trigger search when filter toggle
		// 	//TODO better way to watch such global
		// 	$scope.search();
		// }

	}



	return controllers;
});