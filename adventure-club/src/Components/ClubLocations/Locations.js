import React, {Component} from "react";
import {Button,Col} from "react-bootstrap";
import {AddNewLocation} from "./AddNewLocation"
import {LocationList} from "./LocationList";
import {PlusCircleFill} from "react-bootstrap-icons";



export class Locations extends Component{
    constructor(props) {
        super(props);
        this.state = {locations:[], showModal:false}
    }

    render() {

         let addModalClose = () => this.setState({showModal:false}) ;
         const addNewClub = (
                 <Button className= 'float-right' variant="primary" onClick={()=>this.setState({showModal:true})}>
                     <span className='p-2'><PlusCircleFill/></span><span>Add New Locations</span>
                 </Button>
         )
        const showClub = (<></>)
        return(
            <>
                <AddNewLocation show={this.state.showModal} onHide={addModalClose}/>
                    <div className="float-right m-4">
                        <Col md={12}>
                            <div>
                            {(localStorage.isAdmin=== "true")?addNewClub:showClub}
                            </div>
                        </Col>
                    </div>
                    <div>
                        <Col md={12}>
                            <LocationList/>
                        </Col>
                    </div>
            </>
            )
    }
}