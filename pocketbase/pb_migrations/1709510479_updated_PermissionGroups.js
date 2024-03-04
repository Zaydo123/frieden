/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kblzgnzg",
    "name": "UserPermissionsEditor",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv")

  // remove
  collection.schema.removeField("kblzgnzg")

  return dao.saveCollection(collection)
})
