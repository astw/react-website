"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
  mixins:[
      Router.Navigation
  ],

  getInitialState: function(){
      return {
        author:{id:'', firstName:'', lastName:'', companyName:''}
      }
  },

  saveAuthor :function(event){
     event.preventDefault();
     console.log("simulate remote calling");
     AuthorApi.saveAuthor(this.state.author);
     toastr.success('Author saved');
     this.transitionTo('authors');    // transitionTo is mixin into the class
  },

// this is the common pattern
  setAuthorState: function(event){
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  },

	render: function(){
		return (
      <div>
        <AuthorForm author={this.state.author}
              onChange={this.setAuthorState}
              onSave={this.saveAuthor}
              />
      </div>
		);
	}
});

module.exports = ManageAuthorPage;
