/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  collection.listRule = "@request.auth.Roles.PermissionGroup.UserPermissionsViewer=true"
  collection.viewRule = "@request.auth.Roles.PermissionGroup.UserPermissionsViewer=true"
  collection.createRule = "@request.auth.Roles.PermissionGroup.UserPermissionsEditor=true"
  collection.updateRule = "@request.auth.Roles.PermissionGroup.UserPermissionsEditor=true"
  collection.deleteRule = "@request.auth.Roles.PermissionGroup.UserPermissionsEditor=true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
