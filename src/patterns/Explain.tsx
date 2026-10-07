import { motion, useTransform } from 'motion/react';
import type { StudyProps } from '../catalog/types';
import { curves, clamp, phase, mix, cubicBezier } from '../player/math';
import { useTrack, enabled } from '../player/useTrack';
import data from '../catalog/linear-motion.json';
export function ChartReveal(p:StudyProps) {
 return <div className="chart-study"><span className="demo-eyebrow">PATTERNS, NOT PARTICLES</span><h2>A clearer picture.</h2><svg viewBox="0 0 600 250" role="img" aria-label="Illustrative scatter plot with overlapping cluster reveals"><path d="M40 40V220H570M40 170H570M40 120H570M40 70H570" className="chart-grid"/><path d="M45 184C190 175 250 110 560 48M45 208C220 190 350 135 560 103" className="chart-curve"/>{Array.from({length:4},(_,cluster)=>Array.from({length:28},(_,point)=><ChartDot key={cluster+'-'+point} cluster={cluster} point={point} p={p}/>))}</svg><p>2ms × (20 × cluster + point). Clusters overlap; the guide paths stay still.</p></div>;
}
function ChartDot({p,cluster,point}:{p:StudyProps;cluster:number;point:number}) {
 const delay=p.compare?2*(cluster*28+point):2*(20*cluster+point),opacity=useTrack(p,'dots',delay,420,0,1,v=>v),scale=useTrack(p,'dots',delay,420,.4,1,cubicBezier(.25,.46,.45,.94));
 const x=55+((point*47+cluster*53)%500), y=200-x*.22+Math.sin(point*3.7+cluster)*34+cluster*4;
 return <motion.circle cx={x} cy={y} r="3" fill={cluster%2?'#637857':'#b33d23'} style={{opacity,scale,transformOrigin:`${x}px ${y}px`}}/>;
}
function sampledDot(frames:number[][],progress:number) {
 const p=clamp(progress);let i=0;while(i<frames.length-2&&frames[i+1][0]<p)i++;const a=frames[i],b=frames[Math.min(i+1,frames.length-1)];return mix(a[1],b[1],phase(p,a[0],b[0]-a[0]));
}
function GridDot({p,index,kind}:{p:StudyProps;index:number;kind:keyof typeof data.grids}) {
 const record=data.grids[kind],opacity=useTransform(p.time,t=>!enabled(p,'dots')?.3:sampledDot(record.dots[index],(t%record.duration)/record.duration));
 return <motion.i style={{opacity}}/>;
}
export function DotMatrix(p:StudyProps) {
 const kind=(p.variant==='pong'||p.variant==='agent'?p.variant:'upDown') as keyof typeof data.grids,count=data.grids[kind].dots.length;
 return <div className="pattern-stage dark"><span className="demo-eyebrow">PRESERVED PER-DOT KEYFRAMES</span><div className="dot-matrix" style={{gridTemplateColumns:`repeat(${5}, 7px)`}}>{Array.from({length:count},(_,i)=><GridDot key={kind+i} p={p} index={i} kind={kind}/>)}</div><p>Finite recorded frames carry a recognizable behavior.<br/>Every dot's source opacity sequence is preserved.</p></div>;
}
const slideTitles=['A shared place','Room to meet','A quieter city'];
function Slide({p,index}:{p:StudyProps;index:number}) {
 const opacity=useTransform(p.time,t=>{if(!enabled(p,'slides'))return index===0?1:0;const cycle=Math.min(2,Math.floor(t/3000)), within=t-cycle*3000;if(index===cycle)return curves.css(phase(within,0,index===0?0:300));if(index===cycle-1)return 1-curves.css(phase(within,0,300));return 0;});
 return <motion.div className={'slideshow-slide slide-'+index} style={{opacity}}><span>0{index+1}</span><h2>{slideTitles[index]}</h2></motion.div>;
}
export function SlideshowProgress(p:StudyProps) {
 const width=useTransform(p.time,t=>`${enabled(p,'progress')?(t>=9000?100:(t%3000)/30):100}%`);
 return <div className="slideshow-study"><div className="slideshow-stage">{slideTitles.map((_,i)=><Slide key={i} index={i} p={p}/>)}</div><div className="slide-progress"><motion.i style={{width}}/></div><p>300ms crossfade inside a 3000ms linear countdown.<br/>Three illustrative slides; the source has six and no loop.</p></div>;
}
export function ThinkingSequence(p:StudyProps) {
 const prompt=useTrack(p,'prompt',0,300,0,1,curves.settle),thinking=useTransform(p.time,t=>!enabled(p,'thinking')?0:t>=400&&t<2400?1:0),response=useTrack(p,'response',2400,300,0,1,curves.settle);
 const a=useTrack(p,'response',2400,300,8,0,curves.settle),b=useTrack(p,'response',2700,300,8,0,curves.settle),c=useTrack(p,'response',3000,300,8,0,curves.settle);
 return <div className="thinking-study"><div className="assistant-top"><b>Relay assistant</b><span>LOCAL SCENARIO</span></div><motion.div className="chat-prompt" style={{opacity:prompt}}>What should we focus on this week?</motion.div><motion.p className="thinking-label" style={{opacity:thinking}}>Considering the project context <span>···</span></motion.p><motion.div className="assistant-response" style={{opacity:response}}><h3>Three priorities emerged.</h3>{['Finish the navigation','Resolve keyboard focus','Review the launch plan'].map((item,i)=><ResponseRow key={item} p={p} item={item} index={i} y={[a,b,c][i]}/>)}</motion.div><p className="local-note">This is an authored scenario, with no request to an AI service.</p></div>;
}

function ResponseRow({p,item,index,y}:{p:StudyProps;item:string;index:number;y:import('motion/react').MotionValue<number>}) {const opacity=useTransform(p.time,t=>!enabled(p,'response')?1:phase(t,2400+index*300,300));return <motion.p style={{y,opacity}}><span>0{index+1}</span>{item}</motion.p>;}
