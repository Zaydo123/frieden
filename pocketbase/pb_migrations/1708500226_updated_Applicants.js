/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nuotbymhwqutjm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oofi0jtg",
    "name": "Phone",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nuotbymhwqutjm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oofi0jtg",
    "name": "Phone",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 2147483647,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
})
