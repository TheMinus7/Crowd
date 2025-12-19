import { useEffect, useMemo, useState } from "react";

export default function Investor() {
  const investors = useMemo(
    () => [
      {
        id: 1,
        name: "А. Мөнхжаргал",
        role: "Тэнгэр Жаргалант Ложистик ХХК-ийн Гүйцэтгэх захирал",
        img: "/img/in1.JPG",
        about:
          "Улс орны эдийн засаг, нийгмийн хөгжилд бодит хувь нэмэр оруулах, дотоодын үйлдвэрлэл, логистикийг дэмжих томоохон төслүүдэд хөрөнгө оруулалт хийхэд анхаардаг.",
        bullets: [
          "Аялал жуулчлалыг дэмжиж эдийн засгийн эргэлтийг сайжруулах",
          "Хөрөнгө оруулагчдад эрсдэл–өгөөжийн тэнцвэртэй шийдэл санал болгох",
          "Улс орны эдийн засаг, нийгмийн хөгжилд бодит хувь нэмэр оруулах",
          "Импортын хамаарлыг бууруулах, дотоод үйлдвэрлэлийг дэмжих",
          "Хойч үеийнхэнд суурь сайтай ирээдүйг үлдээх",
        ],
        contact: {
          phone: "+976 85335577",
          email: "munkhjargal.must@gmail.com",
          instagram: "the_minus_7",
        },
      },
      {
        id: 2,
        name: "Jeff Bezos",
        role: "Amazon.com Inc. CEO",
        img: "/img/jeff.jpeg",
        about:
          "Төслүүдийн санхүүгийн загвар, эрсдэлийн үнэлгээг сайжруулж, хөрөнгө оруулагчдад шийдвэр гаргалтад туслах мэдээлэл бэлтгэнэ.",
        bullets: [
          "Санхүүгийн тооцоо, загварчлал",
          "Эрсдэлийн матриц, тайлангийн бүтэц",
          "Хөрөнгө оруулагчийн шаардлагын нийцэл",
        ],
      },
      {
        id: 3,
        name: "Доржрагчаа",
        role: "Developer",
        img: "/img/doja.png",
        about:
          "Стратегийн түншлэл, байгууллагын хамтын ажиллагааг зохион байгуулж төслүүдийг бодит өсөлтөд хүргэх суурийг тавина.",
        bullets: [
          "Түншлэл, хамтын ажиллагаа",
          "Бизнес хөгжүүлэлт",
          "Байгууллагын гэрээ хэлцэл",
        ],
      },
      {
        id: 4,
        name: "Дуламсүрэн",
        role: "Developer",
        img: "/img/duya.png",
        about:
          "Төсөл бүрийн үнэ цэнэ, нөлөөллийг олон нийтэд ойлгомжтой байдлаар хүргэж, итгэлцэл бий болгох контент хөгжүүлнэ.",
        bullets: [
          "Контент стратеги",
          "Төслийн түүх, танилцуулга",
          "Сошиал, медиа хамтын ажиллагаа",
        ],
      },
    ],
    []
  );

  const [openId, setOpenId] = useState(null);
  const active = investors.find((x) => x.id === openId) || null;

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenId(null);
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  const hasContact =
    !!active?.contact?.email ||
    !!active?.contact?.phone ||
    !!active?.contact?.instagram;

  return (
    <main className="investor-page">
      <section className="investor-wrap">
        <header className="investor-head">
          <h1 className="investor-title">Investor</h1>
          <p className="investor-subtitle">
            Crowd MGL нь төслүүдийг хөрөнгө оруулагчидтай ил тод, датад
            суурилсан стандартаар холбох зорилготой.
          </p>
        </header>

        <div className="investor-list">
          {investors.map((p) => (
            <article key={p.id} className="investor-card">
              <div className="investor-photo">
                <img src={p.img} alt={p.name} />
              </div>

              <div className="investor-content">
                <div className="investor-meta">
                  <div className="investor-name">{p.name}</div>
                  <div className="investor-role">{p.role}</div>
                </div>

                <p className="investor-about">{p.about}</p>

                <div className="investor-focus">
                  <div className="investor-focus-title">Фокус, зорилго:</div>
                  <ul className="investor-bullets">
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="investor-actions">
                  <button
                    type="button"
                    className="investor-btn investor-btn-primary"
                    onClick={() => setOpenId(p.id)}
                  >
                    Холбогдох
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {active && (
          <div
            className="investor-modal-overlay"
            role="presentation"
            onClick={() => setOpenId(null)}
          >
            <div
              className="investor-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Холбоо барих мэдээлэл"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="investor-modal-head">
                <div className="investor-modal-title">Холбоо барих</div>
                <button
                  type="button"
                  className="investor-modal-close"
                  onClick={() => setOpenId(null)}
                  aria-label="Хаах"
                >
                  ✕
                </button>
              </div>

              <div className="investor-modal-body">
                <div className="investor-contact-row">
                  <span className="investor-contact-label">Нэр:</span>
                  <span className="investor-contact-value">{active.name}</span>
                </div>

                {!hasContact && (
                  <div className="investor-contact-empty">
                    Одоогоор холбоо барих мэдээлэл оруулаагүй байна.
                  </div>
                )}

                {active.contact?.email && (
                  <div className="investor-contact-row">
                    <span className="investor-contact-label">Email:</span>
                    <a
                      className="investor-contact-link"
                      href={`mailto:${active.contact.email}`}
                    >
                      {active.contact.email}
                    </a>
                  </div>
                )}

                {active.contact?.phone && (
                  <div className="investor-contact-row">
                    <span className="investor-contact-label">Утас:</span>
                    <a
                      className="investor-contact-link"
                      href={`tel:${active.contact.phone.replaceAll(" ", "")}`}
                    >
                      {active.contact.phone}
                    </a>
                  </div>
                )}

                {active.contact?.instagram && (
                  <div className="investor-contact-row">
                    <span className="investor-contact-label">Instagram:</span>
                    <a
                      className="investor-contact-link"
                      href={`https://instagram.com/${active.contact.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @{active.contact.instagram}
                    </a>
                  </div>
                )}
              </div>

              <div className="investor-modal-actions">
                <button
                  type="button"
                  className="investor-btn investor-btn-outline"
                  onClick={() => setOpenId(null)}
                >
                  Хаах
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
