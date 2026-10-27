// Draft UI intent only. Callers must supply authenticated source identities and
// re-probe the current canonical owner before applying a remembered value.
export function createCompoundChoiceMemory() {
 const memory=new WeakMap();
 const valid=s=>s&&s.source&&typeof s.source==='object';
 return Object.freeze({
  record(scope,coordinate,value,offered=[]) {
   if(!valid(scope)||!value||!offered.includes(value))return false;
   let entry=memory.get(scope.source);
   if(!entry||entry.matrix!==scope.matrix||entry.route!==scope.route)entry={matrix:scope.matrix,route:scope.route,values:new Map()};
   entry.values.set(coordinate,value);memory.set(scope.source,entry);return true;
  },
  restore(scope,coordinate,offered=[],accept=()=>false) {
   if(!valid(scope))return '';
   const entry=memory.get(scope.source);
   if(!entry||entry.matrix!==scope.matrix||entry.route!==scope.route){memory.delete(scope.source);return '';}
   const value=entry.values.get(coordinate);
   return value&&offered.includes(value)&&accept(value)===true?value:'';
  },
 });
}
