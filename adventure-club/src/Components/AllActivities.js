import React from 'react';
import axios from 'axios';
import { DataTable } from 'react-data-components';
import MaterialTable from 'material-table';

function AllActivities() {
  var info = [];
  var org_data;
  var columns;
  var lookup = {};

  const delete_row = (id)=>{
    // console.log(id.split('-'));
    var param = id.split('-');
    var i;
    for(i=0;i<org_data.length;i++){
      if(org_data[i]._id == param[0]){
        org_data[i].flag[parseInt(param[1])] = 0;
        var updated_club = Object.assign({}, org_data[i]);
        delete updated_club['_id'];
        console.log(org_data[i]);
        fetch('http://localhost:3000/clubs/'+param[0], {
          method: "put",
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(updated_club)
        })
        break;
      }
    }
    
  }

  const edit_row = (data)=>{
    // console.log(id.split('-'));
    var param = data.id.split('-');
    var i;
    for(i=0;i<org_data.length;i++){
      if(org_data[i]._id == param[0]){
        org_data[i].aname[parseInt(param[1])] = data.name;
        org_data[i].adesc[parseInt(param[1])] = data.desc;
        org_data[i].acat[parseInt(param[1])] = data.cat;
        var updated_club = Object.assign({}, org_data[i]);
        delete updated_club['_id'];
        console.log(org_data[i]);
        fetch('http://localhost:3000/clubs/'+param[0], {
          method: "put",
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(updated_club)
        })
        break;
      }
    }
    
  }

  const new_row = (new_amenity) =>{
    var param = new_amenity.cname;
    var i;
    for(i=0;i<org_data.length;i++){
      if(org_data[i]._id == param){
        org_data[i].aname.push(new_amenity.name);
        org_data[i].adesc.push(new_amenity.desc);
        org_data[i].acat.push(new_amenity.cat);
        org_data[i].flag.push(1);
        var updated_club = Object.assign({}, org_data[i]);
        delete updated_club['_id'];
        console.log(updated_club);
        fetch('http://localhost:3000/clubs/'+param, {
          method: "put",
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(updated_club)
        })
        console.log(param+"-"+((updated_club.aname.length-1).toString()));
        return param+"-"+((updated_club.aname.length-1).toString());
      }
    }
    return 0;
  }

  fetch('http://localhost:3000/clubs/', { method: "get" }).then((response) => {
      return response.json();
    }).then((data) => {
      org_data = data;
    // sort the list of amenities here
    var i, j, cn, cid;
    for(i=0;i<data.length;i++){
      cn = data[i].cname;
      cid = data[i]._id;
      lookup[cid] = cn;
      for(j=0;j<data[i].aname.length;j++){
        if(data[i].flag[j] && data[i].status)
          info.push({
            id: cid+"-"+j,
            name: data[i].aname[j],
            desc: data[i].adesc[j],
            cat: data[i].acat[j],
            cname: cid
          });
      }
    }
  });
  
  columns = [
    // {title: 'id', field:'id'},
    { title: 'Amenities', field: 'name'  },
    { title: 'Description', field: 'desc' },
    { title: 'Category', field: 'cat' },
    { title: 'Club Name', field: 'cname' , lookup: lookup}
  ];

  info = Object.keys(info).map(i => info[i])
  columns = Object.keys(columns).map(i => columns[i])
  
  const [state, setState] = React.useState({
    columns: columns,
    data: info,
  });

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
                console.log(newData);
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
                console.log(prevState.data[prevState.data.indexOf(oldData)]);
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
