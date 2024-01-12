/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // remove
  collection.schema.removeField("83xkdwjs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8s4hc2ed",
    "name": "Location",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "06h7ejvy",
    "name": "MapURL",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r7g4idmagbgjju0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "83xkdwjs",
    "name": "Location",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // remove
  collection.schema.removeField("8s4hc2ed")

  // remove
  collection.schema.removeField("06h7ejvy")

  return dao.saveCollection(collection)
})
