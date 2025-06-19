"use strict";
var import__ = require(".");
window.BambeCrmAppClient = import__.BambeCrmAppClient;
const previousValue = window.Gadget;
window.Gadget = import__.BambeCrmAppClient;
window.Gadget.previousValue = previousValue;
//# sourceMappingURL=iife-export.js.map
