# GrTree

A simple tree writen in angular.

## Setup

A simple `npm install` should install all dev and non dev dependencies.

Then you need to run the following **if you do not have these globally installed**:

* `npm link gulp` - links gulp to the current directory

Then you can run `gulp` to generate the sources at `./build` folder. The last step is just run `npm start` :D, then you get a nice simple angularJS Tree.

## TODO

* [ ] Setup gulp enviroment
  * [x] Setup bower
  * [x] Setup jshint
  * [ ] Setup karma+jasmine and angular mocks
  * [x] Setup scss
  * [x] Setup browsersync
* [ ] Tree itself, trunk and leafs
  * [x] Add leaf
  * [ ] Select leaf
  * [ ] Remove leaf
  * [ ] Edit a leaf
* [ ] Search in nodes and its children