import { useMemo, useState } from "react";

const TABS = [
  { key: "about", label: "Тухай" },
  { key: "photos", label: "Зураг" },
  { key: "interests", label: "Сонирхол" },
  { key: "basics", label: "Ерөнхий" },
];

export default function Profile({ user, onLogout }) {
  const [tab, setTab] = useState("about");

  const profile = useMemo(() => {
    const name = user?.nickname || user?.name || "Хөрөнгө оруулагч";
    const email = user?.email || "munkhjargal.must@gmail.com";
    const age = user?.age ? String(user.age) : "";
    const location = user?.location || "Ulaanbaatar, Mongolia";
    const role = user?.role || "Investor";
    const headline =
      user?.headline ||
      "Төсөл бүрийн үнэ цэнийг бодит өгөгдөл, ил тод тайлан дээр тулгуурлан үнэлнэ.";
    const bio =
      user?.bio ||
      "Crowd MGL дээр бодит төслүүдийг дэмжиж, урт хугацааны хамтын ажиллагааг бий болгох зорилготой.";

    const about = {
      favorite:
        user?.about?.favorite ||
        "Шинэ санаа, бодит нөлөө үзүүлэх төслүүдийн өсөлтийг харах хамгийн сонирхолтой.",
      challenge:
        user?.about?.challenge ||
        "Төслийн танилцуулгаа 3 минутанд багтааж ойлгомжтой тайлбарлаад үзээрэй.",
      friends:
        user?.about?.friends ||
        "Урт хугацааны хамтын ажиллагаа, улсын хөгжилд багахан ч гэсэн хувь нэмэр оруулах мөн тууштай зорилготой бол бид найзууд .",
    };

    const interests =
      user?.interests?.length > 0
        ? user.interests
        : [
            "Стартап",
            "Логистик",
            "Инфра бүтэц",
            "Финтек",
            "Сэргээгдэх эрчим хүч",
            "Үйлдвэрлэл",
            "Нийгмийн төсөл",
          ];

    const basics = {
      company: user?.company || "Тэнгэр Жаргалант Ложистик ХХК",
      position: user?.position || "Гүйцэтгэх захирал",
      experience: user?.experience || "7 жил",
      investmentRange: user?.investmentRange || "5,000,000₮ – 100,000,000₮",
      focus: user?.focus || "Зуучлал, ложистик, импорт-экспорт",
      contact: email,
    };

    const photo = user?.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuR6lY1HPFS4Q_R2A5r70ECdchXmR_n1b8g&s";

    return {
      name,
      email,
      age,
      location,
      role,
      headline,
      bio,
      about,
      interests,
      basics,
      photo,
    };
  }, [user]);

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <div className="profile-top">
          <div>
            <h1 className="profile-title">Профайл</h1>
            <p className="profile-subtitle">
              Өөрийн мэдээллээ нэг дороос харах, шинэчлэх боломж.
            </p>
          </div>

          <div className="profile-top-actions">
            <button className="profile-edit-btn" type="button">
              Засах
            </button>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-left">
            <div className="profile-avatar-wrap">
              <img
                className="profile-avatar-img"
                src={profile.photo}
                alt={profile.name}
              />
            </div>
          </div>

          <div className="profile-card-right">
            <div className="profile-name-row">
              <div className="profile-name">
                {profile.name}
                {profile.age ? (
                  <span className="profile-age">, {profile.age}</span>
                ) : null}
              </div>
              <div className="profile-badge">{profile.role}</div>
            </div>

            <div className="profile-location">{profile.location}</div>

            <div className="profile-pill-row">
              <span className="profile-pill">Монгол</span>
              <span className="profile-pill">Verified</span>
              <span className="profile-pill">Active</span>
            </div>

            <div className="profile-headline">{profile.headline}</div>
            <div className="profile-bio">{profile.bio}</div>

            <div className="profile-quick-actions">
              <button
                className="secondary-btn"
                onClick={onLogout}
                type="button"
              >
                Log out
              </button>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={
                "profile-tab" + (tab === t.key ? " profile-tab-active" : "")
              }
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="profile-content">
          {tab === "about" && (
            <div className="profile-about">
              <div className="profile-qcard">
                <div className="profile-qtitle">Миний дуртай зүйл</div>
                <div className="profile-qtext">{profile.about.favorite}</div>
              </div>
              <div className="profile-qcard">
                <div className="profile-qtitle">Сорилт</div>
                <div className="profile-qtext">{profile.about.challenge}</div>
              </div>
              <div className="profile-qcard">
                <div className="profile-qtitle">Найз болох бол</div>
                <div className="profile-qtext">{profile.about.friends}</div>
              </div>
            </div>
          )}

          {tab === "photos" && (
            <div className="profile-photos">
              <div className="profile-photo-grid">
                <div className="profile-photo-box" />
                <div className="profile-photo-box" />
                <div className="profile-photo-box" />
                <div className="profile-photo-box" />
                <div className="profile-photo-box" />
                <div className="profile-photo-box" />
              </div>
              <div className="profile-hint">
                {/* Одоогоор UI prototype тул зураг нэмэх үйлдэл дараагийн шатанд
                холбоно. */}
              </div>
            </div>
          )}

          {tab === "interests" && (
            <div className="profile-interests">
              <div className="profile-chip-wrap">
                {profile.interests.map((x) => (
                  <span className="profile-chip" key={x}>
                    {x}
                  </span>
                ))}
              </div>
              <div className="profile-hint">
                {/* Сонирхлоо тохируулбал танд илүү тохирох төслүүдийг санал
                болгоно. */}
              </div>
            </div>
          )}

          {tab === "basics" && (
            <div className="profile-basics">
              <div className="profile-basic-grid">
                <div className="profile-basic-row">
                  <div className="profile-basic-k">Company</div>
                  <div className="profile-basic-v">
                    {profile.basics.company}
                  </div>
                </div>
                <div className="profile-basic-row">
                  <div className="profile-basic-k">Position</div>
                  <div className="profile-basic-v">
                    {profile.basics.position}
                  </div>
                </div>
                <div className="profile-basic-row">
                  <div className="profile-basic-k">Experience</div>
                  <div className="profile-basic-v">
                    {profile.basics.experience}
                  </div>
                </div>
                <div className="profile-basic-row">
                  <div className="profile-basic-k">Investment range</div>
                  <div className="profile-basic-v">
                    {profile.basics.investmentRange}
                  </div>
                </div>
                <div className="profile-basic-row">
                  <div className="profile-basic-k">Focus</div>
                  <div className="profile-basic-v">{profile.basics.focus}</div>
                </div>
                <div className="profile-basic-row">
                  <div className="profile-basic-k">Contact</div>
                  <div className="profile-basic-v">
                    {profile.basics.contact}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
