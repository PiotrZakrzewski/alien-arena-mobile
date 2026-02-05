import { SkillRow } from '../../molecules/SkillRow';
import { SKILL_DEFINITIONS } from '../../../data';
import './SkillsPanel.css';

export interface SkillsPanelProps {
  skills: Record<string, number>;
  onSkillChange: (skillKey: string, value: number) => void;
}

export function SkillsPanel({ skills, onSkillChange }: SkillsPanelProps) {
  return (
    <section className="skills-panel" aria-label="Skills">
      {SKILL_DEFINITIONS.map((skill) => (
        <SkillRow
          key={skill.key}
          label={skill.label}
          tooltip={skill.description}
          baseStat={skill.baseStat}
          value={skills[skill.key] ?? 0}
          onChange={(value) => onSkillChange(skill.key, value)}
        />
      ))}
    </section>
  );
}
