/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.listRule = "(Members ~ @request.auth.id) && (@request.data.Event.Public = true)"
  collection.viewRule = "@request.auth.id != \"\" && \n@request.auth.verified=1 && \n@request.data.Event.RegistrationDeadline <= @now &&\n@request.data.Event.Public = true &&\n((InviteOnly = false) || (Members ~ @request.auth.id))"
  collection.createRule = "@request.auth.id != \"\" && \n@request.auth.verified=1 && \n@request.data.Event.RegistrationDeadline <= @now &&\n@request.data.Event.Public = true &&\n\n@collection.EventGroups.Members ?!= @request.auth.id || \n@collection.EventGroups.Event.id ?!= @request.data.Event.id\n\n"
  collection.updateRule = "(GroupLeader = @request.auth.id) &&\n(@request.data.GroupLeader:isset = false) && (@request.data.InvitePin:isset = false)"
  collection.deleteRule = "GroupLeader = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h99lbvcx9t95xxb")

  collection.listRule = null
  collection.viewRule = ""
  collection.createRule = "@request.auth.id != \"\" && \n@request.auth.verified=1 && \n@request.data.Event.RegistrationDeadline <= @now &&\n@request.data.Event.Public = true &&\n@collection.EventGroups.Event.RegisteredUsers !~ @request.auth.id\n\n "
  collection.updateRule = "@request.auth.id = @collection.EventGroups.GroupLeader.id"
  collection.deleteRule = "@request.auth.id = @collection.EventGroups.GroupLeader.id"

  return dao.saveCollection(collection)
})
