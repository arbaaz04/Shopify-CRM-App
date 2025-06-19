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
