"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const read = relativePath => fs.readFileSync(
    path.join(ROOT, relativePath),
    "utf8"
);

function sliceFunction(source, startName, endName) {
    const start = source.indexOf(`function ${startName}`);
    const end = source.indexOf(`function ${endName}`, start + 1);
    return start >= 0
        ? source.slice(start, end > start ? end : source.length)
        : "";
}

function run() {
    const suite = createSuite("classical_source_commit_single_render");
    const composer = read("src/ui/composer/composer.mjs");
    const vnc = read("src/core/vnc/vnc.mjs");
    const rendering = read("src/ui/rendering/rendering.mjs");
    const refresh = sliceFunction(
        composer,
        "runVerbInputRefresh",
        "scheduleVerbInputRefresh"
    );
    const surface = sliceFunction(
        vnc,
        "generateNuclearClauseSurface",
        ""
    );
    const bindingSync = sliceFunction(
        rendering,
        "syncClassicalGrammarResultBindingChoices",
        "getClassicalCapabilityRouteDestination"
    );
    const selectionUpdate = sliceFunction(
        rendering,
        "updateClassicalCapabilityNavigatorSelection",
        "syncClassicalCapabilityNavigator"
    );
    const bindingEntry = sliceFunction(
        rendering,
        "enterClassicalGrammarResultBindingChoice",
        "syncClassicalGrammarResultBindingChoices"
    );

    suite.ok(
        "an explicit Source commit generates once and performs one external Result render",
        refresh.includes(
            "targetObject.generateNuclearClauseSurface({\n          renderOutputs: false\n        });"
        )
            && refresh.split("targetObject.renderActiveConjugations(").length - 1 === 1
    );

    suite.ok(
        "the VNC generator keeps normal rendering by default and can suppress only its internal projection pass",
        surface.includes(
            "const renderOutputs = options.renderOutputs !== false;"
        )
            && surface.split("if (renderOutputs) {").length - 1 === 3
            && surface.split("targetObject.renderAllOutputs({").length - 1 === 3
    );

    suite.ok(
        "navigator hydration stages a sole Result role exactly once",
        bindingSync.includes("autoEnterSingle = true")
            && bindingSync.includes("autoEnterSingle\n          &&")
            && selectionUpdate.includes(
                "syncClassicalGrammarResultBindingChoices({\n        autoEnterSingle: false,\n      });"
            )
            && selectionUpdate.includes(
                "enterClassicalGrammarResultBindingChoice("
            )
    );

    suite.ok(
        "a ready relational Result binding refreshes Apply after its exact embed and matrix are staged",
        bindingEntry.includes(
            "Exact Result retained as the relational Source. Apply when ready."
        )
            && bindingEntry.includes(
                "syncClassicalCapabilityApplyOperationState();\n        return Boolean(sourceOption);"
            )
    );

    return suite;
}

module.exports = { run };
