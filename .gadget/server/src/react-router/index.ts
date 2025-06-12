import { AppDirectory, BuildDirectory } from "./constants";
export { ErrorBoundary, ErrorBoundary as ProductionErrorBoundary, DevelopmentErrorBoundary } from "./ErrorBoundary";

/**
 * Parameters for running a React Router app in Gadget.
 */
export const reactRouterConfigOptions = {
  buildDirectory: BuildDirectory as typeof BuildDirectory,
  appDirectory: AppDirectory as typeof AppDirectory,
};
