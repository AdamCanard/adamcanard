/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wuodob7puk4nhq4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cetgomsv",
    "name": "field",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/png"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wuodob7puk4nhq4")

  // remove
  collection.schema.removeField("cetgomsv")

  return dao.saveCollection(collection)
})
