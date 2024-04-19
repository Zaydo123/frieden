/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s5omn5ol",
    "name": "TShirtsProvided",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // remove
  collection.schema.removeField("s5omn5ol")

  return dao.saveCollection(collection)
})
