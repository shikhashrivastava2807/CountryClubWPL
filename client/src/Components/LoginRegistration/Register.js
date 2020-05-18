import React, { Component } from 'react'
import { register } from './UserFunctions'
import { Form } from "react-bootstrap";
import {AddRegisterModal} from './AddRegisterModal';
import $ from 'jquery';


class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            membership_type: '',
            isAdmin: false,
            errors: {},
            addModalShow: false,
            errorMessage: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

//using jquery to validate that all mandatory fields are filled
    validate() {
        let allAreFilled = true;
        document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
            if (!allAreFilled) return;
            if (!i.value) allAreFilled = false;
        })
        return allAreFilled;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        let allAreFilled = true;
        document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
            if (!allAreFilled) return;
            if (!i.value) allAreFilled = false;
        })
        if(!allAreFilled) {
            this.setState({addModalShow: true, errorMessage:"Kindly fill all the fields!"})
        }
        else{
            const newUser = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                membership_type: this.state.membership_type,
                isAdmin: this.state.isAdmin
            }

            register(newUser).then(res => {
                if(res.error){
                    this.setState({addModalShow: true, errorMessage:res.error+'!'})
                }else{
                    this.props.history.push(`/login`)
                }
            })
        }
    }

    //using jquery to validate password Strength
    onChangePassword = event => {
        this.setState({ password: event.target.value });
        $('#PasswordStrength').removeClass('weakPassword');
        $('#PasswordStrength').removeClass('mediumPassword');
        $('#PasswordStrength').removeClass('strongPassword');
        $('#PasswordStrength').text('')
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(event.target.value.length) {
            if(!strongRegex.test(event.target.value)){
                $('#PasswordStrength').text('Weak')
                $('#PasswordStrength').addClass('weakPassword')
            }
            else if(strongRegex.test(event.target.value) && event.target.value.length<= 12){
                $('#PasswordStrength').text('Medium')
                $('#PasswordStrength').addClass('mediumPassword')
            }
            else{
                $('#PasswordStrength').text('Strong')
                $('#PasswordStrength').addClass('strongPassword')
            }
        }
    }
    render() {
        let addModalClose = () => this.setState({addModalShow: false});
        return (
            <div id="myForm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                                <div className="form-group">
                                    <label htmlFor="name">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        placeholder="Enter your first name"
                                        value={this.state.first_name}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        placeholder="Enter your lastname name"
                                        value={this.state.last_name}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group" id="passwordDiv">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="pwd"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        required
                                    />
                                    <span id="PasswordStrength" className="float-left" style={{fontSize:12+'px'}}></span>
                                </div>

                                <div className="form-group">
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Membership Type</Form.Label>
                                            <Form.Control as="select"
                                                          id="membership_type"
                                                          name="membership_type"
                                                          value={this.state.membership_type}
                                                          onChange = {this.onChange}
                                                          required>
                                                <option>Choose...</option>
                                                <option>Standard Membership</option>
                                                <option>Basic Membership</option>
                                                <option>Premium Membership</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <button
                                    type="submit" id="check"
                                    className="btn btn-lg btn-primary btn-block"
                                >
                                    Register!
                                </button>
                                <AddRegisterModal
                                    show={this.state.addModalShow}
                                    onHide={addModalClose}
                                    message={this.state.errorMessage}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register