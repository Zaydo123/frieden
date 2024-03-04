/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm")

  collection.name = "Roles"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm")

  collection.name = "UserRoles"

  return dao.saveCollection(collection)
})
