/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3s480irqafqdziu")

  collection.listRule = null
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3s480irqafqdziu")

  collection.listRule = ""
  collection.viewRule = null

  return dao.saveCollection(collection)
})
