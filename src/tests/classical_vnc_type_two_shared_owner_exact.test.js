"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_vnc_type_two_shared_owner_exact");
    const facet = "p2481-the-source-for-a-single-object-causative-vnc-formed";
    const ownerSource = ctx.buildClassicalTypeTwoSpecificSingleObjectTransformSource({
        analysisDomain: "classical-type-two-specific-single-object-transform",
        selection: "claim-p2481",
        requestedFacet: facet,
        participantChoice: `claim-p2481:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalTypeTwoSpecificSingleObjectTransform(ownerSource);
    const definition = ownerResult.payload.definition;
    const application = ctx.createClassicalNahuatlVncApplication(ctx);

    function quiza({ sourceSubject, subject, causativeObjectKind, sourceVoice = "active" }) {
        const request = {
            sourceStem: "quīza", verbClass: "B", sourceValence: "intransitive",
            sourceSubject, subject, objectKind: "none", objectPerson: "",
            mood: "indicative", tense: "present", requestedDerivation: "causative",
            causativeObjectKind, sourceVoice, requestedVoice: "active",
        };
        const preview = application.evaluate(request);
        const option = preview.controlFrame.derivationOptionInventory.options
            .find(candidate => candidate.targetStem === "quix-tiā");
        return application.evaluate({ ...request, derivationOptionId: option.optionId });
    }

    const specific = quiza({ sourceSubject: "3sg", subject: "2sg", causativeObjectKind: "specific-projective" });
    const reflexive = quiza({ sourceSubject: "1sg", subject: "1sg", causativeObjectKind: "reflexive" });
    const nonspecific = quiza({ sourceSubject: "3sg", subject: "2sg", causativeObjectKind: "nonspecific-human", sourceVoice: "impersonal" });
    const specificOperation = specific.resultFrame.derivationOperationFrame;
    const reflexiveOperation = reflexive.resultFrame.derivationOperationFrame;
    const nonspecificOperation = nonspecific.resultFrame.derivationOperationFrame;
    const quizaOption = definition.derivations.quiza.options[0];
    const pixahuiOption = definition.derivations.pixahui.options.find(option => option.targetStem === "pix-o-ā");
    const observations = [
        ["ACI-P217-L006-C9398E6039-02", "quīza specific causee transform", {
            result: specific.resultFrame.surfaceRealization,
            sourceSubject: specificOperation.sourceSubject,
            targetSubject: specificOperation.targetSubject,
            causativeObject: specificOperation.targetObjectRequests[0],
        }, { result: "ticquīxtia", sourceSubject: "3sg", targetSubject: "2sg", causativeObject: {
            objectId: "causative-object", objectKind: "specific-projective", objectPerson: "3sg", governor: "causative", derivationalLevel: 1,
        } }],
        ["ACI-P217-L009-FBFFE74F56-04", "quīza reflexive causee transform", {
            result: reflexive.resultFrame.surfaceRealization,
            sourceSubject: reflexiveOperation.sourceSubject,
            targetSubject: reflexiveOperation.targetSubject,
            causativeObject: reflexiveOperation.targetObjectRequests[0],
        }, { result: "ninoquīxtia", sourceSubject: "1sg", targetSubject: "1sg", causativeObject: {
            objectId: "causative-object", objectKind: "reflexive", objectPerson: "1sg", governor: "causative", derivationalLevel: 1,
        } }],
        ["ACI-P217-L019-3DDF8C51A6-04", "quīza impersonal human causee transform", {
            result: nonspecific.resultFrame.surfaceRealization,
            sourceVoice: "impersonal",
            causativeObject: nonspecificOperation.targetObjectRequests[0],
        }, { result: "titēquīxtia", sourceVoice: "impersonal", causativeObject: {
            objectId: "causative-object", objectKind: "nonspecific-human", objectPerson: "", governor: "causative", derivationalLevel: 1,
        } }],
        ["ACI-P214-L008-C367EA205F-02", "quīza final s to x bridge alternation", {
            source: quizaOption.bridge.sourceStem,
            operation: quizaOption.bridge.bridgeBaseOperation,
            bridge: quizaOption.bridge.nonactiveStem,
            target: quizaOption.targetStem,
        }, { source: "quīza", operation: "replace-final-za-with-x", bridge: "quīx-o-hua", target: "quix-tiā" }],
        ["ACI-P206-L022-C4B0CB6F8E-02", "pixahui stock a to o causative replacement", {
            source: pixahuiOption.sourceStem,
            procedure: pixahuiOption.procedure,
            target: pixahuiOption.targetStem,
        }, { source: "pix-a-hui", procedure: "replace-a-hui-with-o-plus-long-causative-a", target: "pix-o-ā" }],
    ];
    for (const [atomId, path, actual, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, actual, expected);
        const hostile = JSON.parse(JSON.stringify(actual));
        hostile[Object.keys(hostile)[0]] = "BROKEN";
        s.no(`${atomId} rejects a mutation of ${path}`, JSON.stringify(hostile) === JSON.stringify(expected));
    }
    s.eq("the shared VNC derivation Result is authorized", ownerResult.authorizationStatus, "authorized");
    return s;
}

module.exports = { run };
