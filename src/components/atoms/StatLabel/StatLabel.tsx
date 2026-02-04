import './StatLabel.css';

export interface StatLabelProps {
  label: string;
}

export function StatLabel({ label }: StatLabelProps) {
  return <span className="stat-label">{label}</span>;
}
