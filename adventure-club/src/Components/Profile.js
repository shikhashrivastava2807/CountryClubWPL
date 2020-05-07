import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

import BackgroundImage from '../images/golf.jpg';

var sectionStyle = {
   backgroundImage: `url(${BackgroundImage})`,
   width: '100%',
  height: '900px'
}

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      membership_type: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.setState({
      first_name: localStorage.first_name,
      last_name: localStorage.last_name,
      email: localStorage.email,
      membership_type: localStorage.membership_type,
      isAdmin: localStorage.isAdmin
    })
    console.log(JSON.stringify(this.state));
  }

  render() {
    return (
      
      <div  style={sectionStyle}>
        
        <Table striped bordered variant="dark" className='m-5'>
<thead>
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Membership Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>{localStorage.first_name}</td>
    <td>{localStorage.last_name}</td>
    <td>{localStorage.email}</td>
    <td>{localStorage.membership_type}</td>
  </tr>
</tbody>
</Table>
        </div>


    )
  }
}

export default Profile