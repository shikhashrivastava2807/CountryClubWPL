import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {AddNewLocation} from "./AddNewLocation"
import {ClubLocationList} from "./ClubLocationList";

export class Locations extends Component{
    constructor(props) {
        super(props);
        this.state = {locations:[], showModal:false}
    }

    render() {

         let addModalClose = () => this.setState({showModal:false}) ;
        return(
            <>
                <Button variant="primary" onClick={()=>this.setState({showModal:true})}>
                    Add Locations
                </Button>
                <AddNewLocation show={this.state.showModal} onHide={addModalClose}/>
                <ClubLocationList/>
            </>
            )
    }
}