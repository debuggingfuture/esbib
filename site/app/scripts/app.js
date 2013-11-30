'use strict';

define(
  ["angular",
    "controllers/controllers",
    "services/services",
    "elastic",
    "elastic-angular-client", "angular-bootstrap", 'dangle', "angular-route"
  ],
  // "Directives/directives",
  // "Filters/filters",

  // Services, Directives, Filters
  //new comment
  function BaseManager(angular, controllers, services, _ejs, esAngularClient, dangle) {
    console.log(arguments)
    console.log("elasticjs");
    console.log(_ejs);
    console.log(ejs);
    console.log(esAngularClient);
    // ejs.client = ejs.jQueryClient('http://localhost:9200');

    //dont work directly on mimeType. but only supported types
    var getFileType = function(_content_type) {

      if (!_content_type) {
        return 'text';
      };
      if (_content_type.match(/^image.*/)) {
        return 'image';
      } else if (_content_type.match(/^text.*/)) {
        return 'text';
      } else {
        return 'text';
      }

    };

    var initialize = function() {
      var app = angular.module('esbib', ['ngRoute', 'ui.bootstrap', 'elasticjs.service', 'ui.bootstrap', 'dangle'])
        .config(function($routeProvider, $locationProvider, $provide) {
          $routeProvider
            .when('/', {
              templateUrl: 'views/main.html',
              controller: 'MainCtrl'
            })
            .when('/query', {
              templateUrl: 'views/query.html',
              controller: 'QueryCtrl'
            })
            .otherwise({
              redirectTo: '/'
            });


          $provide.factory('esQueryService', services.esQueryServiceFactory);

          // $locationProvider.html5Mode(true);

        })
        .controller('QueryCtrl', controllers.QueryCtrl)
        .filter('fileTypeTemplateFilter', function() {
          return function(result) {

            //first met file_meta, then file_as_attachment?
            var content_type = result.fields.file_meta.mimeType;

            //logic 
            // console.log($scope);
            // console.log($rootScope);
            //strategy
            var type = getFileType(content_type);
            // console.log('type' + type);
            if (type === 'image') {
              return 'views/file_type_image.html';
            } else {
              return 'views/file_type_text.html';
            }



          };
        })
        .filter('autocompleteHighlight', function() {

          function escapeRegexp(queryToEscape) {
            return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
          }

          return function(matchItem, query) {
            return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : query;
          };
        })
        .filter('isFolderFilter', function() {
          //or use isFile
          //icon-tag
          return function(isFolder) {
            return isFolder ? '<i class="icon-folder-close"></i><small>Folder</small>' :
              '<i class="icon-file"></i><small>File</small>';
          };
        }).filter('previewPath', function() {
          return function(result) {
            var file_meta = result.fields.file_meta;
            var provider = file_meta.provider;
            var path = file_meta.path;
            //TODO if path not start with /, prepend
            var previewPath = provider + path + '/url';
            return previewPath;
          };
        })
        .filter('downloadPath', function() {
          return function(result) {
            var file_meta = result.fields.file_meta;
            var provider = file_meta.provider;
            var path = file_meta.path;
            //TODO if path not start with /, prepend
            var previewPath = provider + path + '/dlurl?dl=1';
            return previewPath;
          };
        })
      // .filter('fileTypeTemplateFilter', function() {
      //  return function(result) {
      //    // console.log($scope);


      //    return 'views/file_type_text.html';
      //    // 'views/file_type_text.html'

      //  };
      // })
      //TODO better use partials
      // .filter('fileTypeFilter', function() {
      //  return function(result) {

      //    var type = getFileType();
      //    console.log('type'+type);


      //    // file_as_attachment._content_type

      //    // if ((result || {}).fields) {
      //    //  var file_as_attachment = result.fields.file_as_attachment;
      //    //  //TODO strategy
      //    //  // var isImage = file_as_attachment._content_type.match(/^image.*/)
      //    //  var isImage = true;
      //    //  if (isImage) {
      //    //    var url = 'https://www.google.com/images/logos/logo.gif';

      //    //    //stream preview from express?
      //    //    var imgTag = '<img src="' + url + '">';
      //    //    var imgMetaTag = '<span>Model:' + file_as_attachment.model + '</span>';
      //    //    return imgTag + imgMetaTag;
      //    //  }
      //    //  //TODO if path not start with /, prepend
      //    //  // var previewPath = provider + path + '/dlurl?dl=1';
      //    //  // return previewPath;
      //    // }
      //    // return '';



      //  };
      // })
      ;


      //download path filter is actually better since less couple & more ticks


      // 
      //TODO better scope handling with angularjs
      // result.fields.file_meta should be here not in HTML?
      //couple with es schema here is better than couple with ui 



      // adding this into expression didtn work
      // ; result_file_meta=result.fields.file_meta

      //onfocus

      // Filters.initialize(app);

      // app.factory(Services);
      // app.directive(Directives);
      angular.bootstrap(document, ["esbib"]);

    };
    return {
      initialize: initialize
    };
  });