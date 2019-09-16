const MongoClient = require('mongodb').MongoClient; 
 
const assert = require('assert'); 

//User object to be recieved
const user = {
    cognitoUserId: 1,
    fullName: 'TestUser',
    email: 'test@email.com',
    homeBeach: 45,
    homeBeachName: 'testBeachName',
    longitude: -124.196581,
    latitude: 41.748518
}

//Requires one argument. A user object with at least a 'latitude' and 'longitude'
const setHomeBeach = async (usr) => {
    const user = usr;
    const userMi = (Math.cos(user.latitude * (Math.PI/180))) * 69.172
    const userLocale = {
        latLower: user.latitude - 0.001, 
        latUpper: user.latitude + 0.001, 
        longLower: user.longitude + .10,
        longUpper: user.longitude - .20
    }; 

    const client = new MongoClient('mongodb+srv://ant:ant123@cluster0-bse6j.mongodb.net/howsthewater?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

    client.connect(async function(err, client){
         assert.equal(null, err); 

        try{
            const db = client.db("howsthewater");              
            let beaches = await db.collection('locations').find({$and: [{LATITUDE: {$lt: userLocale.latUpper}}, 
            {LATITUDE: {$gt: userLocale.latLower}}, {LONGITUDE: {$lt: userLocale.longLower}}, 
            {LONGITUDE:{$gt: userLocale.longUpper}}]}).toArray(); 
            beaches.sort(); 
            
            const distances = []; 
            
            beaches.forEach((beach) => {
                let mi = (Math.cos(beach.LATITUDE * (Math.PI/180))) * 69.172
                let dist = mi * userMi / 2
                distances.push({id: beach.ID, distance: dist});                
            })
            distances.sort((a,b) => {
                return a.distance - b.distance
            })
            homeBeach = beaches.filter(beach => beach.ID == distances[0].id)
            console.log(homeBeach)
            
            //Returns a complete Location object
            return homeBeach
            
        }
        catch(err){console.log(err)}
    })
    client.close();      
}
setHomeBeach(user); 

module.exports = setHomeBeach; 