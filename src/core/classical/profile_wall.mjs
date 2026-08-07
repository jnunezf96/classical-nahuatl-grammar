// Canonical modern ESM module.

export function createClassicalNahuatlProfileWallApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_PROFILE_WALL_VERSION = 1;
    const CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_WALL_TRANSCRIPTION_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    function buildClassicalNahuatlProfileWallFrame(_mode = CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID, options = {}) {
      return {
        kind: "classical-nahuatl-profile-wall-frame",
        version: CLASSICAL_NAHUATL_PROFILE_WALL_VERSION,
        activeProfileId: CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID,
        classicalProfileId: CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID,
        classicalLaneActive: true,
        authorityScope: "public-classical-runtime",
        separationMechanism: "deployment-boundary",
        spellingInspection: "not-performed",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_WALL_TRANSCRIPTION_SOURCE_DOCUMENT,
        outputLanguage: "Classical Nahuatl",
        outputAuthority: "Andrews transcription",
        orthographyAuthority: "Andrews transcription",
        orthographyPolicy: "transcription-direct",
        classicalOutputImport: "authorized-within-classical-lane",
        sharedRuntimePolicy: "classical-only"
      };
    }
    function installClassicalNahuatlProfileWallClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        CLASSICAL_NAHUATL_PROFILE_WALL_VERSION,
        buildClassicalNahuatlProfileWallFrame
      });
      return globalTarget;
    }
    installClassicalNahuatlProfileWallClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_PROFILE_WALL_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_PROFILE_WALL_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_WALL_TRANSCRIPTION_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_WALL_TRANSCRIPTION_SOURCE_DOCUMENT; },
    });
    api.buildClassicalNahuatlProfileWallFrame = buildClassicalNahuatlProfileWallFrame;
    api.installClassicalNahuatlProfileWallClassicGlobals = installClassicalNahuatlProfileWallClassicGlobals;
    return api;
}

export function installClassicalNahuatlProfileWallGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlProfileWallApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
