import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Investor from "./pages/Investor";
import EventPage from "./pages/EventPage";
import Partnership from "./pages/Partnership";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

import  supabase from "./utils/supabaseClient";

function App() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const loadProfile = async (userId) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    setUserProfile(data || null);
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session || null);
      if (data.session?.user?.id) loadProfile(data.session.user.id);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession || null);
        if (newSession?.user?.id) loadProfile(newSession.user.id);
        else setUserProfile(null);
      }
    );

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!session?.user;

  const handleAuthSuccess = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session || null);
    if (data.session?.user?.id) await loadProfile(data.session.user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUserProfile(null);
  };

  if (loading) return null;

  return (
    <>
      {isAuthenticated && <Header showProfile={true} />}

      <main>
        <Routes>
          {!isAuthenticated && (
            <>
              <Route
                path="/auth"
                element={<Auth onAuthSuccess={handleAuthSuccess} />}
              />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          )}

          {isAuthenticated && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/investor" element={<Investor />} />
              <Route path="/event" element={<EventPage />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route
                path="/profile"
                element={<Profile user={session?.user} onLogout={handleLogout} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
