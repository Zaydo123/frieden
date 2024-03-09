/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm")

  collection.listRule = "@request.auth.id != \"\"&& @request.auth.Roles ~ id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm")

  collection.listRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
