/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ndkcgarblqs6yg0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a9pezeib",
    "name": "By",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ndkcgarblqs6yg0")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
