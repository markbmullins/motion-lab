import { useState } from 'react';
import type { AxeResults } from 'axe-core';
export default function AccessibilityProbe() {
 const [result,setResult]=useState<AxeResults|null>(null),[running,setRunning]=useState(false);
 async function scan(){setRunning(true);try{const {default:axe}=await import('axe-core');setResult(await axe.run(document.getElementById('root')!,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));}finally{setRunning(false);}}
 return <aside className="qa-probe" aria-label="Development accessibility check"><button disabled={running} onClick={scan}>{running?'Scanning…':'Run accessibility scan'}</button><output data-qa-report>{result?JSON.stringify({violations:result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),passes:result.passes.length}):'Not yet scanned'}</output></aside>;
}
