import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
  const handleInterest = (project) => {
    const key = "crowdmgl_interests";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    const next = Array.from(new Set([...prev, project.id]));
    localStorage.setItem(key, JSON.stringify(next));
    alert(`Таны сонирхлыг бүртгэлээ: ${project.title}`);
  };

  return (
    <main className="page projects-page">
      <section className="section">
        <h1 className="section-title">Төслүүд</h1>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-media">
                <div
                  className="project-thumb"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="project-tag">{project.tag}</div>
              </div>

              <div className="project-body">
                <div className="project-status">{project.status}</div>
                <h2 className="project-title">{project.title}</h2>
                <p className="project-desc">{project.shortDesc}</p>

                <div className="project-meta">
                  <div>
                    <div className="project-meta-label">
                      Шаардлагатай санхүүжилт
                    </div>
                    <div className="project-meta-value">{project.target}</div>
                  </div>
                  <div>
                    <div className="project-meta-label">
                      Төсөл хэрэгжих хугацаа
                    </div>
                    <div className="project-meta-value">{project.duration}</div>
                  </div>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <div className="project-progress-row">
                  <span>Санхүүжилтийн явц: {project.progress}%</span>
                  <span>Татсан хөрөнгө: {project.collected}</span>
                </div>

                <div className="project-actions">
                  <Link to={`/projects/${project.id}`} className="primary-btn">
                    Дэлгэрэнгүй үзэх
                  </Link>
                  <button
                    type="button"
                    className="outline-btn"
                    onClick={() => handleInterest(project)}
                  >
                    Сонирхлоо илэрхийлэх
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
