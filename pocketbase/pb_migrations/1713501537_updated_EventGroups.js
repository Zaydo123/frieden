/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // remove
  collection.schema.removeField("vr64gzsk")

  // remove
  collection.schema.removeField("axejer9k")

  // remove
  collection.schema.removeField("onrmmivz")

  // remove
  collection.schema.removeField("8jypqwtq")

  // remove
  collection.schema.removeField("hjhgtsgf")

  // remove
  collection.schema.removeField("z3jcmlfd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j0iny7zt",
    "name": "Attendees",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.listRule = "(Members ~ @request.auth.id) && (@request.data.Event.Public = true)"
  collection.viewRule = "@request.auth.id != \"\" && \n@request.auth.verified=1 && \n@request.data.Event.RegistrationDeadline <= @now &&\n@request.data.Event.Public = true &&\n((InviteOnly = false) || (Members ~ @request.auth.id))"
  collection.createRule = "@request.auth.id != \"\" && \n@request.auth.verified=1 && \n@request.data.Event.RegistrationDeadline <= @now &&\n@request.data.Event.Public = true "
  collection.updateRule = "(GroupLeader = @request.auth.id) &&\n(@request.data.GroupLeader:isset = false) && (@request.data.InvitePin:isset = false)"
  collection.deleteRule = "GroupLeader = @request.auth.id"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vr64gzsk",
    "name": "Members",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "axejer9k",
    "name": "InviteOnly",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "onrmmivz",
    "name": "InvitePin",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8jypqwtq",
    "name": "GroupLogo",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hjhgtsgf",
    "name": "GroupLeader",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z3jcmlfd",
    "name": "Transactions",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "691lmszl830eyez",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("j0iny7zt")

  return dao.saveCollection(collection)
})
