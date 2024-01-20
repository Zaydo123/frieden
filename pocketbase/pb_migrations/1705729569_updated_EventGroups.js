/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.verified=1 && @request.data.Event.RegistrationDeadline <= @now && \n@request.data.Event.RegisteredUsers.id !~ @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.createRule = "@request.auth.verified=1"

  return dao.saveCollection(collection)
})
