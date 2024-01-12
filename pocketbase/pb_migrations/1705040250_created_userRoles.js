/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0ml9rnvv6yofzdm",
    "created": "2024-01-12 06:17:30.824Z",
    "updated": "2024-01-12 06:17:30.824Z",
    "name": "userRoles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zv9fclpb",
        "name": "RoleTitle",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "sjq2p8wk",
        "name": "Administrator",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": "@request.auth.id != \"\"",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0ml9rnvv6yofzdm");

  return dao.deleteCollection(collection);
})
