import type { Project } from '@/types';

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl">
        <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase">
          Projects
        </h2>

        <div className="grid-cols-3">
          {projects.map((project, idx) => (
            <div key={project.id} className={`card ${idx % 2 === 0 ? 'accent' : ''}`}>
              <h3 className="text-2xl font-black uppercase mb-4">
                {project.title}
              </h3>
              <p className="text-white/80 font-mono text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              {project.tech && project.tech.length > 0 && (
                <div className="border-t-2 border-white pt-4">
                  <p className="text-xs uppercase font-bold text-white/60 mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 border border-white text-xs font-mono font-bold bg-transparent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
