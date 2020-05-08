import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";


export class LocationDetails extends Component {
    constructor() {
        super()
        this.state = {
            clubsDetails : {},
            imagesPath1:'',
            imagesPath2:'',
            imagesPath3:''
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
                this.setState({imagePath1: data.imagesPath[0]});
                this.setState({imagePath2: data.imagesPath[1]});
                this.setState({imagePath3: data.imagesPath[2]});
                console.log(this.state.clubsDetails.imagesPath[0])

            })
            .catch(err => {
                console.log(err)
            })
    }
    imagesPath1;
    imagesPath2;
    imagesPath3;
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
            <Link to={'/Amenities/'+current_ClubID}>
                <Button variant="primary" onClick={()=>this.setState({showModal:true})}>
                    View Amenities
                </Button>
            </Link>
        )
        if (!this.state.clubsDetails.club_name) {
            return <span>Loading...</span>;
        }else{
            this.imagesPath1 = this.state.clubsDetails.imagesPath[0]?require('../../images/'+this.state.clubsDetails.imagesPath[0])
                :require('../../images/background.jpg');
            this.imagesPath2 = this.state.clubsDetails.imagesPath[1]?require('../../images/'+this.state.clubsDetails.imagesPath[1])
                :require('../../images/background.jpg');
            this.imagesPath3 = this.state.clubsDetails.imagesPath[2]?require('../../images/'+this.state.clubsDetails.imagesPath[2])
                :require('../../images/background.jpg');
        }

        return(
            <>
                <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100"
                                 src={this.imagesPath1}
                                 style={{height:610+'px'}}
                                 mode='fit'
                                 alt={this.state.clubsDetails.club_name}/>
                            <Carousel.Caption>
                                <h4>{this.state.clubsDetails.club_name},{this.state.clubsDetails.State}
                                </h4>
                            </Carousel.Caption>
                        </Carousel.Item>
                    <Carousel.Item>
                            <img className="d-block w-100"
                                 src={this.imagesPath2}
                                 style={{height:610+'px'}}
                                 mode='fit'
                                 alt={this.state.clubsDetails.club_name}/>
                            <Carousel.Caption>
                                <h4>{this.state.clubsDetails.club_name},{this.state.clubsDetails.State}</h4>
                            </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                            <img className="d-block w-100"
                                 src={this.imagesPath3}
                                 style={{height:610+'px'}}
                                 mode='fit'
                                 alt={this.state.clubsDetails.club_name}/>
                        <Carousel.Caption>
                                <h4>{this.state.clubsDetails.club_name},{this.state.clubsDetails.State}</h4>
                            </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100"
                             src={require('../../images/amenities.jpg')}
                             style={{height:610+'px'}}
                             mode='fit'
                             alt={this.state.clubsDetails.club_name}/>
                        <Carousel.Caption>
                            <h4>{this.state.clubsDetails.club_name},{this.state.clubsDetails.State}</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className='m-4'>
                    <p>
                        {this.state.clubsDetails.description}
                    </p>
                    {localStorage.first_name ? signedInButton : unSignedButton}
                </div>
            </>
        );

    }
}

