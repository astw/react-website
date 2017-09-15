"use strict";

var React = require('react');
var InputExt = require('../common/textInput');   // InputExt name can be changed Input to replace the default one.

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

        <InputExt name="companyName"
                  label="Company Name"
                  value={this.props.companyName}
                  onChange={this.props.onChange} />

        <input type="submit" value="Save" className="btn btn-default"
            onClick={this.props.onSave}
         />

			</form>
      </div>
		);
	}
});

module.exports = AuthorForm;
