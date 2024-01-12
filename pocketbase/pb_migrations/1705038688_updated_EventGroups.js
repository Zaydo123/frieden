/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.createRule = ""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z3jcmlfd",
    "name": "Transactions",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "691lmszl830eyez",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.createRule = null

  // remove
  collection.schema.removeField("z3jcmlfd")

  return dao.saveCollection(collection)
})
