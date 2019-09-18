const MongoClient = require('mongodb').MongoClient; 
 
const assert = require('assert'); 

//User object to be recieved. (Test object)
const user = {
    cognitoUserId: '987654231',
    fullName: 'TestUser2',
    email: 'test2@email.com',
    homeBeach: 0,
    homeBeachName: '',
    longitude:  -123.945597,
    latitude: 38.170518
}

//Requires one argument. A user object with at least a 'latitude' and 'longitude'
const setHomeBeach = async (usr) => {
    const user = usr;
    console.log(user)
    //Used to compare user's location to beach locations
    const userMi = (Math.cos(user.latitude * (Math.PI/180))) * 69.172
    console.log(userMi)

    //Sets constraints for result set
    const userLocale = {
        latLower: user.latitude - 0.1, 
        latUpper: user.latitude + 0.1, 
    }; 
    console.log(userLocale)

    const client = new MongoClient('mongodb+srv://ant:ant123@cluster0-bse6j.mongodb.net/howsthewater?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

    client.connect(async function(err, client){
        //error handling during connection
         assert.equal(null, err); 

        try{
            //Declaration of DB
            const db = client.db("howsthewater");  
            
            //Searches DB for locations within defined latitude and longitude constraints and
            //puts each location into an array
            let beaches = await db.collection('locations').find({$and: [{LATITUDE: {$lt: userLocale.latUpper}}, 
            {LATITUDE: {$gt: userLocale.latLower}}]}).toArray(); 
            console.log(beaches.length)
             

            //Holds converted beach distances
            const distances = []; 

            //Converts degrees to miles and pushes beach ID and mileage to new array
            beaches.forEach((beach) => {
                let mi = (Math.cos(beach.LATITUDE * (Math.PI/180))) * 69.172
                let dist = mi * userMi / 2
                distances.push({id: beach.ID, distance: dist}); 
                //console.log(beach)               
            })
            //Sorts beaches by distance (shortest to longest)
            distances.sort((a,b) => {
                return a.distance - b.distance
            })
            //Returns the first beach from the sorted array
            let homeBeach = beaches.filter(beach => beach.ID == distances[0].id)
            console.log(homeBeach)
            

            //Update to user object
            user.homeBeach = homeBeach[0].ID;
            user.homeBeachName = homeBeach[0].NameMobileWeb; 
            
            //Update to user entry in DB
            let nUser = await db.collection('users').updateOne({cognitoUserId:{$eq: user.cognitoUserId}},
                {$set: {
                    homeBeach: user.homeBeach,
                    homeBeachName: user.homeBeachName
                }}, {new: true, upsert: true})
                console.log(nUser)
            
            //Returns updated user object to front end
            console.log(user)
            return user; 
        }
        catch(err){console.log(err)}
    })
    client.close();      
}
setHomeBeach(user); 

module.exports = setHomeBeach; 