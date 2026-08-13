// Canonical modern ESM module.

import { CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS } from "../../core/output/scope.mjs?v=20260726-lessons2-58-one-system-094";
import { PLACE_GENTILIC_NNC_UI_CONTROL_CONTRACTS } from "../../core/nnc/place_gentilic/ui_contract.mjs?v=20260726-lessons2-58-one-system-094";
import {
  CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS,
} from "../../core/classical/vnc_late_operation_ui_contract.mjs?v=20260726-lessons2-58-one-system-094";
import {
  LESSON1_READER_GUIDANCE_GROUPS,
  isLesson1ReaderGuidanceExact,
  renderLesson1ReaderGuidance,
} from "../curriculum/lesson1_reader_guidance.mjs?v=20260811-lesson1-reader-guidance-005";
import {
  LESSON2_READER_GUIDANCE_GROUPS,
  isLesson2ReaderGuidanceExact,
  renderLesson2ReaderGuidance,
} from "../curriculum/lesson2_reader_guidance.mjs?v=20260812-lesson2-reader-guidance-001";
import {
  LESSON3_READER_GUIDANCE_GROUPS,
  isLesson3ReaderGuidanceExact,
  renderLesson3ReaderGuidance,
} from "../curriculum/lesson3_reader_guidance.mjs?v=20260812-lesson3-reader-guidance-004";
import {
  LESSON4_READER_GUIDANCE_GROUPS,
  isLesson4ReaderGuidanceExact,
  renderLesson4ReaderGuidance,
} from "../curriculum/lesson4_reader_guidance.mjs?v=20260812-lesson4-reader-guidance-002";
import {
  LESSON5_READER_GUIDANCE_GROUPS,
  isLesson5ReaderGuidanceExact,
  renderLesson5ReaderGuidance,
} from "../curriculum/lesson5_reader_guidance.mjs?v=20260812-lesson5-complete-003";
import {
  LESSON6_READER_GUIDANCE_GROUPS,
  isLesson6ReaderGuidanceExact,
  renderLesson6ReaderGuidance,
} from "../curriculum/lesson6_reader_guidance.mjs?v=20260812-lesson6-groups1-3-001";
import {
  LESSON7_READER_GUIDANCE_GROUPS,
  isLesson7ReaderGuidanceExact,
  renderLesson7ReaderGuidance,
} from "../curriculum/lesson7_reader_guidance.mjs?v=20260813-lesson7-complete-005";
import {
  LESSON8_READER_GUIDANCE_GROUPS,
  isLesson8ReaderGuidanceExact,
  renderLesson8ReaderGuidance,
} from "../curriculum/lesson8_reader_guidance.mjs?v=20260813-lesson8-complete-004";
import {
  LESSON9_READER_GUIDANCE_GROUPS,
  isLesson9ReaderGuidanceExact,
  renderLesson9ReaderGuidance,
} from "../curriculum/lesson9_reader_guidance.mjs?v=20260813-lesson9-complete-004";

export function createClassicalShellModule(targetObject = globalThis) {
    function renderClassicalResultOutputScopeOptions(role = "") {
      return (CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS[role]?.options || []).map((option, index) => `                    <option value="${option.value}"${index === 0 ? " selected" : ""}>${option.label}</option>`).join("\n");
    }
    function renderPlaceGentilicNncOptions(controlId = "") {
      return (PLACE_GENTILIC_NNC_UI_CONTROL_CONTRACTS[controlId] || []).map(option => {
        const attributes = [
          `value="${option.value}"`,
          controlId === "classical-construction-operation" ? 'data-classical-source-unit="nnc"' : "",
          controlId === "classical-construction-operation" ? 'data-classical-grammar-operation="place or gentilic formation"' : "",
          controlId === "classical-construction-operation" ? 'data-classical-result-unit="nnc"' : "",
          option.formationKind ? `data-place-gentilic-formation-kind="${option.formationKind}"` : "",
          option.selected ? "selected" : ""
        ].filter(Boolean).join(" ");
        const label = controlId === "classical-construction-operation"
          ? "NNC Source → place or gentilic formation → NNC Result"
          : option.label;
        return `                            <option ${attributes}>${label}</option>`;
      }).join("\n");
    }
    function escapeClassicalShellHtml(value = "") {
      return String(value)
        .replace(/&/gu, "&amp;")
        .replace(/</gu, "&lt;")
        .replace(/>/gu, "&gt;")
        .replace(/"/gu, "&quot;");
    }
    function renderClassicalVncLateOperationOptions(controlId = "") {
      const options =
        CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS[
          String(controlId || "").trim()
        ] || [];
      const rows = [];
      let currentGroup = "";
      options.forEach(option => {
        const optionGroup = String(option.optionGroup || "");
        if (optionGroup !== currentGroup) {
          if (currentGroup) rows.push("                          </optgroup>");
          if (optionGroup) {
            rows.push(`                          <optgroup label="${escapeClassicalShellHtml(optionGroup)}">`);
          }
          currentGroup = optionGroup;
        }
        const attributes = [
          `value="${escapeClassicalShellHtml(option.value)}"`,
          option.selected ? "selected" : "",
          option.disabled ? "disabled" : "",
        ].filter(Boolean).join(" ");
        rows.push(`                            <option ${attributes}>${escapeClassicalShellHtml(option.label)}</option>`);
      });
      if (currentGroup) rows.push("                          </optgroup>");
      return rows.join("\n");
    }
    function ClassicalPanelTabs() {
      return `          <nav
                class="panel-stack-tabs"
                data-classical-workbench-stage-navigation="true"
                data-classical-navigation-authority="false"
                role="tablist"
                aria-label="Classical Nahuatl Workbench stages"
              >
                <button
                  type="button"
                  class="panel-stack-tab button-with-icon is-active"
                  id="panel-stack-tab-inputs"
                  data-panel-stack-tab="inputs"
                  data-andrews-panel="#1-source"
                  data-andrews-panel-role="source"
                  role="tab"
                  aria-selected="true"
                  aria-controls="panel-stack-pane-inputs"
                >
                  <span class="button-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" focusable="false">
                      <rect x="2.5" y="3" width="11" height="10" rx="2"></rect>
                      <path d="M5 8h6"></path>
                      <path d="M8 5l3 3-3 3"></path>
                    </svg>
                  </span>
                  <span class="panel-stack-tab__step" aria-hidden="true">1</span>
                  <span class="button-label">Source</span>
                </button>
                <button
                  type="button"
                  class="panel-stack-tab button-with-icon"
                  id="panel-stack-tab-formula"
                  data-panel-stack-tab="formula"
                  data-andrews-panel="#2-authority"
                  data-andrews-panel-role="authority"
                  role="tab"
                  aria-selected="false"
                  aria-controls="panel-stack-pane-tense"
                >
                  <span class="button-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" focusable="false">
                      <path d="M3 4.5h4.5v4.5"></path>
                      <path d="M7.5 4.5 3 9"></path>
                      <path d="M13 11.5H8.5V7"></path>
                      <path d="M8.5 11.5 13 7"></path>
                    </svg>
                  </span>
                  <span class="panel-stack-tab__step" aria-hidden="true">2</span>
                  <span class="button-label">Grammar</span>
                </button>
                <button
                  type="button"
                  class="panel-stack-tab button-with-icon"
                  id="panel-stack-tab-output"
                  data-panel-stack-tab="output"
                  data-andrews-panel="#3-authorized-result"
                  data-andrews-panel-role="authorized-result"
                  role="tab"
                  aria-selected="false"
                  aria-controls="container-tense-grid"
                >
                  <span class="button-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" focusable="false">
                      <rect x="2.5" y="3" width="11" height="10" rx="2"></rect>
                      <path d="M2.5 6.5h11"></path>
                      <path d="M6 6.5V13"></path>
                      <path d="M9.75 6.5V13"></path>
                    </svg>
                  </span>
                  <span class="panel-stack-tab__step" aria-hidden="true">3</span>
                  <span class="button-label">Result</span>
                </button>
              </nav>
    `;
    }
    function ClassicalSourcePanel() {
      return `          <form
                class="panel-stack-pane is-active"
                id="panel-stack-pane-inputs"
                data-panel-stack-pane="inputs"
                data-andrews-stage="source"
                data-andrews-stage-label="1 Source"
                data-andrews-panel="#1-source"
                data-andrews-panel-role="source"
                data-andrews-formula-role="predicate-stem-source"
                data-classical-source-contract="source-only"
                data-classical-source-authorizes="none"
                data-classical-user-generated="source-unit"
                data-classical-machine-generated="rank-classification"
                data-classical-workbench-stage="source"
                data-classical-stage-authority="false"
                role="tabpanel"
                aria-labelledby="panel-stack-tab-inputs"
                autocomplete="off"
              >
                <div
                  class="form-container panel nuclear-clause-source-panel"
                  id="container-inputs"
                  data-andrews-component="nuclear-clause-source"
                  data-andrews-contains="clause-kind predicate-stem"
                  data-classical-source-contract="source-only"
                  data-classical-source-authorizes="none"
                  data-classical-user-generated="source-unit"
                  data-classical-machine-generated="rank-classification"
                  data-classical-source-layout="unified-source"

                >
                  <div class="panel-block-title">
                    <button
                      type="button"
                      class="panel-pane-nav-btn panel-pane-nav-btn--prev"
                      data-pane-nav-from="inputs"
                      data-pane-nav-direction="prev"
                      aria-label="Go to previous panel"
                      title="Previous panel"
                    >
                      <span aria-hidden="true">◀</span>
                    </button>
                    <span class="panel-block-step">1</span>
                    <h2
                      class="panel-block-text"
                      id="classical-stage-source-heading"
                      data-classical-stage-heading="source"
                    >SOURCE</h2>
                    <div class="verb-block__top-controls">
                      <div
                        class="calc-input-mode"
                        role="group"
                        aria-label="Nuclear-clause entry"
                      >
                      </div>
                    </div>
                    <button
                      type="button"
                      class="panel-pane-nav-btn panel-pane-nav-btn--next"
                      data-pane-nav-from="inputs"
                      data-pane-nav-direction="next"
                      aria-label="Go to next panel"
                      title="Next panel"
                    >
                      <span aria-hidden="true">▶</span>
                    </button>
                  </div>
                  <div
                    class="classical-basal-unit-controls"
                    id="classical-basal-unit-controls"
                    role="group"
                    aria-label="Classical Nahuatl basal unit"
                    data-classical-basal-unit-controls="true"
                    data-panel-columns="basal-buttons"
                    data-classical-basal-unit-order="vnc nnc"
                    data-classical-basal-unit="vnc"
                  >
                    <button
                      type="button"
                      class="classical-basal-unit-button is-active"
                      data-classical-basal-unit="vnc"
                      data-classical-basal-scope="verbal-nuclear-clause"
                      data-classical-output-owner="vnc"
                      data-nuclear-clause-authority="true"
                      aria-pressed="true"
                    >
                      <span class="classical-basal-unit-button__main">VNC</span>
                      <span class="classical-basal-unit-button__sub">verbal nuclear clause</span>
                    </button>
                    <button
                      type="button"
                      class="classical-basal-unit-button"
                      data-classical-basal-unit="nnc"
                      data-classical-basal-scope="nominal-nuclear-clause"
                      data-classical-output-owner="nnc"
                      data-nuclear-clause-authority="true"
                      aria-pressed="false"
                    >
                      <span class="classical-basal-unit-button__main">NNC</span>
                      <span class="classical-basal-unit-button__sub">nominal nuclear clause</span>
                    </button>
                  </div>
                  <div
                    class="form-group classical-source-unit"
                    data-classical-source-unit="stem-roles-readout"
                  >
                    <section
                      class="verb-block nuclear-clause-entry"
                      id="verb-block"
                      aria-label="Classical source: stem or particle"
                      data-andrews-formula-role="stem-foundation"
                      data-classical-source-contract="stem-or-particle-source"

                    >
                      <div
                        class="verb-block__display"
                        data-classical-source-mirror="runtime-only"
                        data-classical-source-authorizes="none"
                      >
                        <span class="verb-block__mirror-label" id="classical-source-mirror-label">Committed Source</span>
                        <div class="verb-block__screen">
                          <div class="verb-input-wrap">
                            <input
                              type="text"
                              id="verb"
                              name="verb"
                              class="verb-input"
                              inputmode="text"
                              aria-labelledby="classical-source-mirror-label"
                              aria-describedby="classical-source-commit-status"
                              tabindex="-1"
                              data-andrews-input="stem-only"
                              data-andrews-formula-role="stem"
                              data-classical-source-input-role="machine-mirror"
                              data-classical-source-mirror="runtime-only"
                              readonly
                              placeholder="_"
                              autocomplete="off"
                              autocorrect="off"
                              data-lpignore="true"
                              data-1p-ignore="true"
                              autocapitalize="none"
                              spellcheck="false"
                            />
                          </div>
                      </div>
                      <div class="verb-block__hint-row">
                        <div class="verb-composer__hint" id="verb-composer-hint" aria-live="polite"></div>
                      </div>
                    </div>
                    <section
                      class="classical-nnc-source-guide"
                      id="classical-vnc-source-guide"
                      data-classical-vnc-source-guide="canonical-stems"
                      data-classical-source-contract="stem-only"
                      data-classical-source-authorizes="none"
                      aria-label="VNC canonical verbstems"
                    >
                      <label class="classical-nnc-source-guide__field">
                        <span class="classical-nnc-source-guide__label">Canonical verbstem</span>
                        <select
                          id="classical-vnc-source-stem"
                          class="classical-nnc-source-guide__select"
                          data-classical-vnc-source-stem-picker="true"
                        >
                          <option value="">Type a verbstem or choose a canonical stem</option>
                        </select>
                      </label>
                      <p id="classical-vnc-source-initial-i" class="classical-vnc-source-guide__fact" hidden aria-live="polite"></p>
                      <label id="classical-vnc-source-initial-i-choice-field" class="classical-nnc-source-guide__field classical-nnc-source-guide__checkbox" hidden>
                        <input
                          id="classical-vnc-source-initial-i-choice"
                          type="checkbox"
                          value="supportive"
                          data-classical-checked-value="supportive"
                          data-classical-unchecked-value="real"
                          aria-describedby="classical-vnc-source-initial-i"
                        />
                        <span class="classical-nnc-source-guide__label">Supportive i</span>
                      </label>
                      <p id="classical-vnc-source-lexeme-fact" class="classical-vnc-source-guide__fact" hidden aria-live="polite"></p>
                      <label id="classical-vnc-source-lexeme-choice-field" class="classical-nnc-source-guide__field" hidden>
                        <span class="classical-nnc-source-guide__label">Meaning of this source</span>
                        <select
                          id="classical-vnc-source-lexeme-choice"
                          class="classical-nnc-source-guide__select"
                          data-classical-source-constituent="source-lexeme-id"
                          data-classical-url-state-authority="false"
                          data-classical-restored-state-authority="false"
                          aria-describedby="classical-vnc-source-lexeme-fact"
                        >
                          <option value="" selected>Choose the lexical Source meaning</option>
                          <option value="cn-vnc-pachihui-pressed-down">pressed down, sunken, or settled</option>
                          <option value="cn-vnc-pachihui-satiated">full, satiated, or satisfied</option>
                        </select>
                      </label>
                      <p class="classical-nnc-source-guide__rule"><code>...-(...)</code> is transitive; <code>(...)</code> is intransitive. Choosing one enters only its verbstem; Valence and Class remain explicit Source choices.</p>
                    </section>
                    <section
                      class="classical-nnc-source-guide"
                      id="classical-nnc-source-guide"
                      data-classical-nnc-source-guide="canvas-examples"
                      data-classical-source-contract="stem-only"
                      data-classical-source-authorizes="none"
                      aria-label="Nounstem"
                      aria-hidden="true"
                      hidden
                    >
                      <label class="classical-nnc-source-guide__field">
                        <span class="classical-nnc-source-guide__label">Canonical nounstem</span>
                        <select
                          id="classical-nnc-source-example"
                          class="classical-nnc-source-guide__select"
                          data-classical-nnc-source-example="true"
                          disabled
                        >
                          <option value="">Type a nounstem or choose a canonical stem</option>
                          <optgroup label="Ordinary nounstems">
                            <option value="cal" data-classical-nnc-source-stem="cal" data-classical-nnc-source-mode="whole-stem">(cal) · house · tli class</option>
                            <option value="pah" data-classical-nnc-source-stem="pah" data-classical-nnc-source-mode="whole-stem">(pah) · medicine · tli class</option>
                            <option value="mich" data-classical-nnc-source-stem="mich" data-classical-nnc-source-mode="whole-stem">(mich) · fish · in class</option>
                            <option value="chichi" data-classical-nnc-source-stem="chichi" data-classical-nnc-source-mode="whole-stem">(chichi) · dog · 0 class</option>
                            <option value="tēuc" data-classical-nnc-source-stem="tēuc" data-classical-nnc-source-mode="whole-stem">(tēuc) · lord · tli class</option>
                            <option value="pil" data-classical-nnc-source-stem="pil" data-classical-nnc-source-mode="whole-stem">(pil) · child / noble · tli class</option>
                            <option value="māi" data-classical-nnc-source-stem="māi" data-classical-nnc-source-mode="whole-stem">(māi) · hand · tl class, truncated use stem</option>
                            <option value="tle-māi" data-classical-nnc-source-stem="tle-māi" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="tle" data-classical-nnc-source-matrix="māi">(tle-māi) · fire-hand / incense ladle · compound tl class</option>
                          </optgroup>
                          <optgroup label="Personal entities">
                            <option value="eh" data-classical-nnc-source-stem="eh" data-classical-nnc-source-mode="whole-stem">(eh) · personal simple · 1st/2nd person</option>
                            <option value="yeh" data-classical-nnc-source-stem="yeh" data-classical-nnc-source-mode="whole-stem">(yeh) · personal simple · 3rd person</option>
                            <option value="eh-huā" data-classical-nnc-source-stem="eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="eh" data-classical-nnc-source-matrix="huā">(eh-huā) · personal compound · 1st/2nd person</option>
                            <option value="yeh-huā" data-classical-nnc-source-stem="yeh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="yeh" data-classical-nnc-source-matrix="huā">(yeh-huā) · personal compound · 3rd person</option>
                            <option value="yeh-yeh-huā" data-classical-nnc-source-stem="yeh-yeh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="yeh-yeh" data-classical-nnc-source-matrix="huā">(yeh-yeh-huā) · various kinds of entities</option>
                            <option value="eh-eh-huā" data-classical-nnc-source-stem="eh-eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="eh-eh" data-classical-nnc-source-matrix="huā">(eh-eh-huā) · various kinds of entities</option>
                          </optgroup>
                          <optgroup label="Identity questions">
                            <option value="tl-eh" data-classical-nnc-source-stem="tl-eh" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="tl" data-classical-nnc-source-matrix="eh">(tl-eh) · what entity?</option>
                            <option value="tl-eh-huā" data-classical-nnc-source-stem="tl-eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="tl" data-classical-nnc-source-matrix="eh-huā">(tl-eh-huā) · what entity? · compound</option>
                            <option value="cā" data-classical-nnc-source-stem="cā" data-classical-nnc-source-mode="whole-stem">(cā) · which entity?</option>
                            <option value="cā-tl-eh" data-classical-nnc-source-stem="cā-tl-eh" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="cā" data-classical-nnc-source-matrix="tl-eh">(cā-tl-eh) · which entity? · compound</option>
                            <option value="cā-tl-e-in" data-classical-nnc-source-stem="cā-tl-e-in" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="cā" data-classical-nnc-source-matrix="tl-e-in">(cā-tl-e-in) · which entity? · fused variant</option>
                            <option value="cā-tl-eh-huā" data-classical-nnc-source-stem="cā-tl-eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="cā" data-classical-nnc-source-matrix="tl-eh-huā">(cā-tl-eh-huā) · which entity? · personal compound</option>
                            <option value="ā-0" data-classical-nnc-source-stem="ā-0" data-classical-nnc-source-mode="internal-morphemes">(ā-0) · what person?</option>
                          </optgroup>
                          <optgroup label="Demonstratives">
                            <option value="īn" data-classical-nnc-source-stem="īn" data-classical-nnc-source-mode="whole-stem">(īn) · this entity</option>
                            <option value="ōn" data-classical-nnc-source-stem="ōn" data-classical-nnc-source-mode="whole-stem">(ōn) · that entity</option>
                          </optgroup>
                          <optgroup label="Indefinites">
                            <option value="a-c-ah" data-classical-nnc-source-stem="a-c-ah" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="a-c" data-classical-nnc-source-matrix="ah">(a-c-ah) · someone</option>
                            <option value="itl-ah" data-classical-nnc-source-stem="itl-ah" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="itl" data-classical-nnc-source-matrix="ah">(itl-ah) · something</option>
                          </optgroup>
                          <optgroup label="Quantity / measure">
                            <option value="ix-qui-ch" data-classical-nnc-source-stem="ix-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="ix" data-classical-nnc-source-matrix="qui-ch">(ix-qui-ch) · all · qui-ch matrix</option>
                            <option value="cem-ix-qui-ch" data-classical-nnc-source-stem="cem-ix-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="cem-ix" data-classical-nnc-source-matrix="qui-ch">(cem-ix-qui-ch) · completely all</option>
                            <option value="quē-x-qui-ch" data-classical-nnc-source-stem="quē-x-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="quē-x" data-classical-nnc-source-matrix="qui-ch">(quē-x-qui-ch) · how much / many?</option>
                            <option value="quē-x-ix-qui-ch" data-classical-nnc-source-stem="quē-x-ix-qui-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="quē-x-ix" data-classical-nnc-source-matrix="qui-ch">(quē-x-ix-qui-ch) · how many kinds?</option>
                            <option value="miya-qui" data-classical-nnc-source-stem="miya-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="miya" data-classical-nnc-source-matrix="qui">(miya-qui) · much / many</option>
                            <option value="miya-c" data-classical-nnc-source-stem="miya-c" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="miya" data-classical-nnc-source-matrix="c">(miya-c) · much / many · c variant</option>
                            <option value="miye-qui" data-classical-nnc-source-stem="miye-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="miye" data-classical-nnc-source-matrix="qui">(miye-qui) · much / many</option>
                            <option value="miye-c" data-classical-nnc-source-stem="miye-c" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="miye" data-classical-nnc-source-matrix="c">(miye-c) · much/many · qui matrix</option>
                            <option value="ce-qui" data-classical-nnc-source-stem="ce-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="ce" data-classical-nnc-source-matrix="qui">(ce-qui) · one / some / part</option>
                            <option value="iz-qui" data-classical-nnc-source-stem="iz-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="iz" data-classical-nnc-source-matrix="qui">(iz-quī) · singular (iz-qui) · equal amount</option>
                            <option value="quē-z-qui" data-classical-nnc-source-stem="quē-z-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="quē-z" data-classical-nnc-source-matrix="qui">(quē-z-quī) · singular (quē-z-qui) · how many?</option>
                            <option value="quē-c-iz-qui" data-classical-nnc-source-stem="quē-c-iz-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="quē-c-iz" data-classical-nnc-source-matrix="qui">(quē-c-iz-quī) · singular (quē-c-iz-qui) · how many each?</option>
                            <option value="a-qui" data-classical-nnc-source-stem="a-qui" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="a" data-classical-nnc-source-matrix="qui">(a-quī) · singular (a-qui) · a few</option>
                            <option value="a-chi" data-classical-nnc-source-stem="a-chi" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="a" data-classical-nnc-source-matrix="chi">(a-chī) · singular (a-chi) · a little</option>
                            <option value="mo-chi" data-classical-nnc-source-stem="mo-chi" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="mo" data-classical-nnc-source-matrix="chi">(mo-chi) · all · chi matrix</option>
                            <option value="mo-ch" data-classical-nnc-source-stem="mo-ch" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="mo" data-classical-nnc-source-matrix="ch">(mo-ch) · all · shortened variant</option>
                            <option value="mo-ch-eh-huā" data-classical-nnc-source-stem="mo-ch-eh-huā" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="mo-ch" data-classical-nnc-source-matrix="eh-huā">(mo-ch-eh-huā) · all of that entity</option>
                            <option value="ix-a-chi" data-classical-nnc-source-stem="ix-a-chi" data-classical-nnc-source-mode="embed-matrix" data-classical-nnc-source-embed="ix-a" data-classical-nnc-source-matrix="chi">(ix-a-chi) · very large amount</option>
                          </optgroup>
                        </select>
                      </label>
                      <p class="classical-nnc-source-guide__rule">Source contains the nounstem only. Subject, State, and number remain outside (STEM).</p>
                    </section>
                    <div
                      class="classical-source-identity-controls"
                      id="classical-source-identity-controls"
                      data-classical-source-identity-controls="vnc"
                      aria-label="Identified source properties"
                    >
                      <label class="classical-rule-control" data-classical-source-identity-control="valence">
                        <span class="classical-rule-control__label">Source VNC Valence</span>
                        <select
                          id="classical-rule-logic-valence"
                          data-classical-rule-logic-control="valence"
                        >
                          <option value="intransitive" selected>intransitive · no source object</option>
                          <option value="shuntline-reflexive">va ne secondary reflexive/reciprocal</option>
                          <option value="projective-human">va te nonspecific human projective</option>
                          <option value="projective-nonhuman">va tla nonspecific nonhuman projective</option>
                          <option value="specific-projective">va1-va2 specific projective</option>
                          <option value="mainline-reflexive">va1-va2 mainline reflexive/reciprocal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-source-identity-control="class">
                        <span class="classical-rule-control__label">Stem class</span>
                        <select
                          id="classical-rule-logic-class"
                          data-classical-rule-logic-control="class"
                        >
                          <option value="A">A</option>
                          <option value="B" selected>B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-source-identity-control="voice" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Source voice</span>
                        <select
                          id="classical-rule-logic-causative-source-voice"
                          data-classical-rule-logic-control="causative-source-voice"
                          data-classical-source-constituent="source-voice"
                          aria-description="Voice of the Source VNC consumed by the causative; distinct from the later target-voice operation"
                        >
                          <option value="active" selected>active source</option>
                          <option value="passive">passive source</option>
                          <option value="impersonal">impersonal source</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-source-identity-control="nonactive-formation" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Source nonactive formation</span>
                        <select
                          id="classical-rule-logic-causative-source-nonactive"
                          data-classical-rule-logic-control="causative-source-nonactive"
                          data-classical-source-constituent="source-nonactive-formation"
                        >
                          <option value="" selected>Choose a generated source formation</option>
                        </select>
                      </label>
                    </div>
                    <div
                      class="classical-source-parts"
                      id="classical-source-parts"
                      data-classical-source-parts="user-defined"
                      data-classical-source-contract="source-only"
                      data-classical-source-authorizes="none"
                      data-classical-source-parts-mode="whole-stem"
                    >
                      <div
                        class="classical-source-parts__mode"
                        role="group"
                        aria-label="Source stem structure"
                      >
                        <button
                          type="button"
                          class="classical-source-parts__mode-button is-active"
                          data-classical-source-parts-kind="whole-stem"
                          aria-pressed="true"
                        >Stem</button>
                        <button
                          type="button"
                          class="classical-source-parts__mode-button"
                          data-classical-source-parts-kind="embed-matrix"
                          aria-pressed="false"
                        >Embed + matrix</button>
                      </div>
                      <div class="classical-source-parts__grid" data-classical-source-parts-grid>
                        <label class="classical-source-parts__field classical-source-parts__field--whole">
                          <span class="classical-source-parts__label">Stem</span>
                          <input
                            type="text"
                            id="classical-source-whole"
                            class="classical-source-parts__input"
                            data-classical-source-part-input="whole"
                            aria-describedby="classical-source-commit-status"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="none"
                            spellcheck="false"
                          />
                        </label>
                        <label class="classical-source-parts__field classical-source-parts__field--embed">
                          <span class="classical-source-parts__label">Embed</span>
                          <input
                            type="text"
                            id="classical-source-embed"
                            class="classical-source-parts__input"
                            data-classical-source-part-input="embed"
                            aria-describedby="classical-source-commit-status"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="none"
                            spellcheck="false"
                            disabled
                          />
                        </label>
                        <label class="classical-source-parts__field classical-source-parts__field--matrix">
                          <span class="classical-source-parts__label">Matrix</span>
                          <input
                            type="text"
                            id="classical-source-matrix"
                            class="classical-source-parts__input"
                            data-classical-source-part-input="matrix"
                            aria-describedby="classical-source-commit-status"
                            autocomplete="off"
                            autocorrect="off"
                            autocapitalize="none"
                            spellcheck="false"
                            disabled
                          />
                        </label>
                      </div>
                      <div
                        id="classical-transcription-keyboard"
                        class="classical-transcription-keyboard classical-source-parts__keyboard"
                        aria-label="Sound keyboard for the active stem field"
                        data-classical-source-authorizes="none"
                      >
                        <span class="classical-transcription-keyboard__title">Sound keyboard</span>
                        <p>Click a sound to type it directly into Stem, Embed, or Matrix. You can still type anything.</p>
                        <div class="classical-transcription-keyboard__group" aria-label="Vowels">
                          <span>Vowels</span>
                          <div id="classical-transcription-keyboard-vowels" class="classical-transcription-keyboard__keys"></div>
                        </div>
                        <div class="classical-transcription-keyboard__group" aria-label="Consonants">
                          <span>Consonants</span>
                          <div id="classical-transcription-keyboard-consonants" class="classical-transcription-keyboard__keys"></div>
                        </div>
                      </div>
                      <div
                        id="classical-transcription-optional-controls"
                        class="classical-transcription-source__optional-controls"
                        aria-label="Optional Lesson 2 Result choices"
                        hidden
                      >
                        <label id="classical-transcription-optional-result-field" class="classical-rule-control" hidden>
                          <span class="classical-rule-control__label">Optional Result change</span>
                          <select id="classical-transcription-optional-result" data-classical-rule-logic-control="lesson2-optional-result">
                            <option value="ordinary" selected>Keep the ordinary Result</option>
                          </select>
                        </label>
                        <label id="classical-transcription-elision-field" class="classical-rule-control classical-rule-control--checkbox" hidden>
                          <span class="classical-rule-control__label">Elide vowel</span>
                          <input id="classical-transcription-elision" type="checkbox" data-classical-checked-value="elide" data-classical-unchecked-value="keep" />
                        </label>
                      </div>
                      <div
                        class="classical-source-commit-status"
                        id="classical-source-commit-status"
                        data-classical-source-commit-status="committed"
                        data-classical-status-authority="false"
                        data-classical-source-authorizes="none"
                        role="status"
                        aria-atomic="true"
                      >
                        <span
                          class="classical-source-commit-status__badge"
                          data-classical-source-commit-badge
                        >Waiting</span>
                        <span
                          class="classical-source-commit-status__text"
                          data-classical-source-commit-message
                        >Enter a Source, then apply it to Grammar and Result.</span>
                      </div>
                      <div class="classical-source-parts__commit-row">
                        <button
                          type="button"
                          id="verb-entry-apply"
                          class="verb-entry-apply-button classical-source-parts__commit-button"
                          aria-label="Apply source and update Grammar and Result"
                          aria-describedby="classical-source-commit-status"
                          aria-keyshortcuts="Enter"
                          title="Apply source (Enter or Return)"
                        >
                          <span class="classical-source-parts__commit-label">Apply source</span>
                          <kbd class="classical-source-parts__commit-key">Enter</kbd>
                        </button>
                      </div>
                      <div
                        class="classical-source-internal-morphs"
                        id="classical-source-internal-morphs"
                        data-classical-source-internal-morphs="typed-andrews-analysis"
                        aria-label="Typed internal morphemes"
                        hidden
                      ></div>
                    </div>
                    <section
                      class="classical-source-context-controls"
                      id="classical-source-context-controls"
                      data-classical-source-context-controls="discourse-participants"
                      data-classical-source-contract="contextual-constituents"
                      data-classical-source-authorizes="context-only"
                      data-classical-url-state-authority="false"
                      data-classical-restored-state-authority="false"
                      aria-label="Speaker and participant context"
                    >
                      <div class="classical-source-context-controls__heading">
                        Speaker and participant context
                      </div>
                      <div class="classical-source-context-controls__grid">
                        <label
                          class="classical-rule-control"
                          id="classical-source-context-speaker-sex-control"
                          data-classical-source-context-applicability="vocative-or-interjection"
                          hidden
                        >
                          <span class="classical-rule-control__label">Speaker sex (vocative/interjection only)</span>
                          <select
                            id="classical-source-context-speaker-gender"
                            data-classical-source-context-constituent="speaker-gender"
                          >
                            <option value="unspecified" selected>not specified</option>
                            <option value="male">man</option>
                            <option value="female">woman</option>
                          </select>
                        </label>
                        <label class="classical-rule-control">
                          <span class="classical-rule-control__label">Speaker in referenced group</span>
                          <select
                            id="classical-source-context-group-membership"
                            data-classical-source-context-constituent="speaker-group-membership"
                          >
                            <option value="unspecified" selected>not specified</option>
                            <option value="member">member</option>
                            <option value="nonmember">not a member</option>
                          </select>
                        </label>
                        <label class="classical-rule-control">
                          <span class="classical-rule-control__label">Known member with named third party</span>
                          <select
                            id="classical-source-context-named-partner"
                            data-classical-source-context-constituent="named-partner-known-participant"
                            aria-describedby="classical-source-context-named-partner-help"
                          >
                            <option value="none" selected>none specified</option>
                            <option value="speaker">speaker</option>
                            <option value="addressee">addressee</option>
                          </select>
                          <span
                            class="classical-source-context-controls__help"
                            id="classical-source-context-named-partner-help"
                          >The captured supplement supplies the named third party.</span>
                        </label>
                      </div>
                    </section>
                    <section
                      class="classical-nnc-source-analysis classical-construction-source-controls"
                      id="classical-construction-source-controls"
                      data-classical-construction-source-controls="true"
                      data-classical-source-authorizes="typed-user-choices-only"
                      aria-label="Typed Classical construction source"
                    >
                      <div class="classical-nnc-source-analysis__grid">
                        <label class="classical-rule-control" id="classical-construction-operation-field">
                          <span class="classical-rule-control__label">Source operation</span>
                          <select id="classical-construction-operation" data-classical-rule-logic-control="nominal-construction-operation">
                            <option value="none" data-classical-source-unit="any" data-classical-grammar-operation="direct generation" data-classical-result-unit="same" selected>Source → direct generation → same-rank Result</option>
                            <optgroup label="Operations from a VNC Source" data-classical-operation-source-group="vnc">
                            <option value="nominal-embed-vnc" data-classical-source-unit="vnc" data-classical-grammar-operation="nominal embedding" data-classical-result-unit="vnc">VNC Source → nominal embedding → VNC Result</option>
                            <option value="attitude-vnc" data-classical-source-unit="vnc" data-classical-grammar-operation="attitude formation" data-classical-result-unit="vnc">VNC Source → honorific, reverential, or pejorative formation → VNC Result</option>
                            <option
                              value="deverbal-nnc"
                              data-classical-source-unit="vnc"
                              data-classical-grammar-operation="deverbal nominalization"
                              data-classical-result-unit="nnc"
                            >VNC Source → deverbal nominalization → NNC Result</option>
                            </optgroup>
                            <optgroup label="Operations from an NNC Source" data-classical-operation-source-group="nnc">
                            <option value="compound-nnc" data-classical-source-unit="nnc" data-classical-grammar-operation="nominal compounding" data-classical-result-unit="nnc">NNC Source → nominal compounding → NNC Result</option>
                            <option value="affective-nnc" data-classical-source-unit="nnc" data-classical-grammar-operation="affective formation" data-classical-result-unit="nnc-or-vnc">NNC Source → affective formation → NNC or VNC Result</option>
                            <option value="cardinal-numeral-nnc" data-classical-source-unit="nnc" data-classical-grammar-operation="cardinal-number construction" data-classical-result-unit="nnc-or-vnc">NNC Source → cardinal-number construction → NNC or VNC Result</option>
                            <option value="personal-name-nnc" data-classical-source-unit="nnc" data-classical-grammar-operation="personal-name formation" data-classical-result-unit="nnc">NNC Source → personal-name formation → NNC Result</option>
${renderPlaceGentilicNncOptions("classical-construction-operation")}
                            <option value="denominal-vnc" data-classical-source-unit="nnc" data-classical-grammar-operation="denominal verbalization" data-classical-result-unit="vnc">NNC Source → denominal verbalization → VNC Result</option>
                            <option value="adverbial-nuclear" data-classical-source-unit="nnc" data-classical-grammar-operation="adverbial use" data-classical-result-unit="nnc">NNC Source → adverbial use → NNC Result</option>
                            </optgroup>
                          </select>
                        </label>
                        <div
                          class="classical-construction-controls"
                          id="classical-construction-controls"
                          data-classical-construction-grammar-controls="true"
                          data-classical-stage-authority="false"
                        >
                        <label class="classical-rule-control" data-construction-for="place-gentilic-nnc" hidden>
                          <span class="classical-rule-control__label">Place / gentilic result</span>
                          <select id="classical-place-gentilic-result-kind" data-classical-rule-logic-control="place-gentilic-result-kind">
${renderPlaceGentilicNncOptions("classical-place-gentilic-result-kind")}
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="place-gentilic-nnc" hidden>
                          <span class="classical-rule-control__label">Formation</span>
                          <select id="classical-place-gentilic-formation" data-classical-rule-logic-control="place-gentilic-formation">
${renderPlaceGentilicNncOptions("classical-place-gentilic-formation")}
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="place-gentilic-nnc" hidden>
                          <span class="classical-rule-control__label">Place matrix</span>
                          <select id="classical-gentilic-source-place-matrix" data-classical-rule-logic-control="gentilic-source-place-matrix">
${renderPlaceGentilicNncOptions("classical-gentilic-source-place-matrix")}
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="place-gentilic-nnc" hidden>
                          <span class="classical-rule-control__label">Structural analysis</span>
                          <select id="classical-place-affective-analysis" data-classical-rule-logic-control="place-affective-analysis">
${renderPlaceGentilicNncOptions("classical-place-affective-analysis")}
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="place-gentilic-nnc" hidden>
                          <span class="classical-rule-control__label">Affective matrix</span>
                          <select id="classical-place-affective-matrix" data-classical-rule-logic-control="place-affective-matrix">
${renderPlaceGentilicNncOptions("classical-place-affective-matrix")}
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="place-gentilic-nnc" hidden>
                          <span class="classical-rule-control__label">Profession / title record</span>
                          <select id="classical-place-gentilic-lexical-record" data-classical-rule-logic-control="place-gentilic-lexical-record">
${renderPlaceGentilicNncOptions("classical-place-gentilic-lexical-record")}
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="denominal-vnc" hidden>
                          <span class="classical-rule-control__label">Denominal operation</span>
                          <select id="classical-denominal-vnc-operation" data-classical-rule-logic-control="denominal-vnc-operation">
                            <option value="">select a licensed operation</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="denominal-vnc" data-denominal-vnc-operation-path="true" hidden>
                          <span class="classical-rule-control__label">Licensed source path and stem class</span>
                          <select id="classical-denominal-vnc-operation-path" data-classical-rule-logic-control="denominal-vnc-operation-path">
                            <option value="">enter a source stem</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="personal-name-nnc" hidden>
                          <span class="classical-rule-control__label">Source structure</span>
                          <select id="classical-personal-name-source-family" data-classical-rule-logic-control="personal-name-source-family">
                            <option value="preterit-agentive" selected>preterit agentive NNC</option>
                            <option value="preterit-as-present-agentive">preterit-as-present agentive NNC</option>
                            <option value="present-agentive">present agentive NNC</option>
                            <option value="customary-present-agentive">customary-present agentive NNC</option>
                            <option value="purposive-past-agentive">purposive past agentive NNC</option>
                            <option value="reflexive-preterit-agentive">reflexive preterit agentive NNC</option>
                            <option value="passive-preterit-patientive">passive preterit patientive NNC</option>
                            <option value="impersonal-preterit-agentive">impersonal preterit agentive NNC</option>
                            <option value="absolutive-state-nnc">absolutive-state NNC</option>
                            <option value="absolutive-state-truncated-inner-number">absolutive-state NNC · truncated inner number</option>
                            <option value="possessive-state-nnc">possessive-state NNC</option>
                            <option value="subject-supplementation">subject-supplementation unit</option>
                            <option value="possessor-supplementation">possessor-supplementation unit</option>
                            <option value="adjectival-modification">adjectival-modification unit</option>
                            <option value="adverbial-modification">adverbial-modification unit</option>
                            <option value="calendar-double-nucleus">calendar · double nucleus</option>
                            <option value="calendar-single-nucleus">calendar · single nucleus</option>
                            <option value="calendar-day-sign">calendar · day sign</option>
                            <option value="calendar-personalizing-thing">calendar · personalizing a thing</option>
                            <option value="conjunctorless-personal-name-unit">conjunctorless personal-name unit</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="personal-name-nnc" hidden>
                          <span class="classical-rule-control__label">Affective operation</span>
                          <select id="classical-personal-name-affective-scope" data-classical-rule-logic-control="personal-name-affective-scope">
                            <option value="none" selected>none</option>
                            <option value="inner-source">apply within the inner source</option>
                            <option value="outer-name">apply to the complete outer name</option>
                            <option value="general-use-agentive">general-use agentive honorific</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="personal-name-nnc" data-personal-name-affective-matrix="true" hidden>
                          <span class="classical-rule-control__label">Affective matrix</span>
                          <select id="classical-personal-name-affective-matrix" data-classical-rule-logic-control="personal-name-affective-matrix">
                            <option value="tzin" selected>tzin</option>
                            <option value="tz">tz</option>
                            <option value="ton">ton</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="personal-name-nnc" data-personal-name-reranking="true" hidden>
                          <span class="classical-rule-control__label">Reranking</span>
                          <select
                            id="classical-personal-name-reranking"
                            data-classical-rule-logic-control="personal-name-reranking"
                            aria-describedby="classical-personal-name-sentence-operation-status"
                          >
                            <option value="">Loading licensed reranking routes…</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="personal-name-nnc" data-personal-name-sentence-operation="true" hidden>
                          <span class="classical-rule-control__label">Sentence operation</span>
                          <select
                            id="classical-personal-name-sentence-operation"
                            data-classical-rule-logic-control="personal-name-sentence-operation"
                            aria-describedby="classical-personal-name-sentence-operation-status"
                          >
                            <option value="">No sentence continuation</option>
                          </select>
                        </label>
                        <p
                          class="classical-rule-control"
                          data-construction-for="personal-name-nnc"
                          id="classical-personal-name-sentence-operation-status"
                          data-classical-source-authorizes="none"
                          aria-live="polite"
                          hidden
                        ></p>
                        <p class="classical-rule-control" data-construction-for="personal-name-nnc" id="classical-personal-name-derived-facts" data-classical-source-authorizes="none" aria-live="polite" hidden></p>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" hidden>
                          <span class="classical-rule-control__label">NNC operation</span>
                          <select id="classical-deverbal-nnc-family" data-classical-rule-logic-control="deverbal-nnc-family">
                            <option value="predicate-nominalization" selected>predicate nominalization</option>
                            <option value="deverbal-action">action noun</option>
                            <option value="patientive">patientive or characteristic noun</option>
                            <option value="ownerhood">ownerhood</option>
                            <option value="nominal-continuation">derived noun in an NNC compound</option>
                            <option value="verbal-continuation">derived noun in a VNC</option>
                            <option value="vocative">vocative boundary</option>
                            <option value="double-nucleus-ownerhood">two-nucleus ownerhood</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-nnc-family="predicate-nominalization" hidden>
                          <span class="classical-rule-control__label">Nominalization</span>
                          <select id="classical-deverbal-nnc-nominalization-kind" data-classical-rule-logic-control="deverbal-nnc-nominalization-kind">
                            <option value="preterit-agentive" selected>preterit agentive</option>
                            <option value="preterit-patientive">preterit patientive</option>
                            <option value="customary-agentive-reanalysis">customary agentive reanalysis</option>
                            <option value="customary-agentive-full">customary fully nominal agentive</option>
                            <option value="customary-patientive">customary patientive</option>
                            <option value="instrumentive">instrumentive</option>
                            <option value="present-agentive">present agentive</option>
                            <option value="future-agentive">future agentive</option>
                            <option value="passive-action">passive action</option>
                            <option value="active-action">active action</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-predicate-activation="true" hidden>
                          <span class="classical-rule-control__label">Projective object</span>
                          <select id="classical-deverbal-nnc-activated-object-person" data-classical-rule-logic-control="deverbal-nnc-activated-object-person">
                            <option value="" selected>remain within the nominalized predicate</option>
                            <option value="1sg">activate 1st singular</option>
                            <option value="2sg">activate 2nd singular</option>
                            <option value="3sg">activate 3rd singular</option>
                            <option value="1pl">activate 1st plural</option>
                            <option value="2pl">activate 2nd plural</option>
                            <option value="3pl">activate 3rd plural</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-preterit-agentive-variant="true" hidden>
                          <span class="classical-rule-control__label">Preterit agentive form</span>
                          <select id="classical-deverbal-nnc-preterit-agentive-variant" data-classical-rule-logic-control="deverbal-nnc-preterit-agentive-variant">
                            <option value="ordinary" selected>ordinary</option>
                            <option value="archaic-que">archaic quē form</option>
                            <option value="yauh-ti-owner">yauh with internal ti possessor</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-final-i-boundary="true" hidden>
                          <span class="classical-rule-control__label">Final i at boundary</span>
                          <select id="classical-deverbal-nnc-final-i-boundary" data-classical-rule-logic-control="deverbal-nnc-final-i-boundary">
                            <option value="preserve" selected>preserve in the ordinary NNC</option>
                            <option value="drop-compound">drop before a compound boundary</option>
                            <option value="drop-vocative">drop before a vocative boundary</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-nnc-family="deverbal-action" hidden>
                          <span class="classical-rule-control__label">Action formation</span>
                          <select id="classical-deverbal-nnc-action-kind" data-classical-rule-logic-control="deverbal-nnc-action-kind">
                            <option value="active-action" selected>active action</option>
                            <option value="potential-patient">potential patient</option>
                            <option value="impersonal-general-action">impersonal general action</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-nnc-family="deverbal-action" hidden>
                          <span class="classical-rule-control__label">Action suffix</span>
                          <select id="classical-deverbal-nnc-action-suffix" data-classical-rule-logic-control="deverbal-nnc-action-suffix">
                            <option value="liz" selected>liz</option>
                            <option value="z">z</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-nnc-family="deverbal-action" hidden>
                          <span class="classical-rule-control__label">Action-stem alternative</span>
                          <select id="classical-deverbal-nnc-action-stem-variant" data-classical-rule-logic-control="deverbal-nnc-action-stem-variant">
                            <option value="" selected>use the lexically licensed default</option>
                            <option value="none">retain the source stem</option>
                            <option value="ca-to-qui">ca → qui</option>
                            <option value="hua-to-hui">hua → hui</option>
                            <option value="ci-to-xi">ci → xi</option>
                            <option value="ti-to-chi">ti → chi</option>
                            <option value="root-plus-ya-delete">delete root + ya</option>
                            <option value="denominal-ya-delete">delete denominal ya</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-nnc-family="patientive" hidden>
                          <span class="classical-rule-control__label">Patientive source</span>
                          <select id="classical-deverbal-nnc-patientive-family" data-classical-rule-logic-control="deverbal-nnc-patientive-family">
                            <option value="passive-core" selected>passive core</option>
                            <option value="impersonal-core">impersonal core</option>
                            <option value="perfective-active-core">perfective active core</option>
                            <option value="imperfective-active-core">imperfective active core</option>
                            <option value="root-or-stock">root or stock</option>
                            <option value="characteristic-property">characteristic property</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-patientive-analogy="true" hidden>
                          <span class="classical-rule-control__label">Patientive analogy</span>
                          <select id="classical-deverbal-nnc-patientive-analogy" data-classical-rule-logic-control="deverbal-nnc-patientive-analogy">
                            <option value="impersonal" selected>impersonal</option>
                            <option value="passive">passive</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-passive-human-realization="true" hidden>
                          <span class="classical-rule-control__label">Human object in passive patientive</span>
                          <select id="classical-deverbal-nnc-passive-human-realization" data-classical-rule-logic-control="deverbal-nnc-passive-human-realization">
                            <option value="retain" selected>retain</option>
                            <option value="delete">delete</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-root-stock-allomorph="true" hidden>
                          <span class="classical-rule-control__label">Licensed root or stock allomorph</span>
                          <select id="classical-deverbal-nnc-root-stock-allomorph" data-classical-rule-logic-control="deverbal-nnc-root-stock-allomorph">
                            <option value="" selected>use the lexically licensed default</option>
                            <option value="c">c</option>
                            <option value="ch">ch</option>
                            <option value="h">h</option>
                            <option value="x">x</option>
                            <option value="z">z</option>
                            <option value="zero">zero</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-characteristic-reading="true" hidden>
                          <span class="classical-rule-control__label">Characteristic reading</span>
                          <select id="classical-deverbal-nnc-characteristic-reading" data-classical-rule-logic-control="deverbal-nnc-characteristic-reading">
                            <option value="inherent-quality" selected>inherent quality</option>
                            <option value="pertaining-to">pertaining to</option>
                            <option value="intrinsic-aspect">intrinsic aspect</option>
                            <option value="organic-possession">organic possession</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-nnc-family="ownerhood,double-nucleus-ownerhood" hidden>
                          <span class="classical-rule-control__label">Ownerhood matrix</span>
                          <select id="classical-deverbal-nnc-ownerhood-matrix" data-classical-rule-logic-control="deverbal-nnc-ownerhood-matrix">
                            <option value="ē" selected>ē</option>
                            <option value="huā">huā</option>
                            <option value="yō-ā">yō-ā · abundant ownerhood</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-nnc-family="verbal-continuation" hidden>
                          <span class="classical-rule-control__label">VNC role</span>
                          <select id="classical-deverbal-nnc-continuation-relation" data-classical-rule-logic-control="deverbal-nnc-continuation-relation">
                            <option value="adverb" selected>adverb</option>
                            <option value="complement">complement</option>
                            <option value="object">incorporated object</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="deverbal-nnc" data-deverbal-nnc-family="verbal-continuation" hidden>
                          <span class="classical-rule-control__label">Matrix family</span>
                          <select id="classical-deverbal-nnc-matrix-family" data-classical-rule-logic-control="deverbal-nnc-matrix-family">
                            <option value="">ordinary matrix</option>
                            <option value="toca">toca</option>
                            <option value="tlani">tlani</option>
                            <option value="ih-tlani">ih-tlani</option>
                            <option value="tēm-o-ā">tēm-o-ā</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="denominal-vnc" data-denominal-vnc-included-family="true" hidden>
                          <span class="classical-rule-control__label">Included-possessor use</span>
                          <select id="classical-denominal-vnc-included-family" data-classical-rule-logic-control="denominal-vnc-included-family">
                            <option value="proxy">proxy or representative</option>
                            <option value="recompense">recompense or merit</option>
                            <option value="misfortune">preterit exclamation of misfortune</option>
                            <option value="temporal-pan">time or target with pan</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="denominal-vnc" data-denominal-vnc-exclamatory="true" hidden>
                          <span class="classical-rule-control__label">Sentence use</span>
                          <span><input id="classical-denominal-vnc-exclamatory" type="checkbox" data-classical-rule-logic-control="denominal-vnc-exclamatory"> exclamation</span>
                        </label>
                        <label class="classical-rule-control" data-construction-for="cardinal-numeral-nnc" data-cardinal-measure-only="true" hidden>
                          <span class="classical-rule-control__label">Measure result</span>
                          <select id="classical-cardinal-measure-composition" data-classical-rule-logic-control="cardinal-measure-composition">
                            <option value="measure-only" selected>measure NNC only</option>
                            <option value="with-measured-nnc">measure with thing measured</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" hidden>
                          <span class="classical-rule-control__label">Embed role</span>
                          <select id="classical-nominal-embed-role" data-classical-rule-logic-control="nominal-embed-role">
                            <option value="object">incorporated object</option>
                            <option value="adverb">incorporated adverb</option>
                            <option value="complement">incorporated complement</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" data-nominal-embed-adverb-only="true" hidden>
                          <span class="classical-rule-control__label">Source route</span>
                          <select id="classical-nominal-embed-adverbial-route" data-classical-rule-logic-control="nominal-embed-adverbial-route">
                            <option value="direct-adverb" selected>direct adverbial source</option>
                            <option value="supplement-subject">possessive supplementary subject</option>
                            <option value="supplement-object">possessive supplementary object</option>
                            <option value="passive-adverbialized-subject">passive-barrier adverbialized subject</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" data-nominal-embed-adverb-only="true" hidden>
                          <span class="classical-rule-control__label">Embed source</span>
                          <select id="classical-nominal-embed-source-constituent" data-classical-rule-logic-control="nominal-embed-source-constituent">
                            <option value="ordinary-nnc" selected>ordinary NNC predicate</option>
                            <option value="preterit-agentive-nnc">preterit-agentive NNC predicate</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" data-nominal-embed-supplement-object-only="true" hidden>
                          <span class="classical-rule-control__label">Possession relation</span>
                          <select id="classical-nominal-embed-possession-kind" data-classical-rule-logic-control="nominal-embed-possession-kind">
                            <option value="intimate" selected>body, clothing, or family possession</option>
                            <option value="less-intimate">less-intimate possession</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" data-nominal-embed-source-analysis="true" hidden>
                          <span class="classical-rule-control__label">Source analysis</span>
                          <select id="classical-nominal-embed-source-analysis" data-classical-rule-logic-control="nominal-embed-source-analysis">
                            <option value="direct" selected>direct adverb source</option>
                            <option value="supplement">supplement source</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" data-nominal-embed-adverb-only="true" hidden>
                          <span class="classical-rule-control__label">Adverb meaning</span>
                          <select id="classical-nominal-embed-adverbial-role" data-classical-rule-logic-control="nominal-embed-adverbial-role">
                            <option value="means">means</option>
                            <option value="instrument">instrument</option>
                            <option value="place">place</option>
                            <option value="time">time</option>
                            <option value="duration">duration</option>
                            <option value="cause">cause</option>
                            <option value="purpose">purpose</option>
                            <option value="manner">manner</option>
                            <option value="form-style">form or style</option>
                            <option value="compared-manner">compared manner</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" data-nominal-embed-orientation-choice="true" hidden>
                          <span class="classical-rule-control__label">Orientation</span>
                          <select id="classical-nominal-embed-reference-orientation" data-classical-rule-logic-control="nominal-embed-reference-orientation">
                            <option value="subject">subject</option>
                            <option value="object">object</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" data-nominal-embed-complement-only="true" hidden>
                          <span class="classical-rule-control__label">Complement meaning</span>
                          <select id="classical-nominal-embed-complement-relation" data-classical-rule-logic-control="nominal-embed-complement-relation">
                            <option value="considering" selected>considering as</option>
                            <option value="pretending">pretending to be</option>
                            <option value="changing">changing into</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" hidden>
                          <span class="classical-rule-control__label">Embed stem relation</span>
                          <select id="classical-nominal-embed-reduplication" data-classical-rule-logic-control="nominal-embed-reduplication">
                            <option value="none" selected>none</option>
                            <option value="affinity">affinity</option>
                            <option value="distributive-varietal">distribution or variety</option>
                            <option value="similarity">similarity</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="nominal-embed-vnc" hidden>
                          <span class="classical-rule-control__label">Matrix stem relation</span>
                          <select id="classical-nominal-matrix-reduplication" data-classical-rule-logic-control="nominal-matrix-reduplication">
                            <option value="none" selected>none</option>
                            <option value="affinity">affinity</option>
                            <option value="distributive-varietal">distribution or variety</option>
                            <option value="frequentative">frequentative</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="compound-nnc" hidden>
                          <span class="classical-rule-control__label">Compound structure</span>
                          <select id="classical-compound-nnc-structure" data-classical-rule-logic-control="compound-nnc-structure">
                            <option value="integrated">integrated</option>
                            <option value="linked-connective-t">linked · connective t</option>
                            <option value="linked-connectiveless">linked · connectiveless</option>
                            <option value="conjunctive">conjunctive</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="compound-nnc" hidden>
                          <span class="classical-rule-control__label">Constituent bracketing</span>
                          <select id="classical-compound-nnc-bracketing" data-classical-rule-logic-control="compound-nnc-bracketing">
                            <option value="unambiguous" selected>two simple constituents</option>
                            <option value="compound-embed">compound embed</option>
                            <option value="compound-matrix">compound matrix</option>
                            <option value="both">compound embed and matrix</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="compound-nnc" hidden>
                          <span class="classical-rule-control__label">Stem relation applies to</span>
                          <select id="classical-compound-nnc-reduplication-target" data-classical-rule-logic-control="compound-nnc-reduplication-target">
                            <option value="embed" selected>embed</option>
                            <option value="matrix">matrix</option>
                            <option value="both">both</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="compound-nnc" hidden>
                          <span class="classical-rule-control__label">Embed meaning</span>
                          <select id="classical-compound-nnc-embed-role" data-classical-rule-logic-control="compound-nnc-embed-role">
                            <option value="association">association</option>
                            <option value="material">material</option>
                            <option value="source">source</option>
                            <option value="purpose">purpose</option>
                            <option value="form">form</option>
                            <option value="manner">manner</option>
                            <option value="possession">possession</option>
                            <option value="sex">sex</option>
                            <option value="progeny">progeny</option>
                            <option value="fellowship">fellowship</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="compound-nnc" hidden>
                          <span class="classical-rule-control__label">Possessor points to</span>
                          <select id="classical-compound-nnc-possessor-orientation" data-classical-rule-logic-control="compound-nnc-possessor-orientation">
                            <option value="matrix">matrix</option>
                            <option value="embed">embed</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" hidden>
                          <span class="classical-rule-control__label">Generated construction</span>
                          <select id="classical-affective-target-kind" data-classical-rule-logic-control="affective-target-kind">
                            <option value="nnc" selected>affective NNC</option>
                            <option value="denominal-vnc">denominal VNC</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" data-affective-vocative-only="true" hidden>
                          <span class="classical-rule-control__label">Vocative matrix</span>
                          <select id="classical-affective-vocative-form" data-classical-rule-logic-control="affective-vocative-form">
                            <option value="full" selected>full tzin</option>
                            <option value="abbreviated">abbreviated tz</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" data-affective-pil-child-only="true" hidden>
                          <span class="classical-rule-control__label">Child formation</span>
                          <select id="classical-affective-pil-child-route" data-classical-rule-logic-control="affective-pil-child-route">
                            <option value="simple" selected>simple pil source</option>
                            <option value="affective">affective-matrix formation</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" data-affective-possessive-affinity-only="true" hidden>
                          <span class="classical-rule-control__label">Possessive affinity number</span>
                          <select id="classical-affective-possessive-affinity-plural" data-classical-rule-logic-control="affective-possessive-affinity-plural">
                            <option value="hu-ān" selected>hu-ān</option>
                            <option value="silent">silent number dyad</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" data-affective-defect-analysis="true" hidden>
                          <span class="classical-rule-control__label">Defect-stem analysis</span>
                          <select id="classical-affective-defect-analysis" data-classical-rule-logic-control="affective-defect-analysis">
                            <option value="defect" selected>defect or source of defect</option>
                            <option value="entity">entity with the defect</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" hidden>
                          <span class="classical-rule-control__label">Affective route</span>
                          <select id="classical-affective-route" data-classical-rule-logic-control="affective-route">
                            <option value="compound">affective matrix</option>
                            <option value="flawed-subject">flawed subject</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" hidden>
                          <span class="classical-rule-control__label">Affective matrix</span>
                          <select id="classical-affective-matrix" data-classical-rule-logic-control="affective-matrix">
                            <option value="pil">pil · small and affectionate</option>
                            <option value="pōl">pōl · large and disparaging</option>
                            <option value="tzin" selected>tzin · special regard</option>
                            <option value="tōn">tōn · small</option>
                            <option value="zol">zol · old or worn-out</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" hidden>
                          <span class="classical-rule-control__label">Meaning</span>
                          <select id="classical-affective-semantic-reading" data-classical-rule-logic-control="affective-semantic-reading">
                            <option value="ordinary-affective">ordinary affective</option>
                            <option value="mass-delimited">delimited mass</option>
                            <option value="pil-appendage">pil · appendage</option>
                            <option value="pil-child">pil · child</option>
                            <option value="pil-noble">pil · noble</option>
                            <option value="pil-honorific-vocative">pil · honorific vocative</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="affective-nnc" data-affective-denominal-only="true" hidden>
                          <span class="classical-rule-control__label">Denominal operation</span>
                          <select id="classical-affective-denominal-operation" data-classical-rule-logic-control="affective-denominal-operation">
                            <option value="inchoative" selected>become worn out</option>
                            <option value="causative">cause to become worn out</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="attitude-vnc" hidden>
                          <span class="classical-rule-control__label">Attitude</span>
                          <select id="classical-attitude-operation" data-classical-rule-logic-control="attitude-operation">
                            <option value="honorific" selected>honorific</option>
                            <option value="reverential">reverential</option>
                            <option value="pejorative">pejorative</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="attitude-vnc" hidden>
                          <span class="classical-rule-control__label">Formation</span>
                          <select id="classical-attitude-formation" data-classical-rule-logic-control="attitude-formation">
                            <option value="causative">causative reflexive</option>
                            <option value="applicative" selected>applicative reflexive</option>
                            <option value="preterit-embed">preterit embed</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="attitude-vnc" hidden>
                          <span class="classical-rule-control__label">Respected participant</span>
                          <select id="classical-attitude-participant" data-classical-rule-logic-control="attitude-participant">
                            <option value="subject" selected>subject</option>
                            <option value="object">object</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="cardinal-numeral-nnc" hidden>
                          <span class="classical-rule-control__label">Number</span>
                          <input id="classical-cardinal-value" type="number" min="1" step="1" value="1" data-classical-rule-logic-control="cardinal-value">
                        </label>
                        <label class="classical-rule-control" data-construction-for="cardinal-numeral-nnc" hidden>
                          <span class="classical-rule-control__label">Numeral use</span>
                          <select id="classical-cardinal-target-kind" data-classical-rule-logic-control="cardinal-target-kind">
                            <option value="nnc" selected>numeral NNC</option>
                            <option value="vnc-adverb">one as a VNC adverb</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="cardinal-numeral-nnc" hidden>
                          <span class="classical-rule-control__label">Numeral modifier</span>
                          <select id="classical-cardinal-modifier" data-classical-rule-logic-control="cardinal-modifier">
                            <option value="none" selected>none</option>
                            <option value="oc">oc · more or another</option>
                            <option value="canah">canah · approximately</option>
                            <option value="quēn">quēn · approximately</option>
                            <option value="ahzo-quēn">ahzo quēn · perhaps approximately</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="cardinal-numeral-nnc" hidden>
                          <span class="classical-rule-control__label">Count</span>
                          <select id="classical-cardinal-count-kind" data-classical-rule-logic-control="cardinal-count-kind">
                            <option value="ordinary">ordinary count</option>
                            <option value="gross">gross or total count</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="cardinal-numeral-nnc" hidden>
                          <span class="classical-rule-control__label">Counting set</span>
                          <select id="classical-cardinal-classifier" data-classical-rule-logic-control="cardinal-classifier">
                            <option value="basic">basic</option>
                            <option value="rock">round or plump · te</option>
                            <option value="row">row · pān</option>
                            <option value="thing">folded or stacked thing · tlaman</option>
                            <option value="cob">oblong · ōlō</option>
                            <option value="tecpan">twenties · people/animals/houses/rocks</option>
                            <option value="ipil">twenties · blankets/paper/tortillas/hides</option>
                            <option value="quimil">twenties · blankets</option>
                            <option value="measure">measure</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" data-construction-for="compound-nnc,affective-nnc,cardinal-numeral-nnc" hidden>
                          <span class="classical-rule-control__label">Stem relation</span>
                          <select id="classical-construction-reduplication" data-classical-rule-logic-control="nominal-stem-relation">
                            <option value="none">none</option>
                            <option value="affinity">affinity</option>
                            <option value="distributive-varietal">distribution or variety</option>
                          </select>
                        </label>
                        </div>
                      </div>
                    </section>
                    <section
                      class="classical-source-continuation"
                      id="classical-source-continuation"
                      data-classical-source-continuation="owner-issued-result-captures"
                      data-classical-source-authorizes="typed-result-captures-only"
                      aria-labelledby="classical-source-continuation-heading"
                      hidden
                    >
                      <h3 id="classical-source-continuation-heading">Results to compose</h3>
                      <p class="classical-source-continuation__intro">
                        Capture the current Result in a clause role, then choose its relation in Grammar.
                      </p>
                      <div id="classical-source-continuation-content"></div>
                    </section>
                    <div
                      class="classical-source-readout"
                      id="classical-source-readout"
                      role="status"
                      aria-live="polite"
                      data-classical-source-readout="true"
                      data-classical-source-presentation="compact-typed-reading"
                      data-classical-source-contract="source-only"
                      data-classical-source-authorizes="none"
                      aria-hidden="true"
                      hidden
                    >
                      <div class="classical-source-readout__item" data-classical-source-readout-item="source">
                        <span class="classical-source-readout__label">(STEM)</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-value">_</span>
                      </div>
                      <div class="classical-source-readout__item" data-classical-source-readout-item="rank">
                        <span class="classical-source-readout__label">Rank</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-rank">VNC stem source</span>
                      </div>
                      <div class="classical-source-readout__item" data-classical-source-readout-item="valence" data-classical-source-context="authority-read-only">
                        <span class="classical-source-readout__label">Valence</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-valence">intransitive · no source object</span>
                      </div>
                      <div class="classical-source-readout__item" data-classical-source-readout-item="class" data-classical-source-context="authority-read-only">
                        <span class="classical-source-readout__label">Stem class</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-class">Class B</span>
                      </div>
                      <div class="classical-source-readout__item" data-classical-source-readout-item="morphs">
                        <span class="classical-source-readout__label">Stem</span>
                        <span class="classical-source-readout__value" id="classical-source-readout-morphs">_</span>
                      </div>
                    </div>
                    <div class="classical-source-constitution" id="classical-source-constitution" data-classical-source-constitution="typed-andrews-analysis" hidden>
                      <span class="classical-source-readout__label">Source structure</span>
                      <span class="classical-source-readout__value" id="classical-source-readout-roles">one whole verbstem</span>
                    </div>
                    <div class="verb-block__separator" aria-hidden="true"></div>
                    <div
                      class="verb-block__controls verb-composer nuclear-clause-composer"
                      id="verb-composer"
                      data-andrews-component="formula-composer"
                      data-andrews-general-formula="subject-predicate"
                      data-classical-internal-scaffold="source-composer-runtime-mirror"
                      data-classical-source-authorizes="none"
                      data-classical-source-board-mirror="true"
                      data-classical-source-board-mirror-role="engine-sync-not-user-source"
                    >
                              <div
                                class="verb-composer__field verb-composer__slot verb-composer__slot-panel"
                                id="composer-slot-stage"
                                role="group"
                                aria-label="Verb composer group"
                                data-andrews-layer="stem-foundation"
                                data-andrews-formula-role="predicate-stem"
                                data-classical-internal-scaffold="source-composer-runtime-mirror"
                                data-classical-source-authorizes="none"
                              ></div>
                              <div class="verb-composer__slot-stash" hidden aria-hidden="true">
                                  <div
                                    class="verb-composer__field verb-composer__slot verb-composer__slot-panel"
                                    id="composer-slot-a"
                                    data-composer-slot-shell="intransitive"
                                    role="group"
                                    aria-label="Intransitive group"
                                  >
                                    <div class="verb-composer__top-row" data-composer-top-row="a">
                                      <div
                                        class="verb-composer__stem-field verb-composer__embed-field"
                                        data-composer-embed-field="a"
                                      >
                                        <span class="verb-composer__sub-label">Embed</span>
                                        <div class="verb-composer__embed-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--prefix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-embed"
                                              class="verb-composer__input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot A"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="verb-composer__stem-field verb-composer__matrix-field"
                                        data-composer-matrix-field="a"
                                      >
                                        <div class="verb-composer__matrix-head">
                                          <span class="verb-composer__sub-label">Matrix stem</span>
                                          <div class="verb-composer__slot-tabs verb-composer__slot-tabs--transitivity" role="tablist" aria-label="Verbal valence">
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="intransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Intransitive"
                                              title="Intransitive"
                                            >
                                              Intransitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="transitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Transitive"
                                              title="Transitive"
                                            >
                                              Transitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="bitransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Bitransitive"
                                              title="Bitransitive"
                                            >
                                              Bitransitive
                                            </button>
                                          </div>
                                        </div>
                                        <div class="verb-composer__matrix-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--verb">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">base</span>
                                            <input
                                              type="text"
                                              id="composer-stem-a"
                                              class="verb-composer__input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Matrix stem, slot A"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                          <div
                                            class="verb-composer__matrix-affix-picker"
                                            data-composer-matrix-affix-picker="a"
                                          >
                                            <button
                                              type="button"
                                              class="verb-chip verb-composer__matrix-affix-trigger"
                                              id="composer-stem-a-affix-trigger"
                                              aria-haspopup="menu"
                                              aria-expanded="false"
                                              aria-controls="composer-stem-a-affix-popover"
                                              aria-label="Open derivation options, slot A"
                                            >
                                              <span class="verb-composer__matrix-affix-trigger-prefix">Derivation</span>
                                              <span
                                                class="verb-composer__matrix-affix-trigger-value"
                                                id="composer-stem-a-affix-trigger-value"
                                                hidden
                                                aria-hidden="true"
                                              ></span>
                                              <span class="verb-composer__matrix-affix-trigger-caret" aria-hidden="true">▾</span>
                                            </button>
                                            <div
                                              class="verb-composer__matrix-affix-popover"
                                              id="composer-stem-a-affix-popover"
                                              role="menu"
                                              aria-label="Derivation options, slot A"
                                              popover="manual"
                                              aria-hidden="true"
                                            >
                                              <div
                                                class="verb-composer__matrix-affix-popover-groups"
                                                data-composer-matrix-affix-chip-groups="a"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                        <select
                                          id="composer-stem-a-affix"
                                          class="verb-composer__select verb-composer__matrix-affix-select is-hidden-control"
                                          aria-label="Matrix stem options, slot A"
                                          aria-hidden="true"
                                          tabindex="-1"
                                        ></select>
                                        <div
                                          class="verb-composer__chips verb-composer__serial-type-chips"
                                          data-composer-serial-type-chips="a"
                                          role="group"
                                          aria-label="Serial type, slot A"
                                        ></div>
                                      </div>
                                    </div>
                                    <div class="verb-composer__bottom-row">
                                      <div
                                        class="verb-composer__directional-host"
                                        data-composer-directional-host
                                        aria-label="Directional, slot A"
                                      ></div>
                                      <div class="verb-composer__object-pair">
                                        <div class="verb-composer__stem-field verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Embed</span>
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--affix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-a-embed-left"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot A"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                        <div class="verb-composer__valence-main verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Object 1/reflexive</span>
                                          <div
                                            class="verb-composer__chips"
                                            id="composer-valence-a-chips"
                                            role="group"
                                            aria-label="Object 1/reflexive, slot A"
                                          ></div>
                                          <select
                                            id="composer-valence-a"
                                            class="verb-composer__select is-hidden-control"
                                            aria-label="Object 1/reflexive, slot A"
                                          >
                                            <option value="">No prefix</option>
                                            <option value="tla">tla</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="verb-composer__field verb-composer__slot verb-composer__slot-panel"
                                    id="composer-slot-b"
                                    data-composer-slot-shell="transitive"
                                    role="group"
                                    aria-label="Transitive group"
                                  >
                                    <div class="verb-composer__top-row" data-composer-top-row="b">
                                      <div
                                        class="verb-composer__stem-field verb-composer__embed-field"
                                        data-composer-embed-field="b"
                                      >
                                        <span class="verb-composer__sub-label">Embed</span>
                                        <div class="verb-composer__embed-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--prefix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-embed-1"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot B"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="verb-composer__stem-field verb-composer__matrix-field"
                                        data-composer-matrix-field="b"
                                      >
                                        <div class="verb-composer__matrix-head">
                                          <span class="verb-composer__sub-label">Matrix stem</span>
                                          <div class="verb-composer__slot-tabs verb-composer__slot-tabs--transitivity" role="tablist" aria-label="Verbal valence">
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="intransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Intransitive"
                                              title="Intransitive"
                                            >
                                              Intransitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="transitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Transitive"
                                              title="Transitive"
                                            >
                                              Transitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="bitransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Bitransitive"
                                              title="Bitransitive"
                                            >
                                              Bitransitive
                                            </button>
                                          </div>
                                        </div>
                                        <div class="verb-composer__matrix-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--verb">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">base</span>
                                            <input
                                              type="text"
                                              id="composer-stem-b"
                                              class="verb-composer__input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Matrix stem, slot B"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                          <div
                                            class="verb-composer__matrix-affix-picker"
                                            data-composer-matrix-affix-picker="b"
                                          >
                                            <button
                                              type="button"
                                              class="verb-chip verb-composer__matrix-affix-trigger"
                                              id="composer-stem-b-affix-trigger"
                                              aria-haspopup="menu"
                                              aria-expanded="false"
                                              aria-controls="composer-stem-b-affix-popover"
                                              aria-label="Open derivation options, slot B"
                                            >
                                              <span class="verb-composer__matrix-affix-trigger-prefix">Derivation</span>
                                              <span
                                                class="verb-composer__matrix-affix-trigger-value"
                                                id="composer-stem-b-affix-trigger-value"
                                                hidden
                                                aria-hidden="true"
                                              ></span>
                                              <span class="verb-composer__matrix-affix-trigger-caret" aria-hidden="true">▾</span>
                                            </button>
                                            <div
                                              class="verb-composer__matrix-affix-popover"
                                              id="composer-stem-b-affix-popover"
                                              role="menu"
                                              aria-label="Derivation options, slot B"
                                              popover="manual"
                                              aria-hidden="true"
                                            >
                                              <div
                                                class="verb-composer__matrix-affix-popover-groups"
                                                data-composer-matrix-affix-chip-groups="b"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                        <select
                                          id="composer-stem-b-affix"
                                          class="verb-composer__select verb-composer__matrix-affix-select is-hidden-control"
                                          aria-label="Matrix stem options, slot B"
                                          aria-hidden="true"
                                          tabindex="-1"
                                        ></select>
                                        <div
                                          class="verb-composer__chips verb-composer__serial-type-chips"
                                          data-composer-serial-type-chips="b"
                                          role="group"
                                          aria-label="Serial type, slot B"
                                        ></div>
                                      </div>
                                    </div>
                                    <div class="verb-composer__bottom-row">
                                      <div
                                        class="verb-composer__directional-host"
                                        data-composer-directional-host
                                        aria-label="Directional, slot B"
                                      ></div>
                                      <div class="verb-composer__object-pair">
                                        <div class="verb-composer__stem-field verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Embed</span>
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--affix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-left-1"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot B"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                        <div class="verb-composer__valence-main verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Object 1/reflexive</span>
                                          <div
                                            class="verb-composer__chips"
                                            id="composer-valence-chips"
                                            role="group"
                                            aria-label="Object 1/reflexive, slot B"
                                          ></div>
                                          <select
                                            id="composer-valence"
                                            class="verb-composer__select is-hidden-control"
                                            aria-label="Object 1/reflexive, slot B"
                                          >
                                            <option value="">No prefix</option>
                                            <option value="tla">tla</option>
                                            <option value="tē">tē</option>
                                            <option value="mo">mo</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="verb-composer__field verb-composer__slot verb-composer__slot-panel"
                                    id="composer-slot-c"
                                    data-composer-slot-shell="bitransitive"
                                    role="group"
                                    aria-label="Bitransitive group"
                                  >
                                    <div class="verb-composer__top-row" data-composer-top-row="c">
                                      <div
                                        class="verb-composer__stem-field verb-composer__embed-field"
                                        data-composer-embed-field="c"
                                      >
                                        <span class="verb-composer__sub-label">Embed</span>
                                        <div class="verb-composer__embed-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--prefix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-embed-2"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot C"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="verb-composer__stem-field verb-composer__matrix-field"
                                        data-composer-matrix-field="c"
                                      >
                                        <div class="verb-composer__matrix-head">
                                          <span class="verb-composer__sub-label">Matrix stem</span>
                                          <div class="verb-composer__slot-tabs verb-composer__slot-tabs--transitivity" role="tablist" aria-label="Verbal valence">
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="intransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Intransitive"
                                              title="Intransitive"
                                            >
                                              Intransitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="transitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Transitive"
                                              title="Transitive"
                                            >
                                              Transitive
                                            </button>
                                            <button
                                              type="button"
                                              class="verb-composer__slot-transitivity verb-composer__slot-tab"
                                              data-composer-transitivity="bitransitive"
                                              role="tab"
                                              aria-selected="false"
                                              aria-controls="composer-slot-stage"
                                              aria-label="Bitransitive"
                                              title="Bitransitive"
                                            >
                                              Bitransitive
                                            </button>
                                          </div>
                                        </div>
                                        <div class="verb-composer__matrix-input-row">
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--verb">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">base</span>
                                            <input
                                              type="text"
                                              id="composer-stem-c"
                                              class="verb-composer__input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Matrix stem, slot C"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                          <div
                                            class="verb-composer__matrix-affix-picker"
                                            data-composer-matrix-affix-picker="c"
                                          >
                                            <button
                                              type="button"
                                              class="verb-chip verb-composer__matrix-affix-trigger"
                                              id="composer-stem-c-affix-trigger"
                                              aria-haspopup="menu"
                                              aria-expanded="false"
                                              aria-controls="composer-stem-c-affix-popover"
                                              aria-label="Open derivation options, slot C"
                                            >
                                              <span class="verb-composer__matrix-affix-trigger-prefix">Derivation</span>
                                              <span
                                                class="verb-composer__matrix-affix-trigger-value"
                                                id="composer-stem-c-affix-trigger-value"
                                                hidden
                                                aria-hidden="true"
                                              ></span>
                                              <span class="verb-composer__matrix-affix-trigger-caret" aria-hidden="true">▾</span>
                                            </button>
                                            <div
                                              class="verb-composer__matrix-affix-popover"
                                              id="composer-stem-c-affix-popover"
                                              role="menu"
                                              aria-label="Derivation options, slot C"
                                              popover="manual"
                                              aria-hidden="true"
                                            >
                                              <div
                                                class="verb-composer__matrix-affix-popover-groups"
                                                data-composer-matrix-affix-chip-groups="c"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                        <select
                                          id="composer-stem-c-affix"
                                          class="verb-composer__select verb-composer__matrix-affix-select is-hidden-control"
                                          aria-label="Matrix stem options, slot C"
                                          aria-hidden="true"
                                          tabindex="-1"
                                        ></select>
                                        <div
                                          class="verb-composer__chips verb-composer__serial-type-chips"
                                          data-composer-serial-type-chips="c"
                                          role="group"
                                          aria-label="Serial type, slot C"
                                        ></div>
                                      </div>
                                    </div>
                                    <div class="verb-composer__bottom-row">
                                      <div
                                        class="verb-composer__directional-host"
                                        data-composer-directional-host
                                        aria-label="Directional, slot C"
                                      ></div>
                                      <div class="verb-composer__object-pair">
                                        <div class="verb-composer__stem-field verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Embed</span>
                                          <div class="verb-composer__tagged-input-shell verb-composer__tagged-input-shell--affix">
                                            <span class="verb-composer__tagged-input-tag" aria-hidden="true">embed</span>
                                            <input
                                              type="text"
                                              id="composer-valence-left-2"
                                              class="verb-composer__input verb-composer__valence-embed-input verb-composer__tagged-input-control"
                                              placeholder=""
                                              aria-label="Embed, slot C"
                                              autocomplete="off"
                                              autocapitalize="none"
                                              spellcheck="false"
                                            />
                                          </div>
                                        </div>
                                        <div class="verb-composer__valence-main verb-composer__bottom-field">
                                          <span class="verb-composer__sub-label">Object 1/object 2/reflexive</span>
                                          <div
                                            class="verb-composer__chips"
                                            id="composer-valence-2-chips"
                                            role="group"
                                            aria-label="Object 1/object 2/reflexive, slot C"
                                          ></div>
                                          <select
                                            id="composer-valence-2"
                                            class="verb-composer__select is-hidden-control"
                                            aria-label="Object 1/object 2/reflexive, slot C"
                                          >
                                            <option value="">No prefix</option>
                                            <option value="tē-2">-tē</option>
                                            <option value="tla-2">-tla</option>
                                            <option value="mo-2">-mo</option>
                                            <option value="tē+tē">tē-tē</option>
                                            <option value="tla+tla">tla-tla</option>
                                            <option value="tē+tla">tē-tla</option>
                                            <option value="mo+tla">mo-tla</option>
                                            <option value="mo+tē">mo-tē</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              <select
                                id="composer-transitivity"
                                class="verb-composer__select is-hidden-control"
                                aria-label="Verbal valence"
                              >
                                <option value="">Select transitivity</option>
                                <option value="intransitive">Intransitive</option>
                                <option value="transitive">Transitive</option>
                                <option value="bitransitive">Bitransitive</option>
                              </select>
                              <div
                                class="verb-composer__field verb-composer__bottom-field"
                                id="composer-directional-field"
                                role="group"
                                aria-label="Directional group"
                              >
                                <span class="verb-composer__sub-label">Directional</span>
                                <div
                                  class="verb-composer__chips"
                                  id="composer-directional-chips"
                                  role="group"
                                  aria-label="Directional"
                                ></div>
                                <select
                                  id="composer-directional"
                                  class="verb-composer__select is-hidden-control"
                                  aria-label="Directional"
                                >
                                  <option value="">No directional</option>
                                </select>
                              </div>
                              <label class="verb-composer__checkbox">
                                <input type="checkbox" id="composer-supportive-i" />
                                <span>optional support i/y [i]/[y]</span>
                              </label>
                              <div
                                class="verb-composer__supportive-toggle-row"
                                id="composer-supportive-i-row"
                                role="group"
                                aria-label="support i/y"
                                hidden
                                aria-hidden="true"
                              >
                                <button
                                  type="button"
                                  class="verb-chip verb-composer__supportive-i-button button-with-icon"
                                  id="verb-key-supportive-i"
                                  aria-pressed="false"
                                  aria-label="Apply optional support i/y. Pattern: [i] or [y]. y rule: #+(y)V>yV; C+(y)V>CV; V+(y)e>Ve; i+(y)V>iV; X+(y)Vj(y)V>XVjV."
                                  title="optional support i/y. Pattern: [i] or [y]. y rule: #+(y)V>yV; C+(y)V>CV; V+(y)e>Ve; i+(y)V>iV; X+(y)Vj(y)V>XVjV."
                                >
                                  <span class="button-icon button-icon--supportive" aria-hidden="true">
                                    i
                                  </span>
                                  <span class="button-label">support i/y</span>
                                </button>
                              </div>
                          <div class="verb-composer__placeholder" id="verb-composer-placeholder" aria-hidden="true">
                            <div class="calc-regex-card">
                              <div class="calc-regex-title">Active pattern</div>
                              <div class="calc-regex-body">
                                Type the direct pattern on the screen to search or derive without menus.
                              </div>
                            </div>
                        </div>
                      </div>
                      <div class="verb-block__feedback">
                        <div class="verb-rule is-empty" id="verb-rule" aria-live="polite">
                          <span class="verb-rule__label">Regla</span>
                          <span class="verb-rule__text" id="verb-rule-text"></span>
                        </div>
                        <div
                          class="verb-disambiguation is-empty"
                          id="verb-disambiguation"
                          aria-live="polite"
                        >
                          <span class="verb-disambiguation__label" id="verb-disambiguation-label"
                            >Quisiste decir</span
                          >
                          <div class="verb-disambiguation__options" id="verb-disambiguation-options"></div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <input
                    type="hidden"
                    id="subject-prefix"
                    name="subject-prefix"
                    value=""
                    data-andrews-formula-role="subject"
                    data-andrews-formula-slot="person-prefix"
                    data-classical-internal-scaffold="legacy-subject-runtime-mirror"
                    data-classical-source-authorizes="none"
                  />
                  <input
                    type="hidden"
                    id="subject-suffix"
                    name="subject-suffix"
                    value=""
                    data-andrews-formula-role="subject"
                    data-andrews-formula-slot="number-suffix"
                    data-classical-internal-scaffold="legacy-subject-runtime-mirror"
                    data-classical-source-authorizes="none"
                  />
                </div>
              </form>
    `;
    }
    function ClassicalAuthorityPanel() {
      return `          <section
                class="panel tense-tabs-panel formula-controls-panel panel-stack-pane"
                id="panel-stack-pane-tense"
                data-panel-stack-pane="formula"
                data-andrews-stage="authority-controls"
                data-andrews-stage-label="2 Grammar"
                data-andrews-panel="#2-authority"
                data-andrews-panel-role="authority"
                data-andrews-general-formula="subject-predicate"
                data-andrews-subject-formula="#person+...+number#"
                data-andrews-vnc-predicate="valence+stem+tense"
                data-andrews-nnc-predicate="state+stem"
                data-andrews-vnc-layers="verbstem > verbcore > predicate > CNV"
                data-andrews-nnc-layers="nounstem > nouncore/predicate > CNN"
                data-classical-workbench-stage="grammar"
                data-classical-stage-authority="false"
                role="tabpanel"
                aria-labelledby="panel-stack-tab-formula"
              >
                <div class="panel-block-title">
                  <button
                    type="button"
                    class="panel-pane-nav-btn panel-pane-nav-btn--prev"
                    data-pane-nav-from="formula"
                    data-pane-nav-direction="prev"
                    aria-label="Go to previous panel"
                    title="Previous panel"
                  >
                    <span aria-hidden="true">◀</span>
                  </button>
                  <span class="panel-block-step">2</span>
                  <h2
                    class="panel-block-text"
                    id="classical-stage-grammar-heading"
                    data-classical-stage-heading="grammar"
                  >GRAMMAR</h2>
                  <button
                    type="button"
                    class="panel-pane-nav-btn panel-pane-nav-btn--next"
                    data-pane-nav-from="formula"
                    data-pane-nav-direction="next"
                    aria-label="Go to next panel"
                    title="Next panel"
                  >
                    <span aria-hidden="true">▶</span>
                  </button>
                </div>
                <div
                  class="calc-operators formula-controls-grid"
                  data-andrews-formula-role="formula-mode-derivation-controls"
                  aria-label="Formula controls"
                >
                  <section
                    class="calc-operator calc-operator--mode calc-operator--source-authority-mirror"
                    data-classical-authority-follows-source="true"
                    aria-label="Grammar structure determined by Source"
                  >
                    <div class="calc-operator__label">Source structure</div>
                    <div
                      class="calc-operator-grid calc-operator-grid--mode"
                      role="group"
                      aria-label="Internal Source mirror"
                    >
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-tense-mode="verbo"
                        data-mode-system="unit"
                        data-classical-authority-mirror="vnc"
                        aria-pressed="true"
                      >
                        <span class="calc-operator-chip__main">VNC</span>
                        <span class="calc-operator-chip__unit">VNC structure</span>
                        <span class="calc-operator-chip__route">VNC Source</span>
                      </button>
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-tense-mode="sustantivo"
                        data-mode-system="unit"
                        data-classical-authority-mirror="nnc"
                        aria-pressed="false"
                      >
                        <span class="calc-operator-chip__main">NNC</span>
                        <span class="calc-operator-chip__unit">NNC structure</span>
                        <span class="calc-operator-chip__route">NNC Source</span>
                      </button>
                    </div>
                    <div class="calc-unit-route-strip" aria-label="Grammar route">
                      <span class="calc-unit-route-strip__label">Source</span>
                      <span class="calc-unit-route-strip__route">VNC / NNC</span>
                    </div>
                  </section>
                  <section
                    class="calc-operator calc-operator--derivation"
                    aria-label="Verbal derivation"
                  >
                    <div class="calc-operator__label">Derivation</div>
                    <div
                      class="calc-operator-grid calc-operator-grid--derivation"
                      role="group"
                      aria-label="Verbal derivation"
                    >
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-derivation-type="direct"

                        aria-pressed="true"
                      >
                        Direct
                      </button>
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-derivation-type="causative"

                        aria-pressed="false"
                      >
                        <span class="calc-operator-chip__main">Causative</span>
                      </button>
                      <button
                        type="button"
                        class="calc-operator-chip"
                        data-derivation-type="applicative"

                        aria-pressed="false"
                      >
                        <span class="calc-operator-chip__main">Applicative</span>
                      </button>
                    </div>
                  </section>
                  <section
                    class="calc-operator calc-operator--classical-rule-logic"
                    id="classical-rule-logic-controls"
                    data-classical-rule-logic-controls="true"
                    aria-label="Classical Nahuatl rule logic"
                  >
                    <div class="calc-operator__label">Logic</div>
                    <div class="classical-rule-controls-grid">
                      <div class="classical-nnc-authority-heading" data-classical-nnc-authority-heading="subject" hidden aria-hidden="true">Subject</div>
                      <div class="classical-nnc-authority-heading" data-classical-nnc-authority-heading="state" hidden aria-hidden="true">State</div>
                      <div class="classical-nnc-authority-heading" data-classical-nnc-authority-heading="nounstem" hidden aria-hidden="true">Nounstem</div>
                      <div class="classical-nnc-authority-heading" data-classical-nnc-authority-heading="sentence" hidden aria-hidden="true">Sentence</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="verbstem" hidden aria-hidden="true">Verbstem</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="derivation" hidden aria-hidden="true">Derivation</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="subject" hidden aria-hidden="true">Subject</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="predicate" hidden aria-hidden="true">Predicate</div>
                      <div class="classical-vnc-authority-heading" data-classical-vnc-authority-heading="sentence" hidden aria-hidden="true">Sentence</div>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="subject-person">
                        <span class="classical-rule-control__label">Subject</span>
                        <select
                          id="classical-rule-logic-subject"
                          data-classical-rule-logic-control="subject"
                        >
                          <option value="1sg" selected>1sg</option>
                          <option value="2sg">2sg</option>
                          <option value="3sg">3sg</option>
                          <option value="3common">3 common</option>
                          <option value="1pl">1pl</option>
                          <option value="2pl">2pl</option>
                          <option value="3pl">3pl</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="subject" data-classical-nnc-authority-order="subject-person" hidden>
                        <span class="classical-rule-control__label">Person</span>
                        <select id="classical-rule-logic-nnc-subject-person" data-classical-rule-logic-control="nnc-subject-person">
                          <option value="1">first</option>
                          <option value="2">second</option>
                          <option value="3" selected>third</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="subject" data-classical-nnc-authority-order="subject-animacy" hidden>
                        <span class="classical-rule-control__label">Referent</span>
                        <select id="classical-rule-logic-nnc-subject-animacy" data-classical-rule-logic-control="nnc-subject-animacy">
                          <option value="animate" selected>animate</option>
                          <option value="nonanimate">nonanimate</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="subject" data-classical-nnc-authority-order="subject-number" hidden>
                        <span class="classical-rule-control__label">Number</span>
                        <select id="classical-rule-logic-nnc-subject-number" data-classical-rule-logic-control="nnc-subject-number">
                          <option value="singular" selected>singular</option>
                          <option value="common">common</option>
                          <option value="plural">plural</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="discourse" data-classical-nnc-authority-order="sentence-position" hidden>
                        <span class="classical-rule-control__label">Clause position</span>
                        <select id="classical-rule-logic-nnc-clause-position" data-classical-rule-logic-control="nnc-clause-position">
                          <option value="initial" selected>initial</option>
                          <option value="noninitial">noninitial</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="context" data-classical-nnc-authority-order="context-doubled-first-plural" hidden>
                        <span class="classical-rule-control__label">Doubled first plural</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-doubled-first-plural"
                          value="doubled"
                          data-classical-rule-logic-control="nnc-doubled-first-plural"
                          data-classical-checked-value="doubled"
                          data-classical-unchecked-value="ordinary"


                        />
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="context" data-classical-nnc-authority-order="context-dependent-in" hidden>
                        <span class="classical-rule-control__label">Adjunctor in</span>
                        <select
                          id="classical-rule-logic-nnc-dependent-clause-in"
                          data-classical-rule-logic-control="nnc-dependent-clause-in"
                        >
                          <option value="none" selected>none</option>
                          <option value="dependent-clause">dependent clause, separate in</option>
                          <option value="fused-tlein">elliptical tlein</option>
                          <option value="fused-tlei">elliptical tlei</option>
                          <option value="fused-tlen">elliptical tlen</option>
                          <option value="fused-aquin">elliptical āquin</option>
                          <option value="fused-aqui">elliptical aqui</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="context" data-classical-nnc-authority-order="context-special-human-use" hidden>
                        <span class="classical-rule-control__label">Special human use of itlah</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-special-human-use"
                          value="selected"
                          data-classical-rule-logic-control="nnc-special-human-use"
                          data-classical-checked-value="selected"
                          data-classical-unchecked-value="not-selected"


                        />
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="predicate-state" hidden>
                        <span class="classical-rule-control__label">State</span>
                        <select id="classical-rule-logic-nnc-state" data-classical-rule-logic-control="nnc-state">
                          <option value="absolutive" selected>absolutive</option>
                          <option value="possessive">possessive</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="stem-formation" hidden>
                        <span class="classical-rule-control__label">Stem formation</span>
                        <select id="classical-rule-logic-nnc-predicate-form" data-classical-rule-logic-control="nnc-predicate-form">
                          <option value="source-stem" selected>source stem</option>
                          <option value="yo-matrix">(-yō)-tl- matrix</option>
                          <option value="secondary-general-use">secondary general-use stem (tē-)</option>
                          <option value="analogical-restricted-use">tla possessive predicate → restricted-use stem</option>
                          <option value="tl-2a-to-1a">tl 2-A → 1-A by ephemeral i loss</option>
                          <option value="tec-title">special general-use stem (tēc)</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="open-stem-class" hidden>
                        <span class="classical-rule-control__label">Open-stem noun class</span>
                        <select id="classical-rule-logic-nnc-class" data-classical-rule-logic-control="nnc-class">
                          <option value="zero" selected>0</option>
                          <option value="tl">tl</option>
                          <option value="tli">tli / li</option>
                          <option value="in">in</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="predicate-stem-relation" hidden>
                        <span class="classical-rule-control__label">Stem relation</span>
                        <select id="classical-rule-logic-nnc-stem-relation" data-classical-rule-logic-control="nnc-stem-relation">
                          <option value="plain" selected>plain</option>
                          <option value="affinity">affinity</option>
                          <option value="distributive-varietal">distributive / varietal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-nnc-authority-control="possessive" data-classical-nnc-authority-order="predicate-possessor" hidden>
                        <span class="classical-rule-control__label">Possessor</span>
                        <select id="classical-rule-logic-nnc-possessor" data-classical-rule-logic-control="nnc-possessor">
                          <option value="reciprocal">reciprocal ne</option>
                          <option value="nonspecific-human">nonspecific human tē</option>
                          <option value="nonspecific-nonhuman">nonspecific nonhuman tla</option>
                          <option value="1sg">1sg</option>
                          <option value="2sg">2sg</option>
                          <option value="3sg" selected>3sg</option>
                          <option value="1pl">1pl</option>
                          <option value="2pl">2pl</option>
                          <option value="3pl">3pl</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="possessive" data-classical-nnc-authority-order="predicate-possessor-reduplication" hidden>
                        <span class="classical-rule-control__label">Reduplicate possessor</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-possessor-reduplication"
                          value="reduplicated"
                          data-classical-rule-logic-control="nnc-possessor-reduplication"
                          data-classical-checked-value="reduplicated"
                          data-classical-unchecked-value="single"


                        />
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-nnc-authority-control="ordinary" data-classical-nnc-authority-order="subject-metaphorical-use" hidden>
                        <span class="classical-rule-control__label">Metaphorical use</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-nnc-metaphorical-use"
                          value="metaphorical"
                          data-classical-rule-logic-control="nnc-metaphorical-use"
                          data-classical-checked-value="metaphorical"
                          data-classical-unchecked-value="literal"


                        />
                      </label>
                      <section
                        class="classical-whole-canvas-choice-grid classical-relational-nnc-authority"
                        id="classical-relational-nnc-authority"
                        data-classical-relational-nnc-authority="typed-decisions"
                        aria-label="Relational NNC grammar"
                        aria-hidden="true"
                        hidden
                      >
                        <div class="classical-rule-surface__format-title classical-relational-nnc-authority__title">Nounstem grammar</div>
                        <label class="classical-rule-control" id="classical-relational-nnc-operation-field">
                          <span class="classical-rule-control__label">Operation</span>
                          <select id="classical-relational-nnc-operation" data-classical-relational-nnc-control="operation">
                            <option value="relational-nnc" selected>relational NNC</option>
                            <option value="compound-embed">embed relational stem in a compound</option>
                            <option value="associated-entity">associated entity</option>
                            <option value="pertinency">pertinency</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" id="classical-relational-nnc-usage-field">
                          <span class="classical-rule-control__label">Predicate formation</span>
                          <select id="classical-relational-nnc-option" data-classical-relational-nnc-control="option"></select>
                        </label>
                        <label class="classical-rule-control" id="classical-relational-nnc-source-formation-field" hidden>
                          <span class="classical-rule-control__label">Embedded source formation</span>
                          <select id="classical-relational-nnc-source-formation" data-classical-relational-nnc-control="source-formation">
                            <option value="plain-nounstem" selected>nounstem</option>
                            <option value="preterit-agentive">preterit-agentive general-use stem</option>
                            <option value="active-action">active-action general-use stem</option>
                            <option value="can-interrogative">interrogative cā-n</option>
                            <option value="can-modified">modified interrogative X-cā-n</option>
                            <option value="imperfect-active">active imperfect predicate</option>
                            <option value="imperfect-passive">passive imperfect predicate</option>
                            <option value="imperfect-impersonal">impersonal imperfect predicate</option>
                            <option value="present-yohua">present yohua predicate</option>
                            <option value="perfective-active">active perfective core</option>
                            <option value="perfective-impersonal-tla">tla-impersonal perfective core</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" id="classical-relational-nnc-pertinency-source-field" hidden>
                          <span class="classical-rule-control__label">Pertinency source</span>
                          <select id="classical-relational-nnc-pertinency-source" data-classical-relational-nnc-control="pertinency-source">
                            <option value="direct-relational" selected>relational stem</option>
                            <option value="associated-entity">associated-entity stem</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" id="classical-relational-nnc-state-field">
                          <span class="classical-rule-control__label">State</span>
                          <select id="classical-relational-nnc-state" data-classical-relational-nnc-control="state">
                            <option value="absolutive" selected>absolutive</option>
                            <option value="possessive">possessive</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" id="classical-relational-nnc-possessor-field">
                          <span class="classical-rule-control__label">Possessor</span>
                          <select id="classical-relational-nnc-possessor" data-classical-relational-nnc-control="possessor">
                            <option value="1sg">1sg</option>
                            <option value="2sg">2sg</option>
                            <option value="3sg" selected>3sg</option>
                            <option value="1pl">1pl</option>
                            <option value="2pl">2pl</option>
                            <option value="3pl">3pl</option>
                            <option value="nonspecific-human">nonspecific human</option>
                            <option value="nonspecific-nonhuman">nonspecific nonhuman</option>
                            <option value="reciprocal">reciprocal</option>
                          </select>
                        </label>
                        <label class="classical-rule-control">
                          <span class="classical-rule-control__label">Subject realization</span>
                          <select id="classical-relational-nnc-subject-mode" data-classical-relational-nnc-control="subject-mode">
                            <option value="adverbialized" selected>adverbialized</option>
                            <option value="normal">normal subject</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" id="classical-relational-nnc-subject-field" hidden>
                          <span class="classical-rule-control__label">Subject</span>
                          <select id="classical-relational-nnc-subject" data-classical-relational-nnc-control="subject">
                            <option value="1sg">1sg</option>
                            <option value="2sg">2sg</option>
                            <option value="3common" selected>3 common</option>
                            <option value="1pl">1pl</option>
                            <option value="2pl">2pl</option>
                            <option value="3pl">3pl</option>
                          </select>
                        </label>
                        <label class="classical-rule-control" id="classical-relational-nnc-affective-field">
                          <span class="classical-rule-control__label">Affective</span>
                          <select id="classical-relational-nnc-affective" data-classical-relational-nnc-control="affective">
                            <option value="none" selected>none</option>
                            <option value="honorific">honorific</option>
                            <option value="pejorative">pejorative</option>
                          </select>
                        </label>
                      </section>
                      <section
                        id="classical-adverbial-nuclear-authority"
                        class="classical-whole-canvas-choice-grid"
                        data-construction-for="adverbial-nuclear"
                        aria-label="Adverbial nuclear grammar"
                        aria-hidden="true"
                        hidden
                      >
                        <div class="classical-rule-surface__format-title">Adverbial grammar</div>
                        <label class="classical-rule-control" data-adverbial-choice-axis="degree" hidden>
                          <span class="classical-rule-control__label">Degree</span>
                          <select id="classical-adverbial-degree" data-classical-rule-logic-control="adverbial-degree"></select>
                        </label>
                        <label class="classical-rule-control" data-adverbial-choice-axis="scope" hidden>
                          <span class="classical-rule-control__label">Scope</span>
                          <select id="classical-adverbial-scope" data-classical-rule-logic-control="adverbial-scope"></select>
                        </label>
                        <label class="classical-rule-control" data-adverbial-choice-axis="preceding-particle" hidden>
                          <span class="classical-rule-control__label">Preceding particle</span>
                          <select id="classical-adverbial-preceding-particle" data-classical-rule-logic-control="adverbial-preceding-particle"></select>
                        </label>
                        <label class="classical-rule-control" data-adverbial-choice-axis="negative-particle" hidden>
                          <span class="classical-rule-control__label">Negative particle</span>
                          <select id="classical-adverbial-negative-particle" data-classical-rule-logic-control="adverbial-negative-particle"></select>
                        </label>
                        <label class="classical-rule-control" data-adverbial-choice-axis="stress-partner" hidden>
                          <span class="classical-rule-control__label">Stress partner</span>
                          <select id="classical-adverbial-stress-partner" data-classical-rule-logic-control="adverbial-stress-partner"></select>
                        </label>
                        <label class="classical-rule-control" data-adverbial-choice-axis="surface-variant" hidden>
                          <span class="classical-rule-control__label">Written variant</span>
                          <select id="classical-adverbial-variant" data-classical-rule-logic-control="adverbial-variant"></select>
                        </label>
                        <label class="classical-rule-control" data-adverbial-choice-axis="sentence-position" hidden>
                          <span class="classical-rule-control__label">Sentence position</span>
                          <select id="classical-adverbial-sentence-position" data-classical-rule-logic-control="adverbial-sentence-position"></select>
                        </label>
                        <label class="classical-rule-control" data-adverbial-choice-axis="clause-type" hidden>
                          <span class="classical-rule-control__label">Clause type</span>
                          <select id="classical-adverbial-clause-type" data-classical-rule-logic-control="adverbial-clause-type"></select>
                        </label>
                        <label class="classical-rule-control" data-adverbial-choice-axis="negation-scope" hidden>
                          <span class="classical-rule-control__label">Negation scope</span>
                          <select id="classical-adverbial-negation-scope" data-classical-rule-logic-control="adverbial-negation-scope"></select>
                        </label>
                        <div
                          id="classical-adverbial-lexical-facts"
                          class="classical-rule-control__hint"
                          data-classical-source-authorizes="none"
                          aria-live="polite"
                        ></div>
                      </section>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-mood">
                        <span class="classical-rule-control__label">Mood</span>
                        <select
                          id="classical-rule-logic-mood"
                          data-classical-rule-logic-control="mood"
                        >
                          <option value="indicative" selected>indicative</option>
                          <option value="optative">optative</option>
                          <option value="admonitive">admonitive</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-tense">
                        <span class="classical-rule-control__label">Tense</span>
                        <select
                          id="classical-rule-logic-tense"
                          data-classical-rule-logic-control="tense"
                        >
                          <option value="present" selected>present</option>
                          <option value="preterit-as-present">preterit-as-present</option>
                          <option value="preterit">preterit</option>
                          <option value="future">future</option>
                          <option value="distant-past">distant past</option>
                          <option value="distant-past-as-past">distant-past-as-past</option>
                          <option value="customary-present">customary present</option>
                          <option value="imperfect">imperfect</option>
                          <option value="nonpast">nonpast</option>
                          <option value="past">past</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-derivation-option" data-classical-derivation-authority-control="formation" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Grammar-supported formation</span>
                        <select
                          id="classical-rule-logic-derivation-option"
                          data-classical-rule-logic-control="derivation-option"
                        >
                          <option value="" selected>Choose a grammar-supported formation</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-operation">
                        <span class="classical-rule-control__label">Add derivation</span>
                        <select id="classical-rule-logic-late-operation" data-classical-rule-logic-control="late-operation">
${renderClassicalVncLateOperationOptions("classical-rule-logic-late-operation")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-variant">
                        <span class="classical-rule-control__label">Grammar-supported formation</span>
                        <select id="classical-rule-logic-late-variant" data-classical-rule-logic-control="late-variant">
${renderClassicalVncLateOperationOptions("classical-rule-logic-late-variant")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-matrix">
                        <span class="classical-rule-control__label">Matrix stem</span>
                        <input id="classical-rule-logic-compound-matrix" data-classical-rule-logic-control="compound-matrix" type="text" value="" autocomplete="off" spellcheck="false" />
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-matrix-class">
                        <span class="classical-rule-control__label">Matrix class</span>
                        <select id="classical-rule-logic-compound-matrix-class" data-classical-rule-logic-control="compound-matrix-class">
${renderClassicalVncLateOperationOptions("classical-rule-logic-compound-matrix-class")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-itz-sense">
                        <span class="classical-rule-control__label">itz embed meaning</span>
                        <select id="classical-rule-logic-compound-itz-sense" data-classical-rule-logic-control="compound-itz-sense">
${renderClassicalVncLateOperationOptions("classical-rule-logic-compound-itz-sense")}
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-vnc-authority-order="verbstem-late-ya-syncopation">
                        <span class="classical-rule-control__label">Use syncopated t-ā</span>
                        <input id="classical-rule-logic-compound-ya-syncopation" data-classical-rule-logic-control="compound-ya-syncopation" type="checkbox" data-classical-checked-value="true" data-classical-unchecked-value="false" />
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-event-order">
                        <span class="classical-rule-control__label">Event order</span>
                        <select id="classical-rule-logic-compound-event-order" data-classical-rule-logic-control="compound-event-order">
${renderClassicalVncLateOperationOptions("classical-rule-logic-compound-event-order")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-nonactive-scope">
                        <span class="classical-rule-control__label">Nonactive scope</span>
                        <select id="classical-rule-logic-compound-nonactive-scope" data-classical-rule-logic-control="compound-nonactive-scope">
${renderClassicalVncLateOperationOptions("classical-rule-logic-compound-nonactive-scope")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-subject-animacy">
                        <span class="classical-rule-control__label">Subject animacy</span>
                        <select id="classical-rule-logic-compound-subject-animacy" data-classical-rule-logic-control="compound-subject-animacy">
${renderClassicalVncLateOperationOptions("classical-rule-logic-compound-subject-animacy")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-possession">
                        <span class="classical-rule-control__label">Possessed predicate</span>
                        <input id="classical-rule-logic-compound-possessive-stem" data-classical-rule-logic-control="compound-possessive-stem" type="text" value="" autocomplete="off" spellcheck="false" />
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-possessor">
                        <span class="classical-rule-control__label">Possessor</span>
                        <select id="classical-rule-logic-compound-possessor" data-classical-rule-logic-control="compound-possessor">
${renderClassicalVncLateOperationOptions("classical-rule-logic-compound-possessor")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-late-repetition">
                        <span class="classical-rule-control__label">Reduplications</span>
                        <select id="classical-rule-logic-frequentative-repetitions" data-classical-rule-logic-control="frequentative-repetitions">
${renderClassicalVncLateOperationOptions("classical-rule-logic-frequentative-repetitions")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-purposive-series">
                        <span class="classical-rule-control__label">Purposive series</span>
                        <select id="classical-rule-logic-purposive-series" data-classical-rule-logic-control="purposive-series">
${renderClassicalVncLateOperationOptions("classical-rule-logic-purposive-series")}
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-vnc-authority-order="verbstem-purposive-n">
                        <span class="classical-rule-control__label">Plural n variant</span>
                        <input id="classical-rule-logic-purposive-irregular-n" data-classical-rule-logic-control="purposive-irregular-n" type="checkbox" data-classical-checked-value="true" data-classical-unchecked-value="false" />
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-purposive-external">
                        <span class="classical-rule-control__label">External directional</span>
                        <select id="classical-rule-logic-purposive-external" data-classical-rule-logic-control="purposive-external">
${renderClassicalVncLateOperationOptions("classical-rule-logic-purposive-external")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-honored-participant">
                        <span class="classical-rule-control__label">Honored participant</span>
                        <select id="classical-rule-logic-honored-participant" data-classical-rule-logic-control="honored-participant">
${renderClassicalVncLateOperationOptions("classical-rule-logic-honored-participant")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-honorific-stem-alternative">
                        <span class="classical-rule-control__label">Honorific stem alternative</span>
                        <select id="classical-rule-logic-honorific-stem-alternative" data-classical-rule-logic-control="honorific-stem-alternative">
${renderClassicalVncLateOperationOptions("classical-rule-logic-honorific-stem-alternative")}
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-causative-result-subject" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Imported subject (causer)</span>
                        <select
                          id="classical-rule-logic-causative-result-subject"
                          data-classical-rule-logic-control="causative-result-subject"
                        >
                          <option value="1sg">1sg</option>
                          <option value="2sg">2sg</option>
                          <option value="3sg" selected>3sg</option>
                          <option value="1pl">1pl</option>
                          <option value="2pl">2pl</option>
                          <option value="3pl">3pl</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-causative-participant-choice" data-classical-derivation-authority-control="participant" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Causee Valence</span>
                        <select
                          id="classical-rule-logic-causative-causee-valence"
                          data-classical-rule-logic-control="causative-causee-valence"
                        >
                          <option value="" disabled selected>Choose specific participant or reflexive</option>
                          <option value="specific-projective">specific participant · fixed source subject</option>
                          <option value="reflexive">reflexive · bound to resulting-subject coordinate</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-causative-participant-choice" data-classical-derivation-authority-control="participant" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Specific shuntline object</span>
                        <select
                          id="classical-rule-logic-causative-specific-shuntline-realization"
                          data-classical-rule-logic-control="causative-specific-shuntline-realization"
                        >
                          <option value="silent" selected>silent · general practice</option>
                          <option value="sounded">sounded · writer variant</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-applicative-object" data-classical-derivation-authority-control="participant" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Applicative object (added)</span>
                        <select
                          id="classical-rule-logic-applicative-object"
                          data-classical-rule-logic-control="applicative-object"
                        >
                          <option value="specific-projective:1sg">specific 1sg</option>
                          <option value="specific-projective:2sg">specific 2sg</option>
                          <option value="specific-projective:3sg" selected>specific 3sg</option>
                          <option value="specific-projective:1pl">specific 1pl</option>
                          <option value="specific-projective:2pl">specific 2pl</option>
                          <option value="specific-projective:3pl">specific 3pl</option>
                          <option value="reflexive:">reflexive / reciprocal</option>
                          <option value="nonspecific-human:">nonspecific human</option>
                          <option value="nonspecific-nonhuman:">nonspecific nonhuman</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-construction" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Construction</span>
                        <select
                          id="classical-rule-logic-construction"
                          data-classical-rule-logic-control="construction"
                        >
                          <option value="none" selected>none</option>
                          <option value="quēn">quēn</option>
                          <option value="quēn-mach">quēn mach</option>
                          <option value="incorporated-quēn">incorporated quēn</option>
                          <option value="pronominal-nnc">pronominal NNC</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="verbstem-reading" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Reading</span>
                        <select
                          id="classical-rule-logic-lexical-reading"
                          data-classical-rule-logic-control="lexical-reading"
                        >
                          <option value="unspecified" selected>choose reading</option>
                          <option value="alert-observant">alert / observant</option>
                          <option value="motion">come / go</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-voice" data-classical-derivation-authority-control="finalizer">
                        <span class="classical-rule-control__label">Voice</span>
                        <select
                          id="classical-rule-logic-vnc-voice"
                          data-classical-rule-logic-control="vnc-voice"
                          aria-description="Voice applied after the causative or applicative is complete"
                        >
                          <option value="active" selected>active</option>
                          <option value="passive">passive</option>
                          <option value="impersonal">impersonal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-voice-layer-2" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Next voice layer</span>
                        <select
                          id="classical-rule-logic-voice-layer-2"
                          data-classical-rule-logic-control="voice-layer-2"
                        >
                          <option value="" selected>keep inherently impersonal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-voice-layer-3" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Following voice layer</span>
                        <select
                          id="classical-rule-logic-voice-layer-3"
                          data-classical-rule-logic-control="voice-layer-3"
                        >
                          <option value="" selected>keep tla-impersonal</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-nonactive-family" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Nonactive formation</span>
                        <select
                          id="classical-rule-logic-nonactive-family"
                          data-classical-rule-logic-control="nonactive-family"
                        >
                          <option value="" selected>Choose a grammar-supported formation</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-object">
                        <span class="classical-rule-control__label">Object</span>
                        <select
                          id="classical-rule-logic-object"
                          data-classical-rule-logic-control="object"
                        >
                          <option value="specific-projective:1sg">specific 1sg</option>
                          <option value="specific-projective:2sg">specific 2sg</option>
                          <option value="specific-projective:3sg" selected>specific 3sg</option>
                          <option value="specific-projective:1pl">specific 1pl</option>
                          <option value="specific-projective:2pl">specific 2pl</option>
                          <option value="specific-projective:3pl">specific 3pl</option>
                        </select>
                      </label>
                      <label class="classical-rule-control" data-classical-vnc-authority-order="predicate-object-interpretation" hidden aria-hidden="true">
                        <span class="classical-rule-control__label">Object meaning</span>
                        <select
                          id="classical-rule-logic-object-interpretation"
                          data-classical-rule-logic-control="object-interpretation"
                        >
                          <option value="reflexive" selected>reflexive</option>
                          <option value="reciprocal">reciprocal · plural subject only</option>
                        </select>
                      </label>
                      <label class="classical-rule-control classical-rule-control--checkbox" data-classical-vnc-authority-order="predicate-tla-fusion">
                        <span class="classical-rule-control__label">tla fusion</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-tla-fusion"
                          data-classical-rule-logic-control="tla-fusion"

                        />
                      </label>
                      <label hidden aria-hidden="true">
                        <select
                          id="classical-rule-logic-particle-combination-shortcut"
                          data-classical-rule-logic-control="particle-combination-shortcut"
                          data-classical-result-scope="sentence-particle-combination-shortcut"
                        ></select>
                      </label>
                      <div
                        id="classical-built-in-particles"
                        class="classical-rule-control classical-rule-control--result-surface classical-built-in-particles"
                        data-classical-vnc-authority-order="sentence-particle-built-ins"
                        data-classical-nnc-authority-order="sentence-particle-built-ins"
                      >
                        <span class="classical-rule-control__label">Built-in particles</span>
                        <select
                          id="classical-built-in-particle"
                          data-classical-built-in-particle="true"
                          aria-label="Built-in particles"
                        ></select>
                      </div>
                      <div
                        id="classical-particle-matrix"
                        class="classical-rule-control classical-rule-control--result-surface classical-particle-combination-builder"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-combination-builder"
                        data-classical-nnc-authority-order="sentence-combination-builder"
                      >
                        <span class="classical-rule-control__label">Particles</span>
                        <div
                          id="classical-particle-matrix-slots"
                          class="classical-particle-combination-builder__parts"
                          aria-live="polite"
                        ></div>
                        <span
                          id="classical-particle-matrix-status"
                          class="classical-rule-control__hint"
                        ></span>
                      </div>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface classical-rule-control--internal-canonical-particle"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-particle"
                        data-classical-nnc-authority-order="sentence-particle"
                        hidden
                        aria-hidden="true"
                      >
                        <span class="classical-rule-control__label">Particle</span>
                        <select
                          id="classical-rule-logic-sentence-particle"
                          data-classical-rule-logic-control="sentence-particle"
                          data-classical-result-scope="sentence-particle"
                        ></select>
                        <span id="classical-rule-logic-sentence-particle-analysis" class="classical-rule-control__hint" hidden></span>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--checkbox classical-rule-control--result-surface"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-particle-honorific"
                        data-classical-nnc-authority-order="sentence-particle-honorific"
                      >
                        <span class="classical-rule-control__label">Honorific</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-sentence-particle-honorific"
                          value="honorificized"
                          data-classical-rule-logic-control="sentence-particle-honorific"
                          data-classical-result-scope="sentence-particle-honorific"

                        />
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface classical-rule-control--internal-canonical-particle"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-adverbial"
                        data-classical-nnc-authority-order="sentence-adverbial"
                      >
                        <span class="classical-rule-control__label">Adverbial modifier</span>
                        <select
                          id="classical-rule-logic-sentence-adverbial"
                          data-classical-rule-logic-control="sentence-adverbial"
                          data-classical-result-scope="sentence-adverbial"
                        ></select>
                        <span id="classical-rule-logic-sentence-adverbial-analysis" class="classical-rule-control__hint" hidden></span>
                      </label>
                      <label
                        class="classical-rule-control"
                        data-classical-vnc-authority-order="predicate-directional"
                      >
                        <span class="classical-rule-control__label">Directional / locative</span>
                        <select
                          id="classical-rule-logic-directional"
                          data-classical-rule-logic-control="directional-locative"
                          data-classical-result-scope="vnc-internal-prefix"
                        >
                          <option value="none" selected>none</option>
                          <option value="on">on distance/thither</option>
                          <option value="huāl">huāl proximity/hither</option>
                        </select>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--checkbox classical-rule-control--result-surface classical-rule-control--internal-combination-input"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-antecessive"
                      >
                        <span class="classical-rule-control__label">Antecessive ō#</span>
                        <input
                          type="checkbox"
                          id="classical-rule-logic-prefix-stack"
                          value="antecessive"
                          data-classical-rule-logic-control="prefix-stack"
                          data-classical-result-scope="sentence-prefix-stack"
                          data-classical-checked-value="antecessive"
                          data-classical-unchecked-value="none"


                        />
                      </label>
                      <div
                        class="classical-rule-control classical-rule-control--result-surface classical-rule-control--segmented"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-nnc-authority-order="sentence-polarity"
                        data-classical-vnc-authority-order="sentence-polarity"
                      >
                        <span class="classical-rule-control__label">Polarity</span>
                        <input
                          type="hidden"
                          id="classical-rule-logic-polarity"
                          value="positive"
                          data-classical-rule-logic-control="polarity"
                          data-classical-result-scope="sentence-polarity"
                        />
                        <div class="classical-segmented-control" role="group" aria-label="Polarity">
                          <button
                            type="button"
                            class="classical-segmented-control__option is-active"
                            data-classical-segment-control="classical-rule-logic-polarity"
                            data-classical-segment-value="positive"

                            aria-pressed="true"
                          >Positive</button>
                          <button
                            type="button"
                            class="classical-segmented-control__option"
                            data-classical-segment-control="classical-rule-logic-polarity"
                            data-classical-segment-value="negative"

                            aria-pressed="false"
                          >Negative</button>
                        </div>
                      </div>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-nnc-authority-order="sentence-type"
                        data-classical-vnc-authority-order="sentence-type"
                      >
                        <span class="classical-rule-control__label">Sentence</span>
                        <select
                          id="classical-rule-logic-sentence-surface"
                          data-classical-rule-logic-control="sentence-surface"
                          data-classical-result-scope="sentence-surface"
                        >
                          <option value="statement" selected>statement</option>
                          <option value="question">question</option>
                          <option value="exclamation">exclamation</option>
                        </select>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface classical-rule-control--internal-combination-input"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-introductory"
                      >
                        <span class="classical-rule-control__label">Introductory</span>
                        <select
                          id="classical-rule-logic-introductory-particle"
                          data-classical-rule-logic-control="introductory-particle"
                          data-classical-result-scope="sentence-introductory-particle"
                        >
                          <option value="none" selected>none</option>
                          <option value="mā">mā</option>
                          <option value="tlā">tlā</option>
                        </select>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface classical-rule-control--internal-combination-input"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-before-introductory"
                      >
                        <span class="classical-rule-control__label">Before introductory</span>
                        <select
                          id="classical-rule-logic-preface-particle"
                          data-classical-rule-logic-control="preface-particle"
                          data-classical-result-scope="preface-particle"
                        >
                          <option value="none" selected>none</option>
                          <option value="ihyo">ihyo</option>
                          <option value="ye">ye</option>
                        </select>
                      </label>
                      <label
                        class="classical-rule-control classical-rule-control--result-surface classical-rule-control--internal-combination-input"
                        data-classical-rule-logic-result-surface-control="true"
                        data-classical-vnc-authority-order="sentence-after-introductory"
                      >
                        <span class="classical-rule-control__label">After introductory</span>
                        <select
                          id="classical-rule-logic-introductory-modifier"
                          data-classical-rule-logic-control="introductory-modifier"
                          data-classical-result-scope="introductory-modifier"
                        >
                          <option value="none" selected>none</option>
                          <option value="cuēl">cuēl</option>
                          <option value="ye-cuēl">ye cuēl</option>
                          <option value="cuēl-eh">cuēl eh</option>
                          <option value="ye-cuēl-eh">ye cuēl eh</option>
                          <option value="tēl">tēl</option>
                          <option value="quin">quin</option>
                          <option value="nēn">nēn</option>
                        </select>
                      </label>
                    </div>
                  </section>
                </div>
                <div
                  class="classical-grammar-continuation"
                  id="classical-grammar-continuation"
                  data-classical-grammar-continuation="typed-result-source"
                  data-classical-stage-authority="false"
                  hidden
                ></div>
                <details
                  class="classical-rule-surface__disclosure classical-reader-guidance"
                  id="classical-reader-guidance"
                  data-classical-reader-guidance="lessons"
                  data-classical-source-authorizes="none"
                  data-classical-result-authorizes="none"
                  data-classical-stage-authority="false"
                >
                  <summary class="classical-reader-guidance__summary">Reading guide</summary>
                  <div class="classical-reader-guidance__body">
${renderLesson1ReaderGuidance(escapeClassicalShellHtml)}
${renderLesson2ReaderGuidance(escapeClassicalShellHtml)}
${renderLesson3ReaderGuidance(escapeClassicalShellHtml)}
${renderLesson4ReaderGuidance(escapeClassicalShellHtml)}
${renderLesson5ReaderGuidance(escapeClassicalShellHtml)}
${renderLesson6ReaderGuidance(escapeClassicalShellHtml)}
${renderLesson7ReaderGuidance(escapeClassicalShellHtml)}
${renderLesson8ReaderGuidance(escapeClassicalShellHtml)}
${renderLesson9ReaderGuidance(escapeClassicalShellHtml)}
                  </div>
                </details>
                <section
                  class="classical-canvas-grammar-facts"
                  id="classical-canvas-grammar-facts"
                  data-classical-canvas-grammar-facts="presentation-only"
                  data-classical-source-authorizes="none"
                  data-classical-stage-authority="false"
                >
                  <div class="grammar-inspector__section">
                    <p>
                      Search the grammar record. These explanations describe the
                      grammar; they do not create or restrict a Result.
                    </p>
                    <label class="classical-rule-control">
                      <span class="classical-rule-control__label">Find a fact</span>
                      <input
                        id="classical-canvas-grammar-fact-query"
                        data-classical-canvas-grammar-fact-query="true"
                        type="search"
                        autocomplete="off"
                        placeholder="Atom, lesson, or wording"
                      />
                    </label>
                    <label class="classical-rule-control">
                      <span class="classical-rule-control__label">Matches</span>
                      <select
                        id="classical-canvas-grammar-fact-matches"
                        data-classical-canvas-grammar-fact-matches="true"
                        size="6"
                      ></select>
                    </label>
                    <button
                      id="classical-canvas-grammar-fact-show"
                      data-classical-canvas-grammar-fact-show="true"
                      type="button"
                    >Show fact</button>
                    <article
                      id="classical-canvas-grammar-fact-output"
                      class="grammar-inspector__section"
                      data-classical-canvas-grammar-fact-output="true"
                      data-classical-grammar-authority="false"
                      aria-live="polite"
                      hidden
                    >
                      <h5 data-classical-canvas-grammar-fact-heading>Canvas grammar fact</h5>
                      <p data-classical-canvas-grammar-fact-statement></p>
                      <p data-classical-canvas-grammar-fact-source></p>
                    </article>
                  </div>
                </section>
                <div
                  id="tense-tabs"
                  class="tense-tabs formula-slot-controls"
                  data-andrews-formula-role="predicate-inflection"
                  data-andrews-vnc-slot="tns"
                  data-andrews-nnc-slot="st"
                  data-classical-internal-scaffold="legacy-tense-tabs-runtime-mirror"
                  data-classical-source-authorizes="none"
                ></div>
              </section>
    `;
    }
    function ClassicalResultPanel() {
      return `          <section
                class="panel container-tense-grid nuclear-clause-output-panel panel-stack-pane"
                id="container-tense-grid"
                data-panel-stack-pane="output"
                data-andrews-stage="authorized-result"
                data-andrews-stage-label="3 Authorized Result"
                data-andrews-panel="#3-authorized-result"
                data-andrews-panel-role="authorized-result"
                data-andrews-renders="subject-predicate-formula"
                data-classical-workbench-stage="result"
                data-classical-stage-authority="false"
                role="tabpanel"
                aria-labelledby="panel-stack-tab-output"
              >
              <div class="panel-block-title">
                <button
                  type="button"
                  class="panel-pane-nav-btn panel-pane-nav-btn--prev"
                  data-pane-nav-from="output"
                  data-pane-nav-direction="prev"
                  aria-label="Go to previous panel"
                  title="Previous panel"
                >
                  <span aria-hidden="true">◀</span>
                </button>
                <span class="panel-block-step">3</span>
                <h2
                  class="panel-block-text"
                  id="classical-stage-result-heading"
                  data-classical-stage-heading="result"
                >RESULT</h2>
                <button
                  type="button"
                  class="panel-pane-nav-btn panel-pane-nav-btn--next"
                  data-pane-nav-from="output"
                  data-pane-nav-direction="next"
                  aria-label="Go to next panel"
                  title="Next panel"
                >
                  <span aria-hidden="true">▶</span>
                </button>
                <div class="panel-block-actions">
                  <div
                    class="verb-source-scope-control is-hidden"
                    id="verb-source-scope-control"
                    role="group"
                    aria-label="Visible voice"
                    aria-hidden="true"
                    hidden
                  >
                    <div class="verb-source-scope-buttons">
                      <button
                        type="button"
                        class="verb-source-scope-button"
                        id="verb-source-scope-both"
                        data-verb-source-scope="both"
                        aria-pressed="true"
                      >All</button>
                      <button
                        type="button"
                        class="verb-source-scope-button"
                        id="verb-source-scope-active"
                        data-verb-source-scope="active"
                        aria-pressed="false"
                      >Active</button>
                      <button
                        type="button"
                        class="verb-source-scope-button"
                        id="verb-source-scope-nonactive"
                        data-verb-source-scope="nonactive"
                        aria-pressed="false"
                      >Nonactive</button>
                    </div>
                  </div>
                  <button type="button" class="view-export-button panel-action-button" id="view-export-csv">
                    <span class="panel-action-button__icon" aria-hidden="true">
                      <svg viewBox="0 0 16 16" focusable="false">
                        <path
                          d="M2.5 1.5h7l4 4v9H2.5zM9.5 1.5v4h4M8 6.5v6m0 0-2-2m2 2 2-2"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                      </svg>
                    </span>
                    <span class="panel-action-button__label">Data view</span>
                  </button>
                  <button
                    type="button"
                    class="view-export-button calc-toggle-lock-chip panel-action-button"
                    id="calc-toggle-lock-button"
                    aria-pressed="false"
                  >
                    <span
                      class="panel-action-button__icon panel-action-button__icon--lock-open"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" focusable="false">
                        <path
                          d="M3 7.5h8a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                        <path
                          d="M5.5 7.5V5.6a2.7 2.7 0 0 1 4.6-1.9"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                        <path
                          d="M10.1 3.7 12 5.6"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                      </svg>
                    </span>
                    <span
                      class="panel-action-button__icon panel-action-button__icon--lock-closed"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" focusable="false">
                        <path
                          d="M5 7V5.5a3 3 0 1 1 6 0V7M3 7h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.35"
                        />
                      </svg>
                    </span>
                    <span class="panel-action-button__label">Unlocked</span>
                  </button>
                </div>
              </div>
              <div class="output-meta-strip">
                <details class="tense-description" id="tense-description">
                  <summary class="tense-description__summary">
                    <span class="tense-description__summary-title">Description</span>
                    <span class="tense-description__summary-value"></span>
                  </summary>
                  <div class="tense-description__body"></div>
                </details>
              </div>
              <div class="output-result-controls" id="output-result-controls">
                <div
                  id="output-universal-tabs"
                  role="tablist"
                  aria-label="Universal"
                ></div>
                <div
                  class="nonactive-tabs is-hidden"
                  id="nonactive-tabs"
                  role="tablist"
                    aria-label="Nonactive derivation"
                ></div>
              </div>
              <div
                class="classical-result-scope-controls"
                data-classical-result-scope-controls="true"
                aria-label="Result scope"
              >
                <label class="classical-rule-control" data-classical-result-scope-control="nnc" hidden>
                  <span class="classical-rule-control__label">Output scope</span>
                  <select id="classical-rule-logic-nnc-output-scope" data-classical-rule-logic-control="nnc-output-scope">
${renderClassicalResultOutputScopeOptions("nnc")}
                  </select>
                </label>
                <label class="classical-rule-control" data-classical-result-scope-control="vnc" hidden>
                  <span class="classical-rule-control__label">Output scope</span>
                  <select id="classical-rule-logic-vnc-output-scope" data-classical-rule-logic-control="vnc-output-scope">
${renderClassicalResultOutputScopeOptions("vnc")}
                  </select>
                </label>
              </div>
              <section
                class="classical-rule-surface"
                id="classical-rule-logic-surface"
                data-classical-rule-logic-surface="true"
                aria-label="Classical Nahuatl visible rule logic"
              ></section>
              <div id="all-tense-conjugations"></div>
              </section>
    `;
    }
    const CLASSICAL_WORKBENCH_STAGE_SEMANTICS = Object.freeze([
      Object.freeze({
        paneId: "panel-stack-pane-inputs",
        tabId: "panel-stack-tab-inputs",
        headingId: "classical-stage-source-heading"
      }),
      Object.freeze({
        paneId: "panel-stack-pane-tense",
        tabId: "panel-stack-tab-formula",
        headingId: "classical-stage-grammar-heading"
      }),
      Object.freeze({
        paneId: "container-tense-grid",
        tabId: "panel-stack-tab-output",
        headingId: "classical-stage-result-heading"
      })
    ]);
    function syncClassicalWorkbenchStageSemantics() {
      const documentObject = targetObject.document;
      if (!documentObject?.getElementById) {
        return "compact";
      }
      const mediaQuery = targetObject.window?.matchMedia?.("(min-width: 1025px)")
        || targetObject.matchMedia?.("(min-width: 1025px)")
        || null;
      const layout = mediaQuery?.matches ? "expanded" : "compact";
      const navigation = documentObject.querySelector?.(
        "[data-classical-workbench-stage-navigation]"
      ) || null;
      if (navigation) {
        navigation.hidden = layout === "expanded";
        navigation.setAttribute("aria-hidden", String(layout === "expanded"));
      }
      CLASSICAL_WORKBENCH_STAGE_SEMANTICS.forEach(stage => {
        const pane = documentObject.getElementById(stage.paneId);
        if (!pane) {
          return;
        }
        pane.setAttribute("role", layout === "expanded" ? "region" : "tabpanel");
        pane.setAttribute(
          "aria-labelledby",
          layout === "expanded" ? stage.headingId : stage.tabId
        );
      });
      const root = documentObject.getElementById("classical-app-root");
      if (root?.dataset) {
        root.dataset.classicalWorkbenchLayout = layout;
        root.dataset.classicalLayoutAuthority = "false";
      }
      return layout;
    }
    function installClassicalWorkbenchStageSemantics() {
      const documentObject = targetObject.document;
      if (!documentObject?.querySelector) {
        return false;
      }
      const navigation = documentObject.querySelector(
        "[data-classical-workbench-stage-navigation]"
      );
      if (!navigation) {
        return false;
      }
      syncClassicalWorkbenchStageSemantics();
      if (navigation.dataset.classicalWorkbenchSemanticsBound === "true") {
        return true;
      }
      const mediaQuery = targetObject.window?.matchMedia?.("(min-width: 1025px)")
        || targetObject.matchMedia?.("(min-width: 1025px)")
        || null;
      if (typeof mediaQuery?.addEventListener === "function") {
        mediaQuery.addEventListener("change", syncClassicalWorkbenchStageSemantics);
      } else if (typeof mediaQuery?.addListener === "function") {
        mediaQuery.addListener(syncClassicalWorkbenchStageSemantics);
      }
      navigation.dataset.classicalWorkbenchSemanticsBound = "true";
      return true;
    }
    function syncClassicalSourceCommitPresentation() {
      const documentObject = targetObject.document;
      const root = documentObject?.getElementById?.("classical-source-parts") || null;
      const status = documentObject?.getElementById?.("classical-source-commit-status") || null;
      const badge = status?.querySelector?.("[data-classical-source-commit-badge]") || null;
      const message = status?.querySelector?.("[data-classical-source-commit-message]") || null;
      const applyButton = documentObject?.getElementById?.("verb-entry-apply") || null;
      if (!root || !status || !badge || !message) {
        return "unavailable";
      }
      const state = root.dataset.classicalSourceCommitState === "pending"
        ? "pending"
        : "committed";
      const committedSource = String(
        documentObject.getElementById("verb")?.value || ""
      ).trim().replace(/^_$/u, "");
      const mode = root.dataset.classicalSourcePartsMode || "whole-stem";
      const draftHasSource = mode === "embed-matrix"
        ? Boolean(
            String(documentObject.getElementById("classical-source-embed")?.value || "").trim()
            || String(documentObject.getElementById("classical-source-matrix")?.value || "").trim()
          )
        : Boolean(String(documentObject.getElementById("classical-source-whole")?.value || "").trim());
      status.dataset.classicalSourceCommitStatus = state;
      status.classList.toggle("is-pending", state === "pending");
      if (state === "pending") {
        badge.textContent = "Not applied";
        message.textContent = !draftHasSource
          ? committedSource
            ? `Enter a Source to apply. Grammar and Result still use ${committedSource}.`
            : "Enter a Source to build Grammar and Result."
          : committedSource
            ? `Grammar and Result still use ${committedSource}. Press Enter or apply the source to use your edits.`
            : "Your entry has not been applied. Press Enter or apply the source to build Grammar and Result.";
      } else if (committedSource) {
        badge.textContent = "Applied";
        message.textContent = `${committedSource} is the Source currently used by Grammar and Result.`;
      } else {
        badge.textContent = "Waiting";
        message.textContent = "Enter a Source, then apply it to build Grammar and Result.";
      }
      if (applyButton) {
        applyButton.disabled = !draftHasSource;
        applyButton.setAttribute(
          "aria-label",
          !draftHasSource
            ? "Enter a Source before applying it"
            : state === "pending"
            ? "Apply pending source and update Grammar and Result"
            : "Apply source and update Grammar and Result"
        );
      }
      return state;
    }
    function installClassicalSourceCommitPresentation() {
      const documentObject = targetObject.document;
      const root = documentObject?.getElementById?.("classical-source-parts") || null;
      if (!root) {
        return false;
      }
      syncClassicalSourceCommitPresentation();
      if (root.dataset.classicalSourceCommitPresentationBound === "true") {
        return true;
      }
      const scheduleSync = () => {
        if (typeof targetObject.queueMicrotask === "function") {
          targetObject.queueMicrotask(syncClassicalSourceCommitPresentation);
          return;
        }
        targetObject.setTimeout?.(syncClassicalSourceCommitPresentation, 0);
      };
      Array.from(
        documentObject.querySelectorAll?.(".classical-source-parts__input") || []
      ).forEach(input => {
        input.addEventListener("input", scheduleSync);
        input.addEventListener("change", scheduleSync);
        input.addEventListener("keydown", event => {
          if (event.key === "Enter" && !event.isComposing) {
            scheduleSync();
          }
        });
      });
      documentObject.getElementById("verb-entry-apply")?.addEventListener(
        "click",
        scheduleSync
      );
      ["classical-vnc-source-stem", "classical-nnc-source-example"]
        .map(controlId => documentObject.getElementById(controlId))
        .filter(Boolean)
        .forEach(control => control.addEventListener("change", scheduleSync));
      const MutationObserverConstructor = targetObject.MutationObserver
        || targetObject.window?.MutationObserver;
      if (typeof MutationObserverConstructor === "function") {
        const observer = new MutationObserverConstructor(syncClassicalSourceCommitPresentation);
        observer.observe(root, {
          attributes: true,
          attributeFilter: ["data-classical-source-commit-state"]
        });
        root.__classicalSourceCommitPresentationObserver = observer;
      }
      root.dataset.classicalSourceCommitPresentationBound = "true";
      return true;
    }
    function installClassicalTranscriptionSourcePresentation() {
      const documentObject = targetObject.document;
      const keyboard = documentObject?.getElementById?.(
        "classical-transcription-keyboard"
      ) || null;
      const sourceParts = documentObject?.getElementById?.(
        "classical-source-parts"
      ) || null;
      const wholeInput = documentObject?.getElementById?.(
        "classical-source-whole"
      ) || null;
      const embedInput = documentObject?.getElementById?.(
        "classical-source-embed"
      ) || null;
      const matrixInput = documentObject?.getElementById?.(
        "classical-source-matrix"
      ) || null;
      const sourceInputs = [wholeInput, embedInput, matrixInput].filter(Boolean);
      if (!keyboard || !sourceParts || sourceInputs.length !== 3) return false;
      if (keyboard.dataset.classicalTranscriptionKeyboardBound === "true") {
        return true;
      }
      let activeInput = wholeInput;
      const getActiveInput = () => {
        if (sourceParts.dataset.classicalSourcePartsMode !== "embed-matrix") {
          return wholeInput;
        }
        return activeInput === matrixInput ? matrixInput : embedInput;
      };
      const populateSoundKeyboard = () => {
        const vowelRoot = documentObject.getElementById(
          "classical-transcription-keyboard-vowels"
        );
        const consonantRoot = documentObject.getElementById(
          "classical-transcription-keyboard-consonants"
        );
        if (!vowelRoot || !consonantRoot) return false;
        const ownerVowels = new Set(Object.keys(
          targetObject.CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS || {}
        ));
        const ownerConsonants = new Set(Object.keys(
          targetObject.CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS || {}
        ));
        if (!ownerVowels.size || !ownerConsonants.size) return false;
        const makeKey = token => {
          const button = documentObject.createElement("button");
          button.type = "button";
          button.className = "classical-transcription-keyboard__key";
          button.dataset.classicalTranscriptionToken = token;
          button.dataset.classicalGrammarAuthority = "false";
          button.setAttribute("aria-label", `Insert ${token}`);
          button.textContent = token;
          return button;
        };
        const vowelOrder = ["a", "ā", "e", "ē", "i", "ī", "o", "ō"];
        const consonantOrder = [
          "/l/", "/n/", "/m/", "/s/", "/š/", "/y/", "/w/", "/p/",
          "/t/", "/k/", "/kʷ/", "/ʔ/", "/λ/", "/¢/", "/č/"
        ];
        vowelRoot.replaceChildren(
          ...vowelOrder.filter(token => ownerVowels.has(token)).map(makeKey)
        );
        consonantRoot.replaceChildren(
          ...consonantOrder
            .filter(token => ownerConsonants.has(token))
            .map(makeKey)
        );
        keyboard.dataset.classicalTranscriptionKeyboardReady = "true";
        return true;
      };
      const insertSoundToken = token => {
        const input = getActiveInput();
        const value = String(input.value || "");
        const start = Number.isInteger(input.selectionStart)
          ? input.selectionStart
          : value.length;
        const end = Number.isInteger(input.selectionEnd)
          ? input.selectionEnd
          : start;
        const before = value.slice(0, start);
        const after = value.slice(end);
        const insertion = token;
        input.value = `${before}${insertion}${after}`;
        const caret = before.length + insertion.length;
        input.setSelectionRange?.(caret, caret);
        input.focus?.();
        sourceParts.dataset.classicalSourceCommitState = "pending";
        const InputEventConstructor = targetObject.Event
          || targetObject.window?.Event;
        if (typeof InputEventConstructor === "function") {
          input.dispatchEvent?.(new InputEventConstructor("input", {
            bubbles: true
          }));
        }
      };
      sourceInputs.forEach(input => input.addEventListener("focus", () => {
        activeInput = input;
        keyboard.dataset.classicalTranscriptionTarget = input.id;
      }));
      keyboard?.addEventListener("click", event => {
        const button = event.target?.closest?.(
          "[data-classical-transcription-token]"
        );
        if (!button || !keyboard.contains(button)) return;
        const token = String(
          button.dataset.classicalTranscriptionToken || ""
        );
        const ownerTokens = new Set([
          ...Object.keys(
            targetObject.CLASSICAL_NAHUATL_TRANSCRIPTION_VOWEL_CARRIERS || {}
          ),
          ...Object.keys(
            targetObject.CLASSICAL_NAHUATL_TRANSCRIPTION_CONSONANT_CARRIERS || {}
          )
        ]);
        if (!ownerTokens.has(token)) return;
        event.preventDefault();
        insertSoundToken(token);
      });
      if (!populateSoundKeyboard()) {
        targetObject.setTimeout?.(populateSoundKeyboard, 0);
      }
      Array.from(
        sourceParts?.querySelectorAll?.(
          "[data-classical-source-parts-kind]"
        ) || []
      ).forEach(button => button.addEventListener("click", () => {
        activeInput = button.dataset.classicalSourcePartsKind === "embed-matrix"
          ? embedInput
          : wholeInput;
        keyboard.dataset.classicalTranscriptionTarget = activeInput.id;
      }));
      keyboard.dataset.classicalTranscriptionTarget = wholeInput.id;
      keyboard.dataset.classicalTranscriptionKeyboardBound = "true";
      return true;
    }
    function installClassicalPanelRhythm() {
      const documentObject = targetObject.document;
      const sourcePanel = documentObject?.getElementById?.("container-inputs") || null;
      const grammarPanel = documentObject?.getElementById?.("panel-stack-pane-tense") || null;
      const resultPanel = documentObject?.getElementById?.("container-tense-grid") || null;
      if (!sourcePanel || !grammarPanel || !resultPanel) return false;

      const markSection = (element, role) => {
        if (element?.dataset) element.dataset.classicalPanelSection = role;
        return element;
      };

      markSection(sourcePanel.querySelector(":scope > .classical-basal-unit-controls"), "primary-controls");
      markSection(sourcePanel.querySelector(":scope > .classical-source-unit"), "primary-content");
      markSection(sourcePanel.querySelector(":scope > .classical-source-continuation"), "secondary-content");

      markSection(grammarPanel.querySelector(":scope > .formula-controls-grid"), "primary-content");
      markSection(grammarPanel.querySelector(":scope > .classical-grammar-dependency-guidance"), "secondary-content");
      markSection(grammarPanel.querySelector(":scope > #tense-tabs"), "secondary-content");

      const resultTitle = resultPanel.querySelector(":scope > .panel-block-title");
      const resultActions = resultTitle?.querySelector(":scope > .panel-block-actions")
        || resultPanel.querySelector(":scope > .panel-block-actions");
      const resultControls = resultPanel.querySelector(":scope > .output-result-controls");
      const resultScope = resultPanel.querySelector(":scope > .classical-result-scope-controls");
      const resultSurface = resultPanel.querySelector(":scope > .classical-rule-surface");
      const resultContinuation = documentObject.getElementById("classical-grammar-continuation");
      const resultMeta = resultPanel.querySelector(":scope > .output-meta-strip");
      const resultParadigm = resultPanel.querySelector(":scope > #all-tense-conjugations");
      [resultControls, resultScope, resultSurface, resultContinuation, resultMeta, resultParadigm, resultActions]
        .filter(Boolean)
        .forEach(element => resultPanel.appendChild(element));
      markSection(resultControls, "primary-controls");
      markSection(resultScope, "primary-controls");
      markSection(resultSurface, "primary-content");
      markSection(resultContinuation, "separate-task");
      markSection(resultMeta, "secondary-content");
      markSection(resultParadigm, "secondary-content");
      markSection(resultActions, "actions");

      [sourcePanel, grammarPanel, resultPanel].forEach(panel => {
        panel.dataset.classicalPanelRhythm = "title-primary-secondary-actions";
      });
      return true;
    }
    function installClassicalReaderGuidanceHeader() {
      const documentObject = targetObject.document;
      const legacyGuide = documentObject?.getElementById?.("classical-reader-guidance") || null;
      const grammarFacts = documentObject?.getElementById?.("classical-canvas-grammar-facts") || null;
      const dialog = documentObject?.getElementById?.("classical-reader-guidance-dialog") || null;
      const readingPanel = documentObject?.getElementById?.("classical-help-panel-reading") || null;
      const factsPanel = documentObject?.getElementById?.("classical-help-panel-facts") || null;
      const toggle = documentObject?.getElementById?.("classical-reader-guidance-toggle") || null;
      const close = documentObject?.getElementById?.("classical-reader-guidance-close") || null;
      const tabs = Array.from(documentObject?.querySelectorAll?.("[data-classical-help-tab]") || []);
      if (!legacyGuide || !grammarFacts || !dialog || !readingPanel || !factsPanel || !toggle || !close || tabs.length !== 2) return false;

      const guideBody = legacyGuide.querySelector(":scope > .classical-reader-guidance__body");
      if (guideBody && !readingPanel.contains(guideBody)) readingPanel.appendChild(guideBody);
      if (!factsPanel.contains(grammarFacts)) factsPanel.appendChild(grammarFacts);
      legacyGuide.remove();

      if (dialog.dataset.classicalReaderGuidanceBound === "true") return true;
      const selectHelpPanel = panelName => {
        tabs.forEach(tab => {
          const selected = tab.dataset.classicalHelpTab === panelName;
          tab.classList.toggle("is-active", selected);
          tab.setAttribute("aria-selected", selected ? "true" : "false");
          tab.tabIndex = selected ? 0 : -1;
        });
        [readingPanel, factsPanel].forEach(panel => {
          panel.hidden = panel.dataset.classicalHelpPanel !== panelName;
        });
        dialog.dataset.classicalHelpPanel = panelName;
      };
      const setExpanded = expanded => {
        toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      };
      const openGuide = () => {
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        setExpanded(true);
      };
      const closeGuide = () => {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
        setExpanded(false);
      };
      tabs.forEach(tab => tab.addEventListener("click", () => {
        selectHelpPanel(tab.dataset.classicalHelpTab || "reading");
      }));
      toggle.addEventListener("click", openGuide);
      close.addEventListener("click", closeGuide);
      dialog.addEventListener("close", () => setExpanded(false));
      dialog.addEventListener("click", event => {
        if (event.target === dialog) closeGuide();
      });
      selectHelpPanel("reading");
      dialog.dataset.classicalReaderGuidanceBound = "true";
      return true;
    }
    function installClassicalWorkbenchPresentation() {
      installClassicalWorkbenchStageSemantics();
      installClassicalSourceCommitPresentation();
      installClassicalTranscriptionSourcePresentation();
      installClassicalPanelRhythm();
      installClassicalReaderGuidanceHeader();
      return true;
    }
    function ClassicalFooter() {
      return `      <footer>
            <p><span id="copyright-label">Copyright © 2026 Jaime Núñez</span></p>
            <p>Thanks to Sigfredo Olmedo</p>
          </footer>
    `;
    }
    function ClassicalPanelShell() {
      return `      <div
            class="panel-grid"
            aria-label="Classical Nahuatl nuclear clause board"
            data-andrews-layout="source-authority-authorized-result"
            data-andrews-panel-model="whole-transcription-canvas"
            data-andrews-source-rank-path="morpheme-root-stem-nuclear-clause-particle-group-sentence"
            data-andrews-unit="clausula-nuclear"
            data-andrews-general-formula="subject-predicate"
            data-andrews-boundary="#...#"
            data-andrews-not-word="true"
            data-panel-columns="classical-basal-units"
            data-classical-basal-units="vnc nnc"
            data-classical-basal-unit="vnc"
          >
    ` + '        <div class="panel-stack" data-classical-panel-stack="source-authority-result">\n' + ClassicalPanelTabs() + '          <div class="panel-main-column" data-classical-basal-unit="vnc">\n' + '            <div id="classical-source-panel" class="classical-panel-container classical-panel-container--source" data-classical-panel-container="source" data-andrews-panel="#1-source">\n' + ClassicalSourcePanel() + '            </div>\n' + '            <div id="classical-authority-panel" class="classical-panel-container classical-panel-container--authority" data-classical-panel-container="authority" data-andrews-panel="#2-authority">\n' + ClassicalAuthorityPanel() + '            </div>\n' + '          </div>\n' + '        </div>\n' + '        <div class="panel-output-column" data-classical-basal-unit="vnc">\n' + '          <div id="classical-result-panel" class="classical-panel-container classical-panel-container--result" data-classical-panel-container="authorized-result" data-andrews-panel="#3-authorized-result">\n' + ClassicalResultPanel() + '          </div>\n' + '        </div>\n' + '      </div>\n';
    }
    function installClassicalShell() {
      const root = targetObject.document.getElementById("classical-app-root");
      if (root && root.dataset.classicalShellInstalled !== "true") {
        root.innerHTML = ClassicalPanelShell();
        root.dataset.classicalShellInstalled = "true";
      }
      if (root) {
        installClassicalWorkbenchPresentation();
      }
      const footerRoot = targetObject.document.getElementById("classical-footer-root");
      if (footerRoot && footerRoot.dataset.classicalShellInstalled !== "true") {
        footerRoot.innerHTML = ClassicalFooter();
        footerRoot.dataset.classicalShellInstalled = "true";
      }
    }
    function installClassicalShellWhenReady() {
      if (targetObject.document.getElementById("classical-app-root")) {
        installClassicalShell();
        return;
      }
      targetObject.document.addEventListener("DOMContentLoaded", installClassicalShell, {
        once: true
      });
    }
    installClassicalShellWhenReady();

    const api = {};
    api.LESSON1_READER_GUIDANCE_GROUPS = LESSON1_READER_GUIDANCE_GROUPS;
    api.isLesson1ReaderGuidanceExact = isLesson1ReaderGuidanceExact;
    api.LESSON2_READER_GUIDANCE_GROUPS = LESSON2_READER_GUIDANCE_GROUPS;
    api.isLesson2ReaderGuidanceExact = isLesson2ReaderGuidanceExact;
    api.LESSON3_READER_GUIDANCE_GROUPS = LESSON3_READER_GUIDANCE_GROUPS;
    api.isLesson3ReaderGuidanceExact = isLesson3ReaderGuidanceExact;
    api.LESSON4_READER_GUIDANCE_GROUPS = LESSON4_READER_GUIDANCE_GROUPS;
    api.isLesson4ReaderGuidanceExact = isLesson4ReaderGuidanceExact;
    api.LESSON5_READER_GUIDANCE_GROUPS = LESSON5_READER_GUIDANCE_GROUPS;
    api.isLesson5ReaderGuidanceExact = isLesson5ReaderGuidanceExact;
    api.LESSON6_READER_GUIDANCE_GROUPS = LESSON6_READER_GUIDANCE_GROUPS;
    api.isLesson6ReaderGuidanceExact = isLesson6ReaderGuidanceExact;
    api.LESSON7_READER_GUIDANCE_GROUPS = LESSON7_READER_GUIDANCE_GROUPS;
    api.isLesson7ReaderGuidanceExact = isLesson7ReaderGuidanceExact;
    api.LESSON8_READER_GUIDANCE_GROUPS = LESSON8_READER_GUIDANCE_GROUPS;
    api.isLesson8ReaderGuidanceExact = isLesson8ReaderGuidanceExact;
    api.LESSON9_READER_GUIDANCE_GROUPS = LESSON9_READER_GUIDANCE_GROUPS;
    api.isLesson9ReaderGuidanceExact = isLesson9ReaderGuidanceExact;
    api.ClassicalPanelTabs = ClassicalPanelTabs;
    api.ClassicalSourcePanel = ClassicalSourcePanel;
    api.ClassicalAuthorityPanel = ClassicalAuthorityPanel;
    api.ClassicalResultPanel = ClassicalResultPanel;
    api.ClassicalFooter = ClassicalFooter;
    api.ClassicalPanelShell = ClassicalPanelShell;
    api.installClassicalTranscriptionSourcePresentation =
      installClassicalTranscriptionSourcePresentation;
    api.installClassicalPanelRhythm = installClassicalPanelRhythm;
    api.installClassicalReaderGuidanceHeader = installClassicalReaderGuidanceHeader;
    api.installClassicalShell = installClassicalShell;
    api.installClassicalShellWhenReady = installClassicalShellWhenReady;
    return api;
}

export function installClassicalShellGlobals(targetObject = globalThis) {
    const api = createClassicalShellModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
