/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzofjqi9",
    "name": "RegisteredCount",
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
  collection.schema.removeField("fzofjqi9")

  return dao.saveCollection(collection)
})
