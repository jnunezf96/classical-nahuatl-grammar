"use strict";

const fs = require("fs");
const path = require("path");

const WEB_ROOT = path.resolve(__dirname, "..", "..", "..");
const SIBLING_ROOT = path.resolve(WEB_ROOT, "..", "Classical_Nahuatl_Grammar");

function resolveLegacySupportPath(relativePath) {
    const webPath = path.join(WEB_ROOT, relativePath);
    if (fs.existsSync(webPath)) return webPath;
    const siblingPath = path.join(SIBLING_ROOT, relativePath);
    return fs.existsSync(siblingPath) ? siblingPath : webPath;
}

module.exports = Object.freeze({
    resolveLegacySupportPath,
});
