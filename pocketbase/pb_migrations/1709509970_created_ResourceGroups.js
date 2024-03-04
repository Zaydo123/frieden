/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qzxe5zxu0hrwoti",
    "created": "2024-03-03 23:52:50.485Z",
    "updated": "2024-03-03 23:52:50.485Z",
    "name": "ResourceGroups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "omvsen4k",
        "name": "ResourceGroupName",
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
        "id": "gxpcc5z9",
        "name": "Resources",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "5ymzhqop9yiyjf8",
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
  const collection = dao.findCollectionByNameOrId("qzxe5zxu0hrwoti");

  return dao.deleteCollection(collection);
})
