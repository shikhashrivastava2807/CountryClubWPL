import React from "react";
import { Form, Button, FormControl, Dropdown } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
// import { Button,  ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'


const StaticHeader =  () => (
    <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">HomeLogo</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="Locations">Club Locations</Nav.Link>
                <Nav.Link href="MembershipPlans">Membership Plans</Nav.Link>
                <Nav.Link href="Activities">Activities</Nav.Link>
                <Nav.Link href="Profile">Profile</Nav.Link>

            </Nav>
            <Form inline>
                
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                User Name
            </Dropdown.Toggle>

            

            <Dropdown.Menu>
                <Dropdown.Item href="Favorite">Favorites</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
      
            </Form>

            
        </Navbar>
    </>
);

export default StaticHeader;
