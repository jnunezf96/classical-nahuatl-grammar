import test from 'node:test';
import assert from 'node:assert/strict';
import {createPossessiveFixture} from './helpers/deverbal_possessive_fixture.mjs';

test('Andrews 56.3 retains inner clause boundaries, distinct from 56.4 outer conjunction',async()=>{
 const {r}=await createPossessiveFixture('temō');
 const rows=[
  ['subject-supplementation',['Cōā-tl','Ī-cuē'],'1sg','niCōātl-Īcuē'],
  ['possessor-supplementation',['Miz-tli','Ī-mā'],'2sg','tiMiztli-Īmā'],
  ['adjectival-modification',['Huē-i','Ozomah-tli'],'2sg','tiHuēi-Ozomahtli'],
  ['adverbial-modification',['T-o-pan','Tem-ō-c'],'1sg','niTopan-Temōc'],
  ['calendar-double-nucleus',['Nāhui','Ōl-i-n'],'2sg','tiNāhui-Ōlin'],
  ['calendar-personalizing-thing',['Cē','Cōā-tl'],'3sg','Cē-Cōātl'],
  ['calendar-single-nucleus',['Mā-cu-i-l-xō-chi-tl'],'3sg','Mācuilxōchitl'],
  ['conjunctorless-personal-name-unit',['Yohua-l-li','Eh-eh-ca-tl'],'2sg','tiYohualli tEhehcatl'],
 ];
 for(const [sourceFamily,parts,outerSubject,surface] of rows){
  const defaults=r.getPersonalNameNncInnerClauseFunctionalSlotDefaults(sourceFamily);
  const clauses=parts.map(part=>r.buildPersonalNameInnerClauseFrame({sourceFamily,
   subjectPrefix:defaults.subjectPrefix,subjectConnector:defaults.subjectConnector,
   subjectReference:defaults.subjectReference,numberPrefix:defaults.numberPrefix,numberSuffix:defaults.numberSuffix,
   predicateMorphs:part.split('-')}));
  const sourceFrame=r.buildPersonalNameNncSourceFrame({sourceFamily,clauses});
  assert.ok(sourceFrame,sourceFamily);
  const result=r.evaluatePersonalNameNnc({sourceFrame,outerSubject});
  assert.equal(result.authorizationStatus,'authorized',sourceFamily+': '+result.blockReason);
  assert.equal(result.surfaceRealization,surface,sourceFamily);
  assert.notEqual(r.evaluatePersonalNameNnc({sourceFrame:{...sourceFrame},outerSubject}).authorizationStatus,'authorized');
 }
});
