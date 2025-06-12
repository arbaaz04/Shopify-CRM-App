"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "remixViteOptions", {
    enumerable: true,
    get: function() {
        return remixViteOptions;
    }
});
const _constants = require("./constants");
/**
 * Parameters for running a Remix app in Gadget.
 */ const remixViteOptions = {
    buildDirectory: _constants.BuildDirectory,
    appDirectory: _constants.AppDirectory,
    future: {
        "unstable_optimizeDeps": true
    }
};
