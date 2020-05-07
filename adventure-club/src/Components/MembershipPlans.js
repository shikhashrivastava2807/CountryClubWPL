import React from "react";
import Table from 'react-bootstrap/Table'
import { Check,X } from 'react-bootstrap-icons';
import { Card, CardDeck, Button } from 'react-bootstrap';
import BackgroundImage from '../images/background.jpg';

var sectionStyle = {
   backgroundImage: `url(${BackgroundImage})`,
   width: '100%',
  height: '900px'
}
const MembershipPlans =  () => (
    <>
        
        <div style={sectionStyle}> 
        <div style={{color:"white"}}>
        Membership Plans
        </div>  
        
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th></th>
                <th>Basic</th>
                <th>Standard</th>
                <th>Premium</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Monthly Payment</td>
                <td>$24.99</td>
                <td>$49.99</td>
                <td>$99.99</td>
            </tr>
            <tr>
                <td>Total Guests</td>

                <td>2</td>
                <td>4</td>
                <td>6</td>
            </tr>
            <tr>
                <td>Max. Visit every Month</td>
                <td>4</td>
                <td>10</td>
                <td>Unlimited</td>
            </tr>
            <tr>
                <td>Spa Access</td>
                <td><X /></td>
                <td><Check /></td>
                <td><Check /></td>
            </tr>
            <tr>
                <td>Fast Track Activities</td>
                <td><X /></td>
                <td><Check /></td>
                <td><Check /></td>
            </tr>
            <tr>
                <td>Free Meal Pass</td>
                <td><X /></td>
                <td><X /></td>
                <td><Check /></td>
            </tr>
            </tbody>
        </Table>
        <CardDeck>
  <Card>
    <Card.Body>
      <Card.Title>Basic Membership</Card.Title>
      <Card.Text>
      Privileges include 18-hole golf course and access to our lounge. Includes children under 12.
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Body>
      <Card.Title>Standard Membership</Card.Title>
      <Card.Text>
      Privileges of inviting your extended family and friends with access to Fast Track Activities and the Spa!
      </Card.Text>
    </Card.Body>

  </Card>
  <Card>
    <Card.Body>
      <Card.Title>Premium Membership</Card.Title>
      <Card.Text>
         Unlimited access to all club amenities!
      </Card.Text>
    </Card.Body>
  </Card>
</CardDeck>
<div className = 'm-3'>
<Button variant="info" href="register">Not a member yet? Register now!</Button>
    </div>
</div>
    </>
);

export default MembershipPlans;