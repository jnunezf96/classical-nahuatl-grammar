"use strict";

// Test recipes select documented underlying Sources. No source ID, expected
// string or historical ledger can authorize the runtime grammar operation.
function createNominalFixtureSource(ctx, sourceId) {
    // Andrews44.6 affirms these whole adverbial NNCs. Its uncertainty about
    // patientive ancestry does not require an invented finite predecessor.
    const wholeStem = {"44.6-tlapic":"tlapīc", "44.6-ilhuiz":"ilhuiz", "44.6-tlalhuiz":"tlalhuiz"}[sourceId];
    if (wholeStem) {
        const input = {stem:wholeStem};
        const potential = ctx.buildClassicalNahuatlLexicalAdverbialPotentialFrame(input);
        if (potential.authorizationStatus !== "authorized") throw new Error(potential.blockReason);
        return {potential, parents:[potential.lexicalNncSourceFrame], input,
            expectedLexicalId:sourceId, sourceRefs:["AndrewsCanvas44.6; originalPDF454–455; wholeNNCuse, ancestryunclaimed"], hold:null};
    }
    const ordinary = {
        "44.4-cemilhuitl": [{stem: "cem-ilhui", sourceClass: "tl"}, {}, "44.4.1", "absolute singular TL citation only; fine subclass and wider paradigm unclaimed"],
        "44.4-tequitl": [{stem: "tequi", sourceClass: "tl-1-a"}, {}, "44.4.1; reader_49_6_adverbial_context_custody.test.mjs"],
        "44.4-inchān": [{stem: "chān"}, {state: "possessive", possessor: "3pl"}, "44.4.1; reader_nnc_home_nasal.test.mjs"],
        "44.4-cenyohoal": [{stem: "cen-yohoa-l", sourceClass: "tli"}, {}, "44.4.2", "documented li allomorph of coarse tli; fine subclass unclaimed"],
        "44.4-cecemilhuitl": [{stem: "cē-cem-ilhui", sourceClass: "tl"}, {}, "44.4 note", "entered documented distributive stem; absolute singular TL citation only; no invented fine subclass or wider paradigm"],
        "44.4-cecenyohual": [{stem: "cē-cen-yohoa-l", sourceClass: "tli"}, {}, "44.4 note", "entered documented distributive stem; coarse tli citation only"],
        "44.4-inchahchan": [{stem: "chān"}, {state: "possessive", possessor: "3pl", stemFormation: "distributive-varietal"}, "44.4 note; reader_nnc_home_nasal.test.mjs"],
        "44.6-yectel": [{stem: "ye-c-tel", embedStem: "ye-c", matrixStem: "tel", sourceClass: "zero"}, {}, "44.6 yectel: documented ye-c-tli + tel-Ø compound", "matrix meaning uncertain; no source-verb paradigm claimed"],
        "44.6-ixtlapal": [{stem: "īx-tla-pal", embedStem: "īx", matrixStem: "tla-pal", sourceClass: "tli"}, {}, "44.6 documented face+tla-pal-li compound; PDF279/§30 compound examples and46.3.3 independently supply īx-tli face", "coarse tli citation only; independently documented long īx lexical Source; retain short ix in44.6 OCR as written-source variation"],
        "44.8-nonohmah": [{stem: "noh-mah", sourceUse: "general-use"}, {state: "possessive", possessor: "1sg", singularConnector: "silent"}, "44.8.2a", "documented selected general-use nounstem only; conjectural noh-mati ancestry and wider class unclaimed"],
        "44.8-tonohmah": [{stem: "noh-mah", sourceUse: "general-use"}, {state: "possessive", possessor: "1pl", singularConnector: "silent"}, "44.8.2a", "documented selected general-use nounstem only; conjectural noh-mati ancestry and wider class unclaimed"],
        "44.8-nonohmatca": [{stem: "noh-mat-ca", sourceUse: "general-use"}, {state: "possessive", possessor: "1sg", singularConnector: "silent"}, "44.8.2b", "documented selected general-use nounstem only; conjectural noh-mati ancestry unclaimed"],
        "44.8-tonohmatca": [{stem: "noh-mat-ca", sourceUse: "general-use"}, {state: "possessive", possessor: "1pl", singularConnector: "silent"}, "44.8.2b", "documented selected general-use nounstem only; conjectural noh-mati ancestry unclaimed"],
        "44.9-nal": [{stem: "nal", sourceClass: "tli"}, {}, "44.9: nal-li", "documented coarse tli citation only; incorporated use required"],
        "44.9-nepan": [{stem: "ne-pan", sourceClass: "zero"}, {}, "44.9: ne-pan-Ø", "incorporated use required"],
        "49.1-cuica-compared-manner": [{stem: "cuīca", sourceClass: "tl-1-a"}, {}, "49.1.1d; typed ordinary compared-manner Source"],
    };
    const pronominal = {
        "44.6-quexquich": {stem: "quē-x-qui-ch", embedStem: "quē-x", matrixStem: "qui-ch"},
        "44.6-ixquich": {stem: "ix-qui-ch", embedStem: "ix", matrixStem: "qui-ch"},
        "44.6-achi": {stem: "a-chi", embedStem: "a", matrixStem: "chi"},
    };
    const owned = Object.hasOwn(ordinary, sourceId) || Object.hasOwn(pronominal, sourceId)
        || ["44.6-tlacuauh", "44.6-tlamach", "44.8-noyohca", "44.8-moyohca"].includes(sourceId);
    if (!owned) return null;
    const parents = [];
    let input = null;
    let sourceRefs = [];
    const hold = (requiredInputs, reason) => ({potential: null, parents, input, expectedLexicalId: sourceId, sourceRefs, hold: {requiredInputs: Array.isArray(requiredInputs) ? requiredInputs : [requiredInputs], reason}});
    let parent = null;
    try {
        if (ordinary[sourceId]) {
            const [source, selections, ref, scope] = ordinary[sourceId];
            input = {source, selections: {subject: "3common", state: "absolutive", ...selections}, scope: scope || "documented selected Source cell"};
            sourceRefs = [ref];
            const s = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame(source);
            if (s.authorizationStatus !== "authorized") return hold("Complete canonical ordinary NNC Source", s.blockReason);
            const op = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(s, input.selections);
            if (op.authorizationStatus !== "authorized") return hold("Supported selected ordinary NNC operation", op.blockReason);
            parent = ctx.requestClassicalOrdinaryNncResult(s, op);
            if (parent) parents.push(parent);
        } else if (pronominal[sourceId]) {
            input = {source: pronominal[sourceId], selections: {subject: "3common"}};
            sourceRefs = ["AndrewsCanvas44.6;16.8;16.9", "setup-contract-repair-33/journey-proof.mjs achi exact-parent proof"];
            const s = ctx.buildClassicalNahuatlPronominalNncSourceFrame(input.source);
            if (s.authorizationStatus !== "authorized") return hold("Complete canonical pronominal NNC Source", s.blockReason);
            const op = ctx.buildClassicalNahuatlPronominalNncOperationFrame(s, input.selections);
            if (op.authorizationStatus !== "authorized") return hold("Supported pronominal operation", op.blockReason);
            parent = ctx.requestClassicalPronominalNncResult(s, op);
            if (parent) parents.push(parent);
        } else if (["44.8-noyohca", "44.8-moyohca"].includes(sourceId)) {
            input = {predicateKind: "active-action", sourceStem: "iyo-ā", verbClass: "C", sourceValence: "intransitive", sourceInitialISelection: "supportive", possessor: sourceId === "44.8-noyohca" ? "1sg" : "2sg"};
            sourceRefs = ["AndrewsCanvas44.8.1"];
            const potential = ctx.buildClassicalNahuatlPrimitiveAdverbialPotentialFrame(input);
            if (potential.authorizationStatus !== "authorized") return hold("Complete active-action primitive Source", potential.blockReason);
            const primitive = potential.primitiveAdverbialSourceFrame;
            if (primitive) parents.push(primitive.nominalPredicateSourceFrame || primitive);
            return {potential, parents, input, expectedLexicalId: sourceId, sourceRefs, hold: null};
        } else {
            const isHarden = sourceId === "44.6-tlacuauh";
            input = {finite: {sourceStem: isHarden ? "tlacu-ā-hua" : "mati", verbClass: "A", sourceValence: isHarden ? "intransitive" : "projective-nonhuman", ...(!isHarden ? {objectKind: "nonspecific-nonhuman"} : {}), subject: "3sg", voice: "impersonal", mood: "indicative", tense: "present"}, patientive: {constructionKind: "patientive", patientiveSourceFamily: "impersonal-core", state: "absolutive", subject: "3common"}};
            sourceRefs = ["AndrewsCanvas44.6", isHarden ? "reader_tlacuauh_derivation.test.mjs" : "AndrewsCanvas20.4;38.1"];
            let v = ctx.evaluateClassicalNahuatlVncApplication(input.finite);
            if (isHarden && v.authorizationStatus !== "authorized") {
                const sourceOptions = ctx.getClassicalNahuatlNonactiveStemOptions(
                    input.finite.sourceStem, {verbClass: "A", sourceValence: "intransitive"},
                );
                const selected = sourceOptions.options.find(option => (
                    option.ruleId === "cn-l20-5-intransitive-final-w"
                ));
                if (!selected) return hold("Documented §20.5 final-hua nonactive predecessor", sourceOptions.blockReason || "Required source rule was not offered");
                input.finite.nonactiveOptionId = selected.optionId;
                v = ctx.evaluateClassicalNahuatlVncApplication(input.finite);
            }
            if (!isHarden && v.authorizationStatus !== "authorized") {
                input.finite.nonactiveOptionId = "ō:mach-ō";
                v = ctx.evaluateClassicalNahuatlVncApplication(input.finite);
            }
            if (v.authorizationStatus !== "authorized") return hold("Complete issued finite patientive predecessor", v.blockReason);
            parents.push(v.resultFrame);
            parent = ctx.requestClassicalDeverbalNncResult({...input.patientive, canonicalVncResult: v.resultFrame});
            if (!parent) {
                const diagnostic = ctx.evaluateClassicalNahuatlDeverbalNnc({...input.patientive, canonicalVncResult: v.resultFrame});
                return hold("Complete issued patientive operation", diagnostic?.blockReason || "No issued parent");
            }
            if (parent) parents.push(parent);
        }
        if (!parent || parent.authorizationStatus !== "authorized") return hold("Authorized underlying nominal Result", parent?.blockReason || "No issued parent");
        const potential = ctx.resolveClassicalNahuatlAdverbialPotential({canonicalSourceResult: parent});
        if (potential.authorizationStatus !== "authorized") return hold(
            "Documented adverbial potential for the exact canonical nominal parent", potential.blockReason);
        if (potential.lexicalEntryId !== sourceId) return hold("Exact documented Source identity", "Canonical parent resolves to a different lexical entry");
        return {potential, parents, input, expectedLexicalId: sourceId, sourceRefs, hold: null};
    } catch (error) {
        return hold("Complete canonical nominal Source contract", String(error));
    }
}

module.exports = {createNominalFixtureSource};
