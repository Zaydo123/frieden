/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "02nup6h92k714jk",
    "created": "2024-01-24 06:32:17.942Z",
    "updated": "2024-01-24 06:32:17.942Z",
    "name": "Contact",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lqnr9ma4",
        "name": "Name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "luc4bv45",
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
        "id": "tdmna09f",
        "name": "Message",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 5000,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("02nup6h92k714jk");

  return dao.deleteCollection(collection);
})
