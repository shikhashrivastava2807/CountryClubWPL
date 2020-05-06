import React from "react";
import Table from 'react-bootstrap/Table'
import { Check,X } from 'react-bootstrap-icons';


const MembershipPlans =  () => (
    <>
        <p>There are 2 Membership Plans:</p>
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
    </>
);

export default MembershipPlans;