// src/components/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">Crowd MGL</div>
          <div className="footer-meta">
            Монголын бодит төслүүдийг хөрөнгө оруулагчидтай холбох, ил тод
            санхүүжилтийн платформ.
          </div>
        </div>

        <div className="footer-founders">
          <div className="footer-founders-title">Үүсгэн байгуулагчид</div>
          <div className="footer-founders-names">
            The Minus
          </div>
        </div>

        <div className="footer-copy">
          © {year} Crowd MGL. Бүх эрх хуулиар хамгаалагдсан.
        </div>
      </div>
    </footer>
  );
}
