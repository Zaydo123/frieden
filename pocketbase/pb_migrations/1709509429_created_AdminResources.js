/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5ymzhqop9yiyjf8",
    "created": "2024-03-03 23:43:49.441Z",
    "updated": "2024-03-03 23:43:49.441Z",
    "name": "AdminResources",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "huuulj7u",
        "name": "ResourceName",
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
        "id": "wdvvc5zg",
        "name": "Link",
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
        "id": "ynntmhn5",
        "name": "Enabled",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
  const collection = dao.findCollectionByNameOrId("5ymzhqop9yiyjf8");

  return dao.deleteCollection(collection);
})
