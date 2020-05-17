import React, {Component} from "react";
import {Button,Modal,Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {editClub} from "./LocationFunction";

export class DeleteLocation extends Component {
    state = {
        id: this.props.id,
        club_name: this.props.club_name
    };

    onSubmit = event => {
        const clubInfo = {
            status: "0"
        };
        editClub(this.state.id,clubInfo).then(res => {
            this.props.onHide();
        });
    }

    render() {
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
                            Delete Locations
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <p>Are you Sure you want to delete?{this.state.club_name}</p>
                            <div className="float-right">
                                <Button className="m-1" onClick={this.props.onHide} variant="outline-primary">Cancel</Button>
                                <Button className="m-1" type="Submit" variant="primary">Delete</Button>
                            </div>
                        </Form>
                    </Modal.Body>

                </Modal>
            </>
        )

    }

}