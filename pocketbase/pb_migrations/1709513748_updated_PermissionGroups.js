/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s3n7wo4e",
    "name": "PanelAccess",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  // remove
  collection.schema.removeField("s3n7wo4e")

  return dao.saveCollection(collection)
})
