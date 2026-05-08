import ExternalLink from "./ExternalLink";
import s from "./HeroText.module.css";

export default function HeroText({ problem, solution, keynote }) {
  if (!problem && !solution) return null;

  function renderSolution() {
    if (!solution) return null;
    if (!keynote) return solution;

    const marker = "{keynote}";
    const idx = solution.indexOf(marker);
    if (idx === -1) return solution;

    const before = solution.slice(0, idx);
    const after = solution.slice(idx + marker.length);

    return (
      <>
        {before}
        <ExternalLink href={keynote.url}>{keynote.label}</ExternalLink>
        {after}
      </>
    );
  }

  return (
    <div className={s.heroText}>
      {problem && <p className={s.problem}>{problem}</p>}
      {solution && <p className={s.solution}>{renderSolution()}</p>}
    </div>
  );
}
