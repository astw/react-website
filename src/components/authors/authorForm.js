"use strict";

var React = require('react');
var InputExt = require('../common/textInput');   // InputExt name can be changed Input to replace the default one.

var AuthorForm = React.createClass({

  propTypes: {
      author: React.PropTypes.object.isRequired,
      onSave: React.PropTypes.func.isRequired,
      onChange: React.PropTypes.func.isRequired,
      errors: React.PropTypes.object
  },

  render: function(){
		return (
      <div className="col-lg-offset-3 col-lg-6">
			<form className="col-6">
        <h1>Manage Author</h1>

        <InputExt name="firstName"
                label="First Name"
                onChange ={this.props.onChange}
                error={this.props.errors.firstName}
                value= {this.props.author.firstName} />
        <br/>

        <InputExt name="lastName"
                label="Last Name"
                onChange ={this.props.onChange}
                error={this.props.errors.lastName}
                value= {this.props.author.lastName} />
        <br/>

        <InputExt name="companyName"
                  label="Company Name"
                  value={this.props.companyName}
                  error={this.props.errors.companyName}
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
