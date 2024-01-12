/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csgcwycl",
    "name": "GroupDivisibleBy",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // remove
  collection.schema.removeField("csgcwycl")

  return dao.saveCollection(collection)
})
