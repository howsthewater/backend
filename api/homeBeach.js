const MongoClient = require('mongodb').MongoClient; 
 
const assert = require('assert'); 




const setHomeBeach = async (lat, long) => {
    const latitude = lat;
    const longitude = long; 
    const client = new MongoClient('mongodb+srv://ant:ant123@cluster0-bse6j.mongodb.net/howsthewater?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

    client.connect(async function(err, client){
        assert.equal(null, err); 

        try{
            const db = client.db("howsthewater");              
            let beach = await db.collection('locations').findOne({LATITUDE: latitude, LONGITUDE: longitude}); 
            let beachName = beach.NameMobileWeb; 
            let homeBeach = await db.collection('users')
            .findOneAndUpdate(
                {fullName: "testUser"},
                {$set:{homeBeachName: beachName, new: true}},
            )
            return console.log(homeBeach);
        }
        catch(err){console.log(err)}
    })
    client.close(); 
     
}

//setHomeBeach(41.992854, -124.208809); 
setHomeBeach(lat, long); 

module.exports = setHomeBeach; 