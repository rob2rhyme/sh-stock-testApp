// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { authenticate } = useAuth();

  const handleLogin = async () => {
    try {
      const snap = await getDoc(doc(db, "pinAuth", "userPin"));
      const data = snap.data();
      if (!data || !data.isValid || data.pin !== pin) {
        setError("Invalid PIN");
        return;
      }

      if (confirm("Confirm sign in?")) {
        authenticate();
        const next = router.query.next || "/";
        router.push(next as string);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login error. Check console.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Enter 6-digit PIN</h2>
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        maxLength={6}
        placeholder="••••••"
        style={{ padding: "0.5rem", fontSize: "1.2rem" }}
      />
      <button onClick={handleLogin} style={{ marginLeft: "1rem" }}>Login</button>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
