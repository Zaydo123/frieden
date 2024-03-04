/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  collection.name = "PermissionGroups"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  collection.name = "PermissionsRoleMap"

  return dao.saveCollection(collection)
})
