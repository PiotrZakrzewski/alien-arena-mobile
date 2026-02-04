import './StatValue.css';

export interface StatValueProps {
  value: number;
}

export function StatValue({ value }: StatValueProps) {
  return <span className="stat-value">{value}</span>;
}
