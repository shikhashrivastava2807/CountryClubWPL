import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";


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
                <Button variant="info" href="/register">
                    Not a member yet? Register Now!
                </Button>
            </>
        )

        let current_ClubID = window.location.pathname.split('/');
        current_ClubID = current_ClubID[current_ClubID.length-1]

        const signedInButton = (
            <Link to={'/Amenitties/'+current_ClubID}>
                <Button variant="primary" onClick={()=>this.setState({showModal:true})}>
                    View Amenitties
                </Button>
            </Link>
        )
        return(
            <>
                <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100"
                                 src={require("../images/florida.jpg")}
                                 style={{height:610+'px'}}
                                 mode='fit' />
                            <Carousel.Caption>
                                <h3>{this.state.clubsDetails.club_name}{this.state.clubsDetails.state}</h3>
                                <p>
                                    {this.state.clubsDetails.description}
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    <Carousel.Item>
                            <img className="d-block w-100"
                                 src={require("../images/camp.jpg")}
                                 style={{height:610+'px'}}
                                 mode='fit' />
                            <Carousel.Caption>
                                <h3>{this.state.clubsDetails.club_name}{this.state.clubsDetails.state}</h3>
                                <p>
                                    {this.state.clubsDetails.description}
                                </p>
                            </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                            <img className="d-block w-100"
                                 src={require("../images/camp.jpg")}
                                 style={{height:610+'px'}}
                                 mode='fit' />
                            <Carousel.Caption>
                                <h3>Mountain Adventures</h3>
                                <p>
                                    Explore the wonder of camping surrounded by the mountains
                                </p>
                            </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className='m-4'>
                    {localStorage.first_name ? signedInButton : unSignedButton}
                </div>
            </>
        );

    }
}

