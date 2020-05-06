import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
//import Profile from './Profile';
import jwt_decode from 'jwt-decode'
import { Form, Button, FormControl, Dropdown } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class HomePage extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('first_name')
    localStorage.removeItem('last_name')
    localStorage.removeItem('email')
    localStorage.removeItem('isAdmin')

    this.props.history.push(`/`)
  }

  reDirect(e) {
    e.preventDefault()
    this.props.history.push(`/`)
  }

  // constructor() {
  //   super()
  //   this.state = {
  //     first_name: '',
  //     last_name: '',
  //     email: '',
  //     errors: {}
  //   }
  // }

  // componentDidMount() {
  //   const token = localStorage.usertoken
  //   const decoded = jwt_decode(token)
  //   this.setState({
  //     first_name: decoded.first_name,
  //     // last_name: decoded.last_name,
  //     // email: decoded.email
  //   })
  // }


  render() {
  
    console.log(localStorage.isAdmin)
    const loginRegLink = (
      <Navbar bg="dark" variant="dark">
      {/* <Navbar.Brand href="/">HomeLogo</Navbar.Brand> */}
      <Nav className="mr-auto">
          <Nav.Link href="Locations">Club Locations</Nav.Link>
          <Nav.Link href="MembershipPlans">Membership Plans</Nav.Link>
      </Nav>
      <div className = "float-right"> 
      <Button variant="outline-info" href="login">Sign In</Button>
      </div>  
        </Navbar>
    )

    const userLink = (
      
      <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
          <Nav.Link href="/Locations">Club Locations</Nav.Link>
      </Nav>
      <Form inline>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            Hi {localStorage.first_name}
            </Dropdown.Toggle>
          <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/Favorite">Favorites</Dropdown.Item>
                <Dropdown.Item href="" onClick={this.logOut.bind(this)}>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </Form>    
        </Navbar>   
    )

    const adminLink = (
      <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
          <Nav.Link href="/Locations">Club Locations</Nav.Link>
          <Nav.Link href="/MembershipPlans">Membership Plans</Nav.Link>
          <Nav.Link href="/Activities">Activities</Nav.Link>
          <Nav.Link href="/UserDetails">Users</Nav.Link>
          </Nav>
          <Form inline>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            Hi {localStorage.first_name}
            </Dropdown.Toggle>
          <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="" onClick={this.logOut.bind(this)}>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </Form>  
        </Navbar>
    )

    // const showNavBar = function(){
    //   if(localStorage.first_name){
    //     if(localStorage.isAdmin) {
    //       return adminLink
    //     }
    //     return userLink
    //   }
    //   return loginRegLink
    //   // return (localStorage.first_name ? (localStorage.isAdmin ? adminLink : userLink) : loginRegLink);
    // }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.first_name ? ((localStorage.isAdmin === "True") ? adminLink : userLink) : loginRegLink}
          {console.log(localStorage.isAdmin)}
        </div>
      </nav>
    )
  }
}

export default withRouter(HomePage)