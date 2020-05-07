import React, {useState, Component} from "react";
import {Button,Modal,Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {createNewClubs} from "./ClubLocationFunction";

export class AddNewLocation extends Component {
    constructor() {
        super()
        this.state = {
            club_name: '',
            club_type: '',
            address_line1: '',
            address_line2: '',
            zip: '',
            city: '',
            states: '',
            imagesPath1: '',
            imagesPath2: '',
            imagesPath3: '',
            description: ''
        };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        const newClub = {
            club_name: this.state.club_name,
            club_type: this.state.club_type,
            address_line1: this.state.address_line1,
            address_line2: this.state.address_line2,
            zip: this.state.zip,
            City: this.state.city,
            State: this.state.states,
            imagesPath: [
                this.state.imagesPath1,
                this.state.imagesPath2,
                this.state.imagesPath3
            ],
            description: this.state.description
        };
        createNewClubs(newClub).then(res => {
            this.props.onHide();
            // this.props.history.push(`/Locations`)
        });
    }

    render() {
        const data = require('../assets/states-list');

        let stateList = data.map(function(item) {
            return (
                <option>{item.name}</option>
            );
        });

        return(
            <>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New Club Locations
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="clubName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text"
                                                  name="club_name"
                                                  value={this.state.club_name}
                                                  placeholder="Enter Location Name"
                                                  onChange = {this.onChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="clubType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select"
                                                  name="club_type"
                                                  value={this.state.club_type}
                                                  onChange = {this.onChange}>
                                        <option>Choose...</option>
                                        <option>Beach</option>
                                        <option>Mountains</option>
                                        <option>City</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St"
                                              name="address_line1"
                                              value={this.state.address_line1}
                                              onChange = {this.onChange}/>
                            </Form.Group>
                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment, studio, or floor"
                                              name="address_line2"
                                              value={this.state.address_line2}
                                              onChange = {this.onChange}/>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name="city"
                                                  value={this.state.city}
                                                  onChange = {this.onChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control as="select"
                                                  name="state"
                                                  value={this.state.state}
                                                  onChange = {this.onChange}>
                                        <option>Choose...</option>
                                        {stateList}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control name="imagesPath1"
                                                  value={this.state.imagesPath1}
                                                  onChange = {this.onChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formDemoImage1">
                                    <Form.Label>Image1</Form.Label>
                                    <Form.Control placeholder="abc.jpg/abc.png"
                                                  name="imagesPath1"
                                                  value={this.state.imagesPath1}
                                                  onChange = {this.onChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDemoImage2">
                                    <Form.Label>Image2</Form.Label>
                                    <Form.Control placeholder="abc.jpg/abc.png"
                                                  name="imagesPath2"
                                                  value={this.state.imagesPath2}
                                                  onChange = {this.onChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDemoImage3">
                                    <Form.Label>Image3</Form.Label>
                                    <Form.Control placeholder="abc.jpg/abc.png"
                                                  name="imagesPath3"
                                                  value={this.state.imagesPath3}
                                                  onChange = {this.onChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea"
                                                  rows="2"
                                                  name="description"
                                                  value={this.state.description}
                                                  onChange = {this.onChange}/>
                                </Form.Group>
                            </Form.Row>
                            <div className="float-right">
                                <Button className="m-1" onClick={this.props.onHide} variant="outline-primary">Cancel</Button>
                                <Button className="m-1" type="Submit" variant="primary">Save</Button>
                            </div>
                        </Form>
                    </Modal.Body>

                </Modal>
              </>
        )

    }

}