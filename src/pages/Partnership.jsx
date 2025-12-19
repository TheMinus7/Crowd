import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import PartnershipRequestForm from "../components/PartnershipRequestForm";

export default function Partnership() {
  const [open, setOpen] = useState(false);
  const [typeLabel, setTypeLabel] = useState("");
  const [sent, setSent] = useState(false);

  const openForm = (label) => {
    setTypeLabel(label);
    setOpen(true);
  };

  const saveRequest = (payload) => {
    const key = "crowdmgl_partner_requests";
    const prev = localStorage.getItem(key);
    const list = prev ? JSON.parse(prev) : [];
    list.unshift({
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      ...payload,
    });
    localStorage.setItem(key, JSON.stringify(list));
  };

  const handleSubmit = (formData) => {
    saveRequest(formData);
    setOpen(false);
    setSent(true);
    setTimeout(() => setSent(false), 2200);
  };

  return (
    <main className="page">
      <section className="section">
        <h1 className="section-title">Хамтын ажиллагаа</h1>
        <p className="section-intro">
          Crowd MGL нь санхүүжилт босгохоос гадна стратегийн түншлэл,
          нийлүүлэлт, контентын хамтын ажиллагааг дэмжинэ.
        </p>

        {sent ? (
          <div className="toast-success">Хүсэлт амжилттай илгээгдлээ.</div>
        ) : null}

        <div className="partner-grid">
          <div className="partner-card">
            <h2 className="partner-title">Стратегийн түнш</h2>
            <p className="partner-text">
              Урт хугацааны хамтын ажиллагаагаар тодорхой салбарыг хамтдаа
              хөгжүүлэх байгууллагууд.
            </p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => openForm("Стратегийн түнш")}
            >
              Стратегийн түншээр холбогдох
            </button>
          </div>

          <div className="partner-card">
            <h2 className="partner-title">Нийлүүлэгч, үйлчилгээ үзүүлэгч</h2>
            <p className="partner-text">
              Логистик, барилга, IT, хууль, marketing гэх мэт business-үүд.
            </p>
            <button
              type="button"
              className="outline-btn"
              onClick={() => openForm("Нийлүүлэгч / Үйлчилгээ үзүүлэгч")}
            >
              Нийлүүлэгчээр бүртгүүлэх
            </button>
          </div>

          <div className="partner-card">
            <h2 className="partner-title">Институцийн хөрөнгө оруулагч</h2>
            <p className="partner-text">
              Банк, сан, корпораци, asset management байгууллагууд.
            </p>
            <button
              type="button"
              className="outline-btn"
              onClick={() => openForm("Институцийн хөрөнгө оруулагч")}
            >
              Хөрөнгө оруулалтын санал тавих
            </button>
          </div>

          <div className="partner-card">
            <h2 className="partner-title">Контент ба медиа түнш</h2>
            <p className="partner-text">
              Төслүүдийн түүхийг олон нийтэд хүргэх контент, медиа хамтын
              ажиллагаа.
            </p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => openForm("Контент / Медиа түнш")}
            >
              Контент хамтын ажиллагаа санал болгох
            </button>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Link to="/event" className="outline-btn">
            Эвентүүдийг үзэх
          </Link>
        </div>
      </section>

      <Modal
        open={open}
        title="Хамтын ажиллагааны хүсэлт"
        subtitle="Доорх мэдээллийг бөглөөд илгээнэ үү."
        onClose={() => setOpen(false)}
      >
        <PartnershipRequestForm
          typeLabel={typeLabel}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </main>
  );
}
