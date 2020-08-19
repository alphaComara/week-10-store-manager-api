const {getDatabase} = require('./mongo-common');

const {ObjectID} = require('mongodb');

var getUserName = require('git-user-name');
console.log(getUserName());


const collectionName = 'stores';

async function createStore(store) {
     const database = await getDatabase();
     store.addedBy = getUserName()
const {insertedId} = await database.collection(collectionName).insertOne(store);
return insertedId;
}

async function getStores() {
     const database = await getDatabase();
     return await database.collection(collectionName).find({}).toArray();
}

async function deleteStore(id) {
     const database = await getDatabase();
    
     await database.collection(collectionName).deleteOne({
       _id: new ObjectID(id),
     });
   }

   async function updateStore(id, store) {
     const database = await getDatabase(); 
     delete store._id;
     store.updatedBy = getUserName()
     await database.collection(collectionName).update(
       { _id: new ObjectID(id), },
       {
         $set: {
           ...store,
         },
       },
     );
   }
   
   module.exports = {
     createStore,
     getStores,
     deleteStore,
     updateStore,
   };