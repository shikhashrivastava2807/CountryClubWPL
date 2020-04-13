import React from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const StaticHeader =  () => (
    <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">HomeLogo</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="Locations">Club Locations</Nav.Link>
                <Nav.Link href="MembershipPlans">Membership Plans</Nav.Link>
            </Nav>
            <Form inline>
                <Button variant="outline-info">SignIn</Button>
            </Form>
        </Navbar>
    </>
);

export default StaticHeader;