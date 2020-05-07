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
      addModalShow: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }



  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value })
  // }
  // onSubmit(e) {
  //   e.preventDefault()

  //   const user = {
  //     email: this.state.email,
  //     password: this.state.password
  //   }

  //   login(user).then(res => {
  //     if (res) {
  //       this.props.history.push(`/`)
  //     } else {
  //       this.props.history.push(`/error`)
  //     }
  //   })
  // }

  
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
      // alert('Please enter email address and password');
      this.setState({addModalShow: true})
    }
    else{
      const user = {
             email: this.state.email,
             password: this.state.password
           }

           login(user).then(res => {
            if (res) {
               this.props.history.push(`/`)
             } else {
               //this.props.history.push(`/error`)
             
               alert('Invalid username/password');
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
            onHide={addModalClose} />
            </form>
            <div className="p-2">
            <Button variant="outline-info" href="register">Not a member? Register now</Button>
          
            </div>

          </div>
        </div>
      </div>
     </div>
    )
  }

}


export default Login