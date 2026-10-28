// Andrews §§28.7.6–7,28.11. These structural domains are necessary conditions;
// the compound owner additionally validates exact Source topology and forms.
export function getCompoundNonactiveScopeDomain({voiceOperation='',voice='active',variant=''}={}) {
 const values=voice==='passive'?['embed','both']
  :voice==='impersonal'?voiceOperation==='tla-impersonal'?['embed','both']:['embed','matrix','both']:['none'];
 return Object.freeze(variant==='future-embed'&&values.includes('embed')?['embed']:values);
}

// Andrews §28.7.5 describes an occasional reversed interpretation, not an
// exclusive list of matrix lexemes. This is the compound owner's value domain;
// source topology and realization remain validated by that owner.
const compoundEventOrders = Object.freeze(['iconic', 'hysteron-proteron']);
export function getCompoundEventOrderDomain() { return compoundEventOrders; }
