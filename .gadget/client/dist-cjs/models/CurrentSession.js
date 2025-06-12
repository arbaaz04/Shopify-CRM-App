"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CurrentSession_exports = {};
__export(CurrentSession_exports, {
  CurrentSessionManager: () => CurrentSessionManager,
  DefaultSessionSelection: () => DefaultSessionSelection
});
module.exports = __toCommonJS(CurrentSession_exports);
var import_builder = require("../builder.js");
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
const CurrentSessionManager = (0, import_builder.buildModelManager)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CurrentSessionManager,
  DefaultSessionSelection
});
//# sourceMappingURL=CurrentSession.js.map
