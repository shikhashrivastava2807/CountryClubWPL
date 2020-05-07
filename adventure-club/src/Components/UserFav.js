import React from "react";
import MaterialTable from 'material-table';
import FavoriteIcon from '@material-ui/icons/Favorite';

function UserFav() {
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
  var userid = localStorage.getItem('email');
  const delete_row = (id)=>{
    // console.log(id.split('-'));
    var param = id.split('-');
    var club_id = param[0], activity_index = param[1];
    fetch('http://localhost:3000/fav/'+userid, { method: "get" }).then((response) => {
      return response.json();
     }).then((user_fav)=>{
        delete user_fav._id;
        user_fav[club_id].splice(user_fav[club_id].indexOf(activity_index),1);
        return user_fav;
        }).then((user_fav)=>{
        console.log(user_fav);
        return fetch('http://localhost:3000/fav/'+userid, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(user_fav)
                });
        });
    
  }

  React.useEffect(()=>{
    
    fetch('http://localhost:3000/fav/'+userid, { method: "get" }).then((response) => {
      return response.json();
    }).then((user_fav)=>{
        delete user_fav._id;
        console.log(Object.keys(user_fav)[0]);
        return fetch('http://localhost:3000/clubs/', { method: "get" }).then((response) => {
            return response.json();
            }).then((data) => {
            // org_data = data;
            // sort the list of amenities here
            var i, j, club_name, club_objID;
            var index = data.findIndex(p => p._id == Object.keys(user_fav)[0])
            console.log(Object.keys(user_fav))
            for(var key in user_fav){
                i = data.findIndex(p => p._id == key)
                club_name = data[i].club_name;
                club_objID = data[i]._id;
                lookup[club_objID] = club_name;
                user_fav[key].forEach(j=> {
                if(data[i].status=='1' && data[i].activities[j].status==1)
                    info.push({
                    id: club_objID+"-"+j,
                    name: data[i].activities[j].name,
                    description: data[i].activities[j].description,
                    category: data[i].activities[j].category,
                    booking_needed: data[i].activities[j].booking_needed,
                    club_name: club_objID
                    });
                })
            }
            columns = [
                // {title: 'id', field:'id'},
                { title: 'Amenity', field: 'name' , filtering: false},
                { title: 'Description', field: 'description', filtering: false },
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

    })
    

  },[]);
  

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    <MaterialTable
      title="Your Favorite Amenities!!"
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: FavoriteIcon,
          tooltip: 'Unfavorite',
          onClick: (event, oldData) => 
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
          })
        }
      ]}

      options={{
        filtering: true
      }}
    />
    </div>
  );
}


export default UserFav;

