/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xri88dcj55kc6v9")

  // remove
  collection.schema.removeField("rxnzluan")

  // remove
  collection.schema.removeField("v7jzbhzd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oyqbdczd",
    "name": "Email",
    "type": "email",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xri88dcj55kc6v9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rxnzluan",
    "name": "Name",
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

  // remove
  collection.schema.removeField("oyqbdczd")

  return dao.saveCollection(collection)
})
