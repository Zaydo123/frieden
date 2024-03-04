/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5ymzhqop9yiyjf8")

  collection.listRule = "@request.auth.Roles.ResourceGroup.Resources ~ id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5ymzhqop9yiyjf8")

  collection.listRule = "@request.auth.Roles.ResourceGroup.Resources = id"

  return dao.saveCollection(collection)
})
