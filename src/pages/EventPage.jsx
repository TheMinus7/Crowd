export default function EventPage() {
  const events = [
    {
      type: "PADA 1-3",
      title: "Төгсөлтийн үдэш",
      date: "2025.12.20",
      time: "11:00",
      location: "ITC Tower, 5 давхар",
      desc: "Эрксис академийн PADA 1-3 ангийн төгсөлтийн ёслолын арга хэмжээ.",
    },
    {
      type: "Webinar",
      title: "Crowd funding-ийн эрсдэл ба боломж",
      date: "2025.02.18",
      time: "20:00",
      location: "Online / Zoom",
      desc: "Хөрөнгө оруулалтын эрх зүй, татвар, эрсдэлийн удирдлагын талаар мэргэжлийн зөвлөлгөө.",
    },
    {
      type: "Networking",
      title: "Investor meetup",
      date: "2025.03.05",
      time: "18:30",
      location: "Sky Garden Lounge",
      desc: "Инвестор, төсөл санаачлагчид биечлэн уулзаж танилцах, хамтын ажиллагааны боломжоо хэлэлцэх уулзалт.",
    },
  ];

  const joinEvent = (e) => {
    alert(`Оролцох хүсэлт илгээлээ: ${e.title}`);
  };

  const addToCalendar = (e) => {
    alert(`Календар нэмэх (prototype): ${e.title}`);
  };

  return (
    <main className="page">
      <section className="section">
        <h1 className="section-title">Event & уулзалтууд</h1>
        <p className="section-description">
          Crowd MGL нь зөвхөн онлайн платформ биш. Бид хөрөнгө оруулагчид,
          төслийн багууд, зөвлөхүүдийг холбосон эвентүүдийг тогтмол зохион
          байгуулна.
        </p>

        <div className="event-list">
          {events.map((e) => (
            <article className="event-card" key={e.title}>
              <div className="event-card-header">
                <span className="event-type">{e.type}</span>
                <span className="event-date">
                  {e.date} • {e.time}
                </span>
              </div>
              <h2 className="event-title">{e.title}</h2>
              <div className="event-location">{e.location}</div>
              <p className="event-desc">{e.desc}</p>
              <div className="event-actions">
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => joinEvent(e)}
                >
                  Оролцох хүсэлт илгээх
                </button>
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() => addToCalendar(e)}
                >
                  Календар руу нэмэх
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
