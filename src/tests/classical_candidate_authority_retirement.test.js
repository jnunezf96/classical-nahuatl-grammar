"use strict";

const { createSuite } = require("./runner");

const RETIRED_CANDIDATE_AUTHORIZERS = Object.freeze([
    "classifyAdjectivalModificationCandidate",
    "classifyAdjectivalNncCandidate",
    "classifyAdjectivalNncFunctionCandidate",
    "classifyAnalysisIssueCandidate",
    "classifyCalendarNameCandidate",
    "classifyComparisonCandidate",
    "classifyComplementClauseCandidate",
    "classifyCompoundNncAffectiveCandidate",
    "classifyConjunctionClauseCandidate",
    "classifyFrequentativeCandidate",
    "classifyHonorificPejorativeCandidate",
    "classifyNumeralNncCandidate",
    "classifyPersonalNameNncCandidate",
    "classifyPurposiveDirectionalCandidate",
    "classifySentenceCandidate",
    "buildAdjectivalNncFunctionCandidateSourceFrame",
    "buildAdjectivalNncFunctionCandidateOperationFrame",
    "getAdjectivalNncFunctionCandidateOperationFrameMismatch",
    "getAdjectivalNncFunctionCandidateBlockedDiagnostic",
    "hasAdjectivalNncAndrewsSourceGate",
    "hasCalendarNameAndrewsSourceGate",
    "hasFrequentativeAndrewsSourceGate",
    "hasNumeralNncAndrewsSourceGate",
    "normalizeAdjectivalNncCandidateSurface",
    "normalizeCalendarNameCandidateSurface",
    "normalizeFrequentativeCandidateSurface",
    "normalizeHonorificPejorativeCandidateSurface",
    "normalizeNumeralNncCandidateSurface",
    "normalizePersonalNameNncCandidateSurface",
    "normalizePurposiveDirectionalCandidateSurface",
    "renderCompoundNncAffectiveCandidateSurface",
    "classifyAdjectivalModificationFalsePositive",
    "classifyAdjectivalNncFalsePositive",
    "classifyAdverbialAdjunctionFalsePositive",
    "classifyAdverbialNuclearFalsePositive",
    "classifyAnalysisFalsePositive",
    "classifyComparisonFalsePositive",
    "classifyComplementClauseFalsePositive",
    "classifyConjunctionClauseFalsePositive",
    "classifyPersonalNameNncFalsePositive",
    "classifyPlaceGentilicNncFalsePositive",
    "classifyRelationalNncFalsePositive",
    "getLesson53ComparisonSubsectionInventory",
]);

function run(ctx = {}) {
    const s = createSuite("classical_candidate_authority_retirement");

    s.eq(
        "caller-supplied candidate compatibility APIs cannot authorize canonical output",
        Object.fromEntries(
            RETIRED_CANDIDATE_AUTHORIZERS.map((name) => [
                name,
                typeof ctx[name],
            ]),
        ),
        Object.fromEntries(
            RETIRED_CANDIDATE_AUTHORIZERS.map((name) => [
                name,
                "undefined",
            ]),
        ),
    );

    s.eq(
        "the retired particle candidate classifier cannot become a lexical authority helper",
        typeof ctx.classifyParticleCandidate,
        "undefined",
    );

    return s;
}

module.exports = { run };
