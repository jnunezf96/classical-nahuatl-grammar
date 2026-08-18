"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const SHELL_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"),
    "utf8"
);
const RUNTIME_SOURCE = fs.readFileSync(
    path.join(ROOT, "src", "runtime", "create_runtime.mjs"),
    "utf8"
);
const TRANSCRIPTION_LINE_COUNT = fs.readFileSync(
    path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
    "utf8"
).split(/\r?\n/u).length;

function getAttribute(attributes = "", name = "") {
    return String(attributes).match(
        new RegExp(`(?:^|\\s)${name}="([^"]*)"`, "u")
    )?.[1] || "";
}

function getSelectOptions(markup = "", controlId = "") {
    const match = String(markup).match(
        new RegExp(
            `<select\\b[^>]*id="${controlId}"[^>]*>([\\s\\S]*?)</select>`,
            "u"
        )
    );
    return Array.from(
        String(match?.[1] || "").matchAll(
            /<option\b([^>]*)>([\s\S]*?)<\/option>/gu
        ),
        optionMatch => {
            const attributes = optionMatch[1];
            return {
                value: getAttribute(attributes, "value"),
                documentaryTagPresent: /data-classical-authority-option/u.test(attributes),
                selected: /\sselected(?:\s|$)/u.test(attributes),
                disabled: /\sdisabled(?:\s|$)/u.test(attributes),
            };
        }
    );
}

function getInputAttributes(markup = "", controlId = "") {
    return String(markup).match(
        new RegExp(`<input\\b([^>]*id="${controlId}"[^>]*)>`, "u")
    )?.[1] || "";
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_late_operation_ui_contract");
    const contracts =
        ctx.CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS || {};
    const switchContracts =
        ctx.CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_SWITCH_CONTRACTS || {};
    const tags =
        typeof ctx.getClassicalNahuatlVncLateOperationAuthorityOptionTags
            === "function"
            ? ctx.getClassicalNahuatlVncLateOperationAuthorityOptionTags()
            : [];
    const validation =
        typeof ctx.validateClassicalNahuatlVncLateOperationUiContract
            === "function"
            ? ctx.validateClassicalNahuatlVncLateOperationUiContract()
            : null;
    const authorityMarkup =
        typeof ctx.ClassicalAuthorityPanel === "function"
            ? ctx.ClassicalAuthorityPanel()
            : "";
    const sourceMarkup =
        typeof ctx.ClassicalSourcePanel === "function"
            ? ctx.ClassicalSourcePanel()
            : "";
    const lateControlIndex = authorityMarkup.indexOf(
        'id="classical-rule-logic-late-operation"'
    );
    const lateStart = authorityMarkup.lastIndexOf(
        "<select",
        lateControlIndex
    );
    const lateEnd = authorityMarkup.indexOf(
        'id="classical-rule-logic-causative-result-subject"',
        lateStart
    );
    const lateMarkup =
        lateStart >= 0 && lateEnd > lateStart
            ? authorityMarkup.slice(lateStart, lateEnd)
            : "";

    s.eq(
        "Causative Source voice and its nonactive formation are typed #1 Source constituents, not #2 Grammar controls",
        {
            sourceVoiceInSource:
                sourceMarkup.includes('id="classical-rule-logic-causative-source-voice"')
                && sourceMarkup.includes('data-classical-source-constituent="source-voice"'),
            sourceFormationInSource:
                sourceMarkup.includes('id="classical-rule-logic-causative-source-nonactive"')
                && sourceMarkup.includes('data-classical-source-constituent="source-nonactive-formation"'),
            sourceVoiceAbsentFromGrammar:
                !authorityMarkup.includes('id="classical-rule-logic-causative-source-voice"'),
            sourceFormationAbsentFromGrammar:
                !authorityMarkup.includes('id="classical-rule-logic-causative-source-nonactive"'),
            sourceVoiceOptions: getSelectOptions(
                sourceMarkup,
                "classical-rule-logic-causative-source-voice"
            ).map(option => option.value),
        },
        {
            sourceVoiceInSource: true,
            sourceFormationInSource: true,
            sourceVoiceAbsentFromGrammar: true,
            sourceFormationAbsentFromGrammar: true,
            sourceVoiceOptions: ["active", "passive", "impersonal"],
        }
    );

    s.eq(
        "The late-operation UI contract is complete and non-authorizing",
        {
            status: validation?.authorizationStatus,
            selectControls: validation?.selectControlCount,
            selectOptions: validation?.selectOptionCount,
            switches: validation?.switchControlCount,
            authorityTags: validation?.authorityTagCount,
            uniqueTags: validation?.uniqueAuthorityTagCount,
            incomplete: validation?.incompleteRecordIds,
            missingDefaults: validation?.controlsWithoutOneSelectedOption,
            duplicates: validation?.duplicateTagIds,
            noFormulaAuthority:
                validation?.formulaStringAuthority === false
                && tags.every(record =>
                    record.formulaStringAuthority === false
                    && !Object.hasOwn(record, "formula")
                    && !Object.hasOwn(record, "selectedFormula")
                ),
            noSurfaceAuthority:
                validation?.surfaceStringAuthority === false
                && tags.every(record =>
                    record.surfaceStringAuthority === false
                    && !Object.hasOwn(record, "surface")
                    && !Object.hasOwn(record, "wordRealization")
                ),
        },
        {
            status: "authorized",
            selectControls: 15,
            selectOptions: 87,
        switches: 4,
        authorityTags: 95,
        uniqueTags: 95,
            incomplete: [],
            missingDefaults: [],
            duplicates: [],
            noFormulaAuthority: true,
            noSurfaceAuthority: true,
        }
    );

    const selectParity = Object.fromEntries(
        Object.entries(contracts).map(([controlId, expectedOptions]) => [
            controlId,
            {
                expected: expectedOptions.map(option => ({
                    value: option.value,
                    documentaryTagPresent: false,
                    selected: option.selected === true,
                    disabled: option.disabled === true,
                })),
                actual: getSelectOptions(lateMarkup, controlId),
            },
        ])
    );
    const allRenderedOptions = Object.values(selectParity).flatMap(
        parity => parity.actual
    );
    s.eq(
        "Every live late-operation option is rendered from the canonical contract",
        {
            parity: Object.fromEntries(
                Object.entries(selectParity).map(([controlId, parity]) => [
                    controlId,
                    JSON.stringify(parity.actual)
                        === JSON.stringify(parity.expected),
                ])
            ),
            renderedCount: allRenderedOptions.length,
            taggedCount: allRenderedOptions.filter(option => option.documentaryTagPresent).length,
            uniqueTagCount: new Set(
                allRenderedOptions.filter(option => option.documentaryTagPresent)
            ).size,
            untaggedValues: allRenderedOptions
                .filter(option => !option.documentaryTagPresent)
                .map(option => option.value),
        },
        {
            parity: Object.fromEntries(
                Object.keys(contracts).map(controlId => [controlId, true])
            ),
            renderedCount: 87,
            taggedCount: 0,
            uniqueTagCount: 0,
            untaggedValues: allRenderedOptions.map(option => option.value),
        }
    );

    const renderedSwitches = Object.fromEntries(
        Object.entries(switchContracts).map(([controlId, contract]) => {
            const attributes = getInputAttributes(lateMarkup, controlId);
            return [
                controlId,
                {
                    checked: getAttribute(
                        attributes,
                        "data-classical-checked-authority-option-tag"
                    ),
                    unchecked: getAttribute(
                        attributes,
                        "data-classical-unchecked-authority-option-tag"
                    ),
                    expectedChecked: contract.checked.tagId,
                    expectedUnchecked: contract.unchecked.tagId,
                },
            ];
        })
    );
    s.eq(
        "Every semantic switch keeps documentary authority tags out of the DOM",
        {
            absent: Object.fromEntries(
                Object.entries(renderedSwitches).map(
                    ([controlId, state]) => [
                        controlId,
                        !state.checked && !state.unchecked,
                    ]
                )
            ),
            renderedStateTagCount: Object.values(renderedSwitches)
                .flatMap(state => [state.checked, state.unchecked])
                .filter(Boolean).length,
            uniqueStateTagCount: new Set(
                Object.values(renderedSwitches)
                    .flatMap(state => [state.checked, state.unchecked])
                    .filter(Boolean)
            ).size,
        },
        {
            absent: Object.fromEntries(
                Object.keys(switchContracts).map(controlId => [controlId, true])
            ),
            renderedStateTagCount: 0,
            uniqueStateTagCount: 0,
        }
    );

    const visibleTagIds = [
        ...allRenderedOptions.filter(option => option.documentaryTagPresent).map(option => option.value),
        ...Object.values(renderedSwitches).flatMap(
            state => [state.checked, state.unchecked]
        ).filter(Boolean),
    ];
    const ledger =
        typeof ctx.validateClassicalNahuatlAuthorityOptionLedger === "function"
            ? ctx.validateClassicalNahuatlAuthorityOptionLedger({
                authorityOptionTags: tags,
                visibleOptionTagIds: visibleTagIds,
                transcriptionLineCount: TRANSCRIPTION_LINE_COUNT,
            })
            : null;
    s.eq(
        "The documentary ledger cannot authorize UI choices after visible option tags are removed",
        {
            status: ledger?.authorizationStatus,
            recordCount: ledger?.recordCount,
            visibleOptionCount: ledger?.visibleOptionCount,
            missingVisibleTags: ledger?.missingVisibleTags || [],
            incompleteRecords: ledger?.incompleteRecords || [],
            futureOptionPolicy: ledger?.futureOptionPolicy || "",
        },
        {
            status: "blocked",
        recordCount: 95,
            visibleOptionCount: 0,
            missingVisibleTags: [],
            incompleteRecords: [],
            futureOptionPolicy:
                "a-visible-authority-option-without-a-complete-canvas-tag-fails-validation",
        }
    );

    s.eq(
        "The shell consumes one contract and does not tag free text as grammar authority",
        (() => {
            const lateOperationSourceStart = SHELL_SOURCE.indexOf(
                'id="classical-rule-logic-late-operation"'
            );
            const lateOperationSourceEnd = SHELL_SOURCE.indexOf(
                "</select>",
                lateOperationSourceStart
            );
            const lateOperationSource =
                lateOperationSourceStart >= 0
                && lateOperationSourceEnd > lateOperationSourceStart
                    ? SHELL_SOURCE.slice(
                        lateOperationSourceStart,
                        lateOperationSourceEnd
                    )
                    : "";
            return {
            sharedContractImport:
                SHELL_SOURCE.includes(
                    "CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_CONTROL_CONTRACTS"
                )
                && !SHELL_SOURCE.includes(
                    "CLASSICAL_NAHUATL_VNC_LATE_OPERATION_UI_SWITCH_CONTRACTS"
                ),
            handwrittenLateOptions: /<option\b/u.test(lateOperationSource),
            freeTextAuthorityTags: Array.from(
                lateMarkup.matchAll(/<input\b([^>]*)>/gu),
                match => match[1]
            ).filter(attributes =>
                !/type="checkbox"/u.test(attributes)
                && /authority-option-tag/u.test(attributes)
            ).length,
            runtimeInstaller:
                RUNTIME_SOURCE.includes(
                    "installClassicalNahuatlVncLateOperationUiContractGlobals"
                )
                && RUNTIME_SOURCE.includes(
                    '"src/core/classical/vnc_late_operation_ui_contract.mjs"'
                ),
            };
        })(),
        {
            sharedContractImport: true,
            handwrittenLateOptions: false,
            freeTextAuthorityTags: 0,
            runtimeInstaller: true,
        }
    );

    return s;
}

module.exports = { run };
