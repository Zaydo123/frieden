/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1oanv6fxxbnpxwv",
    "created": "2024-03-03 23:28:38.481Z",
    "updated": "2024-03-03 23:28:38.481Z",
    "name": "PermissionsRoleMap",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "beq8ov7j",
        "name": "Events",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "nitdxwl0",
        "name": "Donations",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "kokklqdo",
        "name": "PhoneBook",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "xt4r6xqz",
        "name": "Applicants",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ll9ykty5",
        "name": "Jira",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ljljh6e8",
        "name": "Roles",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "0ml9rnvv6yofzdm",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1oanv6fxxbnpxwv");

  return dao.deleteCollection(collection);
})
