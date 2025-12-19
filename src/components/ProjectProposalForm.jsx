import { useMemo, useState } from "react";

const GENDERS = [
  { value: "", label: "Сонгох" },
  { value: "male", label: "Эрэгтэй" },
  { value: "female", label: "Эмэгтэй" },
  { value: "other", label: "Бусад / хэлэхгүй" },
];

export default function ProjectProposalForm({ onCancel, onSubmit }) {
  const [data, setData] = useState({
    projectTitle: "",
    projectDescription: "",
    targetFunding: "",
    currentFunding: "",
    organizationName: "",
    contactName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    social: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
  const isValidPhone = (v) => String(v || "").trim().length >= 8;

  const validate = () => {
    const e = {};
    if (!data.projectTitle.trim()) e.projectTitle = "Төслийн нэр шаардлагатай.";
    if (data.projectDescription.trim().length < 40)
      e.projectDescription = "Тайлбар хамгийн багадаа 40 тэмдэгт байна.";
    if (!String(data.targetFunding).trim())
      e.targetFunding = "Хүсэж буй санхүүжилт шаардлагатай.";
    if (!data.contactName.trim())
      e.contactName = "Холбогдох хүний нэр шаардлагатай.";
    if (!data.phone.trim() || !isValidPhone(data.phone))
      e.phone = "Утасны дугаар зөв оруулна уу.";
    if (!data.email.trim() || !isValidEmail(data.email))
      e.email = "И-мэйл зөв оруулна уу.";
    if (!data.social.trim())
      e.social =
        "Instagram / Facebook холбоос эсвэл хэрэглэгчийн нэр шаардлагатай.";
    if (!data.agree) e.agree = "Илгээхийн тулд зөвшөөрөл шаардлагатай.";
    return e;
  };

  const onChange = (key) => (e) => {
    const value =
      e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setData((p) => ({ ...p, [key]: value }));
    setErrors((p) => {
      if (!p[key]) return p;
      const next = { ...p };
      delete next[key];
      return next;
    });
  };

  const normalized = useMemo(() => {
    const toNum = (v) => {
      const s = String(v ?? "")
        .replaceAll(",", "")
        .trim();
      if (!s) return 0;
      const n = Number(s);
      return Number.isFinite(n) ? n : 0;
    };

    return {
      projectTitle: data.projectTitle.trim(),
      projectDescription: data.projectDescription.trim(),
      targetFunding: toNum(data.targetFunding),
      currentFunding: toNum(data.currentFunding),
      organizationName: data.organizationName.trim(),
      contactName: data.contactName.trim(),
      age: data.age ? Number(data.age) : null,
      gender: data.gender || "",
      phone: data.phone.trim(),
      email: data.email.trim(),
      social: data.social.trim(),
    };
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;
    onSubmit(normalized);
  };

  return (
    <form className="proposal-form" onSubmit={handleSubmit}>
      <div className="proposal-grid">
        <div className="form-group">
          <label className="form-label">Төслийн нэр</label>
          <input
            className={
              "form-input" + (errors.projectTitle ? " input-error" : "")
            }
            value={data.projectTitle}
            onChange={onChange("projectTitle")}
            placeholder="Ж: Баруун бүсийн төмөр зам"
            required
          />
          {errors.projectTitle ? (
            <div className="form-error">{errors.projectTitle}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label className="form-label">Байгууллагын нэр (заавал биш)</label>
          <input
            className="form-input"
            value={data.organizationName}
            onChange={onChange("organizationName")}
            placeholder="..."
          />
        </div>

        <div className="form-group proposal-span-2">
          <label className="form-label">Төслийн тайлбар</label>
          <textarea
            className={
              "form-input proposal-textarea" +
              (errors.projectDescription ? " input-error" : "")
            }
            value={data.projectDescription}
            onChange={onChange("projectDescription")}
            placeholder="Төслийн зорилго, шийдэх асуудал, хэрэгжүүлэх хүрээ, үр нөлөө гэх мэт..."
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Хүсэж буй санхүүжилт (₮)</label>
          <input
            className={
              "form-input" + (errors.targetFunding ? " input-error" : "")
            }
            value={data.targetFunding}
            onChange={onChange("targetFunding")}
            inputMode="numeric"
            placeholder="Ж: 4000000000"
            required
          />
          {errors.targetFunding ? (
            <div className="form-error">{errors.targetFunding}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label className="form-label">Одоогийн санхүүжилт (₮)</label>
          <input
            className="form-input"
            value={data.currentFunding}
            onChange={onChange("currentFunding")}
            inputMode="numeric"
            placeholder="Ж: 800000000"
          />
          <div className="form-hint">Хоосон байж болно.</div>
        </div>

        <div className="form-group">
          <label className="form-label">Холбогдох хүний нэр</label>
          <input
            className={
              "form-input" + (errors.contactName ? " input-error" : "")
            }
            value={data.contactName}
            onChange={onChange("contactName")}
            placeholder="..."
            required
          />
          {errors.contactName ? (
            <div className="form-error">{errors.contactName}</div>
          ) : null}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Нас</label>
            <input
              className="form-input"
              value={data.age}
              onChange={onChange("age")}
              type="number"
              min="0"
              placeholder="Ж: 22"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Хүйс</label>
            <select
              className="form-input"
              value={data.gender}
              onChange={onChange("gender")}
            >
              {GENDERS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Утас</label>
          <input
            className={"form-input" + (errors.phone ? " input-error" : "")}
            value={data.phone}
            onChange={onChange("phone")}
            placeholder="Ж: +976 99xxxxxx"
            required
          />
          {errors.phone ? (
            <div className="form-error">{errors.phone}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label className="form-label">И-мэйл</label>
          <input
            className={"form-input" + (errors.email ? " input-error" : "")}
            value={data.email}
            onChange={onChange("email")}
            placeholder="you@example.com"
            type="email"
            required
          />
          {errors.email ? (
            <div className="form-error">{errors.email}</div>
          ) : null}
        </div>

        <div className="form-group proposal-span-2">
          <label className="form-label">Instagram / Facebook</label>
          <input
            className={"form-input" + (errors.social ? " input-error" : "")}
            value={data.social}
            onChange={onChange("social")}
            placeholder="instagram эсвэл facebook link"
            required
          />
          {errors.social ? (
            <div className="form-error">{errors.social}</div>
          ) : null}
        </div>

        <div className="form-group proposal-span-2">
          <label
            className={
              "checkbox-row proposal-check" +
              (errors.agree ? " checkbox-error" : "")
            }
          >
            <input
              type="checkbox"
              checked={data.agree}
              onChange={onChange("agree")}
            />
            <span>
              Оруулсан мэдээлэл зөв бөгөөд холбоо барихыг зөвшөөрч байна.
            </span>
          </label>
          {errors.agree ? (
            <div className="form-error">{errors.agree}</div>
          ) : null}
        </div>
      </div>

      <div className="proposal-actions">
        <button type="button" className="outline-btn" onClick={onCancel}>
          Болих
        </button>
        <button type="submit" className="primary-btn">
          Хүсэлт илгээх
        </button>
      </div>
    </form>
  );
}
