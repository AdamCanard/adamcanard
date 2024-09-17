/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3s480irqafqdziu",
    "created": "2024-09-17 16:50:45.965Z",
    "updated": "2024-09-17 16:50:45.965Z",
    "name": "Banned",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aj1qi8nj",
        "name": "userId",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
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
  const collection = dao.findCollectionByNameOrId("3s480irqafqdziu");

  return dao.deleteCollection(collection);
})
