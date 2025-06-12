import { BuildDirectory, AppDirectory } from "./constants.js";
/**
 * Parameters for running a Remix app in Gadget.
 */ export const remixViteOptions = {
    buildDirectory: BuildDirectory,
    appDirectory: AppDirectory,
    future: {
        "unstable_optimizeDeps": true
    }
};
