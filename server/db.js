const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "country_club";
// location of where our mongoDB database is located
// const url = "mongodb://localhost:27017";
const url = "mongodb://countryclubdata:1PiGDocXDfB3dk7VVUNQr2dciX52zNXM1PlHUJd1nJ3KDH862Jjqd1D3lsQI2dt9lGgM56tmom61tXoAzdLmDA==@countryclubdata.mongo.cosmos.azure.com:10255/?ssl=true&appName=@countryclubdata@";

// Options for mongoDB
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology: true};

const state = {
    db : null
};

const connect = (cb) =>{
    // if state is not NULL
    // Means we have connection already, call our CB
    if(state.db)
        cb();
    else{
        // attempt to get database connection
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            // unable to get database connection pass error to CB
            if(err)
                cb(err);
            // Successfully got our database connection
            // Set database connection and call CB
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

// returns OBJECTID object used to 
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

// returns database connection 
const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect,getPrimaryKey};