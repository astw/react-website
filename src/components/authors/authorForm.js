"use strict";

var React = require('react');
var AuthorForm = React.createClass({
  render: function(){
		return (
      <div className="col-lg-offset-3 col-lg-6">
			<form className="col-6">
        <h1>Manage Author</h1>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName"
                className="form-control"
                placeholder="First Name"
                ref="firstName"
                onChange ={this.props.onChange}
                value={this.props.author.firstName} />
        <br/>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName"
                className="form-control"
                placeholder="First Name"
                ref="lastName"
                onChange ={this.props.onChange}
                value= {this.props.author.lastName} />
        <br/>
        <input type="submit" value="Save" className="btn btn-default" />

			</form>
      </div>
		);
	}
});

module.exports = AuthorForm;
