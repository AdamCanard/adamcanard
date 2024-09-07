/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wuodob7puk4nhq4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qiahqsit",
    "name": "Drank",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wuodob7puk4nhq4")

  // remove
  collection.schema.removeField("qiahqsit")

  return dao.saveCollection(collection)
})
