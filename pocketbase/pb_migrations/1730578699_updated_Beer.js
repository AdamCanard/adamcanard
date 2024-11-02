/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wuodob7puk4nhq4")

  // remove
  collection.schema.removeField("la6lcogq")

  // remove
  collection.schema.removeField("ze9zt0lh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q2vn0dlm",
    "name": "Start",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c8opqkzg",
    "name": "End",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wuodob7puk4nhq4")

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

  // remove
  collection.schema.removeField("q2vn0dlm")

  // remove
  collection.schema.removeField("c8opqkzg")

  return dao.saveCollection(collection)
})
