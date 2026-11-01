// Source choices only: the application owns object frames, order and carriers.
export function readClassicalSourceObjectSelections(documentObject) {
  const value=id=>documentObject?.getElementById(id)?.value || "";
  return {count:Number(value("classical-source-object-count") || 1),
    firstObjectPerson:value("classical-rule-logic-object").split(":")[1] || "",
    rows:[2,3].map(n=>{const objectKind=value(`classical-source-object-${n}-kind`);return {objectKind,
      objectPerson:objectKind === "specific-projective" ? value(`classical-source-object-${n}-person`):""};})};
}
const retainedObjectDecisions=new WeakMap();
export function readClassicalSourceObjectDecision(documentObject,valence,subject,owner=documentObject?.defaultView) {
  const current=owner?.getClassicalSourceAuthoringDecision?.();
  const accepted=owner?.getClassicalAcceptedSourceAuthoringPayload?.(owner?.getClassicalCommittedSourceAuthoringDecision?.());
  if(accepted?.objectDecision)return accepted.objectDecision;
  if(current?.objectDecision)return current.objectDecision;
  const declaration={stem:documentObject?.getElementById("classical-source-whole")?.value || "source",valence,subject,
    ...readClassicalSourceObjectSelections(documentObject)};
  const key=JSON.stringify(declaration),prior=retainedObjectDecisions.get(documentObject);
  if(prior?.key===key)return prior.decision;
  const decision=owner?.getClassicalNahuatlVncSourceObjectDecision?.(declaration) || null;
  retainedObjectDecisions.set(documentObject,{key,decision});return decision;
}
export function readClassicalSourceObjectRows(documentObject,valence,subject,owner=documentObject?.defaultView) {
  return readClassicalSourceObjectDecision(documentObject,valence,subject,owner)?.sourceObjectRequests || [];
}
export function getClassicalSourceObjectControls(documentObject) {
  return ['classical-source-object-count', ...[2,3].flatMap(n=>[
    `classical-source-object-${n}-kind`, `classical-source-object-${n}-person`
  ])].map(id=>documentObject?.getElementById(id)).filter(Boolean);
}
export function syncClassicalSourceObjectRows(documentObject,owner=documentObject?.defaultView) {
  const disclosure=documentObject?.getElementById('classical-source-object-details');
  if (disclosure) {
    const decision=owner?.getClassicalSourceAuthoringDecision?.()?.objectDecision;
    const applicable=decision?.applicable === true;
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
      if(control) {
        if(control.options && !Array.from(control.options).some(option=>option.value===value) && documentObject.createElement) {
          const option=documentObject.createElement('option');option.value=value;option.textContent=value;control.appendChild(option);
        }
        control.value=value;
      }
    }
  }
  syncClassicalSourceObjectRows(documentObject);
}
export function installClassicalSourceObjectRows(documentObject, refresh,owner=documentObject?.defaultView) {
  const count = documentObject.getElementById("classical-source-object-count");
  const add = documentObject.getElementById("classical-source-object-add");
  if (!count || !add) return;
  const sync = () => syncClassicalSourceObjectRows(documentObject,owner);
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

  for (let i = 2; i <= 3; i++) documentObject.getElementById(`classical-source-object-${i}-kind`).addEventListener("change", sync);
  sync();
}
