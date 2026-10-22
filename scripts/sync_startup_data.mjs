import{readFile,writeFile}from'node:fs/promises';import{pathToFileURL}from'node:url';
import{STARTUP_DATA_PATHS}from'../src/bootstrap/startup_data.mjs';
const root=new URL('../',import.meta.url);
export const serializeStartupData=files=>JSON.stringify({version:1,files}).replace(/</g,'\\u003c');
export async function checkStartupData({write=false}={}){
 const files=Object.fromEntries(await Promise.all(STARTUP_DATA_PATHS.map(async path=>[path,JSON.parse(await readFile(new URL(path,root),'utf8'))])));
 // Escape HTML delimiters even inside data strings: this script is inert JSON.
 const data=serializeStartupData(files);
 const block='<script id="classical-startup-data" type="application/json">'+data+'</script>';
 const file=new URL('index.html',root),source=await readFile(file,'utf8');
 const pattern=/<script id="classical-startup-data" type="application\/json">[\s\S]*?<\/script>/;
 if(!write){if(source.match(pattern)?.[0]!==block)throw Error('Embedded startup data differs from its JSON sources. Run node scripts/sync_startup_data.mjs.');return {passed:true,files:STARTUP_DATA_PATHS.length};}
 const next=pattern.test(source)?source.replace(pattern,()=>block):source.replace('    <script type="module" src="src/browser/main.mjs', '    '+block+'\n    <script type="module" src="src/browser/main.mjs');
 await writeFile(file,next);return {passed:true,files:STARTUP_DATA_PATHS.length};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)console.log(await checkStartupData({write:!process.argv.includes('--check')}));
