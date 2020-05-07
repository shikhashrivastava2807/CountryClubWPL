import React from 'react';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import {Modal, Button, Form} from 'react-bootstrap';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
function UserBooking() {
    var info = [];
    var columns;
    var lookup = {};
    var current_ClubID = window.location.pathname.split('/');
    current_ClubID = current_ClubID[current_ClubID.length-1];
    var userid = localStorage.getItem('email');
    var is_admin = localStorage.getItem('isAdmin');
    const [state, setState] = React.useState({
        columns: columns,
        data: info
    });
    const [show, setShow] = React.useState(false);

    const [bookAmenity, setAmenity] = React.useState(0);
    const dateInput = React.useRef(null)
    const handleClose = () => setShow(false);

    const delete_row = (id)=>{
        // console.log(id.split('-'));
        fetch('http://localhost:3000/booking/'+id, {
        method: "put",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "status": 0
        })
    })

    }

    const handleCloseSubmit = () =>{
        // console.log(bookAmenity);
        // console.log(dateInput.current.value);
        var param = bookAmenity.id.split('-');
        var club_id = param[0], activity_index = param[1], bookdate = dateInput.current.value;
        bookAmenity.date = dateInput.current.value;
        // console.log(activity_index)
        fetch('http://localhost:3000/book/', {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "clubid":club_id,
                "activityid":activity_index,
                "date": bookdate,
                "status": 1
            })
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            if(response.length>0){
                alert("Date not available!");
                return response;
            }
            else{
                fetch('http://localhost:3000/booking/', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        "userid": userid,
                        "clubid":club_id,
                        "activityid":activity_index,
                        "date": bookdate,
                        "status": 1
                    })
                })
                delete_row(bookAmenity.booking_id)
                
            }
        })
        
        setShow(false);
    }

    const handleShow = (data) => {
        setAmenity(data);
        setShow(true);
    }

    // console.log("admin status:"+is_admin);


    React.useEffect(()=>{

        fetch('http://localhost:3000/book/', {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "userid":userid,
                "status": 1
            })
        }).then(response=>response.json()).then((user_fav)=>{
            fetch('http://localhost:3000/clubs/', { method: "get" }).then((response) => {
                return response.json();
            }).then((data) => {
                if(user_fav==null){
                    user_fav = {};
                }
                console.log(user_fav);
                var i, j, club_name, club_objID, index;
                for(i=0;i<data.length;i++){

                club_name = data[i].club_name;
                club_objID = data[i]._id;
                lookup[club_objID] = club_name;
                 
                for(j=0;j<data[i].activities.length;j++){
                    
                    index = -1
                    user_fav.forEach((element,idx) => {
                        if (element.clubid==club_objID && element.activityid==j && data[i].status==1 && data[i].activities[j].status==1){
                            index = idx
                            console.log("ok - "+element.activityid,j,index,data[i].status,data[i].activities[j].status)
                            info.push({
                                id: club_objID+"-"+j,
                                name: data[i].activities[j].name,
                                description: data[i].activities[j].description,
                                category: data[i].activities[j].category,
                                date: element.date,
                                booking_id: element._id,
                                club_name: club_objID,
                            });
                        }
                        // else
                            // console.log("no - "+element.activityid,j,index,data[i].status,data[i].activities[j].status)

                    });
                }}

                columns = [
                    // {title: 'id', field:'id'},
                    { title: 'Amenity', field: 'name' , filtering: false, editable: 'never'},
                    { title: 'Description', field: 'description', filtering: false, editable: 'never'},
                    { title: 'Category', field: 'category', editable: 'never' },
                    { title: 'Date', field: 'date' , filtering: false},
                    { title: 'Booking id', field: 'booking_id' , hidden: true, editable: 'never'},
                    { title: 'Club Name', field: 'club_name' , lookup: lookup}
                ];

                info = Object.keys(info).map(i => info[i])
                columns = Object.keys(columns).map(i => columns[i])

                setState({
                    columns: columns,
                    data: info
                })
            });
        })


    },[]);

        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <MaterialTable
                    title="Manage Your Booking!"
                    columns={state.columns}
                    data={state.data}
                    options={{
                        filtering: true
                    }}
                    actions={[
                        rowData=>({
                            icon: ConfirmationNumberIcon,
                            tooltip: 'Confirm Booking',
                            disabled: rowData.booking_needed == "0",
                            onClick: (event, oldData) =>
                                new Promise((resolve) => {
                                    // console.log(FavoriteIcon);
                                    event.button = 1;
                                    setTimeout(() => {
                                        resolve();
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            // console.log(prevState);
                                            // console.log(prevState.data[prevState.data.indexOf(oldData)]);
                                            // data[data.indexOf(oldData)].fav_flag = 1;
                                            handleShow(data[data.indexOf(oldData)]);
                                            // add_fav(prevState.data[prevState.data.indexOf(oldData)].id);
                                            // alert("You want to add a new row")
                                            // data.splice(data.indexOf(oldData), 1);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                })
                        }),
                        rowData=>({
                            icon: CancelIcon,
                            tooltip: 'Confirm Booking',
                            disabled: rowData.booking_needed == "0",
                            onClick: (event, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        console.log(prevState.data[prevState.data.indexOf(oldData)]);
                                        delete_row(prevState.data[prevState.data.indexOf(oldData)].booking_id);
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            })
                        })
                    ]}

                />
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Date</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="date">
                                <Form.Label>Enter date</Form.Label>
                                <Form.Control type="date" placeholder="Enter date" ref={dateInput}/>
                                <Form.Text className="text-muted">
                                    Select date to check availability!
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" onClick={handleCloseSubmit}>
                                Confirm Booking!
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>

            </div>
        );

    
}

export default UserBooking;