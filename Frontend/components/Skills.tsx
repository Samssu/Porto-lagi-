import type { Skill } from '@/types';

export default function Skills({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase">
          Skills
        </h2>

        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.id} className="card">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg uppercase">{skill.name}</span>
                <span className="font-mono text-sm font-bold text-white/60">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-white/20 border border-white">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, skill.level))}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
