/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xri88dcj55kc6v9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vbavghxb",
    "name": "userid",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("xri88dcj55kc6v9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vbavghxb",
    "name": "userid",
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
