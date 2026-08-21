const idea = (ideaId, title, guidance) => Object.freeze({
  ideaId,
  title,
  guidance,
});

export const LESSON38_READER_GUIDANCE_GROUPS = Object.freeze([
  idea(
    "lesson38-impersonal-patientive-foundation",
    "An impersonal patientive begins with an exact impersonal VNC Result",
    "The application captures an exact owner-issued impersonal VNC Result and derives the patientive from its typed nonactive core. The active Source, selected impersonal operation, nonactive stem, participants, vowel quantity, and internal boundaries remain attached. The patientive names a result or product of the event rather than an agent who performs it. English participle labels are only a rough reading aid. A raw nonactive-looking stem, copied Result, formula, surface word, or Canvas example cannot authorize the route.",
  ),
  idea(
    "lesson38-impersonal-patientive-lo",
    "Typed lō loses final ō and retains l",
    "From the exact impersonal VNC Result, a typed final lō boundary loses ō and retains l, producing the tli patientive family. Earlier inherent, tla-impersonal, or nonactive layers remain in the complete Source analysis. When the VNC owner has already derived a root-plus-ya Source on its root, the patientive inherits that result automatically; Lesson 38 does not ask for the same choice again. The rule works for any compatible typed Source and never uses the witnessed stems as a whitelist. Narrow meanings and unusual vowel realizations require typed lexical Source or context.",
  ),
  idea(
    "lesson38-impersonal-patientive-o-ohua",
    "Typed ō or o-hua loses the complete nonactive material",
    "The ō and o-hua families begin with exact owner-issued impersonal VNC Results. The application removes the complete typed nonactive suffix and keeps the full active-to-impersonal Source history, repeated impersonal layers, noun class, participants, and morphemic boundaries. Changes such as e to a, ti to ch, or ci to x remain owner-supplied morphological or lexical analyses; visible letters alone do not generalize them. The compositional patientive reading remains available, while seed, arrow, detour, dawn, and other narrow readings require typed Source or context rather than suffix shape or an example list.",
  ),
  idea(
    "lesson38-impersonal-patientive-hua",
    "Typed hua is removed and its preceding vowel follows the Source analysis",
    "An exact owner-issued hua impersonal Result supplies the patientive Source. The application removes the typed hua boundary, shortens preceding ī to i where the Source analysis licenses it, preserves other vowel quantity, and derives the tl class automatically. A different lō formation must come from its own owner-issued VNC Result; it is not a free patientive switch. Literal and narrow readings remain typed or contextual, and no witnessed stem authorizes the route.",
  ),
  idea(
    "lesson38-impersonal-patientive-hua-lo",
    "A hua-lō Source keeps its inner hua layer",
    "When the typed active Source already ends in the morphemic layer hua and its owner-issued impersonal Result adds outer lō, the patientive removes only final ō and retains hua plus l. The application preserves both boundaries and the complete active-to-impersonal history. It never flattens the Source into final letters or asks the user which layer to delete. A body-part or other narrow reading still requires typed Source or context.",
  ),
  idea(
    "lesson38-reflexive-impersonal-patientive",
    "Reflexive or reciprocal ancestry supplies ne automatically",
    "The exact owner-issued impersonal VNC Result carries reflexive or reciprocal ancestry into the patientive as shuntline ne. Any remaining projective tē or tla object stays with it, so the Result may contain ne+tē or ne+tla. A projective object can distinguish the impersonal analysis from a passive one; without it the surfaces may overlap, but the exact Source histories remain different. The user chooses an analysis only when the typed Source and context leave real ambiguity. Ne is never inserted manually or reconstructed from the nounstem surface.",
  ),
  idea(
    "lesson38-projective-impersonal-patientive-lo",
    "Projective tla or tē+tla remains when lō loses ō",
    "When the exact active Source has a nonspecific nonhuman direct object, its owner-issued impersonal VNC Result preserves that projective object. The patientive therefore keeps mainline tla, or shuntline tla after a surviving human recipient tē, while typed lō loses only final ō and retains l. The direct patient is nonhuman; the application reads that from the participant structure rather than prefix order. Root-plus-ya and other Source alternations remain VNC-owner facts. Literal patient readings stay available, while narrower tool, object, or product readings require typed Source or context. Canvas examples prove the productive pattern and do not limit it to listed stems.",
  ),
  idea(
    "lesson38-projective-impersonal-patientive-o",
    "Projective object structure remains when ō is removed",
    "For the ō family, the patientive removes the complete typed nonactive suffix while retaining mainline tla or the double-object sequence tē+tla from the exact owner-issued VNC Result. Tla is the nonhuman direct patient; tē, when present, is a separate surviving human participant. Changes inside the verbstem remain typed Source-shape or lexical analyses and are not guessed from the patientive surface. The general patient reading is always available. Narrow readings such as seed, arrow, detour, dawn, or a special instrument require typed Source or context, never an example list.",
  ),
  idea(
    "lesson38-projective-impersonal-patientive-hua",
    "Projective hua patientives inherit vowel quantity from the active Source",
    "The exact VNC Result supplies both the projective tla object and the typed hua boundary. Removing hua normally leaves a short preceding vowel; a vowel that was phonemically long in the active verbstem remains long. In the productive final-a pattern, active a becomes ī before hua and surfaces as short i after hua is removed. These facts come from the full active-to-impersonal Source analysis, not the final spelling. The Result keeps a nonhuman patient reading, and any homophony or narrower lexical meaning remains a typed or contextual fact rather than a user-controlled vowel switch or stem whitelist.",
  ),
  idea(
    "lesson38-human-source-tla-lo",
    "A human-object Source becomes passive before it becomes impersonal",
    "When a single-object active VNC has nonspecific human tē, the patientive does not keep that active object prefix. The exact Source first forms its typed lō passive, the passive patient becomes the subject, and impersonalization then removes that subject and supplies tla. Removing final ō leaves l, and the patientive still names a human being. This is not direct impersonalization of the active VNC. A homonymous tla patientive with a nonhuman referent comes from a different typed Source. The route, carrier, and human referent are automatic; examples prove the rule and do not limit its verbstems.",
  ),
  idea(
    "lesson38-human-source-tla-o",
    "The same human Source path applies to typed ō",
    "For the ō family, a nonspecific-human active Source again follows active → passive → impersonalized passive. The impersonalized passive has tla, and the patientive removes the complete typed ō suffix while keeping the human patient referent and the full Source history. A corresponding passive patientive remains a different grammatical Result. The user does not choose the carrier, voice path, or referent, and the rule applies to any compatible typed Source rather than a list of witnessed stems.",
  ),
  idea(
    "lesson38-human-source-tla-hua-exceptions",
    "Typed hua follows the human path; rare tē forms are lexical exceptions",
    "With typed hua, the nonspecific-human active Source still passes through a passive and then an impersonalized passive with tla. The patientive removes hua, and ī becomes i when the typed Source analysis requires it, while the Result names a human patient. A nonhuman homonym must have a different typed Source. Andrews also records rare human-naming patientives that retain tē, such as tē-huica-l and tē-ilpi-l. Those are automatic only for the typed lexical exceptions; they are not a general option and do not create a verbstem whitelist.",
  ),
  idea(
    "lesson38-human-nonhuman-patientive-contrast",
    "Typed Source history distinguishes human tla from nonhuman tē",
    "Some applicative Sources support a regular human patientive with tla and an anomalous nonhuman or abstract patientive with tē. The application first reads the exact active valence, participant roles, voice path, and lexical analysis. Nāhuatiā is settled automatically by whether its active Source selects a human or nonhuman object. Icnēliā, tlāuhtiā, and nōnōtzā leave a genuine referent choice because both readings can come from the same human-object Source. Machtiā instead contrasts a single-object impersonal Source with a double-object passive Source. The prefix alone never decides transitivity or referent, and these lexical anomalies do not authorize a general tē route.",
  ),
  idea(
    "lesson38-patientive-active-action-translation-overlap",
    "A shared English translation does not merge two grammatical Results",
    "An impersonal patientive and an active-action nounstem can receive the same English translation while remaining different constructions. The application preserves each exact owner-issued Source, voice history, derivational suffix, participant structure, and Result identity. English meaning cannot authorize or merge either route. The user chooses an analysis only when typed Source and context still leave a real ambiguity.",
  ),
  idea(
    "lesson38-compound-source-patientive",
    "A compound VNC Source stays structurally complete inside its patientive",
    "Passive and impersonal patientives can derive from an exact owner-issued compound VNC Result. The application preserves the typed embed, matrix, participant structure, internal boundaries, voice path, and Nahuatl embed-before-matrix order. The user chooses the embed relation only when it is genuinely unresolved: an adverbial embed normally reads in the same order, while an incorporated object may need an English X-that-has-been-done reading that reverses the English relationship. That translation reversal is reading guidance only; it cannot alter or authorize the Nahuatl grammar. Compatible typed compound Sources remain open and Canvas examples are never a whitelist.",
  ),
  idea(
    "lesson38-patientive-matrix-compound",
    "An exact patientive Result can become the matrix of a compound",
    "The application captures an exact owner-issued patientive NNC Result, including its complete VNC ancestry, and passes that Result to the ordinary compound owner as the matrix. The user supplies the typed nounstem embed and chooses its genuine grammatical relation to the patientive matrix. Nahuatl keeps embed before matrix; boundary behavior and the Result noun class follow automatically from the typed constituents. A compositional reading remains available, while meanings such as paddle, deadly food, grave, word, speech, or saying require typed Source or context. A copied Result, nounstem string, formula, surface, or Canvas example cannot authorize the continuation. Section 39.6 separately treats the reverse arrangement, where a patientive is the embed.",
  ),
]);

export const LESSON38_FORMULA_HOVER_AUTHORITIES = Object.freeze({
  "lesson38-impersonal-patientive-foundation": Object.freeze({
    lessonSections: Object.freeze(["§38.1", "§38.1.1"]),
    atomIds: Object.freeze(
      "ACI-P382-L003-285215E39B ACI-P382-L004-46C162C068".split(" ")
    ),
  }),
  "lesson38-impersonal-patientive-lo": Object.freeze({
    lessonSections: Object.freeze(["§38.1.1.a"]),
    atomIds: Object.freeze(
      "ACI-P382-L016-FF50222365 ACI-P382-L018-0DE9F7F214 ACI-P382-L018-0DE9F7F214-03 ACI-P382-L018-0DE9F7F214-04 ACI-P382-L023-27690A48AD ACI-P382-L025-3FD724E721-02 ACI-P382-L025-3FD724E721-03 ACI-P382-L025-3FD724E721-04 ACI-P382-L025-3FD724E721-06 ACI-P382-L025-3FD724E721-07 ACI-P382-L025-3FD724E721-08 ACI-P382-L025-3FD724E721-09 ACI-P382-L025-3FD724E721-10 ACI-P383-L004-40D579A181-03 ACI-P383-L004-40D579A181-06 ACI-P383-L010-CBBC6EC0D4-03 ACI-P383-L010-CBBC6EC0D4-08 ACI-P383-L016-87536399D0-02 ACI-P383-L016-87536399D0-03 ACI-P383-L018-EA080F4FD7-04 ACI-P383-L018-EA080F4FD7-05 ACI-P383-L018-EA080F4FD7-06 ACI-P383-L018-EA080F4FD7-09".split(" ")
    ),
  }),
  "lesson38-impersonal-patientive-o-ohua": Object.freeze({
    lessonSections: Object.freeze(["§38.1.1.b"]),
    atomIds: Object.freeze(
      "ACI-P383-L021-26C6147D30 ACI-P383-L033-490ACD847C ACI-P383-L033-490ACD847C-03 ACI-P383-L033-490ACD847C-04 ACI-P383-L033-490ACD847C-05 ACI-P383-L033-490ACD847C-06 ACI-P383-L036-216E0A3CD2-02 ACI-P383-L036-216E0A3CD2-03 ACI-P383-L036-216E0A3CD2-05 ACI-P383-L036-216E0A3CD2-06 ACI-P383-L036-216E0A3CD2-08 ACI-P383-L039-6F947F4288-03 ACI-P383-L039-6F947F4288-04 ACI-P383-L039-6F947F4288-06 ACI-P383-L039-6F947F4288-08 ACI-P383-L039-6F947F4288-10 ACI-P383-L039-6F947F4288-11 ACI-P384-L002-6166F126AE-03 ACI-P384-L002-6166F126AE-05 ACI-P384-L002-6166F126AE-06 ACI-P384-L002-6166F126AE-07 ACI-P384-L002-6166F126AE-08 ACI-P384-L002-6166F126AE-10 ACI-P384-L002-6166F126AE-11".split(" ")
    ),
  }),
  "lesson38-impersonal-patientive-hua": Object.freeze({
    lessonSections: Object.freeze(["§38.1.1.c"]),
    atomIds: Object.freeze(
      "ACI-P384-L005-B12D9B8C21 ACI-P384-L009-054D251014 ACI-P384-L009-054D251014-03 ACI-P384-L009-054D251014-04 ACI-P384-L009-054D251014-05 ACI-P384-L011-CE3CDD010F-03 ACI-P384-L011-CE3CDD010F-04 ACI-P384-L011-CE3CDD010F-05".split(" ")
    ),
  }),
  "lesson38-impersonal-patientive-hua-lo": Object.freeze({
    lessonSections: Object.freeze(["§38.1.1.d"]),
    atomIds: Object.freeze(
      "ACI-P384-L013-CD8FB22960 ACI-P384-L015-FAB579410D-02 ACI-P384-L015-FAB579410D-03 ACI-P384-L015-FAB579410D-07 ACI-P384-L015-FAB579410D-08 ACI-P384-L015-FAB579410D-10".split(" ")
    ),
  }),
  "lesson38-reflexive-impersonal-patientive": Object.freeze({
    lessonSections: Object.freeze(["§38.1.2"]),
    atomIds: Object.freeze(
      "ACI-P384-L017-CC6179C3AA ACI-P384-L020-81DD0498EF-02 ACI-P384-L020-81DD0498EF-03 ACI-P384-L020-81DD0498EF-04 ACI-P384-L020-81DD0498EF-05 ACI-P384-L020-81DD0498EF-06 ACI-P384-L020-81DD0498EF-07 ACI-P384-L020-81DD0498EF-08 ACI-P384-L022-8BBA50E21C-02 ACI-P384-L022-8BBA50E21C-03 ACI-P384-L022-8BBA50E21C-04 ACI-P384-L022-8BBA50E21C-05 ACI-P384-L022-8BBA50E21C-06 ACI-P384-L022-8BBA50E21C-07 ACI-P384-L022-8BBA50E21C-08".split(" ")
    ),
  }),
  "lesson38-projective-impersonal-patientive-lo": Object.freeze({
    lessonSections: Object.freeze(["§38.1.3", "§38.1.3.a"]),
    atomIds: Object.freeze(
      "ACI-P384-L026-401725274A ACI-P384-L029-D431EC4388 ACI-P384-L031-F00ED0B1D4 ACI-P384-L032-EF8E0524CB ACI-P384-L033-BA5CB8E6E7 ACI-P384-L034-E9559009B9 ACI-P384-L036-71378FFE11 ACI-P384-L037-3E2C0A6CC0 ACI-P384-L038-397DCB9362 ACI-P385-L002-EC5080EBF6 ACI-P385-L002-EC5080EBF6-02 ACI-P385-L002-EC5080EBF6-03 ACI-P385-L002-EC5080EBF6-04 ACI-P385-L008-3DA09DD459 ACI-P385-L008-3DA09DD459-02 ACI-P385-L008-3DA09DD459-03 ACI-P385-L008-3DA09DD459-04 ACI-P385-L008-3DA09DD459-05 ACI-P385-L008-3DA09DD459-06 ACI-P385-L008-3DA09DD459-07 ACI-P385-L008-3DA09DD459-08 ACI-P385-L008-3DA09DD459-09 ACI-P385-L008-3DA09DD459-10 ACI-P385-L008-3DA09DD459-11 ACI-P385-L011-A3E561EBCB ACI-P385-L011-A3E561EBCB-02 ACI-P385-L011-A3E561EBCB-03 ACI-P385-L011-A3E561EBCB-04 ACI-P385-L013-BB4DCF4861 ACI-P385-L014-5CEA23C27E".split(" ")
    ),
  }),
  "lesson38-projective-impersonal-patientive-o": Object.freeze({
    lessonSections: Object.freeze(["§38.1.3.b"]),
    atomIds: Object.freeze(
      "ACI-P385-L016-CC8076BFC3 ACI-P385-L018-A3FB2AD722 ACI-P385-L018-A3FB2AD722-02 ACI-P385-L018-A3FB2AD722-03 ACI-P385-L018-A3FB2AD722-04 ACI-P385-L020-16A2FC5A71 ACI-P385-L021-60AE86C37D ACI-P385-L022-327F8AAF96 ACI-P385-L022-327F8AAF96-02 ACI-P385-L022-327F8AAF96-03 ACI-P385-L022-327F8AAF96-04 ACI-P385-L022-327F8AAF96-05 ACI-P385-L024-CD1FADB132 ACI-P385-L025-A658FEA9E3 ACI-P385-L027-10D61A6F95 ACI-P385-L027-10D61A6F95-02 ACI-P385-L027-10D61A6F95-03 ACI-P385-L027-10D61A6F95-04 ACI-P385-L027-10D61A6F95-05 ACI-P385-L027-10D61A6F95-06 ACI-P385-L027-10D61A6F95-07 ACI-P385-L027-10D61A6F95-08 ACI-P385-L029-9739D7CCC3 ACI-P385-L029-9739D7CCC3-02 ACI-P385-L029-9739D7CCC3-03 ACI-P385-L029-9739D7CCC3-04 ACI-P385-L031-4357546BA9 ACI-P385-L031-4357546BA9-02 ACI-P385-L031-4357546BA9-03 ACI-P385-L031-4357546BA9-04 ACI-P385-L034-13D798C579 ACI-P385-L034-13D798C579-02 ACI-P385-L034-13D798C579-03 ACI-P385-L034-13D798C579-04 ACI-P385-L034-13D798C579-05 ACI-P385-L034-13D798C579-06 ACI-P385-L034-13D798C579-07 ACI-P385-L034-13D798C579-08 ACI-P385-L036-550EBA0E5E".split(" ")
    ),
  }),
  "lesson38-projective-impersonal-patientive-hua": Object.freeze({
    lessonSections: Object.freeze(["§38.1.3.c"]),
    atomIds: Object.freeze(
      "ACI-P385-L037-B966164153 ACI-P385-L038-447B14679B ACI-P385-L040-036B420F04 ACI-P386-L002-D818AC12DB ACI-P386-L002-D818AC12DB-02 ACI-P386-L002-D818AC12DB-03 ACI-P386-L002-D818AC12DB-04 ACI-P386-L002-D818AC12DB-05 ACI-P386-L004-DE23B984A4 ACI-P386-L005-E2F651C8EE ACI-P386-L007-6CBA0528FF ACI-P386-L009-7C10551A14 ACI-P386-L010-88777B4841 ACI-P386-L010-88777B4841-02".split(" ")
    ),
  }),
  "lesson38-human-source-tla-lo": Object.freeze({
    lessonSections: Object.freeze(["§38.1.4", "§38.1.4.a"]),
    atomIds: Object.freeze(
      "ACI-P386-L020-D20BF0B55E ACI-P386-L022-BE6CEFF097 ACI-P386-L022-BE6CEFF097-03 ACI-P386-L022-BE6CEFF097-04 ACI-P386-L022-BE6CEFF097-05 ACI-P386-L022-BE6CEFF097-02 ACI-P386-L025-4C702F15D6 ACI-P386-L025-4C702F15D6-02 ACI-P386-L025-4C702F15D6-03 ACI-P386-L025-4C702F15D6-04 ACI-P386-L025-4C702F15D6-05 ACI-P386-L025-4C702F15D6-06 ACI-P386-L025-4C702F15D6-07 ACI-P386-L025-4C702F15D6-08 ACI-P386-L025-4C702F15D6-09 ACI-P386-L025-4C702F15D6-10 ACI-P386-L025-4C702F15D6-11 ACI-P386-L031-630FCB1C02 ACI-P386-L032-B1859AD451 ACI-P386-L033-B58BE01757 ACI-P386-L034-F89291AD8C ACI-P386-L035-13512E1B0F ACI-P386-L039-790E357C5B ACI-P387-L002-0DBA82F85B ACI-P387-L004-829EF2A15A ACI-P387-L005-50F8B30EEE ACI-P387-L005-50F8B30EEE-02 ACI-P387-L005-50F8B30EEE-03 ACI-P387-L005-50F8B30EEE-04 ACI-P387-L009-B7AEA631C4 ACI-P387-L011-103F95FA19 ACI-P387-L011-103F95FA19-03 ACI-P387-L011-103F95FA19-04 ACI-P387-L011-103F95FA19-05 ACI-P387-L011-103F95FA19-06 ACI-P387-L011-103F95FA19-07 ACI-P387-L011-103F95FA19-08 ACI-P387-L011-103F95FA19-09 ACI-P387-L011-103F95FA19-02 ACI-P387-L013-7CEBB51ED5 ACI-P387-L013-7CEBB51ED5-03 ACI-P387-L013-7CEBB51ED5-04 ACI-P387-L013-7CEBB51ED5-05 ACI-P387-L013-7CEBB51ED5-06 ACI-P387-L013-7CEBB51ED5-02 ACI-P387-L013-7CEBB51ED5-07".split(" ")
    ),
  }),
  "lesson38-human-source-tla-o": Object.freeze({
    lessonSections: Object.freeze(["§38.1.4.b"]),
    atomIds: Object.freeze(
      "ACI-P387-L018-DA63075C51 ACI-P387-L018-DA63075C51-02 ACI-P387-L018-DA63075C51-03 ACI-P387-L018-DA63075C51-04 ACI-P387-L018-DA63075C51-05 ACI-P387-L018-DA63075C51-06 ACI-P387-L018-DA63075C51-07 ACI-P387-L018-DA63075C51-08 ACI-P387-L024-9FB64D7804 ACI-P387-L025-70939310E3 ACI-P387-L026-4A149ECF91 ACI-P387-L027-A88003A68A".split(" ")
    ),
  }),
  "lesson38-human-source-tla-hua-exceptions": Object.freeze({
    lessonSections: Object.freeze(["§38.1.4.c", "§38.1.4 Note"]),
    atomIds: Object.freeze(
      "ACI-P387-L028-7C498DD8E5 ACI-P387-L030-A76C6CB3D7 ACI-P387-L030-A76C6CB3D7-02 ACI-P387-L030-A76C6CB3D7-03 ACI-P387-L030-A76C6CB3D7-04 ACI-P387-L030-A76C6CB3D7-05 ACI-P387-L030-A76C6CB3D7-06 ACI-P387-L030-A76C6CB3D7-07 ACI-P387-L030-A76C6CB3D7-08 ACI-P387-L037-9F32AF52FC ACI-P387-L038-BAF7A95B72 ACI-P387-L039-FE7F32ED34 ACI-P387-L040-2D4626206C ACI-P387-L041-CF17F0CB07 ACI-P388-L002-BD38CD35BB ACI-P388-L002-BD38CD35BB-02 ACI-P388-L002-BD38CD35BB-03 ACI-P388-L002-BD38CD35BB-04 ACI-P388-L002-BD38CD35BB-05 ACI-P388-L002-BD38CD35BB-06 ACI-P388-L007-F74EE8A13C ACI-P388-L009-E17795872D ACI-P388-L009-E17795872D-02 ACI-P388-L009-E17795872D-03 ACI-P388-L009-E17795872D-04 ACI-P388-L009-E17795872D-05 ACI-P388-L009-E17795872D-06 ACI-P388-L009-E17795872D-07 ACI-P388-L009-E17795872D-08 ACI-P388-L009-E17795872D-09 ACI-P388-L009-E17795872D-10 ACI-P388-L011-F8234BA64E ACI-P388-L011-F8234BA64E-02 ACI-P388-L011-F8234BA64E-03 ACI-P388-L011-F8234BA64E-04 ACI-P388-L011-F8234BA64E-05 ACI-P388-L011-F8234BA64E-06 ACI-P388-L011-F8234BA64E-07 ACI-P388-L011-F8234BA64E-08 ACI-P388-L011-F8234BA64E-09".split(" ")
    ),
  }),
  "lesson38-human-nonhuman-patientive-contrast": Object.freeze({
    lessonSections: Object.freeze(["§38.1.5"]),
    atomIds: Object.freeze(
      "ACI-P388-L014-44AA816B3A ACI-P388-L017-4D7968B16B ACI-P388-L017-912B9557FB ACI-P388-L023-3641F39279 ACI-P388-L024-D00272124F ACI-P388-L025-26CE20A73E-03 ACI-P388-L025-26CE20A73E-04 ACI-P388-L025-26CE20A73E-05 ACI-P388-L025-26CE20A73E-06 ACI-P388-L025-26CE20A73E-07 ACI-P388-L028-EAF0C16DC6 ACI-P388-L028-EAF0C16DC6-03 ACI-P388-L028-EAF0C16DC6-07 ACI-P388-L032-D0C41320DF-02 ACI-P388-L032-D0C41320DF-03 ACI-P388-L032-D0C41320DF-04 ACI-P388-L032-D0C41320DF-05 ACI-P388-L032-D0C41320DF-06 ACI-P388-L032-D0C41320DF-07 ACI-P388-L032-D0C41320DF-08 ACI-P388-L032-D0C41320DF-09 ACI-P388-L032-D0C41320DF-10 ACI-P388-L034-4DBEF7B1A9-02 ACI-P388-L034-4DBEF7B1A9-04 ACI-P388-L037-3C1A5C212F ACI-P389-L002-C6183AAD85-02 ACI-P389-L002-C6183AAD85-03 ACI-P389-L002-C6183AAD85-05 ACI-P389-L002-C6183AAD85-06 ACI-P389-L002-C6183AAD85-07".split(" ")
    ),
  }),
  "lesson38-patientive-active-action-translation-overlap": Object.freeze({
    lessonSections: Object.freeze(["§38.1.6"]),
    atomIds: Object.freeze(
      "ACI-P389-L004-8240E95E23 ACI-P389-L006-29727CFB5E ACI-P389-L008-04A9FAC4A6".split(" ")
    ),
  }),
  "lesson38-compound-source-patientive": Object.freeze({
    lessonSections: Object.freeze(["§38.2", "§38.2.1"]),
    atomIds: Object.freeze(
      "ACI-P389-L010-49F07892B7 ACI-P389-L012-9C93E9979B ACI-P389-L012-849D8FE283 ACI-P389-L015-39AD75784D-02 ACI-P389-L015-39AD75784D-03 ACI-P389-L015-39AD75784D-05 ACI-P389-L020-D0B9DA2BDE ACI-P389-L020-D0B9DA2BDE-03 ACI-P389-L020-D0B9DA2BDE-08 ACI-P389-L023-F927A72607-03 ACI-P389-L023-F927A72607-06 ACI-P389-L023-F927A72607-07 ACI-P389-L023-F927A72607-08 ACI-P389-L035-FCBC3FDD86-02 ACI-P389-L035-FCBC3FDD86-03 ACI-P389-L035-FCBC3FDD86-04 ACI-P389-L035-FCBC3FDD86-06 ACI-P389-L035-FCBC3FDD86-07 ACI-P389-L039-97F10CD208 ACI-P390-L004-A659D49C2C ACI-P390-L005-48142BDBF0 ACI-P390-L009-90E34707E1-02 ACI-P390-L009-90E34707E1-03 ACI-P390-L009-90E34707E1-04 ACI-P390-L009-90E34707E1-05 ACI-P390-L009-90E34707E1-06 ACI-P390-L009-90E34707E1-07 ACI-P390-L013-CF0068FEE9".split(" ")
    ),
  }),
  "lesson38-patientive-matrix-compound": Object.freeze({
    lessonSections: Object.freeze(["§38.2.2"]),
    atomIds: Object.freeze(
      "ACI-P390-L017-9F69F2BDD4 ACI-P390-L019-106C0F3184-02 ACI-P390-L019-106C0F3184-10 ACI-P390-L023-B32E53873F-08 ACI-P390-L025-4D9B57B9CD-02 ACI-P390-L025-4D9B57B9CD-11 ACI-P390-L029-688AF9F1FB-03 ACI-P390-L029-688AF9F1FB-06 ACI-P390-L029-688AF9F1FB-07 ACI-P390-L029-688AF9F1FB-11".split(" ")
    ),
  }),
});

export function isLesson38ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(
    LESSON38_READER_GUIDANCE_GROUPS
  );
}

export function renderLesson38ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="38">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 38</span>
                      <small>Impersonal patientive nounstems</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON38_READER_GUIDANCE_GROUPS.map((group) => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
