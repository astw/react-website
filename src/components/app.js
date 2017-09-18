/*eslint-disable strict */
//"use strict";

var React = require("react");
var Header = require('./common/header');
var RouteHandler = require("react-router").RouteHandler;
$ = jQuery = require('jQuery');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                  <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = App;
