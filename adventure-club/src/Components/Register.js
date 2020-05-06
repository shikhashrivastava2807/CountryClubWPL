import React, { Component } from 'react'
import { register } from './UserFunctions'
import $ from 'jquery'
import { Row, Col, Form, Dropdown } from "react-bootstrap";

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
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

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
      alert('Fill all the fields');
    }
    else{
      const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        membership_type: this.state.membership_type
      }
  
      register(newUser).then(res => {
        this.props.history.push(`/login`)
      })
    }
  }


 

  // componentDidMount() {

  //   $(document).ready(function() {

  //         // window.onload=function(){
  //   document.getElementById("check").onclick = function() {
  //     let allAreFilled = true;
  //     document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
  //       if (!allAreFilled) return;
  //       if (!i.value) allAreFilled = false;
  //     })
  //     if (!allAreFilled) {
  //       alert('Fill all the fields');
  //     }
  //   };
  // // }

  // });
  // }

  render() {
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
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="pwd"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
                            
              {/* <div className="form-group">
              <Form>
              <fieldset>
                <Form.Group as={Row}>
                <Form.Label as="legend" column sm={1}>
                                Membership Type
                </Form.Label>
                <Col sm={8}>
                <Form.Check
                    type="radio"
                    label="Basic"
                    name="membership_type"
                    id="membership_type"
                    value={this.state.membership_type}
                    onChange={this.onChange}
                    required
                />
                <Form.Check
                  type="radio"
                  label="Standard"
                  name="membership_type"
                  id="membership_type"
                  value={this.state.membership_type}
                  onChange={this.onChange}
                  required
                />
                <Form.Check
                  type="radio"
                  label="Premium"
                  name="membership_type"
                  id="membership_type"
                  value={this.state.membership_type}
                  onChange={this.onChange}
                  required
                />
                </Col>
                </Form.Group>
    </fieldset>
    </Form>
              </div> */}
              <button
                type="submit" id="check"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Register