import s from "./ProjectLogistics.module.css";

export default function ProjectLogistics({ role, timeline, team }) {
  return (
    <div className={s.sidebar}>
      {role && <span className={s.item}>{role}</span>}
      {timeline && <span className={s.item}>{timeline}</span>}
      {team && team.map((member, i) => (
        <span key={i} className={s.item}>{member}</span>
      ))}
    </div>
  );
}
