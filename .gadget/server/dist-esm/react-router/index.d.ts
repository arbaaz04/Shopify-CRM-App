
import { AppDirectory, BuildDirectory } from "./constants.js";
export { ErrorBoundary, ErrorBoundary as ProductionErrorBoundary, DevelopmentErrorBoundary } from "./ErrorBoundary.js";
/**
* Parameters for running a React Router app in Gadget.
*/
export declare const reactRouterConfigOptions: {
	buildDirectory: typeof BuildDirectory
	appDirectory: typeof AppDirectory
};
