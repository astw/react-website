"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({

 statics:{
   willTransitionFrom:function(transition, component){
     if(component.state.dirty && !confirm('Leave without saving?')){
        transition.abort();
     }
   }
 },

  mixins:[
      Router.Navigation
  ],

  getInitialState: function(){
 
      return {
        author: {id:'', firstName:'', lastName:'', companyName:''},
        errors:{},
        dirty:false
      }
  },

  componentWillMount: function(){
    var authorId = this.props.params.id;  // this from path /author/id
    if(authorId){
      this.setState({author:AuthorApi.getAuthorById(authorId)});
    }
  },

  authorFormIsValidation:function(){
      var formIsValid = true;
      this.state.errors = {};  // clear any previous errors;

      if(this.state.author.firstName.length < 3){
         this.state.errors.firstName = "First name must be more than 3 chars";
         formIsValid = false;
      }

      if(this.state.author.lastName.length < 3){
         this.state.errors.lastName = "Last name must be more than 3 chars";
         formIsValid = false;
      }

      if(this.state.author.companyName.length < 3){
         this.state.errors.companyName = "Company name must be more than 3 chars";
         formIsValid = false;
      }

      this.setState({errors:this.state.errors});
      return formIsValid;
  },

  saveAuthor :function(event){
     event.preventDefault();

     if(!this.authorFormIsValidation()){
       return;
     }

     console.log("simulate remote calling");
     AuthorApi.saveAuthor(this.state.author);
     toastr.success('Author saved');
     this.setState({dirty:false});
     this.transitionTo('authors');    // transitionTo is mixin into the class
  },

// this is the common pattern
  setAuthorState: function(event){
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    //this.state.dirty = true;
    this.setState({dirty:true});
    return this.setState({author: this.state.author});
  },

	render: function(){
		return (
      <div>
        <AuthorForm author={this.state.author}
              onChange={this.setAuthorState}
              onSave={this.saveAuthor}
              errors={this.state.errors}
              />
      </div>
		);
	}
});

module.exports = ManageAuthorPage;
