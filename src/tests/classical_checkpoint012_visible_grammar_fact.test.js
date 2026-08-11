"use strict";

const { createSuite } = require("./runner");
const selection = require("../../docs/canvas-progress/checkpoint009_fact_selection.json");
const semanticScope = require("../../docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json");

const sourceFactById = new Map(semanticScope.atoms.map((atom) => [atom.atomId, atom]));

function createFactBrowserDocument() {
    const children = {
        heading: { textContent: "" },
        statement: { textContent: "" },
        source: { textContent: "" },
    };
    const elements = {
        "classical-canvas-grammar-facts": { dataset: {} },
        "classical-canvas-grammar-fact-query": { value: "", addEventListener() {} },
        "classical-canvas-grammar-fact-matches": {
            value: "",
            addEventListener() {},
            replaceChildren() {},
        },
        "classical-canvas-grammar-fact-show": { disabled: false, addEventListener() {} },
        "classical-canvas-grammar-fact-output": {
            dataset: { classicalGrammarAuthority: "false" },
            hidden: true,
            querySelector(selector) {
                if (selector.includes("heading")) return children.heading;
                if (selector.includes("statement")) return children.statement;
                if (selector.includes("source")) return children.source;
                return null;
            },
        },
    };
    return {
        document: { getElementById: (id) => elements[id] || null },
        output: elements["classical-canvas-grammar-fact-output"],
        children,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_checkpoint012_visible_grammar_fact");
    s.eq("checkpoint 012 visibly observes exactly 500 prepared facts", selection.counts.selectedAtoms, 500);
    s.eq("checkpoint 012 reuses 18 shared typed owners", selection.counts.selectedOwners, 18);

    const browser = createFactBrowserDocument();
    for (const fact of selection.atoms) {
            const sourceFact = sourceFactById.get(fact.atomId);
            const projection = [
                ctx.presentPreparedClassicalCanvasGrammarFactForPresentation,
                ctx.presentPreparedClassicalLateCanvasGrammarFactForPresentation,
            ].filter((presenter) => typeof presenter === "function")
                .map((presenter) => presenter(fact.atomId))
                .find((candidate) => candidate?.authorizationStatus === "authorized")
                || null;
            const rendered = ctx.renderClassicalCanvasGrammarFactProjection(
                projection,
                browser.document,
            );
            const visiblyExact = ctx.isClassicalCanvasGrammarFactProjectionVisiblyExact(
                projection,
                browser.document,
            );
            s.eq(`${fact.atomId} observes visible Canvas grammar fact`, {
                rendered,
                visiblyExact,
                hidden: browser.output.hidden,
                visible: browser.output.dataset.classicalCanvasGrammarFactVisible,
                atomId: browser.output.dataset.classicalCanvasGrammarFactAtomId,
                semanticOwnerId: browser.output.dataset.classicalCanvasGrammarFactOwnerId,
                projectRole: browser.output.dataset.classicalCanvasGrammarFactProjectRole,
                statement: browser.children.statement.textContent,
                canvasSection: browser.children.heading.textContent,
                canvasSource: browser.children.source.textContent,
                grammarAuthority: browser.output.dataset.classicalGrammarAuthority,
            }, {
                rendered: true,
                visiblyExact: true,
                hidden: false,
                visible: "true",
                atomId: fact.atomId,
                semanticOwnerId: fact.semanticOwnerId,
                projectRole: "read-only-grammar-fact",
                statement: sourceFact.anchor,
                canvasSection: sourceFact.belongsTo,
                canvasSource: `Canvas source: ${sourceFact.canvasSpan}`,
                grammarAuthority: "false",
            });

            browser.children.statement.textContent = `BROKEN:${sourceFact.anchor}`;
            s.no(
                `${fact.atomId} rejects broken visible grammar fact content`,
                ctx.isClassicalCanvasGrammarFactProjectionVisiblyExact(
                    projection,
                    browser.document,
                ),
            );
    }
    return s;
}

module.exports = { run };
