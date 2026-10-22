// This optional stylesheet never participates in application readiness.
export function activateDeferredFonts(doc) {
  const link=doc?.querySelector?.('link[data-classical-fonts]');
  if(!link)return false;
  const activate=()=>{link.media='all';};
  if(link.sheet)activate();
  else link.addEventListener('load',activate,{once:true});
  return true;
}
