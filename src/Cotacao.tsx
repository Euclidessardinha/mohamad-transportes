
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QuoteForm from "./QuoteForm";
import "./Cotacao.css";

export default function Cotacao() {
  return (
    <div className="cotacao-page">
      <header className="cotacao-header">
        <Link to="/" className="cotacao-back">
          <ArrowLeft size={18} />
          Voltar à página inicial
        </Link>

        <div className="cotacao-brand">
          MOHAMAD <span>TRANSPORTES</span>
        </div>
      </header>

      <section className="cotacao-intro">
        <span className="cotacao-label">PEDIDO DE COTAÇÃO</span>

        <h1>
          Vamos transportar
          <br />
          <span>a sua carga.</span>
        </h1>

        <p>
          Preencha os dados abaixo para apresentar o seu pedido
          de cotação à MOHAMAD Transportes.
        </p>
      </section>

      <QuoteForm />

      <footer className="cotacao-footer">
        © {new Date().getFullYear()} MOHAMAD Transportes.
        Todos os direitos reservados.
      </footer>
    </div>
  );
}
