import { motion, useTransform } from 'motion/react';
import type { StudyProps } from '../catalog/types';
import { Artwork } from '../components/Artwork';
import { AnimatedText } from '../components/AnimatedText';
import { curves, phase } from '../player/math';
import { useTrack, enabled } from '../player/useTrack';
export function FadeRise(p: StudyProps) {
 const start = p.profile === 'source' ? 300 : 80, duration = p.profile === 'source' ? 1000 : 650;
 const opacity = useTrack(p, 'fade', start, duration, 0, 1, curves.css);
 const y = useTrack(p, 'rise', start, duration, p.profile === 'source' ? 50 : 18, 0, curves.expo);
 const inner = useTrack(p, 'nested', p.compare ? 0 : start, p.compare ? 0 : duration, 0, 1, curves.css);
 return <div className="pattern-stage warm"><motion.div className="specimen-copy" style={{ y, opacity }}><span className="demo-eyebrow">EXPERIENCE / 01</span><motion.h2 style={{ opacity: inner }}>A little space<br />to slow down.</motion.h2><p>Outer and inner fades multiply. Isolate the layers to see why the text resolves later.</p></motion.div></div>;
}
export function MaskedText(p: StudyProps) {
 const instrument = p.variant === 'instrument', duration = instrument ? 1000 : 800;
 return <div className="pattern-stage"><div className="specimen-copy"><span className="demo-eyebrow">{instrument ? 'VISIBLE FADE + 20PX RISE' : 'CLIPPED PER-WORD GLYPHS'}</span><h2><AnimatedText text="Ideas need room." time={p.time} reduced={!enabled(p,'text')} duration={p.profile === 'source' ? duration : 650} stagger={p.profile === 'source' ? instrument ? 50 : 25 : 18} wordStagger={instrument ? 0 : p.profile === 'source' ? 80 : 40} rise={instrument ? 20 : 120} unit={instrument ? 'px' : '%'} ease={instrument ? 'expo' : 'reveal'} mask={!instrument} fade={instrument} compare={p.compare} /></h2><p>A reading rhythm, measured in characters and words.</p></div></div>;
}
export function BlurReveal(p: StudyProps) {
 const opacity = useTrack(p, 'text', 400, 1000, 0, 1, curves.css), y = useTrack(p, 'text', 400, 1000, 20, 0, curves.css);
 const filter = useTransform(p.time, t => 'blur(' + (!enabled(p,'blur') ? 0 : (p.profile === 'source' ? 10 : 3) * (1 - curves.css(phase(t, 400, 1000)))) + 'px)');
 return <div className="pattern-stage dark"><motion.div className="specimen-copy" style={{ opacity, y: useTransform(y, v => v + '%'), filter }}><span className="demo-eyebrow">RESOLVE THE SIGNAL</span><h2>Clarity,<br />in motion.</h2><p>Keep blur brief, limited to a small text region.</p></motion.div></div>;
}
export function Divider(p: StudyProps) {
 const ornament = p.variant === 'diamond', rotate = useTrack(p, 'shape', 500, 1200, 0, 225, curves.cubic), scale = useTrack(p, 'shape', 500, 1000, 0, 1, curves.css);
 const width = useTrack(p, 'lines', ornament ? 1500 : 400, 1000, 0, p.profile === 'source' ? ornament ? 150 : 50 : ornament ? 95 : 64, ornament ? curves.cubic : curves.inOutQuad);
 return <div className="pattern-stage warm divider-study"><span className="demo-eyebrow">{ornament ? 'LOCATIONS / BARBER & CO' : 'A STRUCTURAL ACCENT'}</span><h2>{ornament ? 'Meet us here.' : 'A considered detail.'}</h2>{ornament && <motion.div className="diamond" style={{ rotate, scale }} />}<div className={ornament ? 'paired-lines' : 'single-line'}><motion.i style={{ width }} />{ornament && <motion.i style={{ width }} />}</div><p>{ornament ? 'Square → diamond → two expanding bars.' : 'The divider enters after the message starts.'}</p></div>;
}
export function MediaSettle(p: StudyProps) {
 const scale = useTrack(p, 'media', 0, 2400, p.profile === 'source' ? 1.12 : 1.06, 1, curves.settle), opacity = useTrack(p, 'media', 0, 2400, .6, 1, curves.settle);
 const filter = useTransform(p.time, t => `blur(${p.reduced || p.profile === 'adapted' ? 0 : 2 * (1 - curves.settle(phase(t, 0, 2400)))}px)`);
 return <div className="media-study"><motion.div style={{ scale, opacity, filter }}><Artwork /></motion.div><span className="image-label">A slow settle, inside a fixed frame.</span></div>;
}
export function ImageWipe(p: StudyProps) {
 const x = useTrack(p, 'cover', 0, p.profile === 'source' ? 1200 : 850, 0, 100, curves.inOutExpo);
 return <div className="media-study"><Artwork tone="clay" /><motion.div className="image-cover" style={{ x: useTransform(x, v => v + '%') }} /><span className="image-label">Move the cover. Keep the image still.</span></div>;
}
const footerLabels = ['FIELDWORK', 'Work', 'Studio', 'Independent design practice', 'Careers', 'Services', 'Colophon', 'Principles', 'Journal', 'Instagram', 'Read.CV', 'Spotify', 'Twitter', 'Vienna · local time', 'Start a conversation', '© Fieldwork · Legal'];
const footerDelays = [0,100,200,300,400,500,600,700,800,900,1000,1100,1100,1300,1400,1500];
function FooterItem({ p, index, label }: { p: StudyProps; index: number; label: string }) {
 const start = p.compare ? 0 : footerDelays[index] * (p.profile === 'adapted' ? .6 : 1), duration = p.profile === 'source' ? 500 : 450;
 const opacity = useTrack(p, 'items', start, duration, 0, 1, index === 15 ? curves.inOutQuint : curves.quint), x = useTrack(p, 'items', start, duration, p.profile === 'source' ? -32 : -18, 0, curves.quint);
 return <motion.div className={'footer-item item-' + index} style={{ opacity, x }}>{label}</motion.div>;
}
export function StaggerSequence(p: StudyProps) {
 return <div className="stagger-study"><span className="demo-eyebrow">EDITORIAL SEQUENCE / 16 ENTRIES</span><div className="footer-links">{footerLabels.map((label, index) => <FooterItem key={label} p={p} index={index} label={label} />)}</div></div>;
}
function LogoPath({ p, index }: { p: StudyProps; index: number }) {
 const opacity = useTrack(p, 'logo', 500 + (p.compare ? 0 : index * 40), 800, 0, 1, curves.quad);
 return <motion.rect x={index * 26} y={index % 2 ? 15 : 0} width="16" height={index % 3 ? 86 : 60} rx="1" style={{ opacity }} />;
}
export function LogoEntrance(p: StudyProps) {
 const opacity = useTrack(p, 'nav', 800, 400, 0, 1, curves.quad);
 return <div className="pattern-stage logo-study"><svg viewBox="0 0 250 104" role="img" aria-label="Abstract ten-part logo reconstruction">{Array.from({length:10},(_,i)=><LogoPath key={i} p={p} index={i}/>)}</svg><motion.p style={{opacity}}>Work · Approach · Contact</motion.p><small>Ten-path sequencing · substitute logo geometry</small></div>;
}
