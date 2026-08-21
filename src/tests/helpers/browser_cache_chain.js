"use strict";

function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function hasVersionedImport(source, moduleName) {
    return Boolean(versionedImportKey(source, moduleName));
}

function versionedImportKey(source, moduleName) {
    return new RegExp(
        `${escapeRegExp(moduleName)}\\?v=([^\"'\\s]+)`,
        "u",
    ).exec(source)?.[1] || "";
}

function currentBrowserCacheKey(indexSource) {
    const stylesheetKey = versionedImportKey(indexSource, "style.css");
    const moduleKey = versionedImportKey(indexSource, "src/browser/main.mjs");
    if (!stylesheetKey || stylesheetKey !== moduleKey) {
        return "";
    }
    return moduleKey;
}

function usesBrowserCacheKey(source, moduleName, cacheKey) {
    return Boolean(cacheKey)
        && versionedImportKey(source, moduleName) === cacheKey;
}

module.exports = {
    currentBrowserCacheKey,
    hasVersionedImport,
    usesBrowserCacheKey,
    versionedImportKey,
};
