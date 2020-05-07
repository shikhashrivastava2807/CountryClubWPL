import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";


export class LocationDetails extends Component {
    constructor() {
        super()
        this.state = {
            clubsDetails : {}
        }

    }
    async componentDidMount() {
        this.GetClubDetails();
    }
    GetClubDetails = () => {
        let current_ClubID = window.location.pathname.split('/');
        current_ClubID = current_ClubID[current_ClubID.length-1]
        return axios
            .get('http://localhost:3000/clubs/'+current_ClubID, {
                //headers: { Authorization: ` ${this.getToken()}` }
            })
            .then(response => {
                const data = response.data;
                this.setState({clubsDetails: data})
            })
            .catch(err => {
                console.log(err)
            })
    }
    render(){
        const unSignedButton = (
            <>
                <p>To Book Activities</p>
                <Button variant="primary" href="/register">
                    Become A member
                </Button>
            </>
        )

        let current_ClubID = window.location.pathname.split('/');
        current_ClubID = current_ClubID[current_ClubID.length-1]

        const signedInButton = (
            <Link to={'/Activities/'+current_ClubID}>
                <Button variant="primary" onClick={()=>this.setState({showModal:true})}>
                    View Activities
                </Button>
            </Link>
        )
        return(
            <>
                {localStorage.first_name ? signedInButton : unSignedButton}
                <p>{this.state.clubsDetails.club_name}</p>

            </>
        );

    }
}

