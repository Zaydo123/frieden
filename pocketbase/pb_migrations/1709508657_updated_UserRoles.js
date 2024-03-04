/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm")

  // remove
  collection.schema.removeField("sjq2p8wk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jqldanss",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1oanv6fxxbnpxwv",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sjq2p8wk",
    "name": "Administrator",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("jqldanss")

  return dao.saveCollection(collection)
})
