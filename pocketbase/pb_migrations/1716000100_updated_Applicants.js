/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3nuotbymhwqutjm")

  // update ApplicationType options to include "Chapter"
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
        "Chapter"
      ]
    }
  }))

  // add Chapter field
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "chapter_relation",
    "name": "Chapter",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "chapters_collection",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": ["Name"]
    }
  }))

  // Add the common fields for chapter applications
  // We're keeping these generic rather than USC-specific
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "chapter_major",
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

  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "chapter_year",
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

  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "chapter_interests",
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

  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "chapter_about",
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
  collection.schema.removeField("chapter_relation")
  collection.schema.removeField("chapter_major")
  collection.schema.removeField("chapter_year")
  collection.schema.removeField("chapter_interests")
  collection.schema.removeField("chapter_about")

  return dao.saveCollection(collection)
}) 