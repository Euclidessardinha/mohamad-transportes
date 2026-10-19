
import { useState } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import {
  ArrowRight,
  Menu,
  X,
  Truck,
  Package,
  Globe2,
  Fuel,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import "./App.css";
import Cotacao from "./Cotacao";

const services = [
  {
    icon: Package,
    title: "Mercadorias a granel",
    description:
      "Soluções de transporte para mercadorias a granel, adaptadas às necessidades de cada operação.",
  },
  {
    icon: Truck,
    title: "Transporte de contentores",
    description:
      "Transporte rodoviário de contentores, com pedidos de cotação adaptados a cada carga.",
  },
  {
    icon: Fuel,
    title: "Transporte de combustíveis",
    description:
      "Informação e pedidos de serviço sujeitos à confirmação das condições operacionais aplicáveis.",
  },
  {
    icon: Globe2,
    title: "Transporte transfronteiriço",
    description:
      "Contacte a nossa equipa para consultar possibilidades de transporte entre países.",
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <header className="header">
        <a className="brand" href="#inicio" onClick={closeMenu}>
          <span className="brand-icon">
            <Truck size={30} strokeWidth={2.3} />
          </span>
          <span className="brand-text">
            <strong>MOHAMAD</strong>
            <small>TRANSPORTE</small>
          </span>
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
          <a href="#inicio" onClick={closeMenu}>Início</a>
          <a href="#empresa" onClick={closeMenu}>A empresa</a>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#carreiras" onClick={closeMenu}>Carreiras</a>

          <Link className="nav-cta" to="/cotacao" onClick={closeMenu}>
            Pedir cotação <ArrowRight size={17} />
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="eyebrow">
              <span className="status-dot" />
              TRANSPORTE RODOVIÁRIO DE MERCADORIAS
            </span>

            <h1>
              O seu negócio
              <br />
              <span>não pode parar.</span>
            </h1>

            <p>
              Soluções de transporte de mercadorias para empresas
              e clientes que precisam de movimentar a sua carga.
            </p>

            <div className="hero-actions">
              <Link to="/cotacao" className="button button-primary">
                Solicitar cotação <ArrowRight size={19} />
              </Link>
              <a href="#servicos" className="button button-outline">
                Conhecer serviços
              </a>
            </div>

            <div className="hero-location">
              <MapPin size={17} />
              Beira, Sofala, Moçambique
            </div>
          </div>

          <div className="hero-caption">
            <span>MOHAMAD TRANSPORTE</span>
            <span>TRANSPORTE E LOGÍSTICA</span>
          </div>
        </section>

        <section className="trust-strip">
          <div>
            <ShieldCheck size={25} />
            <span>Contacto directo com a equipa</span>
          </div>
          <div>
            <Truck size={25} />
            <span>Soluções de transporte de carga</span>
          </div>
          <div>
            <MapPin size={25} />
            <span>Base na Beira, Sofala</span>
          </div>
        </section>

        <section className="section about-section" id="empresa">
          <div className="section-heading">
            <span className="section-label">QUEM SOMOS</span>
            <h2>
              Transporte pensado
              <br />
              para <span>o seu negócio.</span>
            </h2>
          </div>

          <div className="about-copy">
            <p>
              A Transportes Mohamad Jawhar é apresentada neste
              website como uma empresa de transporte rodoviário
              sediada na Beira, Moçambique.
            </p>
            <p>
              Contacte-nos para apresentar as necessidades da sua
              carga e solicitar informações sobre os serviços disponíveis.
            </p>
            <a href="#contactos" className="text-link">
              Fale com a nossa equipa <ChevronRight size={19} />
            </a>
          </div>
        </section>

        <section className="section services-section" id="servicos">
          <div className="section-topline">
            <div className="section-heading">
              <span className="section-label">O QUE FAZEMOS</span>
              <h2>Serviços de transporte</h2>
            </div>
            <p>
              Consulte as opções de serviço e entre em contacto
              para discutir as necessidades da sua operação.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article className="service-card" key={service.title}>
                  <span className="service-number">
                    0{index + 1}
                  </span>
                  <div className="service-icon">
                    <Icon size={29} strokeWidth={1.8} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/cotacao" className="service-link">
                    Consultar serviço <ArrowRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>

          <p className="disclaimer">
            A disponibilidade de cada serviço deve ser confirmada
            directamente com a empresa.
          </p>
        </section>

        <section className="cta-section" id="contactos">
          <div className="cta-content">
            <span className="section-label">VAMOS CONVERSAR</span>
            <h2>Precisa de transportar uma carga?</h2>
            <p>
              Apresente-nos a sua necessidade. A nossa equipa poderá
              analisar o pedido e entrar em contacto consigo.
            </p>
            <Link to="/cotacao" className="button button-primary">
              Pedir cotação <ArrowRight size={19} />
            </Link>
            <small>
              Preencha o formulário para apresentar o seu pedido de cotação.
            </small>
          </div>
          <div className="cta-decoration">
            <Truck size={190} strokeWidth={0.7} />
          </div>
        </section>

        <section className="careers-section section" id="carreiras">
          <div>
            <span className="section-label">OPORTUNIDADES</span>
            <h2>Quer fazer parte da equipa?</h2>
            <p>
              Estamos a preparar um espaço para futuras oportunidades
              profissionais e candidaturas.
            </p>
          </div>
          <a href="mailto:" className="button button-dark">
            Consultar oportunidades <ArrowRight size={18} />
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-icon">
            <Truck size={28} />
          </span>
          <span className="brand-text">
            <strong>MOHAMAD</strong>
            <small>TRANSPORTE</small>
          </span>
        </a>

        <p>
          Transporte rodoviário de mercadorias
          <br />
          Beira, Sofala, Moçambique
        </p>

        <div className="footer-contact">
          <span><Phone size={16} /> Telefone a confirmar</span>
          <span><Mail size={16} /> E-mail a confirmar</span>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MOHAMAD Transporte</span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotacao" element={<Cotacao />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}
