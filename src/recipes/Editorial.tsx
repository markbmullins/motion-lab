import { motion, useTransform } from 'motion/react';
import { layerEnabled, type StudyProps } from '../catalog/types';
import { AnimatedText } from '../components/AnimatedText';
import { Artwork } from '../components/Artwork';
import { curves, phase, letterDelays } from '../player/math';
export function Editorial({ time, reduced, profile, compare, layers }: StudyProps) {
 const adapted = profile === 'adapted';
 const mediaScale = useTransform(time, t => !layerEnabled(layers, 'media') || reduced ? 1 : 1 + (adapted ? .06 : .12) * (1 - curves.settle(phase(t, 0, 2400))));
 const mediaOpacity = useTransform(time, t => !layerEnabled(layers, 'media') || reduced ? 1 : .6 + .4 * curves.settle(phase(t, 0, 2400)));
 const blur = useTransform(time, t => !layerEnabled(layers, 'media') || reduced || adapted ? 'blur(0px)' : 'blur(' + 2 * (1 - curves.settle(phase(t, 0, 2400))) + 'px)');
 const lastStart = letterDelays('Made for public life.', adapted ? 20 : 25, adapted ? 60 : 80).at(-1)!.delayMs;
 const supportStart = compare ? lastStart + 800 : lastStart + 320;
 const eyebrow = useTransform(time, t => reduced ? 1 : curves.nativeOut(phase(t, supportStart, 600)));
 const description = useTransform(time, t => reduced ? 1 : curves.nativeOut(phase(t, supportStart + 100, 600)));
 const cta = useTransform(time, t => reduced ? 1 : curves.nativeOut(phase(t, supportStart + 200, 600)));
 const divider = useTransform(time, t => reduced ? 1 : curves.inOutQuad(phase(t, 400, 1000)));
 const shine = useTransform(time, t => reduced ? 0 : .35 * Math.sin(Math.PI * phase(t, 400, 1800)));
 return <div className="editorial-demo" data-compare={compare}>
  <div className="demo-mast"><span>COMMON GROUND</span><span>Objects · Places · Purpose</span></div>
  <div className="editorial-content">
   <div className="editorial-copy">
    <motion.p className="demo-eyebrow" style={{ opacity: layerEnabled(layers, 'support') ? eyebrow : 1 }}>A PLACE TO BELONG</motion.p>
    <h2>{layerEnabled(layers, 'headline') ? <AnimatedText text="Made for public life." time={time} reduced={reduced} duration={800} stagger={adapted ? 20 : 25} wordStagger={adapted ? 60 : 80} compare={compare} /> : 'Made for public life.'}</h2>
    <motion.div className="editorial-divider" style={{ scaleX: layerEnabled(layers, 'divider') ? divider : 1 }} />
    <motion.p className="editorial-description" style={{ opacity: layerEnabled(layers, 'support') ? description : 1 }}>Thoughtful objects.<br />Extraordinary everyday places.</motion.p>
    <motion.div style={{ opacity: layerEnabled(layers, 'support') ? cta : 1 }}><span className="demo-cta">Explore the collection <span>↗</span></span></motion.div>
   </div>
   <div className="editorial-picture"><motion.div className="editorial-media" style={{ scale: mediaScale, opacity: mediaOpacity, filter: blur }}><Artwork /></motion.div><motion.div className="editorial-light" style={{ opacity: layerEnabled(layers, 'light') ? shine : 0 }} /><span className="picture-caption">01 / PUBLIC LIFE, REIMAGINED</span></div>
  </div><div className="demo-footnote"><span>Designed to bring us together.</span><span>Scroll to discover ↓</span></div>
 </div>;
}
