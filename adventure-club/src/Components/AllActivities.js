import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'react-data-components';

function AllActivities() {
  var info = [];
  var columns;
  
  fetch('http://localhost:3000/clubs/', { method: "get" }).then((response) => {
      return response.json();
    }).then((data) => {
    // sort the list of amenities here
    var i, j, cn, cid;

    for(i=0;i<data.length;i++){
      cn = data[i].cname;
      cid = data[i]._id;
      for(j=0;j<data[i].aname.length;j++){
        if(data[i].flag[j] && data[i].status)
          info.push({
            id: cid+"-"+j,
            name: data[i].aname[j],
            desc: data[i].adesc[j],
            cname: cn
          });
      }
    }
  });
  
  columns = [
    { title: 'Amenities', prop: 'name'  },
    { title: 'Description', prop: 'desc' },
    { title: 'Club Name', prop: 'cname' }
  ];

  info = Object.keys(info).map(i => info[i])
  columns = Object.keys(columns).map(i => columns[i])
  console.log(info);
  console.log(columns);
  return (
    <div>
      <DataTable
      // className="container"
      keys="id"
      columns={columns}
      initialData={info}
      // initialPageLength={5}
      // initialSortBy={{ prop: 'city', order: 'descending' }}
      // pageLengthOptions={[ 5, 20, 50 ]}
      />
    </div>
    
  );
}

export default AllActivities;
