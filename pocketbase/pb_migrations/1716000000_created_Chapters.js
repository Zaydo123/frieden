/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "chapters_collection",
    "created": "2024-05-17 00:00:00.000Z",
    "updated": "2024-05-17 00:00:00.000Z",
    "name": "Chapters",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "chapter_name",
        "name": "Name",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "chapter_slug",
        "name": "Slug",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": true,
        "options": {
          "min": 1,
          "max": 50,
          "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$"
        }
      },
      {
        "system": false,
        "id": "chapter_description",
        "name": "Description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 1000,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "chapter_logo",
        "name": "Logo",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif"
          ],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "chapter_active",
        "name": "Active",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      {
        "name": "unique_slug",
        "type": "unique",
        "expressions": ["Slug"]
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("chapters_collection");

  return dao.deleteCollection(collection);
}) 