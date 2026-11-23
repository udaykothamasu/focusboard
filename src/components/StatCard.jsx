import { MoreVertical } from 'lucide-react';

export default function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = 'lavender',
}) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <div className="stat-card__title-wrap">
          {Icon && (
            <span className="stat-card__icon" aria-hidden="true">
              <Icon size={16} />
            </span>
          )}
          <span className="stat-card__label">{label}</span>
        </div>
        <MoreVertical size={16} className="stat-card__more" aria-hidden="true" />
      </div>
      <div className="stat-card__bottom">
        <span className="stat-card__value">{value}</span>
        {helper && <span className="stat-card__helper">{helper}</span>}
      </div>
    </article>
  );
}