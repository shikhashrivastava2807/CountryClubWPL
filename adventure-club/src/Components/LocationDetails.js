import React, {Component} from "react";
import Table from 'react-bootstrap/Table'
import { Check,X } from 'react-bootstrap-icons';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";


export class LocationDetails extends Component {
    constructor() {
        super()
        this.state = {
            clubsList : []
        }

    }
    render(){
        var current_ClubID = window.location.pathname.split('/');
        current_ClubID = current_ClubID[current_ClubID.length-1]
        return(
            <>
                 <Link to={'/Activities/'+current_ClubID}>
                    <Button variant="primary" onClick={()=>this.setState({showModal:true})}>
                        View Activities
                    </Button>
                 </Link>
                
            </>
        );

    }
}

