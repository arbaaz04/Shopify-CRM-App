import { BambeCrmAppClient } from ".";

declare global {
  interface Window {
    /**
     * The Gadget client constructor
     *
     * @example
     * ```ts
     * const api = new BambeCrmAppClient();
     * ```
     */
    BambeCrmAppClient: typeof BambeCrmAppClient;

    /**
     * The Gadget client for BambeCrmAppClient
     * @deprecated Use window.BambeCrmAppClient instead
     */
    Gadget: typeof BambeCrmAppClient;
  }
}

// add the client to the window
window.BambeCrmAppClient = BambeCrmAppClient;

const previousValue: any = window.Gadget;

// add the client to the window at the old .Gadget property for backwards compatibility -- the BambeCrmAppClient property should be preferred instead
window.Gadget = BambeCrmAppClient;
(window.Gadget as any).previousValue = previousValue;
