/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("691lmszl830eyez")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rl38hrmz",
    "name": "EventGroup",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "h99lbvcx9t95xxb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("691lmszl830eyez")

  // remove
  collection.schema.removeField("rl38hrmz")

  return dao.saveCollection(collection)
})
