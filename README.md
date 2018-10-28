# Neighborhood Map - Udacity FEND Final Project
A single-page application using React featuring a map of Big Apple.  By default, app displays five markers of famous parks in the city. User can search for new locations and filter search results.  If a marker has been clicked, location of a search result is displayed in an InfoWindow.  Search result data is provided by the [Forsquare Places API](https://developer.foursquare.com/). App is responsive and mobile-optimized.

[Project Screenshot][https://github.com/electrovagance/neighborhood-map/blob/master/src/app_screenshot.PNG]


## TL;DR
To get started developing right away:
1. make sure you have NPM installed
2. clone the project using `git clone https://github.com/electrovagance/neighborhood-map.git` in your console
3. start the development server with `yarn start`
4. app will be hosted locally (i.e., `http://localhost:3000` in your browser)


## Dependencies
* [react-google-maps](https://github.com/tomchentw/react-google-maps)
* yelp-fusion
* [escape-string-regexp](https://github.com/sindresorhus/escape-string-regexp)


## Service Worker
create-react-app automatically comes with a servicer worker and will work in production mode after the project has been built.


## License
Project is licensed under the terms of [MIT](https://en.wikipedia.org/wiki/MIT_License).