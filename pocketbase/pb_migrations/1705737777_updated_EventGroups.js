/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.createRule = "@request.auth.id != \"\" && \n@request.auth.verified=1 && \n@request.data.Event.RegistrationDeadline <= @now &&\n@request.data.Event.Public = true &&\n\n@collection.EventGroups.Members ?!= @request.auth.id || \n@collection.EventGroups.Event.id ?!= @request.data.Event.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.createRule = "@request.auth.id != \"\" && \n@request.auth.verified=1 && \n@request.data.Event.RegistrationDeadline <= @now &&\n@request.data.Event.Public = true &&\n\n@collection.EventGroups.Members ?!= @request.auth.id || \n@collection.EventGroups.Event.id ?!= @request.data.Event.id\n\n"

  return dao.saveCollection(collection)
})
