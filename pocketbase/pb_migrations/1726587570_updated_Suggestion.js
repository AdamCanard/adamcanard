/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xri88dcj55kc6v9")

  // remove
  collection.schema.removeField("vbavghxb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v7jzbhzd",
    "name": "userId",
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

  // add
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

  // remove
  collection.schema.removeField("v7jzbhzd")

  return dao.saveCollection(collection)
})
