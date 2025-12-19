import { useState } from "react";
import supabase from "../utils/supabaseClient";

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    age: "",
    gender: "Эрэгтэй",
    nickname: "",
  });

  const onChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password,
      });

      if (error) throw error;

      //   const user = data?.user;
      //   const profileData = {
      //     id: user?.id || null,
      //     email: user?.email || form.email.trim(),
      //     name: user?.user_metadata?.name || "",
      //     company: user?.user_metadata?.company || "",
      //     age: user?.user_metadata?.age || "",
      //     gender: user?.user_metadata?.gender || "",
      //     nickname: user?.user_metadata?.nickname || "",
      //   };

      //   onAuthSuccess(profileData);
      // }
      onAuthSuccess?.(data);
    } catch (err) {
      setError(err?.message || "Нэвтрэх үед алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (form.password.length < 6) {
      setError("Нууц үг дор хаяж 6 тэмдэгт байх ёстой.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Нууц үг давтах талбар таарахгүй байна.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            name: form.name.trim(),
            company: form.company.trim(),
            age: form.age,
            gender: form.gender,
            nickname: form.nickname.trim(),
          },
        },
      });

      if (error) throw error;

      if (!data?.session) {
        setInfo(
          "Бүртгэл үүслээ. Имэйл дээр ирсэн баталгаажуулах холбоосоо дарж идэвхжүүлнэ үү."
        );
        setMode("signin");
        return;
      }

      const user = data?.user;
      const profileData = {
        id: user?.id || null,
        email: user?.email || form.email.trim(),
        name: user?.user_metadata?.name || form.name.trim(),
        company: user?.user_metadata?.company || form.company.trim(),
        age: user?.user_metadata?.age || form.age,
        gender: user?.user_metadata?.gender || form.gender,
        nickname: user?.user_metadata?.nickname || form.nickname.trim(),
      };

      onAuthSuccess(profileData);
    } catch (err) {
      setError(err?.message || "Бүртгүүлэх үед алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "signin" ? "auth-tab active" : "auth-tab"}
            onClick={() => {
              setMode("signin");
              setError("");
              setInfo("");
            }}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === "signup" ? "auth-tab active" : "auth-tab"}
            onClick={() => {
              setMode("signup");
              setError("");
              setInfo("");
            }}
          >
            Sign up
          </button>
        </div>

        {mode === "signin" ? (
          <form className="auth-form" onSubmit={handleSignIn}>
            <h1 className="auth-title">Sign in</h1>
            <p className="auth-subtitle">
              Crowd MGL платформд нэвтэрч төслүүдээ удирдаарай.
            </p>

            {error ? <div className="auth-alert error">{error}</div> : null}
            {info ? <div className="auth-alert info">{info}</div> : null}

            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              value={form.email}
              onChange={onChange("email")}
            />

            <label className="auth-label">Нууц үг</label>
            <input
              className="auth-input"
              type="password"
              value={form.password}
              onChange={onChange("password")}
            />

            <button className="auth-submit" disabled={loading}>
              {loading ? "Түр хүлээнэ үү..." : "Sign in"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignUp}>
            <h1 className="auth-title">Sign up</h1>
            <p className="auth-subtitle">
              Шинэ акаунт үүсгээд Crowd MGL-д нэгдээрэй.
            </p>

            {error ? <div className="auth-alert error">{error}</div> : null}
            {info ? <div className="auth-alert info">{info}</div> : null}

            <label className="auth-label">Нэр</label>
            <input
              className="auth-input"
              value={form.name}
              onChange={onChange("name")}
            />

            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              value={form.email}
              onChange={onChange("email")}
            />

            <div className="auth-grid-2">
              <div>
                <label className="auth-label">Нууц үг</label>
                <input
                  className="auth-input"
                  type="password"
                  value={form.password}
                  onChange={onChange("password")}
                />
              </div>
              <div>
                <label className="auth-label">Нууц үг давтах</label>
                <input
                  className="auth-input"
                  type="password"
                  value={form.confirmPassword}
                  onChange={onChange("confirmPassword")}
                />
              </div>
            </div>

            <label className="auth-label">Company name (заавал биш)</label>
            <input
              className="auth-input"
              value={form.company}
              onChange={onChange("company")}
            />

            <div className="auth-grid-2">
              <div>
                <label className="auth-label">Age</label>
                <input
                  className="auth-input"
                  value={form.age}
                  onChange={onChange("age")}
                />
              </div>
              <div>
                <label className="auth-label">Gender</label>
                <select
                  className="auth-input"
                  value={form.gender}
                  onChange={onChange("gender")}
                >
                  <option value="Эрэгтэй">Эрэгтэй</option>
                  <option value="Эмэгтэй">Эмэгтэй</option>
                  <option value="Бусад">Бусад</option>
                </select>
              </div>
            </div>

            <label className="auth-label">Nickname</label>
            <input
              className="auth-input"
              value={form.nickname}
              onChange={onChange("nickname")}
            />

            <button className="auth-submit" disabled={loading}>
              {loading ? "Түр хүлээнэ үү..." : "Sign up"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
