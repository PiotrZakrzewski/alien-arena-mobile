import './NameDisplay.css';

export interface NameDisplayProps {
  name: string;
}

export function NameDisplay({ name }: NameDisplayProps) {
  return (
    <div className="name-display">
      <span className="name-display__text">{name}</span>
    </div>
  );
}
