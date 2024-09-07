/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ndkcgarblqs6yg0",
    "created": "2024-07-18 22:39:38.215Z",
    "updated": "2024-07-18 22:39:38.215Z",
    "name": "Drink",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "a78mt1ox",
        "name": "Beer",
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
        "id": "a9pezeib",
        "name": "Requested_by",
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
  const collection = dao.findCollectionByNameOrId("ndkcgarblqs6yg0");

  return dao.deleteCollection(collection);
})
