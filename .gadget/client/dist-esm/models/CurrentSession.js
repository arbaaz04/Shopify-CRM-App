import { buildModelManager } from "../builder.js";
const DefaultSessionSelection = {
  __typename: true,
  id: true,
  createdAt: true,
  roles: { key: true, name: true },
  shopId: true,
  shopifySID: true,
  updatedAt: true
};
const modelApiIdentifier = "session";
const pluralModelApiIdentifier = "sessions";
;
const CurrentSessionManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultSessionSelection,
  [
    {
      type: "get",
      operationName: "currentSession",
      defaultSelection: DefaultSessionSelection,
      modelApiIdentifier,
      namespace: null
    }
  ]
);
export {
  CurrentSessionManager,
  DefaultSessionSelection
};
//# sourceMappingURL=CurrentSession.js.map
