
import { useState } from "react";
import {
  Link,
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";

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
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  Building2,
  ArrowLeft,
  FileText,
  ExternalLink,
  Navigation,
} from "lucide-react";

import "./App.css";
import "./ServicoDetalhe.css";
import Cotacao from "./Cotacao";

// ======================================================
// INFORMAÇÕES OFICIAIS DA EMPRESA
// ======================================================

const COMPANY = {
  name: "Transportes Mohamad Jawhar, Lda",
  phone: "+258 84 703 2222",
  phoneLink: "tel:+258847032222",
  email: "trans-mohamad@hotmail.com",
  emailLink: "mailto:trans-mohamad@hotmail.com",
  nuit: "400 958 017",
  address: "Manga-Mascarenha, Beira, Moçambique",
  mapQuery: "Manga-Mascarenha, Beira, Mozambique",
};

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COMPANY.mapQuery
)}`;

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  COMPANY.mapQuery
)}&output=embed`;

// ======================================================
// SERVIÇOS
// Mantidos conforme a versão enviada.
// ======================================================

const services = [
  {
    slug: "mercadorias-a-granel",
    quoteValue: "Granel",
    icon: Package,
    number: "01",
    title: "Mercadorias a granel",
    description:
      "Soluções de transporte para mercadorias a granel, adaptadas às necessidades de cada operação.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85",
    details:
      "O transporte de mercadorias a granel destina-se a cargas transportadas sem embalagem individual, de acordo com as características e necessidades de cada operação. Contacte a nossa equipa para apresentar os detalhes da sua carga e consultar as condições do serviço.",
    highlights: [
      "Análise do tipo de mercadoria e da quantidade",
      "Indicação dos locais de recolha e entrega",
      "Condições operacionais sujeitas a confirmação",
    ],
  },
  {
    slug: "transporte-de-contentores",
    quoteValue: "Contentores",
    icon: Truck,
    number: "02",
    title: "Transporte de contentores",
    description:
      "Transporte rodoviário de contentores, com pedidos de cotação adaptados a cada carga.",
    image:
      "https://images.unsplash.com/photo-1700716465891-9e5e9f501d7d?auto=format&fit=crop&w=1000&q=85",
    details:
      "Precisa de transportar um contentor? Apresente-nos os detalhes da operação, incluindo o local de recolha, destino, tipo de contentor e data pretendida. A nossa equipa poderá analisar o pedido e confirmar a disponibilidade do serviço.",
    highlights: [
      "Identificação do tipo e dimensão do contentor",
      "Indicação da origem e do destino",
      "Cotação ajustada aos detalhes da operação",
    ],
  },
  {
    slug: "transporte-de-combustiveis",
    quoteValue: "Combustíveis",
    icon: Fuel,
    number: "03",
    title: "Transporte de combustíveis",
    description:
      "Informação e pedidos de serviço sujeitos à confirmação das condições operacionais aplicáveis.",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=85",
    details:
      "Para pedidos relacionados com o transporte de combustíveis, entre em contacto com a nossa equipa e apresente as características da operação. A prestação deste serviço depende da confirmação das condições operacionais, técnicas e legais aplicáveis.",
    highlights: [
      "Descrição do produto e da quantidade",
      "Indicação dos locais de recolha e entrega",
      "Confirmação prévia das condições aplicáveis",
    ],
  },
  {
    slug: "transporte-transfronteirico",
    quoteValue: "Transfronteiriço",
    icon: Globe2,
    number: "04",
    title: "Transporte transfronteiriço",
    description:
      "Contacte a nossa equipa para consultar possibilidades de transporte entre países.",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1000&q=85",
    details:
      "O transporte transfronteiriço envolve operações entre diferentes países. Envie os dados da carga, os países e locais de origem e destino e a data pretendida. A nossa equipa poderá analisar o pedido e confirmar as possibilidades de realização do serviço.",
    highlights: [
      "Indicação dos países de origem e destino",
      "Descrição da carga e respetiva quantidade",
      "Análise das condições da operação",
    ],
  },
  {
    slug: "carga-avulsa-com-lona",
    quoteValue: "Carga avulsa com lona",
    icon: Truck,
    number: "06",
    title: "Transporte de carga avulsa com lona",
    description:
      "Transporte de cargas diversas protegidas com lona, em operações nacionais e internacionais.",
    image:
      "https://images.unsplash.com/photo-1716512060259-d114cfba13e8?auto=format&fit=crop&w=1000&q=85",
    details:
      "A empresa dispõe de camiões para o transporte de cargas diversas, incluindo carga avulsa com lona. Este serviço está disponível para viagens nacionais e internacionais, mediante confirmação dos detalhes da operação.",
    highlights: [
      "Transporte nacional e internacional",
      "Cargas diversas com utilização de lona",
      "Análise da origem, destino e características da carga",
    ],
  },
  {
    slug: "transporte-nacional-de-combustiveis",
    quoteValue: "Combustíveis",
    icon: Fuel,
    number: "07",
    title: "Transporte nacional de combustíveis",
    description:
      "Transporte de combustíveis através de camiões-tanque em viagens nacionais.",
    image:
      "https://images.unsplash.com/photo-1717615840969-c8a39ea032a4?auto=format&fit=crop&w=1000&q=85",
    details:
      "A Transportes Mohamad Jawhar, Lda possui camiões-tanque destinados ao transporte de combustíveis em território nacional. Importa salientar que os camiões-tanque não são utilizados em viagens internacionais.",
    highlights: [
      "Transporte exclusivamente nacional",
      "Utilização de camiões-tanque",
      "Confirmação prévia dos detalhes da operação",
    ],
  },
];

// ======================================================
// LOGÓTIPO
// ======================================================

function Brand() {
  return (
    <a
      href="/#inicio"
      className="brand"
      aria-label="Mohamad Transportes - Início"
    >
      <img
        src="/logo-mohamad-transportes.png"
        alt="MOHAMAD TRANSPORTES"
        className="brand-logo-image"
      />
    </a>
  );
}

// ======================================================
// RODAPÉ DAS PÁGINAS DE SERVIÇOS
// ======================================================

function DetailFooter() {
  return (
    <footer className="detail-footer">
      <p>
        © {new Date().getFullYear()} {COMPANY.name}.
        Todos os direitos reservados.
      </p>

      <p>
        <a href={COMPANY.phoneLink}>{COMPANY.phone}</a>
        {" | "}
        <a href={COMPANY.emailLink}>{COMPANY.email}</a>
      </p>
    </footer>
  );
}

// ======================================================
// PÁGINA INDIVIDUAL DE SERVIÇO
// ======================================================

function ServicoDetalhe() {
  const { slug } = useParams();

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const Icon = service.icon;

  return (
    <div className="service-detail-page">
      <header className="detail-header">
        <div className="detail-header-inner">
          <Brand />

          <Link to="/#servicos" className="detail-back-link">
            <ArrowLeft size={17} />
            Voltar aos serviços
          </Link>
        </div>
      </header>

      <main>
        <section className="detail-hero">
          <img
            src={service.image}
            alt={`${service.title} - fotografia ilustrativa`}
          />

          <div className="detail-hero-overlay" />

          <div className="detail-hero-content">
            <span className="detail-eyebrow">
              SERVIÇOS DE TRANSPORTE
            </span>

            <h1>{service.title}</h1>

            <p>{service.description}</p>

            <Link
              to={`/cotacao?servico=${encodeURIComponent(
                service.quoteValue
              )}`}
              className="button button-primary"
            >
              Solicitar cotação <ArrowRight size={19} />
            </Link>
          </div>
        </section>

        <section className="detail-content-section">
          <div className="detail-content">
            <div className="detail-main-copy">
              <span className="section-label">
                SOBRE O SERVIÇO
              </span>

              <h2>Conheça este serviço</h2>

              <p>{service.details}</p>

              <div className="detail-highlights">
                {service.highlights.map((highlight) => (
                  <div key={highlight}>
                    <CheckCircle2 size={19} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="detail-quote-card">
              <span className="detail-quote-icon">
                <Icon size={29} />
              </span>

              <span className="section-label">
                PEDIDO DE COTAÇÃO
              </span>

              <h3>Precisa deste serviço?</h3>

              <p>
                Envie os detalhes da sua operação. A nossa equipa
                poderá analisar o pedido e confirmar as condições
                do serviço.
              </p>

              <Link
                to={`/cotacao?servico=${encodeURIComponent(
                  service.quoteValue
                )}`}
                className="button button-primary"
              >
                Solicitar cotação <ArrowRight size={18} />
              </Link>
            </aside>
          </div>
        </section>

        <section className="detail-bottom-cta">
          <div>
            <span className="section-label">
              MOHAMAD TRANSPORTES
            </span>

            <h2>Vamos falar sobre a sua carga?</h2>

            <p>
              Preencha o formulário com os dados da sua operação.
            </p>
          </div>

          <Link
            to={`/cotacao?servico=${encodeURIComponent(
              service.quoteValue
            )}`}
            className="button button-primary"
          >
            Enviar pedido de cotação <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <DetailFooter />
    </div>
  );
}

// ======================================================
// PÁGINA PRINCIPAL
// ======================================================

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const ctaImages = [
  {
    src: "https://images.unsplash.com/photo-1700716465891-9e5e9f501d7d?w=900",
    alt: "Transporte rodoviário de contentores",
    label: "Transporte de contentores",
  },
  {
    src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900",
    alt: "Camião de transporte de combustíveis",
    label: "Transporte de combustíveis",
  },
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900",
    alt: "Transporte de mercadorias",
    label: "Transporte de mercadorias",
  },
  {
    src: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=900",
    alt: "Camião de transporte de carga",
    label: "Transporte de cargas",
  },
  {
    src: "https://images.unsplash.com/photo-1716512060259-d114cfba13e8?w=900",
    alt: "Camião com carga coberta por lona",
    label: "Carga avulsa com lona",
  },
  {
    src: "https://images.unsplash.com/photo-1717615840969-c8a39ea032a4?w=900",
    alt: "Transporte rodoviário de mercadorias",
    label: "Transporte nacional",
  },
];

  return (
    <div className="site">

      {/* BARRA SUPERIOR */}

      <div className="topbar">
        <div className="topbar-inner">

          <span>
            <MapPin size={14} />
            {COMPANY.address}
          </span>

          <a href={COMPANY.phoneLink}>
            <Phone size={14} />
            {COMPANY.phone}
          </a>

          <span>TRANSPORTE RODOVIÁRIO DE MERCADORIAS</span>

        </div>
      </div>

      {/* CABEÇALHO */}

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
            className={`navigation ${
              menuOpen ? "navigation-open" : ""
            }`}
            aria-label="Navegação principal"
          >
            <a href="#inicio" onClick={closeMenu}>Início</a>

            <a href="#empresa" onClick={closeMenu}>A empresa</a>

            <a href="#servicos" onClick={closeMenu}>Serviços</a>

            <a href="#operacoes" onClick={closeMenu}>Operações</a>

            <a href="#contactos" onClick={closeMenu}>Contactos</a>

            <a href="#carreiras" onClick={closeMenu}>Carreiras</a>

            <Link
              className="nav-cta"
              to="/cotacao"
              onClick={closeMenu}
            >
              Pedir cotação <ArrowRight size={17} />
            </Link>
          </nav>

        </div>
      </header>

      <main>

        {/* BANNER PRINCIPAL */}

        <section className="hero" id="inicio">
          <div className="hero-overlay" />

          <div className="hero-inner">

            <div className="hero-content">

              <span className="eyebrow">
                <span className="status-dot" />
                TRANSPORTES MOHAMAD JAW﻿HAR, LDA
              </span>

              <h1>
                Ligamos destinos.
                <br />
                <span>Movemos negócios.</span>
              </h1>

              <p>
                Soluções de transporte rodoviário de mercadorias,
                com operações nacionais e internacionais, a partir
                da nossa base na Beira, Sofala.
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
                {COMPANY.address}
              </div>

              <a
                href={COMPANY.phoneLink}
                className="hero-phone-link"
              >
                <Phone size={17} />
                Ligue-nos: {COMPANY.phone}
              </a>

            </div>

            <div className="hero-side-note">
              <span />
              <p>
                Transporte de mercadorias.
                <br />
                Soluções para diferentes operações.
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

        {/* DESTAQUES DA EMPRESA */}

        <section className="trust-strip">
          <div className="trust-inner">

            <div className="trust-item">
              <span className="trust-icon">
                <Building2 size={23} />
              </span>

              <div>
                <strong>Base na Beira</strong>
                <small>Manga-Mascarenha, Sofala</small>
              </div>
            </div>

            <div className="trust-item">
              <span className="trust-icon">
                <Truck size={23} />
              </span>

              <div>
                <strong>Transporte rodoviário</strong>
                <small>Movimentação de mercadorias</small>
              </div>
            </div>

            <div className="trust-item">
              <span className="trust-icon">
                <Globe2 size={23} />
              </span>

              <div>
                <strong>Operações nacionais e internacionais</strong>
                <small>Conforme o tipo de serviço</small>
              </div>
            </div>

          </div>
        </section>

        {/* APRESENTAÇÃO DA EMPRESA */}

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
                  <strong>TRANSPORTES MOHAMAD JAW﻿HAR, LDA</strong>
                  <small>Manga-Mascarenha, Beira</small>
                </div>
              </div>
            </div>

            <div className="about-copy">

              <span className="section-label">QUEM SOMOS</span>

              <h2>
                Uma empresa ligada
                <br />
                ao <span>transporte de mercadorias.</span>
              </h2>

              <p>
                A Transportes Mohamad Jawhar, Lda é uma empresa
                sediada em Manga-Mascarenha, na cidade da Beira,
                província de Sofala, Moçambique, dedicada ao sector
                do transporte rodoviário de mercadorias.
              </p>

              <p>
                A empresa dispõe de camiões destinados ao transporte
                de diferentes tipos de carga, incluindo carga
                contentorizada, carga avulsa com lona e mercadorias
                diversas.
              </p>

              <p>
                Também possui camiões-tanque para o transporte de
                combustíveis em território nacional. As operações
                internacionais são realizadas com os camiões
                destinados às cargas diversas, não incluindo
                os camiões-tanque.
              </p>

              <div className="about-points">

                <div>
                  <CheckCircle2 size={19} />
                  <span>Sede em Manga-Mascarenha, Beira</span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>Transporte de carga contentorizada e avulsa com lona</span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>Operações nacionais e internacionais</span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>Camiões-tanque para transporte nacional de combustíveis</span>
                </div>

              </div>

              <a href="#contactos" className="text-link">
                Fale com a nossa equipa <ChevronRight size={19} />
              </a>

            </div>
          </div>
        </section>

        {/* SERVIÇOS - PRESERVADOS */}

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
                  <Link
                    to={`/servicos/${service.slug}`}
                    className="service-card service-card-clickable"
                    key={service.slug}
                    aria-label={`Ver detalhes de ${service.title}`}
                  >
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

                      <span className="service-link">
                        Ver detalhes <ArrowRight size={16} />
                      </span>

                    </div>
                  </Link>
                );
              })}

            </div>

            <p className="disclaimer">
              As fotografias são ilustrativas. A disponibilidade de cada
              serviço deve ser confirmada directamente com a empresa.
            </p>

          </div>
        </section>

        {/* ÁREAS DE OPERAÇÃO */}

        <section className="section process-section" id="operacoes">
          <div className="process-inner">

            <div className="process-intro">

              <span className="section-label">ÁREAS DE OPERAÇÃO</span>

              <h2>
                Soluções para
                <br />
                diferentes destinos.
              </h2>

              <p>
                A actividade da empresa contempla operações de
                transporte em território nacional e internacional,
                de acordo com as características de cada serviço.
              </p>

              <Link to="/cotacao" className="button button-primary">
                Consultar uma operação <ArrowRight size={18} />
              </Link>

            </div>

            <div className="process-steps">

              <div className="process-step">
                <span><MapPin size={21} /></span>

                <div>
                  <h3>Base em Manga-Mascarenha</h3>
                  <p>
                    A empresa tem a sua base em Manga-Mascarenha,
                    na cidade da Beira, província de Sofala.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <span><Truck size={21} /></span>

                <div>
                  <h3>Transporte nacional</h3>
                  <p>
                    Operações de transporte de mercadorias em
                    território moçambicano, conforme o serviço solicitado.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <span><Globe2 size={21} /></span>

                <div>
                  <h3>Transporte internacional</h3>
                  <p>
                    Transporte de cargas diversas, incluindo
                    carga avulsa com lona e contentorizada,
                    sujeito à análise e confirmação das condições.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <span><Fuel size={21} /></span>

                <div>
                  <h3>Transporte de combustíveis</h3>
                  <p>
                    Os camiões-tanque são destinados às operações
                    de transporte nacional de combustíveis,
                    não sendo utilizados em viagens internacionais.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* COMO SOLICITAR UMA COTAÇÃO */}

        <section className="section process-section">
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

        {/* CHAMADA PARA COTAÇÕES */}

<section className="cta-section">
  <div className="cta-slideshow">
    {ctaImages.map((item, index) => (
      <div
        className="cta-slide"
        key={index}
        style={{
          backgroundImage: `url(${item.src})`,
          animationDelay: `${index * 5}s`,
        }}
      />
    ))}
  </div>

  <div className="cta-overlay"></div>

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
        {/* CONTACTOS E LOCALIZAÇÃO */}

        <section className="section contact-section" id="contactos">

          <div className="contact-container">

            <div className="contact-heading">

              <span className="section-label">
                FALE CONNOSCO
              </span>

              <h2>
                Estamos disponíveis
                <br />
                para o ajudar.
              </h2>

              <p>
                Entre em contacto com a Transportes Mohamad Jawhar, Lda
                para apresentar as suas necessidades de transporte,
                solicitar informações ou pedir uma cotação.
              </p>

            </div>

            <div className="contact-layout">

              {/* INFORMAÇÕES DE CONTACTO */}

              <div className="contact-information">

                <a
                  href={COMPANY.phoneLink}
                  className="contact-card"
                >
                  <span className="contact-card-icon">
                    <Phone size={24} />
                  </span>

                  <span className="contact-card-text">
                    <small>TELEFONE</small>
                    <strong>{COMPANY.phone}</strong>
                    <span>Ligar para a empresa</span>
                  </span>

                  <ArrowRight size={19} />
                </a>

                <a
                  href={COMPANY.emailLink}
                  className="contact-card"
                >
                  <span className="contact-card-icon">
                    <Mail size={24} />
                  </span>

                  <span className="contact-card-text">
                    <small>E-MAIL</small>
                    <strong>{COMPANY.email}</strong>
                    <span>Enviar uma mensagem</span>
                  </span>

                  <ArrowRight size={19} />
                </a>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                >
                  <span className="contact-card-icon">
                    <MapPin size={24} />
                  </span>

                  <span className="contact-card-text">
                    <small>LOCALIZAÇÃO</small>
                    <strong>Manga-Mascarenha</strong>
                    <span>Beira, Sofala, Moçambique</span>
                  </span>

                  <ExternalLink size={19} />
                </a>

                <div className="contact-card contact-nuit-card">

                  <span className="contact-card-icon">
                    <FileText size={24} />
                  </span>

                  <span className="contact-card-text">
                    <small>IDENTIFICAÇÃO FISCAL</small>
                    <strong>NUIT: {COMPANY.nuit}</strong>
                    <span>{COMPANY.name}</span>
                  </span>

                </div>

                <div className="contact-direct-actions">

                  <a
                    href={COMPANY.phoneLink}
                    className="button button-primary"
                  >
                    <Phone size={18} />
                    Ligar agora
                  </a>

                  <a
                    href={COMPANY.emailLink}
                    className="button button-outline contact-email-button"
                  >
                    <Mail size={18} />
                    Enviar e-mail
                  </a>

                </div>

              </div>

              {/* MAPA */}

              <div className="contact-map-wrapper">

                <div className="contact-map-heading">

                  <div>
                    <span className="section-label">
                      ONDE ESTAMOS
                    </span>

                    <h3>Visite-nos na Beira</h3>
                  </div>

                  <MapPin size={25} />

                </div>

                <div className="contact-map">

                  <iframe
                    title="Localização da Transportes Mohamad Jawhar, Lda em Manga-Mascarenha, Beira"
                    src={GOOGLE_MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />

                </div>

                <div className="contact-map-footer">

                  <div>
                    <MapPin size={19} />

                    <span>
                      Manga-Mascarenha, Beira
                      <small>Sofala, Moçambique</small>
                    </span>
                  </div>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation size={17} />
                    Abrir no Google Maps
                  </a>

                </div>

                <p className="contact-map-note">
                  O mapa apresenta a área indicada pelos proprietários.
                  A localização exacta das instalações deverá ser
                  confirmada através do pin oficial da empresa.
                </p>

              </div>

            </div>
          </div>
        </section>

        {/* CARREIRAS */}

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

      {/* RODAPÉ */}

      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand-column">

            <Brand />

            <p>
              {COMPANY.name}
              <br />
              Transporte rodoviário de mercadorias
              <br />
              {COMPANY.address}
            </p>

          </div>

          <div className="footer-links">

            <strong>Explorar</strong>

            <a href="#empresa">A empresa</a>
            <a href="#servicos">Serviços</a>
            <a href="#operacoes">Operações</a>
            <a href="#contactos">Contactos</a>
            <a href="#carreiras">Carreiras</a>

          </div>

          <div className="footer-links">

            <strong>Contactos</strong>

            <a href={COMPANY.phoneLink}>
              <Phone size={16} />
              {COMPANY.phone}
            </a>

            <a href={COMPANY.emailLink}>
              <Mail size={16} />
              {COMPANY.email}
            </a>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={16} />
              Manga-Mascarenha, Beira
            </a>

            <span>
              <FileText size={16} />
              NUIT: {COMPANY.nuit}
            </span>

          </div>

          <div className="footer-quote">

            <strong>Precisa de transportar?</strong>

            <p>
              Envie os detalhes do seu pedido.
            </p>

            <Link to="/cotacao">
              Pedir cotação <ArrowRight size={16} />
            </Link>

            <a href={COMPANY.phoneLink}>
              <Phone size={16} />
              Contactar a empresa
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} {COMPANY.name}.
            Todos os direitos reservados.
          </span>

          <a href="#inicio">
            Voltar ao início ↑
          </a>

        </div>

      </footer>

    </div>
  );
}

// ======================================================
// ROTAS PRINCIPAIS
// ======================================================

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/servicos/:slug"
          element={<ServicoDetalhe />}
        />

        <Route
          path="/cotacao"
          element={<Cotacao />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}
