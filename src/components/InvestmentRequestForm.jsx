import { useMemo, useState } from "react";

export default function InvestmentRequestForm({ project, onCancel, onSubmit }) {
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    social: "",
    age: "",
    amountMNT: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.lastName.trim() &&
      form.firstName.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.amountMNT.trim()
    );
  }, [form]);

  const update = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(form);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Овог</label>
          <input
            className="form-input"
            value={form.lastName}
            onChange={update("lastName")}
            placeholder="Жишээ: Бат"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Нэр</label>
          <input
            className="form-input"
            value={form.firstName}
            onChange={update("firstName")}
            placeholder="Жишээ: Тэмүүлэн"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Утас</label>
          <input
            className="form-input"
            value={form.phone}
            onChange={update("phone")}
            placeholder="Жишээ: 99112233"
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
          <label className="form-label">Facebook / Instagram</label>
          <input
            className="form-input"
            value={form.social}
            onChange={update("social")}
            placeholder="Жишээ: facebook.com/..., @username"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Нас</label>
          <input
            className="form-input"
            type="number"
            value={form.age}
            onChange={update("age")}
            placeholder="Жишээ: 24"
            min="0"
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">
            Хэдэн төгрөгөөр хөрөнгө оруулах вэ?
          </label>
          <input
            className="form-input"
            value={form.amountMNT}
            onChange={update("amountMNT")}
            placeholder="Жишээ: 50000000"
            required
          />
          <div className="form-hint">
            Төсөл: <b>{project?.title}</b>
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
