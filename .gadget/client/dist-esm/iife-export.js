import { BambeCrmAppClient } from ".";
window.BambeCrmAppClient = BambeCrmAppClient;
const previousValue = window.Gadget;
window.Gadget = BambeCrmAppClient;
window.Gadget.previousValue = previousValue;
//# sourceMappingURL=iife-export.js.map
