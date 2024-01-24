/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3nuotbymhwqutjm",
    "created": "2024-01-24 01:31:44.450Z",
    "updated": "2024-01-24 01:31:44.450Z",
    "name": "Applicants",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1c8mf8c2",
        "name": "Name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fj1i80ud",
        "name": "Email",
        "type": "email",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      },
      {
        "system": false,
        "id": "oofi0jtg",
        "name": "Phone",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 2147483647,
          "noDecimal": true
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "rsrtnrt5",
        "name": "Resume",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": true
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3nuotbymhwqutjm");

  return dao.deleteCollection(collection);
})
