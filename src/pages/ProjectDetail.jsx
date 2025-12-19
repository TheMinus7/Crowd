import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "../components/Modal";
import InvestmentRequestForm from "../components/InvestmentRequestForm";
import { projects } from "../data/projects";
import  supabase  from "../utils/supabaseClient";

export default function ProjectDetail() {
  const { id } = useParams();

  const project = useMemo(() => {
    return projects.find((p) => String(p.id) === String(id));
  }, [id]);

  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const saveRequestLocal = (payload) => {
    const key = "crowdmgl_invest_requests";
    const prev = localStorage.getItem(key);
    const list = prev ? JSON.parse(prev) : [];
    list.unshift({
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      projectId: project?.id,
      projectTitle: project?.title,
      ...payload,
    });
    localStorage.setItem(key, JSON.stringify(list));
  };

  const saveRequestSupabase = async (payload) => {
    if (!supabase) return false;

    const { error } = await supabase.from("investment_requests").insert([
      {
        project_id: project?.id ?? null,
        project_title: project?.title ?? null,
        payload,
      },
    ]);

    return !error;
  };

  const handleSubmit = async (formData) => {
    const ok = await saveRequestSupabase(formData);
    if (!ok) saveRequestLocal(formData);

    setOpen(false);
    setSent(true);
    setTimeout(() => setSent(false), 2200);
  };

  if (!project) {
    return (
      <main className="page">
        <section className="section">
          <h1 className="section-title">Төсөл олдсонгүй</h1>
          <p>Ийм дугаартай төсөл байхгүй байна.</p>
          <Link to="/projects" className="primary-btn">
            Бүх төслийг харах
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="project-detail">
        <div className="project-detail-header">
          <span className="project-detail-tag">{project.tag}</span>
          <h1 className="section-title">{project.title}</h1>
          <span className="project-detail-status">{project.status}</span>
        </div>

        {sent ? (
          <div className="toast-success">Хүсэлт амжилттай илгээгдлээ.</div>
        ) : null}

        <div className="project-detail-layout">
          <div className="project-detail-hero">
            <img
              src={project.image}
              alt={project.title}
              className="project-detail-hero-img"
            />
            <div className="project-detail-hero-overlay" />
            <div className="project-detail-hero-content">
              <p>{project.shortDesc}</p>

              <div className="project-detail-stat-row">
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
                <div>
                  <div className="project-meta-label">Санхүүжилтийн явц</div>
                  <div className="project-meta-value">{project.progress}%</div>
                </div>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>

          <aside className="project-detail-side">
            <div className="project-detail-card">
              <div className="project-detail-card-title">
                Төслийн дэлгэрэнгүй тайлбар
              </div>
              <p className="project-desc">{project.longDesc}</p>
            </div>

            <div className="project-detail-card">
              <div className="project-detail-card-title">
                Хөрөнгө оруулагчийн жишиг нөхцөл
              </div>
              <ul className="project-detail-list">
                <li>Доод оруулалтын хэмжээ: 5,000,000 ₮</li>
                <li>Хүлээгдэж буй өгөөж: жилд 14–18%</li>
                <li>Эргэн төлөлтийн хугацаа: 3–5 жил</li>
              </ul>
            </div>

            <div className="project-detail-card project-detail-actions">
              <button className="primary-btn" onClick={() => setOpen(true)}>
                Хөрөнгө оруулах сонирхлоо илэрхийлэх
              </button>
              <Link to="/projects" className="outline-btn">
                Бусад төслүүд рүү буцах
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Modal
        open={open}
        title="Хөрөнгө оруулалтын хүсэлт"
        subtitle="Доорх мэдээллийг бөглөөд илгээнэ үү."
        onClose={() => setOpen(false)}
      >
        <InvestmentRequestForm
          project={project}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </main>
  );
}
