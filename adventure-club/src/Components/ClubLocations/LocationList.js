import React, {Component} from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {PencilSquare,TrashFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import {EditLocationDetails} from "./EditLocationDetails";
import {DeleteLocation} from "./DeleteLocation";



export class LocationList extends Component {
    constructor() {
        super()
        this.state = {
            clubsList : [],
            showEditModal:false,
            showDeleteModal:false
        }
    }
    async componentDidMount() {
        this.ViewAllClubs();
    }

    ViewAllClubs = () => {
        return axios
            .get('http://localhost:3000/clubs', {
                //headers: { Authorization: ` ${this.getToken()}` }
            })
            .then(response => {
                const data = [];
                for(let i = 0; i<response.data.length; i++){
                    if(response.data[i].status === "1"){
                        data.push(response.data[i])
                    }
                }
                this.setState({clubsList: data})
            })
            .catch(err => {
                console.log(err)
            })
    }
    useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 450,
            height: 450,
        }
    }));



    render() {
        let editModalClose = () => this.setState({showEditModal:false}) ;
        let deleteModalClose = () => this.setState({showDeleteModal:false}) ;
        const image = require('../../images/florida.jpg');
        const classes = this.useStyles;
        const UserLocationsView = (
            <div className={classes.root}>
                <GridList cellHeight={250} className={classes.gridList} cols={3}>
                    {this.state.clubsList.map((tile) => (
                        <GridListTile key={tile.club_name}>
                            <img src={image} alt={tile.club_name} />
                            <GridListTileBar
                                title={tile.club_name+','+tile.state}
                                subtitle={<span>Type: {tile.club_type}</span>}
                                actionIcon={
                                    <>
                                        <Link to={`/Locations/${tile._id}`}>
                                            <IconButton aria-label={`info about ${tile.club_name}`} style={{color:'rgba(255, 255, 255, 0.6)'}}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Link>
                                    </>

                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )

        const AdminLocationsView = (
            <div className={classes.root}>
                <GridList cellHeight={250} className={classes.gridList} cols={3}>
                    {this.state.clubsList.map((tile) => (
                        <GridListTile key={tile.club_name}>
                            <img src={image} alt={tile.club_name} />
                            <GridListTileBar
                                title={tile.club_name+','+tile.State}
                                subtitle={<span>Type: {tile.club_type}</span>}
                                actionIcon={
                                    <>
                                            <IconButton onClick={()=>this.setState({showEditModal:true,
                                                id:tile._id,
                                                club_name:tile.club_name,
                                                club_type:tile.club_type,
                                                address_line1: tile.address_line1,
                                                address_line2: tile.address_line2,
                                                zip: tile.zip,
                                                city: tile.City,
                                                states: tile.State,
                                                images_path1: tile.imagesPath[0],
                                                images_path2: tile.imagesPath[1],
                                                images_path3: tile.imagesPath[2],
                                                description: tile.description

                                            })} aria-label={`info about ${tile.club_name}`} style={{color:'rgba(255, 255, 255, 0.6)'}}>
                                                <PencilSquare/>
                                            </IconButton>
                                            <IconButton onClick={()=>this.setState({showDeleteModal:true,
                                                id:tile._id,
                                                club_name:tile.club_name

                                            })} aria-label={`info about ${tile.club_name}`} style={{color:'rgba(255, 255, 255, 0.6)'}}>
                                                <TrashFill/>
                                            </IconButton>
                                    </>

                                }
                            />
                        </GridListTile>
                        ))}
                </GridList>
                <EditLocationDetails show={this.state.showEditModal}
                                     onHide={editModalClose}
                                     id = {this.state.id}
                                     club_name={this.state.club_name}
                                     club_type={this.state.club_type}
                                     address_line1={this.state.address_line1}
                                     address_line2={this.state.address_line2}
                                     zip={this.state.zip}
                                     city={this.state.city}
                                     states={this.state.states}
                                     images_path1={this.state.images_path1}
                                     images_path2={this.state.images_path2}
                                     images_path3={this.state.images_path3}
                                     description={this.state.description}
                                     key={this.state.club_name}
                />
                <DeleteLocation show={this.state.showDeleteModal}
                                     onHide={deleteModalClose}
                                     id = {this.state.id}
                                     key={this.state.club_name}
                />

            </div>
        )
        return(
            <>
                {localStorage.isAdmin === "true" ? AdminLocationsView:UserLocationsView}
            </>
        )

    }

}