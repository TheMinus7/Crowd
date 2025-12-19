import { useMemo, useState } from "react";

export default function PartnershipRequestForm({
  typeLabel,
  onCancel,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    direction: "",
    terms: "",
    message: "",
  });

  const canSubmit = useMemo(() => {
    return form.name.trim() && form.phone.trim() && form.email.trim();
  }, [form]);

  const update = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ ...form, type: typeLabel });
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Нэр</label>
          <input
            className="form-input"
            value={form.name}
            onChange={update("name")}
            placeholder="Бүтэн нэр"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Утас</label>
          <input
            className="form-input"
            value={form.phone}
            onChange={update("phone")}
            placeholder="99112233"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Имэйл</label>
          <input
            className="form-input"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Компанийн нэр</label>
          <input
            className="form-input"
            value={form.company}
            onChange={update("company")}
            placeholder="Байгууллага (заавал биш)"
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">Ямар чиглэлээр хамтрах вэ?</label>
          <input
            className="form-input"
            value={form.direction}
            onChange={update("direction")}
            placeholder="Жишээ: Нийлүүлэлт, хөрөнгө оруулалт, медиа, стратеги..."
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">
            Ямар нөхцөл / болзол санал болгож байна?
          </label>
          <textarea
            className="form-input form-textarea"
            value={form.terms}
            onChange={update("terms")}
            placeholder="Жишээ: Хугацаа, хувь, үйлчилгээний нөхцөл, санал..."
            rows={4}
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">Нэмэлт тайлбар</label>
          <textarea
            className="form-input form-textarea"
            value={form.message}
            onChange={update("message")}
            placeholder="Дэлгэрэнгүй мэдээлэл"
            rows={4}
          />
          <div className="form-hint">
            Сонгосон төрөл: <b>{typeLabel}</b>
          </div>
        </div>
      </div>

      <div className="modal-actions">
        <button type="button" className="outline-btn" onClick={onCancel}>
          Болих
        </button>
        <button type="submit" className="primary-btn" disabled={!canSubmit}>
          Хүсэлт илгээх
        </button>
      </div>
    </form>
  );
}
