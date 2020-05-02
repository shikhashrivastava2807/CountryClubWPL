import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

function AllActivities() {
  var info = [];
  var org_data;
  var columns;
  var lookup = {};
  var booking_lookup = {
    "1":"Yes",
    "0":"No",
    1:"Yes",
    0:"No"
  }
  const [state, setState] = React.useState({
    columns: columns,
    data: info
  });

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
      console.log(club);
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

  React.useEffect(()=>{
    fetch('http://localhost:3000/clubs/', { method: "get" }).then((response) => {
      return response.json();
    }).then((data) => {
      // org_data = data;
    // sort the list of amenities here
      var i, j, club_name, club_objID;
      for(i=0;i<data.length;i++){
        club_name = data[i].club_name;
        club_objID = data[i]._id;
        lookup[club_objID] = club_name;
        for(j=0;j<data[i].activities.length;j++){
          if(data[i].status=='1' && data[i].activities[j].status==1)
            info.push({
              id: club_objID+"-"+j,
              name: data[i].activities[j].name,
              description: data[i].activities[j].description,
              category: data[i].activities[j].category,
              booking_needed: data[i].activities[j].booking_needed,
              club_name: club_objID
            });
        }
      }
      columns = [
        // {title: 'id', field:'id'},
        { title: 'Activity', field: 'name'  },
        { title: 'Description', field: 'description' },
        { title: 'Category', field: 'category' },
        { title: 'Booking required', field: 'booking_needed' , lookup: booking_lookup},
        { title: 'Club Name', field: 'club_name' , lookup: lookup, editable: 'onAdd'}
      ];
    
      info = Object.keys(info).map(i => info[i])
      columns = Object.keys(columns).map(i => columns[i])

      setState({
        columns: columns,
        data: info
      })
    });

  },[]);
  

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    <MaterialTable
      title="Amenities information"
      columns={state.columns}
      data={state.data}
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

export default AllActivities;
