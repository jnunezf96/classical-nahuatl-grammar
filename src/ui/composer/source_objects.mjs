// Source choices only: the application owns object frames, order and carriers.
export function readClassicalSourceObjectRows(documentObject, valence, subject) {
  const value = id => documentObject?.getElementById(id)?.value || "";
  const count = Number(value("classical-source-object-count") || 1);
  // This Source choice explicitly names a nonanimate referent with common
  // number. Forward those selected facts; the application issues its frame.
  if (count === 1 && valence === "specific-projective"
    && value("classical-rule-logic-object") === "specific-projective:3common") {
    return [{objectId: "source-object-1", objectKind: "specific-projective",
      objectPerson: "3common", governor: "directive", derivationalLevel: 1,
      person: "3", animacy: "nonanimate", humanness: "nonhuman", number: "common"}];
  }
  if (count < 2 || valence === "intransitive") return [];
  const firstKind = {"specific-projective":"specific-projective", "projective-human":"nonspecific-human", "projective-nonhuman":"nonspecific-nonhuman", "mainline-reflexive":"reflexive"}[valence];
  return Array.from({length: Math.min(count, 3)}, (_, index) => {
    const kind = index === 0 ? firstKind : value(`classical-source-object-${index + 1}-kind`);
    const person = kind === "reflexive" ? subject : kind === "specific-projective"
      ? index === 0 ? value("classical-rule-logic-object").split(":")[1] : value(`classical-source-object-${index + 1}-person`) : "";
    return {objectId: `source-object-${index + 1}`, objectKind: kind, objectPerson: person,
      ...(kind === "specific-projective" && person === "3common"
        ? {person: "3", animacy: "nonanimate", humanness: "nonhuman", number: "common"} : {}),
      governor: "lexical", derivationalLevel: index + 1};
  });
}
export function getClassicalSourceObjectControls(documentObject) {
  return ['classical-source-object-count', ...[2,3].flatMap(n=>[
    `classical-source-object-${n}-kind`, `classical-source-object-${n}-person`
  ])].map(id=>documentObject?.getElementById(id)).filter(Boolean);
}
export function syncClassicalSourceObjectRows(documentObject) {
  const disclosure=documentObject?.getElementById('classical-source-object-details');
  if (disclosure) {
    // These rows describe the current verbal Source, not a later verbal Result.
    const unit=documentObject.documentElement?.dataset?.classicalBasalUnit;
    const valence=documentObject.getElementById('classical-rule-logic-valence')?.value;
    const applicable=unit==='vnc' && ['specific-projective','projective-human',
      'projective-nonhuman','mainline-reflexive'].includes(valence);
    disclosure.hidden=!applicable;
    disclosure.setAttribute?.('aria-hidden',String(!applicable));
  }
  const count=documentObject?.getElementById('classical-source-object-count');
  if (!count) return;
  const n=Math.max(1,Math.min(3,Number(count.value)||1));
  for (const i of [2,3]) {
    const row=documentObject.getElementById(`classical-source-object-${i}`);
    if (row) row.hidden=i>n;
    const kind=documentObject.getElementById(`classical-source-object-${i}-kind`);
    const kindLabel=kind?.closest('label');
    if(kindLabel)kindLabel.hidden=false;
    const label=documentObject.getElementById(`classical-source-object-${i}-person`)?.closest('label');
    if (label) label.hidden=kind?.value!=='specific-projective';
  }
  const add=documentObject.getElementById('classical-source-object-add');
  const remove=documentObject.getElementById('classical-source-object-remove');
  if (add) add.disabled=n>=3;
  if (remove) remove.disabled=n<=1;
}
// Replayed owner inputs are projected into controls, never executed here.
export function restoreClassicalSourceObjectRows(documentObject, requests=[]) {
  const count=documentObject?.getElementById('classical-source-object-count');
  if (!count) return;
  count.value=String(Math.max(1,Math.min(3,requests.length)));
  for (const i of [2,3]) {
    const request=requests[i-1];
    for (const [suffix,value] of [['kind',request?.objectKind||'specific-projective'],['person',request?.objectPerson||'3sg']]) {
      const control=documentObject.getElementById(`classical-source-object-${i}-${suffix}`);
      if (control && Array.from(control.options||[]).some(option=>option.value===value)) control.value=value;
    }
  }
  syncClassicalSourceObjectRows(documentObject);
}
export function installClassicalSourceObjectRows(documentObject, refresh) {
  const count = documentObject.getElementById("classical-source-object-count");
  const add = documentObject.getElementById("classical-source-object-add");
  if (!count || !add) return;
  const sync = () => syncClassicalSourceObjectRows(documentObject);
  // Reconcile after native Source/family handlers finish projecting their controls.
  const deferSync=()=>Promise.resolve().then(sync);
  documentObject.addEventListener?.('change',event=>{
    if (['classical-rule-logic-valence','classical-construction-operation',
      'classical-cardinal-target-kind'].includes(event.target?.id)) deferSync();
  });
  documentObject.getElementById('classical-source-parts')
    ?.addEventListener('classical-source-commit-state-change',deferSync);
  add.addEventListener("click", () => {count.value = String(Math.min(3, Number(count.value) + 1)); sync(); refresh(count);});
  documentObject.getElementById("classical-source-object-remove").addEventListener("click", () => {count.value = String(Math.max(1, Number(count.value) - 1)); sync(); refresh(count);});
  documentObject.getElementById("classical-source-whole")?.addEventListener("input", () => {count.value = "1"; sync();});
  for (let i = 2; i <= 3; i++) documentObject.getElementById(`classical-source-object-${i}-kind`).addEventListener("change", sync);
  sync();
}
