
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
  CheckCircle2,
  Building2,
} from "lucide-react";
import "./App.css";
import Cotacao from "./Cotacao";

const services = [
  {
    icon: Package,
    number: "01",
    title: "Mercadorias a granel",
    description:
      "Soluções de transporte para mercadorias a granel, adaptadas às necessidades de cada operação.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85",
  },
  
{
  icon: Truck,
  number: "02",
  title: "Transporte de contentores",
  description:
    "Transporte rodoviário de contentores, com pedidos de cotação adaptados a cada carga.",
  image:
    "https://images.unsplash.com/photo-1700716465891-9e5e9f501d7d?auto=format&fit=crop&w=1000&q=85",
},

  {
    icon: Fuel,
    number: "03",
    title: "Transporte de combustíveis",
    description:
      "Informação e pedidos de serviço sujeitos à confirmação das condições operacionais aplicáveis.",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    icon: Globe2,
    number: "04",
    title: "Transporte transfronteiriço",
    description:
      "Contacte a nossa equipa para consultar possibilidades de transporte entre países.",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1000&q=85",
  },
];

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="MOHAMAD Transporte - início">
      <span className="brand-icon">
        <Truck size={29} strokeWidth={2.2} />
      </span>
      <span className="brand-text">
        <strong>MOHAMAD</strong>
        <small>TRANSPORTE</small>
      </span>
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <div className="topbar">
        <div className="topbar-inner">
          <span>
            <MapPin size={14} />
            Beira, Sofala, Moçambique
          </span>
          <span>TRANSPORTE RODOVIÁRIO DE MERCADORIAS</span>
        </div>
      </div>

      <header className="header">
        <div className="header-inner">
          <Brand />

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            type="button"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

          <nav
            className={`navigation ${menuOpen ? "navigation-open" : ""}`}
            aria-label="Navegação principal"
          >
            <a href="#inicio" onClick={closeMenu}>Início</a>
            <a href="#empresa" onClick={closeMenu}>A empresa</a>
            <a href="#servicos" onClick={closeMenu}>Serviços</a>
            <a href="#carreiras" onClick={closeMenu}>Carreiras</a>

            <Link className="nav-cta" to="/cotacao" onClick={closeMenu}>
              Pedir cotação <ArrowRight size={17} />
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-overlay" />

          <div className="hero-inner">
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
                  Conhecer serviços <ChevronRight size={18} />
                </a>
              </div>

              <div className="hero-location">
                <MapPin size={17} />
                Beira, Sofala, Moçambique
              </div>
            </div>

            <div className="hero-side-note">
              <span />
              <p>
                Movemos cargas.
                <br />
                Aproximamos negócios.
              </p>
            </div>
          </div>

          <div className="hero-caption">
            <div>
              <span>01</span>
              <span className="caption-line" />
              <span>04</span>
            </div>
            <span>FOTOGRAFIA ILUSTRATIVA</span>
          </div>
        </section>

        <section className="trust-strip">
          <div className="trust-inner">
            <div className="trust-item">
              <span className="trust-icon">
                <ShieldCheck size={23} />
              </span>
              <div>
                <strong>Contacto directo</strong>
                <small>Fale com a nossa equipa</small>
              </div>
            </div>

            <div className="trust-item">
              <span className="trust-icon">
                <Truck size={23} />
              </span>
              <div>
                <strong>Transporte de carga</strong>
                <small>Soluções para diferentes necessidades</small>
              </div>
            </div>

            <div className="trust-item">
              <span className="trust-icon">
                <MapPin size={23} />
              </span>
              <div>
                <strong>Base na Beira</strong>
                <small>Sofala, Moçambique</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="empresa">
          <div className="about-inner">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1586191582151-f73872dfd183?auto=format&fit=crop&w=1200&q=85"
                alt="Camião de transporte rodoviário - fotografia ilustrativa"
                loading="lazy"
              />

              <div className="about-image-card">
                <span>
                  <Building2 size={23} />
                </span>
                <div>
                  <strong>MOHAMAD TRANSPORTE</strong>
                  <small>Beira, Moçambique</small>
                </div>
              </div>
            </div>

            <div className="about-copy">
              <span className="section-label">QUEM SOMOS</span>

              <h2>
                Transporte pensado
                <br />
                para <span>o seu negócio.</span>
              </h2>

              <p>
                A Transportes Mohamad Jawhar é apresentada neste
                website como uma empresa de transporte rodoviário
                sediada na Beira, Moçambique.
              </p>

              <p>
                Contacte-nos para apresentar as necessidades da sua
                carga e solicitar informações sobre os serviços disponíveis.
              </p>

              <div className="about-points">
                <div>
                  <CheckCircle2 size={19} />
                  <span>Atendimento a partir da Beira</span>
                </div>
                <div>
                  <CheckCircle2 size={19} />
                  <span>Pedidos de cotação personalizados</span>
                </div>
                <div>
                  <CheckCircle2 size={19} />
                  <span>Serviços sujeitos a confirmação</span>
                </div>
              </div>

              <a href="#contactos" className="text-link">
                Fale com a nossa equipa <ChevronRight size={19} />
              </a>
            </div>
          </div>
        </section>

        <section className="section services-section" id="servicos">
          <div className="services-inner">
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
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article className="service-card" key={service.title}>
                    <div className="service-image">
                      <img
                        src={service.image}
                        alt={`${service.title} - fotografia ilustrativa`}
                        loading="lazy"
                      />
                      <span className="service-number">
                        {service.number}
                      </span>
                    </div>

                    <div className="service-card-content">
                      <div className="service-icon">
                        <Icon size={25} strokeWidth={1.8} />
                      </div>

                      <h3>{service.title}</h3>

                      <p>{service.description}</p>

                      <Link to="/cotacao" className="service-link">
                        Consultar serviço <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="disclaimer">
              As fotografias são ilustrativas. A disponibilidade de cada
              serviço deve ser confirmada directamente com a empresa.
            </p>
          </div>
        </section>

        <section className="process-section section">
          <div className="process-inner">
            <div className="process-intro">
              <span className="section-label">COMO FUNCIONA</span>
              <h2>
                Peça a sua cotação
                <br />
                em poucos passos.
              </h2>

              <p>
                Apresente os detalhes da sua carga através do formulário.
                A equipa poderá analisar o pedido e entrar em contacto
                para esclarecer as informações.
              </p>

              <Link to="/cotacao" className="button button-primary">
                Pedir cotação <ArrowRight size={18} />
              </Link>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <span>01</span>
                <div>
                  <h3>Partilhe o seu pedido</h3>
                  <p>
                    Indique o tipo de carga, a origem, o destino
                    e a data pretendida.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <span>02</span>
                <div>
                  <h3>Análise da necessidade</h3>
                  <p>
                    Os detalhes enviados ajudam a compreender
                    a operação solicitada.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <span>03</span>
                <div>
                  <h3>Contacto da equipa</h3>
                  <p>
                    Serão confirmadas as informações e a
                    disponibilidade do serviço.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section" id="contactos">
          <div className="cta-decoration">
            <Truck size={190} strokeWidth={0.7} />
          </div>

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
        </section>

        <section className="careers-section section" id="carreiras">
          <div className="careers-content">
            <span className="section-label">OPORTUNIDADES</span>
            <h2>Quer fazer parte da equipa?</h2>

            <p>
              Estamos a preparar um espaço para futuras oportunidades
              profissionais e candidaturas.
            </p>
          </div>

          <span className="careers-status">
            Oportunidades a anunciar
          </span>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand-column">
            <Brand />
            <p>
              Transporte rodoviário de mercadorias
              <br />
              Beira, Sofala, Moçambique
            </p>
          </div>

          <div className="footer-links">
            <strong>Explorar</strong>
            <a href="#empresa">A empresa</a>
            <a href="#servicos">Serviços</a>
            <a href="#carreiras">Carreiras</a>
          </div>

          <div className="footer-links">
            <strong>Contactos</strong>
            <span><MapPin size={16} /> Beira, Sofala, Moçambique</span>
            <span><Phone size={16} /> Telefone a confirmar</span>
            <span><Mail size={16} /> E-mail a confirmar</span>
          </div>

          <div className="footer-quote">
            <strong>Precisa de transportar?</strong>
            <p>Envie os detalhes do seu pedido.</p>
            <Link to="/cotacao">
              Pedir cotação <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} MOHAMAD Transporte.
            Todos os direitos reservados.
          </span>
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
