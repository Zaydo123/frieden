/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("chapters_collection");

  // Create USC chapter
  const data = {
    "Name": "USC",
    "Slug": "usc",
    "Description": "The University of Southern California chapter of Frieden Foundation. Join us to make a positive impact on campus and in the community.",
    "Active": true
  };

  return dao.createRecord(collection, data);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("chapters_collection");
  
  // Find the USC record by slug
  const records = dao.findRecordsByFilter(collection, "Slug = 'usc'");
  
  if (records.length > 0) {
    // Delete the record if found
    return dao.deleteRecord(collection, records[0].id);
  }
  
  return null;
}) 