import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Dropdown,Col } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { PersonFill,BrightnessHighFill,LockFill } from 'react-bootstrap-icons';

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

  render() {
  
    console.log(localStorage.isAdmin)
    const loginRegLink = (
      <Navbar bg="dark" variant="dark" style={{width:100+'%'}} >
      <Col md={10}>
      <Nav className="mr-auto">
          <Nav.Link href="/Locations">Club Locations</Nav.Link>
          <Nav.Link href="MembershipPlans">Membership Plans</Nav.Link>
      </Nav>
      </Col>
      <Col md={2}>
      <div className = "float-right">
      <Button variant="outline-info" href="login" className = "float-right"  >
      <LockFill color="white" size ={14}/>
         Member Login</Button>
      </div>  
      </Col>

        </Navbar>
    )

    const userLink = (
      
      <Navbar bg="dark" variant="dark" style={{width:100+'%'}}>
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
      <Navbar bg="dark" variant="dark" style={{width:100+'%'}}>
      <Nav className="mr-auto">
          <Nav.Link href="/Locations">Club Locations</Nav.Link>
          <Nav.Link href="/MembershipPlans">Membership Plans</Nav.Link>
          <Nav.Link href="/Activities">Activities</Nav.Link>
          <Nav.Link href="/UserDetails">Users</Nav.Link>
          </Nav>

          <Form inline>
          <Dropdown>

            <Dropdown.Toggle variant="success" id="dropdown-basic">
            <PersonFill  color="white" />
             {localStorage.first_name}
            </Dropdown.Toggle>
          <Dropdown.Menu>
                <Dropdown.Item href="" onClick={this.logOut.bind(this)}>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </Form>

        </Navbar>
    )


    return (
      <Navbar bg="dark" variant="dark">
        <div>
        <BrightnessHighFill color="white" />
        </div>
      <Col md={2}>
      <Navbar.Brand href="/">
      Comets Country Club</Navbar.Brand></Col>
      <Col md={10}>
      <Nav className="mr-auto">
      {localStorage.first_name ? ((localStorage.isAdmin === "true") ? adminLink : userLink) : loginRegLink}
      </Nav>
      </Col>
      </Navbar>
    )
  }
}

export default withRouter(HomePage)