/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8s4hc2ed",
    "name": "Location",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // remove
  collection.schema.removeField("8s4hc2ed")

  return dao.saveCollection(collection)
})
