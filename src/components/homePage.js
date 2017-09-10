"use strict";

var React = require('react'); 
var Header = require("./common/header"); 

var Home = React.createClass({
	render: function(){
		return ( 
			<div className='jumbotron'> 
				<h1>Pluralsight administration</h1>
				<p> React, React Router, and Flux for extra-responsive web apps</p>
			</div>
		);
	}
});

module.exports = Home; 
