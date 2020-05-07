import React from 'react';
import MaterialTable from 'material-table';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Modal, Button, Form} from 'react-bootstrap';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
function AllAminities() {
    var info = [];
    var columns;
    var lookup = {};
    var booking_lookup = {
        "1":"Yes",
        "0":"No",
        1:"Yes",
        0:"No"
    }
    var current_ClubID = window.location.pathname.split('/');
    current_ClubID = current_ClubID[current_ClubID.length-1];
    var userid = localStorage.getItem('email');
    var is_admin = localStorage.getItem('isAdmin');
    const [state, setState] = React.useState({
        columns: columns,
        data: info
    });
    const [show, setShow] = React.useState(false);

    const [bookAminity, setAminity] = React.useState(0);
    const dateInput = React.useRef(null)
    const handleClose = () => setShow(false);

    const handleCloseSubmit = () =>{
        // console.log(bookAminity);
        // console.log(dateInput.current.value);
        var param = bookAminity.id.split('-');
        var club_id = param[0], activity_index = param[1], bookdate = dateInput.current.value;
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
            }
        })
        setShow(false);
    }

    const handleShow = (data) => {
        setAminity(data);
        setShow(true);
    }

    // console.log("admin status:"+is_admin);


    React.useEffect(()=>{

        fetch('http://localhost:3000/fav/'+userid, { method: "get" }).then((response) => {
            return response.json();
        }).then((user_fav)=>{
            fetch('http://localhost:3000/clubs/'+current_ClubID, { method: "get" }).then((response) => {
                return response.json();
            }).then((data) => {
                if(user_fav==null){
                    fetch('http://localhost:3000/fav/', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify({"_id": userid})
                    })
                    user_fav = {};
                }
                var i, j, club_name, club_objID, val;
                club_name = data.club_name;
                club_objID = data._id;
                lookup[club_objID] = club_name;
                for(j=0;j<data.activities.length;j++){
                    val = 0
                    if(Object.keys(user_fav).includes(data._id)){
                        if (user_fav[data._id].includes(j.toString())){
                            val = 1;
                        }
                    }

                    if(data.status=='1' && data.activities[j].status==1){
                        info.push({
                            id: club_objID+"-"+j,
                            name: data.activities[j].name,
                            description: data.activities[j].description,
                            category: data.activities[j].category,
                            booking_needed: data.activities[j].booking_needed,
                            club_name: club_objID,
                            fav_flag: val
                        });
                        // console.log(data._id, data.activities[j].name);
                    }

                }

                columns = [
                    // {title: 'id', field:'id'},
                    { title: 'fav', field: 'fav_flag', editable: 'never', hidden: true},
                    { title: 'Aminity', field: 'name' , filtering: false},
                    { title: 'Description', field: 'description', filtering: false },
                    { title: 'Category', field: 'category' },
                    { title: 'Booking required', field: 'booking_needed' , lookup: booking_lookup},
                    { title: 'Club Name', field: 'club_name' , lookup: lookup, editable: 'onAdd'}
                ];

                info = Object.keys(info).map(i => info[i])
                info.sort((a, b) => (a.fav_flag > b.fav_flag) ? -1 : 1)
                columns = Object.keys(columns).map(i => columns[i])

                setState({
                    columns: columns,
                    data: info
                })
            });
        })


    },[]);

    if (is_admin=='false'){

        const add_fav = (id)=>{
            // console.log(id.split('-'));
            var param = id.split('-');
            var club_id = param[0], activity_index = param[1];
            fetch('http://localhost:3000/fav/'+userid, { method: "get" }).then((response) => {
                return response.json();
            }).then((user_fav)=>{
                delete user_fav._id;
                if(!Object.keys(user_fav).includes(club_id)){
                    user_fav[club_id] = new Array();
                }
                if(!user_fav[club_id].includes(activity_index)){
                    // console.log("added: "+activity_index);
                    user_fav[club_id].push(activity_index);
                }
                return user_fav;
            }).then((user_fav)=>{
                // console.log(user_fav);
                return fetch('http://localhost:3000/fav/'+userid, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(user_fav)
                });
            });

        }

        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <MaterialTable
                    title="Aminities information"
                    columns={state.columns}
                    data={state.data}
                    actions={[

                        rowData=>({
                            icon: FavoriteIcon,
                            tooltip: 'Add To Favorite',
                            disabled: rowData.fav_flag == "1",
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
                                            data[data.indexOf(oldData)].fav_flag = 1;
                                            add_fav(prevState.data[prevState.data.indexOf(oldData)].id);
                                            // data.splice(data.indexOf(oldData), 1);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                })
                        }),


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
                        })

                    ]}
                    options={{
                        filtering: true
                    }}
                />
                {/* Modal */}


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

    else{
        const delete_row = (id)=>{
            // console.log(id.split('-'));
            var param = id.split('-');
            var club_id = param[0], activity_index = param[1];
            fetch('http://localhost:3000/clubs/'+club_id, { method: "get" }).then((response) => {
                return response.json();
            }).then((club)=>{
                club.activities[activity_index].status = 0;
                delete club['_id'];
                return club;
            }).then((club)=>{
                // console.log(club);
                return fetch('http://localhost:3000/clubs/'+club_id, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(club)
                });
            });

        }

        const edit_row = (data)=>{
            // console.log(id.split('-'));
            var param = data.id.split('-');
            var club_id = param[0], activity_index = param[1];
            fetch('http://localhost:3000/clubs/'+club_id, { method: "get" }).then((response) => {
                return response.json();
            }).then((club)=>{
                club.activities[activity_index].status = 1;
                delete club['_id'];
                club.activities[activity_index].name = data.name;
                club.activities[activity_index].description = data.description;
                club.activities[activity_index].category = data.category;
                club.activities[activity_index].booking_needed = data.booking_needed;
                return club;
            }).then((club)=>{
                // console.log(club);
                return fetch('http://localhost:3000/clubs/'+club_id, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(club)
                })
            });
        }

        const new_row = (data)=>{
            var club_id = data.club_name;
            fetch('http://localhost:3000/clubs/'+club_id, { method: "get" }).then((response) => {
                return response.json();
            }).then((club)=>{
                delete club['_id'];
                var activity_index = club.activities.length;
                club.activities.push({});
                club.activities[activity_index].status = 1;
                club.activities[activity_index].name = data.name;
                club.activities[activity_index].description = data.description;
                club.activities[activity_index].category = data.category;
                club.activities[activity_index].booking_needed = data.booking_needed;
                return club;
            }).then((club)=>{
                // console.log(club);
                return fetch('http://localhost:3000/clubs/'+club_id, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(club)
                })
            });
        }

        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <MaterialTable
                    title="Amenities information"
                    columns={state.columns}
                    data={state.data}
                    options={{
                        filtering: true
                    }}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        // console.log(newData);
                                        newData['id'] = new_row(newData);
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            edit_row(newData);
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        // console.log(prevState.data[prevState.data.indexOf(oldData)]);
                                        delete_row(prevState.data[prevState.data.indexOf(oldData)].id);
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />
            </div>
        );

    }
}

export default AllAminities;