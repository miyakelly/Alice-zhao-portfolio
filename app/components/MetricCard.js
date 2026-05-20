import s from "./MetricCard.module.css";

export default function MetricCard({ value, suffix, label }) {
  return (
    <div className={s.card}>
      <span className={s.value}>
        {value}
        {suffix && <span className={s.suffix}>{suffix}</span>}
      </span>
      <span className={s.label}>{label}</span>
    </div>
  );
}
