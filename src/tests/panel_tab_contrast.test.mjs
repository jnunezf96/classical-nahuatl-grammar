import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDirectory, "..", "..");
const css = fs.readFileSync(path.join(projectRoot, "style.css"), "utf8");
const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const shell = fs.readFileSync(
  path.join(projectRoot, "src", "ui", "shell", "classical_shell.mjs"),
  "utf8"
);
const rendering = fs.readFileSync(
  path.join(projectRoot, "src", "ui", "rendering", "rendering.mjs"),
  "utf8"
);
const browserMain = fs.readFileSync(
  path.join(projectRoot, "src", "browser", "main.mjs"),
  "utf8"
);
const bootstrap = fs.readFileSync(
  path.join(projectRoot, "src", "bootstrap", "bootstrap.mjs"),
  "utf8"
);

function relativeLuminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first, second) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

const stylesheetVersion = html.match(/style\.css\?v=([^"']+)/u)?.[1] || "";
const moduleEntryVersion = html.match(/main\.mjs\?v=([^"']+)/u)?.[1] || "";
const selectedBackground = css.match(/--workbench-teal-deep:\s*(#[a-f\d]{6})\s*;/iu)?.[1] || "";
const selectedForeground = "#ffffff";
const declaredFontWeights = new Set(
  Array.from(css.matchAll(/font-weight:\s*(\d+)\s*;/gu), match => Number(match[1]))
);

assert.ok(stylesheetVersion, "the stylesheet must have an explicit delivery key");
assert.equal(
  stylesheetVersion,
  moduleEntryVersion,
  "the Workbench stylesheet and browser entry must share the current delivery key"
);
assert.ok(browserMain.includes(`bootstrap.mjs?v=${moduleEntryVersion}`));
assert.ok(bootstrap.includes(`classical_shell.mjs?v=${moduleEntryVersion}`));
assert.equal(selectedBackground.toLowerCase(), "#123f37");
assert.match(html, /Space\+Grotesk:wght@400;500;600;700/u);
assert.deepEqual([...declaredFontWeights].sort((a, b) => a - b), [400, 500, 600, 700]);
assert.match(css, /--ink-muted:\s*#[a-f\d]{6}\s*;/iu);
assert.match(css, /--classical-shell-control-size:\s*calc\([^;]+\)\s*;/u);
assert.match(css, /--workbench-control-height:\s*42px\s*;/u);
assert.match(css, /--workbench-control-radius:\s*8px\s*;/u);
assert.match(css, /--classical-result-teal-deep:\s*var\(--workbench-teal-deep\)\s*;/u);
assert.match(css, /--classical-result-inner-radius:\s*var\(--workbench-control-radius\)\s*;/u);
assert.ok(css.includes('body.is-language-classical .panel-stack-tab[aria-selected="true"]'));
assert.ok(css.includes("background: var(--workbench-teal-deep);"));
assert.ok(css.includes("color: #fff;"));
assert.match(
  css,
  /#classical-workbench[\s\S]+:is\(input\[type="text"\], input\[type="search"\], input\[type="number"\], textarea, select\):not\(\.is-hidden-control\)[\s\S]+border-radius: var\(--workbench-control-radius\);/u
);
assert.match(
  css,
  /#classical-result-panel \.classical-rule-surface\[data-classical-result-visual-system="grammar-account-surface"\][\s\S]+\.classical-rule-surface__paradigm-view-button[\s\S]+background: var\(--workbench-teal-deep\);/u
);
assert.match(
  css,
  /\.classical-rule-surface__formula,[\s\S]+\.classical-rule-surface__diagram-rows[\s\S]+background: var\(--workbench-teal-soft\);/u
);
assert.match(
  css,
  /#classical-workbench #classical-source-panel \.classical-source-continuation[\s\S]+border-top: 1px solid var\(--workbench-line\);[\s\S]+background: transparent;/u
);
assert.match(
  css,
  /\.classical-source-continuation \.classical-whole-canvas-action[\s\S]+min-height: var\(--workbench-control-height\);[\s\S]+border-radius: var\(--workbench-control-radius\);/u
);
assert.match(
  css,
  /#classical-workbench #classical-source-panel #container-inputs,[\s\S]+#classical-result-panel #container-tense-grid[\s\S]+gap: var\(--workbench-section-gap\);[\s\S]+border-radius: var\(--workbench-panel-radius\);/u
);
assert.match(
  css,
  /#classical-workbench :is\([\s\S]+#classical-result-panel[\s\S]+\) \.panel-pane-nav-btn \{[\s\S]+display: none !important;/u
);
assert.match(
  css,
  /\.classical-whole-canvas-action:not\(\[data-classical-user-action="compose-captured-clause-results"\]\)[\s\S]+min-height: var\(--workbench-control-height\);[\s\S]+border-radius: var\(--workbench-control-radius\);/u
);
assert.match(
  css,
  /#classical-authority-panel \.classical-segmented-control__option\.is-active[\s\S]+background: var\(--workbench-teal-deep\);[\s\S]+color: #fff;/u
);
assert.match(
  css,
  /#classical-result-panel \.classical-rule-surface\[data-classical-result-visual-system="grammar-account-surface"\] \.classical-rule-surface__disclosure-summary[\s\S]+min-height: var\(--workbench-control-height\);/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-source-parts__mode-button[\s\S]+min-height: var\(--workbench-control-height\);[\s\S]+border-radius: var\(--workbench-control-radius\);/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-basal-unit-button:is\(\.is-active, \[aria-pressed="true"\]\)[\s\S]+background: var\(--workbench-teal-deep\);[\s\S]+color: #fff;/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-basal-unit-button,[\s\S]+#classical-source-panel \.classical-source-parts__mode-button \{[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+font-weight: 700;[\s\S]+line-height: 1\.2;/u
);
assert.match(
  css,
  /#classical-result-panel \.classical-result-scope-controls \{[\s\S]+grid-template-columns: minmax\(0, 16rem\);[\s\S]+justify-content: start;[\s\S]+padding-inline: 0;/u
);
assert.match(
  css,
  /#classical-result-panel \.classical-result-scope-controls \.classical-rule-control__label \{[\s\S]+text-transform: none;/u
);
assert.match(
  css,
  /#classical-authority-panel \.calc-operator-grid--derivation \.calc-operator-chip \{[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+font-weight: 700;/u
);
assert.match(
  css,
  /#classical-result-panel \.classical-rule-surface\[data-classical-result-visual-system="grammar-account-surface"\] :is\([\s\S]+\.classical-rule-surface__paradigm-view-button,[\s\S]+\.classical-rule-surface__format-switch-option[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+font-weight: 700;/u
);
assert.match(
  css,
  /#classical-result-panel \.classical-rule-surface\[data-classical-result-visual-system="grammar-account-surface"\] :is\([\s\S]+\.classical-rule-surface__single-nnc,[\s\S]+\.classical-rule-surface__single-vnc,[\s\S]+\.classical-rule-surface__disclosure-body[\s\S]+> \.classical-rule-surface__format-section \{[\s\S]+padding: 12px 0 0;[\s\S]+border-top: 1px solid var\(--workbench-line\);[\s\S]+border-radius: 0;[\s\S]+background: transparent;/u
);
assert.match(
  css,
  /#classical-result-panel \.classical-rule-surface__vnc-conjugation-copy \{[\s\S]+min-height: var\(--workbench-control-height\);[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+line-height: 1\.2;/u
);
assert.match(
  css,
  /\.classical-reader-guidance-dialog \.classical-canvas-grammar-facts \.classical-rule-control__label \{[\s\S]+font-size: var\(--sgr-type-subsub\);[\s\S]+font-weight: 500;[\s\S]+text-transform: none;/u
);
assert.match(
  css,
  /\.classical-reader-guidance-dialog #classical-canvas-grammar-fact-query,[\s\S]+#classical-canvas-grammar-fact-matches \{[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+font-weight: 600;/u
);
assert.match(
  css,
  /\.classical-reader-guidance-dialog #classical-canvas-grammar-fact-show \{[\s\S]+min-height: var\(--workbench-control-height\);[\s\S]+background: var\(--workbench-teal-soft\);[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+font-weight: 700;/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-source-commit-status\.is-pending \.classical-source-commit-status__badge,[\s\S]+#classical-result-panel \.classical-rule-surface\[data-classical-result-status="blocked"\][\s\S]+\.grammar-inspector__chip \{[\s\S]+background: var\(--workbench-pending-soft\);[\s\S]+color: var\(--workbench-pending\);/u
);
assert.match(
  css,
  /#classical-result-panel \.classical-rule-surface\[data-classical-result-visual-system="grammar-account-surface"\] \.classical-rule-surface__action:disabled \{[\s\S]+background: var\(--workbench-paper-muted\);[\s\S]+color: var\(--workbench-muted\);[\s\S]+opacity: 0\.72;/u
);
assert.match(
  css,
  /#classical-source-panel #verb-entry-apply\.classical-source-parts__commit-button:disabled \{[\s\S]+background: var\(--workbench-paper-muted\);[\s\S]+color: var\(--workbench-muted\);[\s\S]+opacity: 0\.72;/u
);
assert.match(
  css,
  /\.classical-rule-control\.is-conflicting,[\s\S]+\.classical-source-parts__field\.is-conflicting \{[\s\S]+border: 1px solid var\(--workbench-invalid-line\);[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+background: var\(--workbench-invalid-soft\);/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-source-parts__label \{[\s\S]+font-weight: 500;[\s\S]+text-transform: none;/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-source-parts__commit-row \{[\s\S]+justify-content: flex-start;/u
);
assert.match(
  css,
  /#classical-source-panel #verb-entry-apply\.classical-source-parts__commit-button \{[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+font-weight: 700;[\s\S]+line-height: 1\.2;/u
);
assert.match(
  css,
  /#classical-authority-panel \.classical-grammar-continuation \[data-classical-user-action="compose-captured-clause-results"\] \{[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+line-height: 1\.2;/u
);
assert.match(
  css,
  /#classical-authority-panel \.classical-segmented-control__option \{[\s\S]+font-size: var\(--classical-shell-button-size\);[\s\S]+font-weight: 700;[\s\S]+line-height: 1\.2;/u
);
assert.match(
  css,
  /#classical-authority-panel \.classical-whole-canvas-choice__label,[\s\S]+#classical-result-panel \.classical-result-scope-controls \.classical-rule-control__label \{[\s\S]+font-size: var\(--sgr-type-subsub\);[\s\S]+font-weight: 500;[\s\S]+text-transform: none;/u
);
assert.match(
  css,
  /\.classical-vnc-authority-section\[data-classical-vnc-authority-disclosure="particle-group"\][\s\S]+:is\(\.classical-built-in-particles, \.classical-particle-combination-builder\) \{[\s\S]+padding: 0;[\s\S]+border: 0;[\s\S]+background: transparent;[\s\S]+box-shadow: none;/u
);
assert.match(
  css,
  /\.classical-vnc-authority-section\[data-classical-vnc-authority-disclosure="particle-group"\][\s\S]+\.classical-vnc-authority-control-group__header \{[\s\S]+display: none;[\s\S]+\.classical-rule-control__hint \{[\s\S]+font-size: var\(--sgr-type-support\);[\s\S]+font-weight: 500;/u
);
assert.match(
  css,
  /\.classical-grammar-continuation \{[\s\S]+padding: 0;[\s\S]+border: 0;[\s\S]+background: transparent;[\s\S]+box-shadow: none;[\s\S]+\.classical-grammar-continuation > \.classical-clause-relation-workflow \{[\s\S]+padding: 0;[\s\S]+border: 0;[\s\S]+background: transparent;[\s\S]+box-shadow: none;[\s\S]+\.classical-grammar-continuation \.classical-rule-surface__format-heading \{[\s\S]+border-top: 1px solid var\(--workbench-line\);[\s\S]+border-bottom: 0;/u
);
assert.ok(
  css.includes('[data-classical-panel-section="separate-task"]:not(.classical-grammar-continuation)')
);
assert.match(
  css,
  /#classical-result-panel \.classical-rule-surface__disclosure-meta \{[\s\S]+font-weight: 500;/u
);
assert.match(
  css,
  /@media \(max-width: 560px\) \{[\s\S]+#classical-result-panel \.classical-rule-surface__disclosure-summary \{[\s\S]+display: grid;[\s\S]+grid-template-columns: minmax\(0, 1fr\) auto;[\s\S]+#classical-result-panel \.classical-rule-surface__disclosure-summary::after \{[\s\S]+grid-row: 1 \/ span 2;/u
);
assert.match(
  css,
  /@media \(max-width: 420px\) \{[\s\S]+#container-header \.ui-density-control \{[\s\S]+flex: 0 1 auto;[\s\S]+grid-template-columns: auto minmax\(0, 180px\);[\s\S]+gap: 10px;/u
);
assert.match(
  css,
  /#classical-source-panel :is\([\s\S]+\.classical-transcription-keyboard__title,[\s\S]+\.classical-source-context-controls__heading[\s\S]+#classical-authority-panel #classical-rule-logic-controls\[data-classical-rule-logic-surface-unit="vnc"\] \.classical-vnc-authority-section__title \{[\s\S]+font-size: var\(--sgr-type-subsub\);[\s\S]+letter-spacing: 0;[\s\S]+text-transform: none;/u
);
assert.match(
  css,
  /#classical-workbench :is\([\s\S]+#classical-source-panel \.classical-source-commit-status__badge,[\s\S]+#classical-result-panel \.classical-rule-surface__heading \.grammar-inspector__chip[\s\S]+border-radius: 999px;[\s\S]+font-size: var\(--sgr-type-support\);[\s\S]+text-transform: none;/u
);
assert.match(
  css,
  /#classical-authority-panel :is\([\s\S]+\.calc-operator-grid--derivation,[\s\S]+\.calc-operator-grid--voice,[\s\S]+\.calc-operator-grid--causative-subtype[\s\S]+\.calc-operator-chip:not\(:disabled\):is\(\.is-active, \[aria-selected="true"\], \[aria-pressed="true"\]\) \{[\s\S]+background: var\(--workbench-teal-deep\);[\s\S]+color: #fff;/u
);
assert.match(
  css,
  /#classical-authority-panel :is\([\s\S]+\.calc-operator-grid--causative-subtype[\s\S]+\) \.calc-operator-chip[\s\S]+min-height: var\(--workbench-control-height\);/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-source-readout \{[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+background: var\(--workbench-panel-bg-soft\);/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-source-constitution__segment[\s\S]+background: var\(--workbench-teal-soft\);[\s\S]+color: var\(--workbench-teal-deep\);/u
);
assert.doesNotMatch(css, /\.ui-density-button \{\s*min-height: (?:36|38)px;/u);
assert.match(
  css,
  /#classical-authority-panel \.classical-segmented-control__option \{[\s\S]+min-height: var\(--workbench-control-height\);/u
);
assert.match(
  css,
  /#classical-workbench :is\([\s\S]+\.classical-rule-surface__action-status,[\s\S]+\[data-classical-result-status="true"\][\s\S]+color: var\(--workbench-muted\);/u
);
assert.match(
  css,
  /#classical-result-panel \.panel-block-actions \.verb-source-scope-buttons[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+background: var\(--workbench-paper-muted\);/u
);
assert.match(
  css,
  /#classical-result-panel \.panel-block-actions > :is\([\s\S]+\.calc-toggle-lock-chip[\s\S]+min-height: var\(--workbench-control-height\);/u
);
assert.match(
  css,
  /#classical-result-panel \.output-meta-strip :is\([\s\S]+\.tense-description,[\s\S]+\.calc-guidance[\s\S]+border-left: 1px solid var\(--workbench-line\);[\s\S]+box-shadow: none;/u
);
assert.doesNotMatch(shell, /calc-summary|VERBAL NUCLEAR CLAUSE \(VNC\) · SINGLE FORM/u);
assert.doesNotMatch(css, /calc-summary/u);
assert.match(
  css,
  /#classical-result-panel \.output-meta-strip\[hidden\] \{[\s\S]+display: none !important;/u
);
assert.match(
  css,
  /data-classical-clause-relation-capture-actions="true"\][\s\S]+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);[\s\S]+width: 100% !important;[\s\S]+overflow: hidden !important;[\s\S]+white-space: normal !important;/u
);
assert.match(rendering, /label: `Capture as \$\{roleLabel\}`,[\s\S]+Capture current Result as \$\{roleLabel\}/u);
assert.doesNotMatch(css, /\.classical-rule-surface__format-section--sentence\s*\{/u);
assert.doesNotMatch(css, /\.classical-rule-surface__formula--sentence\s*\{/u);
assert.match(
  css,
  /#classical-source-panel \.classical-supplementation-source-contract[\s\S]+background: var\(--workbench-panel-bg-soft\);[\s\S]+color: var\(--workbench-ink\);/u
);
assert.match(
  css,
  /#classical-authority-panel \.classical-vnc-authority-preview__participant-card[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+background: var\(--workbench-panel-bg-soft\);/u
);
assert.match(
  css,
  /\.classical-authority-receipt__item[\s\S]+border-radius: calc\(var\(--workbench-control-radius\) - 2px\);[\s\S]+background: var\(--workbench-paper\);/u
);
assert.match(
  css,
  /#classical-source-panel \.classical-source-internal-morphs__value \{[\s\S]+min-height: var\(--workbench-control-height\);[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+background: var\(--workbench-paper\);/u
);
assert.match(
  css,
  /\.classical-rule-surface__single-vnc > \.classical-rule-surface__format-section,[\s\S]+background: var\(--workbench-panel-bg-soft\);/u
);
assert.match(
  css,
  /\.classical-rule-surface__format-switch \{[\s\S]+border-radius: var\(--workbench-control-radius\);[\s\S]+background: var\(--workbench-paper-muted\);/u
);
assert.match(
  css,
  /\.classical-rule-surface__formula \{[\s\S]+border: 1px solid var\(--workbench-line\);[\s\S]+background: var\(--workbench-teal-soft\);/u
);
assert.match(
  css,
  /\.classical-rule-surface__diagram \{[\s\S]+border: 1px solid var\(--workbench-line\);[\s\S]+background: var\(--workbench-teal-soft\);/u
);
assert.doesNotMatch(
  css,
  /\.calc-operator-grid--derivation \.calc-operator-chip \{[^}]*border-radius:\s*999px;/u
);
assert.doesNotMatch(
  css,
  /data-classical-rule-logic-surface-unit="vnc"\] \.classical-vnc-authority-section \{[^}]*linear-gradient/u
);
assert.match(shell, /function installClassicalPanelRhythm\(\)/u);
assert.match(
  shell,
  /\[resultControls, resultScope, resultSurface, resultContinuation, resultMeta, resultParadigm, resultActions\][\s\S]+resultPanel\.appendChild\(element\)/u
);
assert.match(shell, /classicalPanelRhythm = "title-primary-secondary-actions"/u);
assert.match(
  css,
  /@media \(min-width: 1025px\)[\s\S]+align-items: stretch;[\s\S]+#panel-stack-pane-inputs > #container-inputs \{[\s\S]+height: 100%;/u
);
assert.match(
  css,
  /#panel-stack-pane-inputs > #container-inputs > \* \{[\s\S]+width: 100%;[\s\S]+classical-source-context-controls__grid \{[\s\S]+grid-template-columns: minmax\(0, 1fr\);[\s\S]+#classical-construction-operation-field \{[\s\S]+grid-column: 1 \/ -1;/u
);
assert.match(html, /id="classical-reader-guidance-toggle"[\s\S]+aria-controls="classical-reader-guidance-dialog"/u);
assert.match(html, /<dialog[\s\S]+id="classical-reader-guidance-dialog"/u);
assert.match(html, /data-classical-help-tab="reading"[\s\S]+data-classical-help-tab="facts"/u);
assert.match(shell, /function installClassicalReaderGuidanceHeader\(\)/u);
assert.match(shell, /readingPanel\.appendChild\(guideBody\)[\s\S]+factsPanel\.appendChild\(grammarFacts\)[\s\S]+legacyGuide\.remove\(\)/u);
assert.match(shell, /selectHelpPanel\(panelName =>|const selectHelpPanel = panelName =>/u);
assert.match(shell, /panel\.hidden = panel\.dataset\.classicalHelpPanel !== panelName/u);
assert.match(
  css,
  /\.classical-reader-guidance-dialog \{[\s\S]+width: min\(560px, 100%\);[\s\S]+height: 100dvh;/u
);
assert.match(
  css,
  /\.classical-help-tabs \{[\s\S]+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/u
);
assert.match(
  css,
  /\.classical-reader-guidance-dialog \.classical-reader-guidance__card \{[\s\S]+border: 0;[\s\S]+background: transparent;/u
);
assert.doesNotMatch(html, /id="ui-scale"|Interface size/u);
assert.doesNotMatch(css, /\.ui-scale-(?:control|label|row|value)/u);
assert.match(
  css,
  /#container-header \.ui-density-buttons \{[\s\S]+border: 1px solid var\(--workbench-line-strong\);[\s\S]+background: var\(--workbench-paper-muted\);/u
);
assert.match(
  css,
  /#container-header \.ui-density-button:is\(\.is-active, \[aria-pressed="true"\]\)[\s\S]+background: var\(--workbench-teal-deep\);[\s\S]+color: #fff;/u
);
assert.match(
  css,
  /#container-header \.hero-controls \{[\s\S]+position: absolute;[\s\S]+inset-inline-end: clamp\(16px, 2vw, 28px\);/u
);
assert.match(
  css,
  /#container-header \.ui-density-buttons \{[\s\S]+grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);[\s\S]+width: min\(180px, 100%\);[\s\S]+padding: 2px;/u
);
assert.match(
  css,
  /#container-header \.ui-density-button \{[\s\S]+width: 100% !important;[\s\S]+inline-size: 100% !important;[\s\S]+min-height: 34px;[\s\S]+padding: 5px 9px;/u
);
assert.match(
  css,
  /@media \(max-width: 720px\)[\s\S]+#container-header \.hero-controls \{[\s\S]+position: static;/u
);
assert.match(
  css,
  /> \[data-classical-panel-section\] \+[\s\S]+border-top: 1px solid var\(--workbench-line\);/u
);
assert.match(
  css,
  /\.classical-source-readout,[\s\S]+\.classical-source-constitution[\s\S]+border: 0;[\s\S]+background: transparent;/u
);
assert.ok(contrastRatio(selectedBackground, selectedForeground) >= 4.5);

console.log("Panel tab contrast tests passed.");
