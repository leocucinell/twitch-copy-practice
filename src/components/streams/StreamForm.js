import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component{

    renderError({ error, touched }) {
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input}  />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        //we now have access to the validated formValues and can submit it to our api
        console.log(formValues)
        this.props.onSubmit(formValues)
    }

    render() {
        return(
            <form onSubmit={this.props.onSubmit} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    };
};

const validate = (formValues) => {
    const errors = {};

    if(!formValues.title){
        errors.title = 'You must enter a title';
    }
    if(!formValues.description){
        errors.description = "enter a description";
    }
    return errors
}

export default reduxForm({
    form: "streamForm",
    validate
})(StreamForm);