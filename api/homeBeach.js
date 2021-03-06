const MongoClient = require('mongodb').MongoClient; 
 
const assert = require('assert'); 



//User object to be recieved. (Test object)
// const user = {
//     cognitoUserId: "9876542312",
//     fullName: "TestUser22",
//     email: "test22@email.com",
//     homeBeach: 0,
//     homeBeachName: "",
//     longitude:  -117.596620,
//     latitude: 12.621682
// }

//Requires one argument. A user object with at least a 'latitude' and 'longitude'
const setHomeBeach = async (usr) => {
    let newUser = usr;     
    
    //Used to compare user's location to beach locations
    const userMi = (Math.cos(newUser.latitude * (Math.PI/180))) * 69.172  

    //Sets constraints for result set
    const userLocale = {
        latLower: newUser.latitude - 0.1, 
        latUpper: newUser.latitude + 0.1, 
    };     

    const client = new MongoClient(process.env.MONGO_API, { useNewUrlParser: true, useUnifiedTopology: true});
    
    const modifyUser = new Promise((resolve, reject) => {

        if(newUser.latitude > 41.99){
            newUser.homeBeach = 1
            newUser.homeBeachName = "Pelican State Beach"            
            return resolve(newUser)
            
        }
        else if(newUser.latitude < 32){
            newUser.homeBeach = 1636;
            newUser.homeBeachName = "Border Field State Park";
            return resolve(newUser)
        }
        
        client.connect(async function(err, client){
        //error handling during connection
        assert.equal(null, err);  

            try{
                //Declaration of DB
                const db = client.db("howsthewater");  
                
                //Searches DB for locations within defined latitude and longitude constraints and
                //puts each location into an array
                const distances = [];
                const allBeaches = [];
                const beaches = await db.collection('locations').find({$and: [{LATITUDE: {$lt: userLocale.latUpper}}, 
                    {LATITUDE: {$gt: userLocale.latLower}}]}).toArray().then(beaches =>{
        
                    //Converts degrees to miles and pushes beach ID and mileage to new array
                    beaches.forEach(beach => {
                        allBeaches.push(beach)
                        let mi = (Math.cos(beach.LATITUDE * (Math.PI/180))) * 69.172
                        let dist = mi * userMi / 2
                        distances.push({id: beach.ID, distance: dist});                
                    })

                }).catch(err => console.log(err))
                
    
                //Sorts beaches by distance (shortest to longest)
                distances.sort((a,b) => {
                    a.distance - b.distance
                })
    
                //Returns the first beach from the sorted array
                let homeBeach = allBeaches.filter(beach => beach.ID == distances[0].id)
    
                //Update to user object
                newUser.homeBeach = homeBeach[0].ID;
                newUser.homeBeachName = homeBeach[0].NameMobileWeb;
                
                //Update to user entry in DB - Not currently needed in this iteration
                // let nUser = await db.collection('users').updateOne({cognitoUserId:{$eq: user.cognitoUserId}},
                //     {$set: {
                //         homeBeach: user.homeBeach,
                //         homeBeachName: user.homeBeachName
                //     }}, {new: true, upsert: true})
                
                //Returns updated user object to front end
                // console.log("homebeach.js " + nUser)
                // console.log("homebeach.js " + user)
                //console.log("homeBeach updated user: " + newUser.homeBeach + '\n' + newUser.homeBeachName)
                //let userarray = Array.from(newUser)
                //console.log('final log ' + userarray)
                
                resolve(newUser); 
    
            }catch(err){console.log(err)} 

        })
        client.close();
        
    }); 

    let updatedUser = await modifyUser; 
     
    return updatedUser; 
            
    
}   

//setHomeBeach(user)


module.exports = setHomeBeach; 