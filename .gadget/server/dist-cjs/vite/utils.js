"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getFrontendType: function() {
        return getFrontendType;
    },
    getInternalFrontendConfig: function() {
        return getInternalFrontendConfig;
    }
});
const _constants = require("../remix/constants");
const _helpers = require("./helpers");
const getDefaultProductionBaseUrl = (assetsBucketDomain, applicationId, productionEnvironmentId)=>{
    return `https://${assetsBucketDomain}/a/${applicationId}/${productionEnvironmentId}`;
};
/** A descriptor object that describes how different Gadget frontend types work for our use when building vite configs */ const BaseRemixFrontendConfig = Object.freeze({
    distPath: `${_constants.BuildDirectory}/client`,
    manifestFilePaths: [
        `${_constants.BuildDirectory}/.vite/client-manifest.json`
    ],
    productionBaseUrl: (assetsBucketDomain, applicationId, productionEnvironmentId)=>{
        return `${getDefaultProductionBaseUrl(assetsBucketDomain, applicationId, productionEnvironmentId)}/`;
    }
});
const BaseReactRouterFrontendConfig = Object.freeze({
    distPath: `${_constants.BuildDirectory}/client`,
    manifestFilePaths: [
        `${_constants.BuildDirectory}/client/.vite/manifest.json`
    ],
    productionBaseUrl: (assetsBucketDomain, applicationId, productionEnvironmentId)=>{
        return `${getDefaultProductionBaseUrl(assetsBucketDomain, applicationId, productionEnvironmentId)}/`;
    }
});
const BaseViteFrontendConfig = Object.freeze({
    distPath: ".gadget/vite-dist",
    manifestFilePaths: [
        ".gadget/vite-dist/.vite/manifest.json",
        ".gadget/vite-dist/manifest.json"
    ],
    productionBaseUrl: getDefaultProductionBaseUrl
});
/**
 * Get the frontend config for the given framework type.
 */ const getInternalFrontendConfig = (frameworkType)=>{
    switch(frameworkType){
        case _helpers.FrontendType.Remix:
            return BaseRemixFrontendConfig;
        case _helpers.FrontendType.ReactRouterFramework:
            return BaseReactRouterFrontendConfig;
        case _helpers.FrontendType.Vite:
            return BaseViteFrontendConfig;
        default:
            throw new Error(`Unknown frontend type detected: ${frameworkType}`);
    }
};
/**
 * Get the frontend type from the given indicator file content.
 */ const getFrontendType = (indicatorFileContent)=>{
    if (Object.values(_helpers.FrontendType).includes(indicatorFileContent)) {
        return indicatorFileContent;
    }
    throw new Error(`Unknown frontend type detected: ${indicatorFileContent}`);
};
