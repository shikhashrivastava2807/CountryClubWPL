import React, {Component} from "react";
import {Button} from "react-bootstrap";



export class LocationDetails extends Component {
    constructor() {
        super()
        this.state = {
            clubsList : []
        }

    }
    render(){
        const unSignedButton = (
            <>
            <p>To Book Activities</p>
            <Button variant="primary" onClick={()=>this.setState({showModal:true})}>
                Become A member
            </Button>
            </>
        )
        const signedInButton = (
            <Button variant="primary">
                View and Book Activities
            </Button>
        )
        return(
            <>
                {localStorage.first_name ? signedInButton : unSignedButton}
            </>
        );

    }
}

