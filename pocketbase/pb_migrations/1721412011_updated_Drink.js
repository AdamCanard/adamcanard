/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ndkcgarblqs6yg0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cqxuzhla",
    "name": "Brewery",
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

  // remove
  collection.schema.removeField("cqxuzhla")

  return dao.saveCollection(collection)
})
