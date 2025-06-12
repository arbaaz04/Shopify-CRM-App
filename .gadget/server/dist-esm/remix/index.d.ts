
import { BuildDirectory, AppDirectory } from "./constants.js";
/**
* Parameters for running a Remix app in Gadget.
*/
export declare const remixViteOptions: {
	buildDirectory: typeof BuildDirectory
	appDirectory: typeof AppDirectory
	future: {
		"unstable_optimizeDeps": boolean
	}
};
