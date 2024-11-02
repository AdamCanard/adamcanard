/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wuodob7puk4nhq4")

  // remove
  collection.schema.removeField("cetgomsv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "la6lcogq",
    "name": "Start",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ze9zt0lh",
    "name": "End",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dw5jnex6",
    "name": "Notes",
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
  const collection = dao.findCollectionByNameOrId("wuodob7puk4nhq4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cetgomsv",
    "name": "Image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/png"
      ],
      "thumbs": [
        "100x120"
      ],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("la6lcogq")

  // remove
  collection.schema.removeField("ze9zt0lh")

  // remove
  collection.schema.removeField("dw5jnex6")

  return dao.saveCollection(collection)
})
