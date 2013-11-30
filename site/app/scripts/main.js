// Require JS  Config File

require.config({
    paths: {
        angular: "../bower_components/angular/angular",
        dangle: "//raw.github.com/fullscale/dangle/master/dist/dangle.min",
        d3: "//d3js.org/d3.v3.min",
        "angular-cookies": "../bower_components/angular-cookies/angular-cookies",
        "angular-mocks": "../bower_components/angular-mocks/angular-mocks",
        "angular-resource": "../bower_components/angular-resource/angular-resource",
        "angular-sanitize": "../bower_components/angular-sanitize/angular-sanitize",
        "angular-scenario": "../bower_components/angular-scenario/angular-scenario",
        json3: "../bower_components/json3/build",
        elastic: "../bower_components/elastic.js/dist/elastic",
        "elastic-angular-client": "../bower_components/elastic.js/dist/elastic-angular-client",
        "angular-bootstrap": "../bower_components/angular-bootstrap/ui-bootstrap-tpls",
        "angular-route":"../bower_components/angular-route/angular-route",
    },
    shim: {
        angular: {
            exports: "angular"
        },
        d3: {
            exports: "d3"
        },
        dangle: {
            deps: [
                "angular",
                "d3"
            ]
        },
        "elastic-angular-client": {
            deps: [
                "angular"
            ],
            exports: "angular"
        },
        "angular-bootstrap": {
            deps: [
                "angular"
            ]
        },
        "angular-route": {
            deps: [
                "angular"
            ]
        }
    },
    baseUrl: "scripts/"
});

require(["app"], function(App) {
    App.initialize();
});