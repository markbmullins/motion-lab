import { compactHeader } from './math';
// React clears event.currentTarget after the handler returns. Capture the value
// before creating an updater that React may evaluate later.
export function captureHeaderScroll(event: { currentTarget: { scrollTop: number } }) {
  const scrollTop = event.currentTarget.scrollTop;
  return (wasCompact: boolean) => compactHeader(wasCompact, scrollTop);
}
