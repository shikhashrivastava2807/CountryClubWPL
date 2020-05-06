import React, {useState, Component} from "react";
import Table from "react-bootstrap/Table";
import {Check, X} from "react-bootstrap-icons";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {Link} from "react-router-dom";



export class ClubLocationList extends Component {
    constructor() {
        super()
        this.state = {
            clubsList : []
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
                const data = response.data;
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
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }));


    render() {

        const image = require('../assets/images/image-florida.jpg');

        const classes = this.useStyles;
        return(
            <>
                <div className={classes.root}>
                    <GridList cellHeight={250} className={classes.gridList} cols={3}>
                        {/*<GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>*/}
                        {/*    <ListSubheader component="div">December</ListSubheader>*/}
                        {/*</GridListTiale>*/}
                        {this.state.clubsList.map((tile) => (
                            <GridListTile key={tile.club_name}>
                                <img src={image} alt={tile.club_name} />
                                <GridListTileBar
                                    title={tile.club_name}
                                    subtitle={<span>by: {tile.club_type}</span>}
                                    actionIcon={
                                        <>
                                        <Link to={`/Locations/details/${tile._id}`}>
                                        <IconButton aria-label={`info about ${tile.club_name}`} className={classes.icon}>
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
            </>
        )

    }

}