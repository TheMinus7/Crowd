import { NavLink } from "react-router-dom";

export default function Header({ showProfile }) {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/investor", label: "Investor" },
    { to: "/event", label: "Event" },
    { to: "/partnership", label: "Partnership" },
  ];

  if (showProfile) {
    navItems.push({ to: "/profile", label: "Profile" });
  }

  return (
    <header className="top-bar">
      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
            end={item.to === "/"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
