
import { Link } from "react-router-dom";
import { ArrowLeft, Truck } from "lucide-react";
import QuoteForm from "./QuoteForm";
import "./Cotacao.css";

export default function Cotacao() {
  return (
    <div className="cotacao-page">
      <header className="cotacao-header">
        <Link to="/" className="cotacao-back">
          <ArrowLeft size={18} />
          <span>Voltar à página inicial</span>
        </Link>

        <Link to="/" className="cotacao-brand">
          <span className="cotacao-brand-icon">
            <Truck size={23} />
          </span>

          <span className="cotacao-brand-text">
            MOHAMAD
            <small>TRANSPORTES</small>
          </span>
        </Link>
      </header>

      <main>
        <QuoteForm />
      </main>

      <footer className="cotacao-footer">
        <div className="cotacao-footer-brand">
          MOHAMAD <span>TRANSPORTES</span>
        </div>

        <p>
          © {new Date().getFullYear()} MOHAMAD Transportes.
          Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
