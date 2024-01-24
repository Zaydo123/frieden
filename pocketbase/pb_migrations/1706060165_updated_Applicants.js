/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nuotbymhwqutjm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4fd9jogz",
    "name": "DesiredPosition",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 100,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nuotbymhwqutjm")

  // remove
  collection.schema.removeField("4fd9jogz")

  return dao.saveCollection(collection)
})
