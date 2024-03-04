/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  // remove
  collection.schema.removeField("ljljh6e8")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ljljh6e8",
    "name": "Roles",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0ml9rnvv6yofzdm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
