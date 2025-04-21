/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nuotbymhwqutjm")

  // update ApplicationType options to include USC
  collection.schema.updateField(new SchemaField({
    "system": false,
    "id": "rn2g9ml8",
    "name": "ApplicationType",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Volunteer",
        "Staff",
        "Intern",
        "Board Member",
        "USC"
      ]
    }
  }))

  // add Major field
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "usc_major",
    "name": "Major",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 100,
      "pattern": ""
    }
  }))

  // add Year field
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "usc_year",
    "name": "Year",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Freshman",
        "Sophomore",
        "Junior",
        "Senior",
        "Graduate"
      ]
    }
  }))

  // add Interests field
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "usc_interests",
    "name": "Interests",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 500,
      "pattern": ""
    }
  }))

  // add AboutYourself field
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "usc_about",
    "name": "AboutYourself",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 2000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nuotbymhwqutjm")

  // revert ApplicationType options
  collection.schema.updateField(new SchemaField({
    "system": false,
    "id": "rn2g9ml8",
    "name": "ApplicationType",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Volunteer",
        "Staff",
        "Intern",
        "Board Member"
      ]
    }
  }))

  // remove added fields
  collection.schema.removeField("usc_major")
  collection.schema.removeField("usc_year")
  collection.schema.removeField("usc_interests")
  collection.schema.removeField("usc_about")

  return dao.saveCollection(collection)
}) 