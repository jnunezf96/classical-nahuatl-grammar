// Bibliographic addresses only. These never define options, defaults or eligibility.
// Based on overview's thirteen-family map and its retained Andrews source accounts.
export function constructionBackground({operation='',construction='',lateOperation='',derivation='',family='',relation=''}={}) {
  if(!operation)return [];
  if(relation) {
    if(relation==='comparison')return ['Andrews §53'];
    if(['conjunction','correlative-conjunction','lexical-conjunction','parallel-structure'].includes(relation))return ['Andrews §52'];
    if(['direct-speech','indirect-speech','rumored-report','deleted-principal'].includes(relation))return ['Andrews §§19.3–19.6'];
    if(['object-complement','subject-complement','adverbial-complement'].includes(relation))return ['Andrews §51'];
    if(relation==='supplementation')return ['Andrews §§18–19'];
    if(relation==='vocative')return ['Andrews §18.11'];
    if(['adjectival-modification','intensification'].includes(relation))return ['Andrews §§41–42'];
    if(['condition','concession','purpose','reason','time','place','manner','comparison-adverbial'].includes(relation))return ['Andrews §§49–50'];
  }
  // Explicit namespaces prevent clause adjunction from borrowing nuclear-adverbial references.
  const routes={
    'vnc:finite-slot':'Andrews §§5–11','vnc:finite-surface':'Andrews §§5–11','vnc:nuclear-clause':'Andrews §§5–11',
    'vnc:ordered-voice-application':'Andrews §§20–26','vnc:ordered-voice-chain':'Andrews §§20–26',
    'vnc:source-selection':'Andrews §§5–7','vnc:verbstem-class':'Andrews §7','vnc:transitive-object':'Andrews §6',
    'vnc:diagram':'Andrews §§5–11','nnc:diagram':'Andrews §§12–17',
    'particle:result':'Andrews §3','particle:negative-selection':'Andrews §§3.3, 8.1.3, 9.6','particle:negative-attachment':'Andrews §§3.3, 8.1.3, 9.6',
    'sentence:particle-adjunction':'Andrews §§3, 8–10','sentence:adverbial-adjunction':'Andrews §§3.4, 44',

    'sentence:supplementation':'Andrews §§18–19','clause:adverbial-adjunction':'Andrews §§49–50','clause:comparison':'Andrews §53',
    'nnc:personal-name':'Andrews §56','personal-name-nnc':'Andrews §56',
    'calendar-date-nnc':'Andrews §42.8.4; Appendix E II.2–3',
    'cardinal-numeral-nnc':'Andrews §§34, 43.6–43.7','nnc:quantitative-predicate':'Andrews §§34, 43.6–43.7',
    'affective-nnc':'Andrews §32','adjectival-nnc':'Andrews §41','nnc:adjectival-modification':'Andrews §41',
    'nnc:place-gentilic':'Andrews §48','place-gentilic-nnc':'Andrews §48','place-name-nnc':'Andrews §48','gentilic-nnc':'Andrews §48',
    'nnc:relational':'Andrews §§45–47','relational-nnc':'Andrews §§45–47',
    'nnc:adverbial':'Andrews §44','adverbial-nuclear':'Andrews §44',
    'vnc:denominal':'Andrews §§54–55','denominal-vnc':'Andrews §§54–55',
    'nominal-embed-vnc':'Andrews §30','compound-nnc':'Andrews §31','attitude-vnc':'Andrews §33',
    'nnc:ordinary':'Andrews §§12–17','nnc:pronominal':'Andrews §17',
    'nnc:sentence-surface':'Andrews §§8–10, 18–19','vnc:sentence-result':'Andrews §§8–10, 18–19',
  };
  const kind=operation==='grammar:nominal-construction'?construction:operation;
  if(routes[kind])return [routes[kind]];
  if(['nnc:deverbal-construction','deverbal-nnc'].includes(kind))return [family==='ownerhood'?'Andrews §§35.9, 39.3':'Andrews §§35–40'];
  if(operation==='vnc:derivational-operation'||operation==='vnc:application') {
    if(lateOperation==='compound')return ['Andrews §28'];
    if(lateOperation==='frequentative')return ['Andrews §27'];
    if(lateOperation==='purposive')return ['Andrews §29'];
    if(['honorific','reverential','pejorative'].includes(lateOperation))return ['Andrews §33'];
    if(derivation==='causative')return ['Andrews §25'];
    if(derivation==='applicative')return ['Andrews §26'];
    return ['Andrews §§5–11, 20–22'];
  }
  if(operation==='nnc:ordinary')return ['Andrews §§12–17'];
  if(operation==='clause:adverbial-adjunction')return ['Andrews §§49–50'];
  return [];
}
export function sourceAnalysisBackground(unit) {
  return unit==='vnc'?['Andrews §§5–7']:unit==='nnc'?['Andrews §§12–17']:[];
}
