/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5ymzhqop9yiyjf8")

  // remove
  collection.schema.removeField("ynntmhn5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "suqu6lkf",
    "name": "Enabled",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5ymzhqop9yiyjf8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ynntmhn5",
    "name": "Enabled",
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

  // remove
  collection.schema.removeField("suqu6lkf")

  return dao.saveCollection(collection)
})
