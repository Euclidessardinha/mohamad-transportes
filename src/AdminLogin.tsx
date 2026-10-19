
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ArrowLeft, LoaderCircle } from "lucide-react";
import { supabase } from "./lib/supabase";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        throw loginError;
      }

      const user = data.user;

      if (!user) {
        throw new Error("Não foi possível identificar o utilizador.");
      }

      // Verifica se a conta está autorizada como administradora.
      const { data: admin, error: adminError } = await supabase
        .from("admin_mohamad")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        throw new Error(
          "Não foi possível verificar as permissões. Tenta novamente."
        );
      }

      if (!admin) {
        await supabase.auth.signOut();
        throw new Error(
          "Esta conta não tem autorização para aceder ao painel."
        );
      }

      navigate("/admin");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao iniciar sessão."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link to="/" className="admin-login-back">
          <ArrowLeft size={18} />
          Voltar ao site
        </Link>

        <div className="admin-login-brand">
          <div className="admin-login-icon">
            <LockKeyhole size={28} />
          </div>

          <p className="admin-login-company">MOHAMAD TRANSPORTES</p>
          <h1>Painel administrativo</h1>
          <p className="admin-login-description">
            Inicia sessão para gerir os pedidos de cotação.
          </p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          <label htmlFor="admin-email">Email</label>

          <div className="admin-login-input">
            <Mail size={19} />
            <input
              id="admin-email"
              type="email"
              placeholder="O teu email de administrador"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <label htmlFor="admin-password">Palavra-passe</label>

          <div className="admin-login-input">
            <LockKeyhole size={19} />
            <input
              id="admin-password"
              type="password"
              placeholder="Introduz a palavra-passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="admin-login-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle size={19} className="admin-login-spinner" />
                A verificar...
              </>
            ) : (
              "Entrar no painel"
            )}
          </button>
        </form>

        <p className="admin-login-security">
          <LockKeyhole size={14} />
          Acesso exclusivo a administradores autorizados.
        </p>
      </section>
    </main>
  );
}
