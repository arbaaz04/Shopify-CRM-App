
import type { RequestContext } from "@fastify/request-context";
import { AnyClient } from "@gadgetinc/api-client-core";
import { AsyncLocalStorage } from "async_hooks";
import type { Logger } from "./AmbientContext";
import type { AnyActionContext, AnyAmbientContext, AnyEffectContext, AnyGlobalActionContext } from "./types";
export declare const actionContextLocalStorage: AsyncLocalStorage<AnyActionContext | AnyGlobalActionContext | AnyEffectContext>;
/**
* Extend the @fastify/request-context types with Gadget's added reference to the current unit of work's context
* See https://github.com/fastify/fastify-request-context#typescript
* */
declare module "@fastify/request-context" {
	interface RequestContextData {
		requestContext: AnyAmbientContext | AnyActionContext | AnyGlobalActionContext | AnyEffectContext;
	}
}
export interface SettableGlobals {
	logger: Logger;
	modelValidator: (modelKey: string) => Promise<any>;
	requestContext: RequestContext;
	platformRequire: typeof require;
	api: AnyClient;
}
export type GlobalSetter = (globals: SettableGlobals) => void;
export declare const Globals: {
	api: AnyClient
	modelValidator: (modelKey: string) => Promise<any>
	requestContext: RequestContext
	logger: Logger
	platformRequire: typeof require
	set: GlobalSetter
	platformModules: {
		lodash: () => any
		bcrypt: () => any
		compareVersions: () => any
		klona: () => any
	}
};
