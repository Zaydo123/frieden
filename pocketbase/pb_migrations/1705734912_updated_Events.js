/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  collection.listRule = "Public=true "
  collection.createRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  collection.listRule = "Public=true"
  collection.createRule = ""

  return dao.saveCollection(collection)
})
