import type { StudyProps } from '../catalog/types';
import { ShapeLoops } from '../patterns/Ambient';
import { StaggerSequence } from '../patterns/Introduce';
export function Closing(p: StudyProps) {
  return (
    <div className="closing-demo">
      <ShapeLoops {...p} />
      <div className="closing-foreground">
        <span className="demo-eyebrow">FIELDWORK / A SHARED FUTURE</span>
        <h2>
          Good things
          <br />
          take shape together.
        </h2>
        <StaggerSequence {...p} />
      </div>
    </div>
  );
}
