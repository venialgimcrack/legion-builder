import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password1: '',
            password2: '',
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        const registerData = {
            name: this.state.name,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2
        };

        console.log(registerData);
    };

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div>Register Form</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" value={this.state.name} error={errors.name} onChange={this.onChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={this.state.email} error={errors.email} onChange={this.onChange} />
                    </div>
                    <div>
                        <label htmlFor="password1">Password</label>
                        <input id="password1" type="password" value={this.state.password1} error={errors.password} onChange={this.onChange} />
                    </div>
                    <div>
                        <label htmlFor="password2">Confirm Password</label>
                        <input id="password2" type="password" value={this.state.password2} error={errors.password} onChange={this.onChange} />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default Register;
