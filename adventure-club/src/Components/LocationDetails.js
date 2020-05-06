import React, {Component} from "react";
import Table from 'react-bootstrap/Table'
import { Check,X } from 'react-bootstrap-icons';
import {Button} from "react-bootstrap";



export class LocationDetails extends Component {
    constructor() {
        super()
        this.state = {
            clubsList : []
        }

    }
    render(){
        return(
            <>
                <Button variant="primary" onClick={()=>this.setState({showModal:true})}>
                    View Activities
                </Button>
            </>
        );

    }
}

