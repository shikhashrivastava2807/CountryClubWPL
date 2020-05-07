import React, { Component } from 'react'
import axios from 'axios'
import {Table, Column, Cell} from 'fixed-data-table';

class UserDetails extends Component {
  
       state = {
           userdetails: []
       }

      getUserdetails = () => {
        return axios
          .get('http://localhost:3000/users/userdetails', {})
          .then(response => {
            console.log(response)
            this.setState( {userdetails: response.data} )
          })
          .catch(err => {
            console.log(err)
          })
      }

    componentDidMount() {

        this.getUserdetails();

    }
    render() {
   
    let userdetails =this.state.userdetails.map(function(item) {
        return (
            <tr><td>{item.first_name}</td></tr>
        );
    });

    console.log("Hello")
    
    return(
        <>
        <Table>  
        </Table>
        </>
    )

}

}

export default UserDetails;
