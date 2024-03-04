/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whrfcppr",
    "name": "ResourceGroup",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qzxe5zxu0hrwoti",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm")

  // remove
  collection.schema.removeField("whrfcppr")

  return dao.saveCollection(collection)
})
