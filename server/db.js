const mongoose = require('mongoose');

const connect = (dbConfig)=>
{
    try
    {
        const {host, username, password, database} = dbConfig;

        let absoluteHostName = host;

        if(username)
        {
            if(password !== undefined)
            {
                absoluteHostName = `${username}:${password}@${absoluteHostName}`;
            }
            else
            {
                absoluteHostName = `${username}@${absoluteHostName}`;
            }
        }
        const mongoURI = `mongodb+srv://${absoluteHostName}/${database}?retryWrites=true&w=majority`;
        return mongoose.connect(mongoURI,{useNewUrlParser:true, useUnifiedTopology:true});
    }
    catch(err)
    {
        console.log(`Error Connecting to MongoDB-${err}`);
        throw err;
    }

};

const getClient = () =>
{
    return mongoose.connection.getClient();
}

module.exports = {
        connect,
        getClient
}   