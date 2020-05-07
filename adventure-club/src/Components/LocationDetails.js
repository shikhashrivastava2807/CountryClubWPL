import React, {Component} from "react";
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
        var current_ClubID = window.location.pathname.split('/');
        current_ClubID = current_ClubID[current_ClubID.length-1]
        return(
            <>
                {localStorage.first_name ? signedInButton : unSignedButton}
                <Link to={'/Activities/'+current_ClubID}>
                    <Button variant="primary" onClick={()=>this.setState({showModal:true})}>
                        View Activities
                    </Button>
                 </Link>

            </>
        );

    }
}

