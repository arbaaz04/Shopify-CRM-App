
import { AppDirectory, BuildDirectory } from "./constants";
export { ErrorBoundary, ErrorBoundary as ProductionErrorBoundary, DevelopmentErrorBoundary } from "./ErrorBoundary";
/**
* Parameters for running a React Router app in Gadget.
*/
export declare const reactRouterConfigOptions: {
	buildDirectory: typeof BuildDirectory
	appDirectory: typeof AppDirectory
};
