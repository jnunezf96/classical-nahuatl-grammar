const idea = (ideaId, title, guidance) => Object.freeze({ ideaId, title, guidance });

export const LESSON50_READER_GUIDANCE_GROUPS = Object.freeze([
  idea("lesson50-domain-and-time", "Time relations preserve typed tense evidence", "Capture exact Results, then choose an available time profile. Explicit indicators, clause order, and tense relations remain attached to the canonical structure."),
  idea("lesson50-place", "Place relations join exact units", "A place relation composes captured clause or NNC Results. A final sentence cannot reconstruct either Source."),
  idea("lesson50-manner", "Clause manner differs from word formation", "The typed route keeps nonadverbialized manner separate from compared-manner and other VNC or NNC formation paths."),
  idea("lesson50-consideration", "Consideration retains principal constraints", "The owner checks the principal Result and exposes consideration only for compatible captured units; saved interface state cannot override valence."),
  idea("lesson50-purpose", "Purpose profiles depend on mood and marking", "Unmarked, ma-optative, admonitive-lest, purposive-VNC, and weak purpose profiles remain distinct and use exact typed evidence."),
  idea("lesson50-condition", "Conditions align marker, mood, tense, and scope", "Open and hypothetical conditions consume exact Results. Past hypotheticals require matched antecessive scope rather than a claimed label."),
  idea("lesson50-concession", "Concessive particles remain exact Results", "Each concession family retains its marker identity, polarity, intensity, tel behavior, and za or zan distinction. Spelling alone authorizes nothing."),
  idea("lesson50-consequence", "Consequence begins with typed iuh", "The consequence route requires the canonical adverbial iuh Result and preserves its provenance through the outer composition."),
  idea("lesson50-proviso", "Proviso requires negativized ahzo", "A sentence Result and exact negativized ahzo marker compose the proviso. Other negative particles cannot substitute for that owner-issued Result."),
  idea("lesson50-reason", "Reason keeps ca distinct from conjunction", "The exact ca particle introduces the principal clause in a reason relation. An English conjunction reading is a translation mirage, not grammar authority."),
]);

export function isLesson50ReaderGuidanceExact(candidate = []) {
  return JSON.stringify(candidate) === JSON.stringify(LESSON50_READER_GUIDANCE_GROUPS);
}

export function renderLesson50ReaderGuidance(escapeHtml = String) {
  return `<details class="classical-reader-guidance__lesson" data-classical-reader-guidance-lesson="50">
                    <summary class="classical-reader-guidance__lesson-summary">
                      <span>Lesson 50</span>
                      <small>Nonadverbialized relations</small>
                    </summary>
                    <div class="classical-reader-guidance__lesson-body">
                      <div class="classical-reader-guidance__grid">
${LESSON50_READER_GUIDANCE_GROUPS.map(group => `
                        <section class="classical-reader-guidance__card" data-classical-reader-guidance-group="${escapeHtml(group.ideaId)}">
                          <h5 class="classical-reader-guidance__title">${escapeHtml(group.title)}</h5>
                          <p data-classical-reader-guidance-idea="${escapeHtml(group.ideaId)}">${escapeHtml(group.guidance)}</p>
                        </section>`).join("")}
                      </div>
                    </div>
                  </details>`;
}
