import React, {Component} from "react";
import {Button,Modal,Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {editClub} from "./LocationFunction";

export class EditLocationDetails extends Component {
    state = {
        id: this.props.id,
        club_name: this.props.club_name,
        club_type: this.props.club_type,
        address_line1: this.props.address_line1,
        address_line2: this.props.address_line2,
        zip: this.props.zip,
        city: this.props.city,
        states: this.props.states,
        images_path1: this.props.images_path1,
        images_path2: this.props.images_path2,
        images_path3: this.props.images_path3,
        description: this.props.description
    };


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


     onSubmit = event => {
        const clubInfo = {
            id: this.state.id,
            club_name: this.state.club_name,
            club_type: this.state.club_type,
            address_line1: this.state.address_line1,
            address_line2: this.state.address_line2,
            zip: this.state.zip,
            City: this.state.city,
            State: this.state.states,
            imagesPath: [
                this.state.images_path1,
                this.state.images_path2,
                this.state.images_path3
            ],
            description: this.state.description
        };
        editClub(clubInfo).then(res => {
            console.log('onedit')
            this.props.onHide();
        });
    }

    render() {
        const data = require('../../assets/states-list');

        let stateList = data.map(function(item) {
            return (
                <option key={item.name}>{item.name}</option>
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
                            Edit Club Locations
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
                                                  onChange = {this.handleChange}
                                                  required
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="clubType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select"
                                                  name="club_type"
                                                  value={this.state.club_type}
                                                  onChange = {this.handleChange}>
                                        <option >Choose...</option>
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
                                              onChange = {this.handleChange}
                                              required/>
                            </Form.Group>
                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment, studio, or floor"
                                              name="address_line2"
                                              value={this.state.address_line2}
                                              onChange = {this.handleChange}
                                              required/>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name="city"
                                                  value={this.state.city}
                                                  onChange = {this.handleChange}
                                                  required/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control as="select"
                                                  name="states"
                                                  value={this.state.states}
                                                  onChange = {this.handleChange}
                                                  required>
                                        <option>Choose...</option>
                                        {stateList}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control name="zip"
                                                  value={this.state.zip}
                                                  onChange = {this.handleChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formDemoImage1">
                                    <Form.Label>Image1</Form.Label>
                                    <Form.Control placeholder="abc.jpg/abc.png"
                                                  name="images_path1"
                                                  value={this.state.images_path1}
                                                  onChange = {this.handleChange}
                                                  required/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDemoImage2">
                                    <Form.Label>Image2</Form.Label>
                                    <Form.Control placeholder="abc.jpg/abc.png"
                                                  name="images_path2"
                                                  value={this.state.images_path2}
                                                  onChange = {this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDemoImage3">
                                    <Form.Label>Image3</Form.Label>
                                    <Form.Control placeholder="abc.jpg/abc.png"
                                                  name="images_path3"
                                                  value={this.state.images_path3}
                                                  onChange = {this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea"
                                                  rows="2"
                                                  name="description"
                                                  value={this.state.description}
                                                  onChange = {this.handleChange}/>
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