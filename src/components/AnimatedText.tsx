import { motion, useTransform, type MotionValue } from 'motion/react';
import { curves, phase } from '../player/math';
function Letter({ char, index, word, time, start, duration, stagger, wordStagger, reduced, rise, fade, mask, compare }: { char: string; index: number; word: number; time: MotionValue<number>; start: number; duration: number; stagger: number; wordStagger: number; reduced: boolean; rise: number; fade: boolean; mask: boolean; compare: boolean }) {
 const delay = start + (compare ? 0 : index * stagger + word * wordStagger);
 const y = useTransform(time, t => reduced ? '0%' : (rise * (1 - curves.reveal(phase(t, delay, duration)))) + '%');
 const opacity = useTransform(time, t => fade && !reduced ? curves.expo(phase(t, delay, duration)) : 1);
 return <motion.span className="glyph" style={{ y, opacity }} data-masked={mask}>{char}</motion.span>;
}
export function AnimatedText({ text, time, reduced = false, start = 0, duration = 800, stagger = 25, wordStagger = 80, rise = 120, fade = false, mask = true, compare = false }: { text: string; time: MotionValue<number>; reduced?: boolean; start?: number; duration?: number; stagger?: number; wordStagger?: number; rise?: number; fade?: boolean; mask?: boolean; compare?: boolean }) {
 let offset = 0;
 return <span className="split-type" aria-label={text}><span aria-hidden="true">{text.split(' ').map((word, wordIndex) => { const from = offset; offset += Array.from(word).length; return <span key={wordIndex} className={'word ' + (mask ? 'masked' : '')}>{Array.from(word).map((char, i) => <Letter key={i} char={char} index={from + i} word={wordIndex} time={time} start={start} duration={duration} stagger={stagger} wordStagger={wordStagger} reduced={reduced} rise={rise} fade={fade} mask={mask} compare={compare} />)}<span className="word-space"> </span></span>; })}</span></span>;
}
