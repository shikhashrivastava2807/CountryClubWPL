import React, { Component } from 'react'
import { login } from './UserFunctions'
import { Button } from 'react-bootstrap';
import {AddLoginModal} from './AddLoginModal';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {},
      addModalShow: false,
      errorMessage:''
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
      this.setState({addModalShow: true, errorMessage:"Please enter Email Address and Password!"})
    }
    else{
      const user = {
             email: this.state.email,
             password: this.state.password
           }

           login(user).then(res => {
            if (res.isAxiosError && res.response && res.response.status === 401) {
              this.setState({addModalShow: true, errorMessage:"Please enter correct Username/Password."})
            } else {
              this.props.history.push(`/`)
           }
           })

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
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign In
              </button>
              <AddLoginModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            errorMessage={this.state.errorMessage} />
            </form>
            <div className="p-2">
            <Button variant="outline-info" href="/register">Not a member? Register now</Button>
          
            </div>

          </div>
        </div>
      </div>
     </div>
    )
  }

}


export default Login