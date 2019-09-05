//One-time use. Will remove from master

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); 

const url = 'mongodb+srv://ant:ant123@cluster0-bse6j.mongodb.net/howsthewater?retryWrites=true&w=majority';





const locations =[];

    const getRegion = () =>{
       let newLocations = []
       const client = new MongoClient('mongodb+srv://ant:ant123@cluster0-bse6j.mongodb.net/howsthewater?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
       locations.forEach(location => {
           if(location.LATITUDE >= 39){location.REGION = "Northern California"; newLocations.push(location)}
           else if(location.LATITUDE <= 38.99 && location.LATITUDE >= 36 ) {location.REGION = "Central California"; newLocations.push(location)}
           else {location.REGION = "Southern California"; newLocations.push(location)}
       })
       
       client.connect( async function(err, client){
        assert.equal(null, err);
         
        const db = client.db("howsthewater");     
        
        newLocations.forEach(async location =>{
            await db.collection('locations').insertOne(location)
            .then((result) =>{
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
        });
           
        })  
        
        client.close();    
    }

    getRegion();

    module.exports = getRegion; 