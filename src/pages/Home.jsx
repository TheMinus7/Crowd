import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Modal";
import ProjectProposalForm from "../components/ProjectProposalForm";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const saveProposal = (payload) => {
    const key = "crowdmgl_project_proposals";
    const prev = localStorage.getItem(key);
    const list = prev ? JSON.parse(prev) : [];
    list.unshift({
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      status: "Шинэ хүсэлт",
      ...payload,
    });
    localStorage.setItem(key, JSON.stringify(list));
  };

  const handleSubmit = (payload) => {
    saveProposal(payload);
    setOpen(false);
    setSent(true);
    setTimeout(() => setSent(false), 2200);
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="home-kicker">Монголын төслийн экосистем</p>

        <h1 className="home-title">
          Монголын төсөл, санаачлагыг
          <span className="home-title-accent"> хамтдаа санхүүжье</span>
        </h1>

        <p className="home-lead">
          Crowd MGL нь Монголын хөрөнгө оруулалттай бодит төсөл, санаачлагатай
          холбосон, ил тод, датад суурилсан платформ юм. Та эндээс өөрийн төслөө
          танилцуулж, эсвэл бусдын төслийг дэмжих боломжтой.
        </p>

        <div className="home-actions">
          <Link
            to="/partnership"
            className="primary-btn"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            Төсөл санал болгох
          </Link>
          <Link to="/projects" className="outline-btn">
            Төслүүдийг үзэх
          </Link>
        </div>

        {sent ? (
          <div className="toast-success">Төсөл санал амжилттай илгээгдлээ.</div>
        ) : null}

        <div className="home-stats">
          <div className="home-stat">
            <div className="home-stat-value">3</div>
            <div className="home-stat-label">Идэвхтэй төсөл</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-value">28+</div>
            <div className="home-stat-label">Хөрөнгө оруулагч</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-value">11.22₮В</div>
            <div className="home-stat-label">Нийт босгосон хөрөнгө</div>
          </div>
        </div>
      </section>

      <section className="home-how">
        <h2 className="section-title">Яагаад нэгдэх вэ?</h2>

        <div className="home-how-grid">
          <div className="home-how-card">
            <h3>Ил тод байдал</h3>
            <p>
              Төсөл бүр дээр санхүүжилтийн зорилго, ашиглалт, хуваарилалтын
              эрсдэл, өгөөжийн мэдээллийг нэг дороос харна.
            </p>
          </div>
          <div className="home-how-card">
            <h3>Нийгмийн бодит нөлөө</h3>
            <p>
              Зөвхөн ашиг бус, нийгмийн зэрэг өөрчлөлт авчрах төслүүдийг онцолж
              харуулна.
            </p>
          </div>
          <div className="home-how-card">
            <h3>Нэг цонхны платформ</h3>
            <p>
              Хөрөнгө оруулалт, хамтын ажиллагаа, event, networking бүгд нэг
              платформ дээр төвлөрнө.
            </p>
          </div>
        </div>
      </section>

      <section className="home-team">
        <h2 className="section-title">Үүсгэн байгуулагчид</h2>
        <p className="home-team-lead">
          Crowd MGL платформыг Тэнгэр Жаргалант Ложистик ХХК-ийн баг санаачлан
          хөгжүүлж байна. Програм хөгжүүлэлт, дизайн, стратегийн түвшний
          удирдлагыг хослуулсан үндсэн багийн гишүүд доор байна.
        </p>

        <div className="team-grid">
          <article className="person-card">
            <div className="person-avatar">
              <img src="img/in1.png" alt="A. Munkhjargal" />
            </div>
            <div className="person-info">
              <div className="person-role">
                Programmer · Designer · Business development
              </div>
              <div className="person-name">Minus</div>
            </div>
          </article>

          <article className="person-card">
            <div className="person-avatar">
              <img src="img/doja.png" alt="Dorjragchaa" />
            </div>
            <div className="person-info">
              <div className="person-role">Programmer · Designer</div>
              <div className="person-name">Доржрагчаа</div>
            </div>
          </article>

          <article className="person-card">
            <div className="person-avatar">
              <img src="img/duya.png" alt="Dulamsuren" />
            </div>
            <div className="person-info">
              <div className="person-role">Programmer · Designer</div>
              <div className="person-name">Дуламсүрэн</div>
            </div>
          </article>
        </div>
      </section>

      <Modal
        open={open}
        title="Төсөл санал болгох хүсэлт"
        subtitle="Доорх мэдээллийг бөглөөд илгээнэ үү."
        onClose={() => setOpen(false)}
      >
        <ProjectProposalForm
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </main>
  );
}
