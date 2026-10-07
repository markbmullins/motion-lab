import { useId } from 'react';
export function Artwork({ tone = 'sage', className = '' }: { tone?: 'sage' | 'clay' | 'blue'; className?: string }) {
 const id = useId().replace(/:/g, '');
 const palette = { sage: ['#ccd0ba', '#899673', '#334b3c'], clay: ['#d4b7a1', '#b17b5f', '#534e3d'], blue: ['#bccbd0', '#779498', '#35524d'] }[tone];
 return <svg className={'artwork ' + className} viewBox="0 0 900 600" role="img" aria-label="Original illustration of a public garden with a sculptural pavilion and bench" preserveAspectRatio="xMidYMid slice">
  <defs><pattern id={id + '-slats'} width="22" height="22" patternUnits="userSpaceOnUse"><rect width="9" height="22" fill={palette[2]} /></pattern></defs>
  <rect width="900" height="600" fill={palette[0]} /><circle cx="720" cy="142" r="68" fill="#eee6cb" />
  <path d="M0 360L900 280V600H0Z" fill={palette[1]} /><path d="M170 600L483 322H628L522 600Z" fill="#e8dfc6" />
  <path d="M55 455L309 252 359 275 117 477Z" fill="#536343" opacity=".17" />
  <path d="M130 95L486 26 657 219 352 300Z" fill={'url(#' + id + '-slats)'} /><path d="M130 95V352M352 300V518M657 219V438" stroke={palette[2]} strokeWidth="11" />
  <path d="M503 383L696 341 772 391 577 444Z" fill="#c1b580" /><path d="M577 444V512M752 396V466M521 392V463" stroke={palette[2]} strokeWidth="12" />
  {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={'M' + (523 + i * 22) + ' ' + (379 - i * 5) + 'l67 47'} stroke="#788164" strokeWidth="3" />)}
  <path d="M811 520V294M831 458L811 431M783 401L811 384" stroke={palette[2]} strokeWidth="5" /><ellipse cx="811" cy="288" rx="57" ry="87" fill={palette[2]} /><ellipse cx="843" cy="370" rx="42" ry="54" fill={palette[2]} /><ellipse cx="775" cy="339" rx="35" ry="57" fill={palette[2]} />
  <path d="M0 550L270 485M680 600L900 553" stroke="#435339" strokeWidth="1" opacity=".5" />
 </svg>;
}
export function Furniture({ lifestyle = false }: { lifestyle?: boolean }) {
 return <div className={'furniture-art ' + (lifestyle ? 'lifestyle' : 'studio')} aria-hidden="true"><svg viewBox="0 0 360 320"><path d="M66 96l185-28 57 103-188 39z" fill={lifestyle ? '#c8cf9b' : '#b6c187'} stroke="#48583f" strokeWidth="3" /><path d="M91 113l20 95m21-103 20 98m21-105 20 98m21-106 20 99m21-107 20 99" stroke="#75824e" strokeWidth="4" /><path d="M119 209v70m178-109v77M82 169v65" stroke="#48583f" strokeWidth="10" /><path d="M66 96v63l53 50m132-141 9 39" fill="none" stroke="#48583f" strokeWidth="8" /></svg></div>;
}
