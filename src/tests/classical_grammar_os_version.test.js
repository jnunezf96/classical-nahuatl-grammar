"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "../..");
const VERSION = "1.1.0";
const RELEASE = "Cross-Lesson Compositional Closure";
const RELEASE_SLUG = "cross-lesson-compositional-closure";
const BUILD = "20260825-mobile-select-335";

function run(ctx = {}) {
    const suite = createSuite("classical_grammar_os_version");
    const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");

    suite.ok(
        "the public document declares one coherent Grammar OS release",
        index.includes(`<meta name="application-name" content="Grammar OS" />`)
        && index.includes(
            `<meta name="classical-grammar-os-version" content="${VERSION}" />`
        )
        && index.includes(`content="${RELEASE}"`)
        && index.includes(`content="${BUILD}"`)
        && index.includes(`data-classical-grammar-os-version="${VERSION}"`)
        && index.includes(`data-classical-grammar-os-release="${RELEASE_SLUG}"`)
        && index.includes(`data-classical-grammar-os-build="${BUILD}"`)
    );

    suite.ok(
        "the release is visible in the browser title and workbench header",
        index.includes(
            `<title>Classical Nahuatl Grammar — Grammar OS v${VERSION}</title>`
        )
        && index.includes("data-classical-grammar-os-version-label")
        && index.includes(`Grammar OS v${VERSION}</span>`)
        && index.includes(`title="${RELEASE}"`)
    );

    suite.ok(
        "version metadata remains presentation-only rather than grammar authority",
        index.includes('data-classical-shell-authority="false"')
        && index.includes('data-classical-grammar-authority="false"')
        && index.includes('data-classical-presentation-only="true"')
    );

    suite.ok(
        "the repository release note matches the public version and build",
        readme.includes(`Grammar OS v${VERSION} — ${RELEASE}`)
        && readme.includes(`browser build \`${BUILD}\``)
    );

    return suite;
}

module.exports = { run };
