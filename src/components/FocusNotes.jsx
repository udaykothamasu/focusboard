import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Target,
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge: 'Focus Note 1 / 3 • Quick Session',
    title: "Today's Focus Session",
    description:
      'Pick your top High Priority task and start a 25-minute distraction-free sprint before checking unread updates.',
    highlightLabel: 'Session Target',
    highlightValue: '25:00',
    meta: 'High Priority • Stay in flow',
    tone: 'indigo',
    icon: Clock,
  },
  {
    id: 2,
    badge: 'Focus Note 2 / 3 • Deep Work',
    title: 'Design System & Sub-task Progress',
    description:
      'Break larger deliverables into small checkable sub-tasks so your completion rate moves forward steadily.',
    highlightLabel: 'Flow State',
    highlightValue: 'Phase 1 of 4',
    meta: 'Deep Work • Minimize context switching',
    tone: 'violet',
    icon: Target,
  },
  {
    id: 3,
    badge: 'Focus Note 3 / 3 • Daily Affirmation',
    title: 'Why stop when today might be the day you win?',
    description:
      'Review your upcoming reminders, keep your work-in-progress list lean, and close out at least one goal today.',
    highlightLabel: 'Daily Goal',
    highlightValue: '3 Reminders',
    meta: 'Weekly Goals • Consistent momentum',
    tone: 'amber',
    icon: Sparkles,
  },
];

export default function FocusNotes() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const currentSlide = SLIDES[activeIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <section
      className={`focus-notes focus-notes--${currentSlide.tone}`}
      aria-roledescription="carousel"
      aria-label="Focus Notes"
    >
      <div className="focus-notes__header">
        <div className="focus-notes__meta">
          <span className="focus-notes__icon" aria-hidden="true">
            <SlideIcon size={17} />
          </span>
          <span className="focus-notes__tag">{currentSlide.badge}</span>
        </div>

        <div className="focus-notes__controls">
          <button
            type="button"
            className="icon-btn focus-notes__arrow"
            onClick={handlePrev}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="icon-btn focus-notes__arrow"
            onClick={handleNext}
            aria-label="Next focus note"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="focus-notes__grid" aria-live="polite">
        <div>
          <h2 className="focus-notes__title">{currentSlide.title}</h2>
          <p className="focus-notes__body">{currentSlide.description}</p>
        </div>

        <div className="focus-notes__callout">
          <span className="focus-notes__callout-label">
            {currentSlide.highlightLabel}
          </span>
          <strong className="focus-notes__callout-value">
            {currentSlide.highlightValue}
          </strong>
          <span className="focus-notes__callout-meta">{currentSlide.meta}</span>
        </div>
      </div>

      <div className="focus-notes__dots" role="tablist" aria-label="Focus note slides">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={idx === activeIndex}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            className={`focus-notes__dot ${idx === activeIndex ? 'focus-notes__dot--active' : ''}`}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>
    </section>
  );
}