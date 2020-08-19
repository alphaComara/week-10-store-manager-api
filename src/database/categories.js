const {getDatabase} = require('./mongo-common');

const {ObjectID} = require('mongodb');

var getUserName = require('git-user-name');
console.log(getUserName());


const collectionName = 'categories';

async function createCategory(category) {
     const database = await getDatabase();
     category.addedBy = getUserName()
const {insertedId} = await database.collection(collectionName).insertOne(store);
return insertedId;
}

async function getCategories() {
     const database = await getDatabase();
     return await database.collection(collectionName).find({}).toArray();
}

async function deleteCategory(id) {
     const database = await getDatabase();
    
     await database.collection(collectionName).deleteOne({
       _id: new ObjectID(id),
     });
   }

   async function updateCategory(id, store) {
     const database = await getDatabase(); 
     delete category._id;
     category.updatedBy = getUserName()
     await database.collection(collectionName).update(
       { _id: new ObjectID(id), },
       {
         $set: {
           ...category,
         },
       },
     );
   }
   
   module.exports = {
     createCategory,
     getCategories,
     deleteCategory,
     updateCategory,
   };