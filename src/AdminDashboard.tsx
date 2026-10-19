
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Truck,
  ClipboardList,
  Clock3,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Search,
  MapPin,
  Phone,
  CalendarDays,
  X,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { supabase } from "./lib/supabase";
import "./AdminDashboard.css";

const ESTADOS = [
  "Novo",
  "Em análise",
  "Cotação enviada",
  "Aceite",
  "Recusado",
] as const;

type EstadoPedido = (typeof ESTADOS)[number];

type Pedido = {
  id: string;
  nome: string;
  empresa: string | null;
  telefone: string;
  email: string | null;
  tipo_carga: string;
  origem: string;
  destino: string;
  peso: string | null;
  data_transporte: string | null;
  detalhes: string | null;
  estado: EstadoPedido;
  criado_em: string;
};

function formatarData(data: string | null) {
  if (!data) return "Não indicada";

  const valor = new Date(`${data.slice(0, 10)}T12:00:00`);

  return valor.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatarDataHora(data: string) {
  return new Date(data).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function linkWhatsApp(telefone: string) {
  let numero = telefone.replace(/\D/g, "");

  if (numero.startsWith("00")) {
    numero = numero.slice(2);
  } else if (numero.startsWith("0")) {
    numero = `258${numero.slice(1)}`;
  } else if (!numero.startsWith("258")) {
    numero = `258${numero}`;
  }

  return `https://wa.me/${numero}`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedidoSelecionado, setPedidoSelecionado] =
    useState<Pedido | null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState<string | null>(null);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const carregarPedidos = useCallback(async () => {
    setLoading(true);
    setErro("");

    try {
      const { data: sessaoData, error: sessaoErro } =
        await supabase.auth.getSession();

      if (sessaoErro) throw sessaoErro;

      const user = sessaoData.session?.user;

      if (!user) {
        navigate("/admin/login", { replace: true });
        return;
      }

      const { data: admin, error: adminErro } = await supabase
        .from("admin_mohamad")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminErro) throw adminErro;

      if (!admin) {
        await supabase.auth.signOut();
        navigate("/admin/login", { replace: true });
        return;
      }

      const { data, error: pedidosErro } = await supabase
        .from("pedidos_cotacao")
        .select(
          "id, nome, empresa, telefone, email, tipo_carga, origem, destino, peso, data_transporte, detalhes, estado, criado_em"
        )
        .order("criado_em", { ascending: false });

      if (pedidosErro) throw pedidosErro;

      setPedidos((data ?? []) as Pedido[]);
    } catch (err: unknown) {
      setErro(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os pedidos."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void carregarPedidos();
  }, [carregarPedidos]);

  async function alterarEstado(id: string, novoEstado: EstadoPedido) {
    setAtualizando(id);
    setErro("");
    setMensagem("");

    try {
      const { data, error: updateErro } = await supabase
        .from("pedidos_cotacao")
        .update({ estado: novoEstado })
        .eq("id", id)
        .select("id, estado")
        .maybeSingle();

      if (updateErro) throw updateErro;

      if (!data) {
        throw new Error(
          "O estado não foi atualizado. Verifica as permissões no Supabase."
        );
      }

      setPedidos((anteriores) =>
        anteriores.map((pedido) =>
          pedido.id === id
            ? { ...pedido, estado: novoEstado }
            : pedido
        )
      );

      setPedidoSelecionado((anterior) =>
        anterior?.id === id
          ? { ...anterior, estado: novoEstado }
          : anterior
      );

      setMensagem("Estado do pedido atualizado com sucesso.");
    } catch (err: unknown) {
      setErro(
        err instanceof Error
          ? err.message
          : "Não foi possível atualizar o pedido."
      );
    } finally {
      setAtualizando(null);
    }
  }

  async function terminarSessao() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setErro("Não foi possível terminar a sessão. Tenta novamente.");
      return;
    }

    navigate("/admin/login", { replace: true });
  }

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const termo = pesquisa.trim().toLowerCase();

    const correspondePesquisa =
      !termo ||
      [
        pedido.nome,
        pedido.empresa ?? "",
        pedido.telefone,
        pedido.tipo_carga,
        pedido.origem,
        pedido.destino,
      ].some((valor) => valor.toLowerCase().includes(termo));

    const correspondeEstado =
      filtroEstado === "Todos" || pedido.estado === filtroEstado;

    return correspondePesquisa && correspondeEstado;
  });

  const novos = pedidos.filter((pedido) => pedido.estado === "Novo").length;
  const emAnalise = pedidos.filter(
    (pedido) => pedido.estado === "Em análise"
  ).length;
  const concluidos = pedidos.filter(
    (pedido) => pedido.estado === "Aceite"
  ).length;

  return (
    <main className="admin-dashboard">
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Truck size={25} />
          </div>
          <div>
            <strong>MOHAMAD TRANSPORTES</strong>
            <span>Painel administrativo</span>
          </div>
        </div>

        <div className="admin-topbar-actions">
          <button
            type="button"
            className="admin-refresh"
            onClick={() => void carregarPedidos()}
            disabled={loading}
          >
            <RefreshCw size={17} />
            Atualizar
          </button>

          <button
            type="button"
            className="admin-logout"
            onClick={() => void terminarSessao()}
          >
            <LogOut size={17} />
            Sair
          </button>
        </div>
      </header>

      <section className="admin-content">
        <div className="admin-page-heading">
          <div>
            <p className="admin-eyebrow">GESTÃO DE TRANSPORTE</p>
            <h1>Pedidos de cotação</h1>
            <p>Consulta e acompanha os pedidos enviados pelos clientes.</p>
          </div>

          <span className="admin-total-badge">
            {pedidos.length} pedido(s)
          </span>
        </div>

        {erro && (
          <div className="admin-alert admin-alert-error" role="alert">
            <AlertCircle size={19} />
            <span>{erro}</span>
          </div>
        )}

        {mensagem && (
          <div className="admin-alert admin-alert-success" role="status">
            <CheckCircle2 size={19} />
            <span>{mensagem}</span>
            <button
              type="button"
              aria-label="Fechar mensagem"
              onClick={() => setMensagem("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="admin-stats">
          <article className="admin-stat-card">
            <div className="admin-stat-icon stat-blue">
              <ClipboardList size={23} />
            </div>
            <span>Total de pedidos</span>
            <strong>{pedidos.length}</strong>
            <small>Todos os pedidos registados</small>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon stat-orange">
              <Clock3 size={23} />
            </div>
            <span>Novos pedidos</span>
            <strong>{novos}</strong>
            <small>Precisam de atenção</small>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon stat-purple">
              <RefreshCw size={23} />
            </div>
            <span>Em análise</span>
            <strong>{emAnalise}</strong>
            <small>Em acompanhamento</small>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon stat-green">
              <CheckCircle2 size={23} />
            </div>
            <span>Aceites</span>
            <strong>{concluidos}</strong>
            <small>Pedidos aceites</small>
          </article>
        </section>

        <section className="admin-orders">
          <div className="admin-orders-heading">
            <div>
              <h2>Lista de pedidos</h2>
              <p>Seleciona um pedido para consultar os detalhes.</p>
            </div>
          </div>

          <div className="admin-filters">
            <div className="admin-search">
              <Search size={19} />
              <input
                type="search"
                placeholder="Pesquisar cliente, carga ou destino..."
                value={pesquisa}
                onChange={(event) => setPesquisa(event.target.value)}
              />
            </div>

            <select
              aria-label="Filtrar por estado"
              value={filtroEstado}
              onChange={(event) => setFiltroEstado(event.target.value)}
            >
              <option value="Todos">Todos os estados</option>
              {ESTADOS.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="admin-empty">
              <RefreshCw className="admin-loading-icon" size={30} />
              <p>A carregar pedidos...</p>
            </div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="admin-empty">
              <ClipboardList size={35} />
              <h3>Nenhum pedido encontrado</h3>
              <p>
                Quando um cliente enviar um pedido de cotação, ele aparecerá
                aqui.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Carga</th>
                    <th>Percurso</th>
                    <th>Data do pedido</th>
                    <th>Estado</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>
                        <strong>{pedido.nome}</strong>
                        <span className="admin-table-secondary">
                          {pedido.telefone}
                        </span>
                      </td>
                      <td>{pedido.tipo_carga}</td>
                      <td>
                        <span>{pedido.origem}</span>
                        <span className="admin-table-secondary">
                          → {pedido.destino}
                        </span>
                      </td>
                      <td>{formatarDataHora(pedido.criado_em)}</td>
                      <td>
                        <span
                          className={`admin-status status-${pedido.estado
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {pedido.estado}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="admin-view-button"
                          onClick={() => setPedidoSelecionado(pedido)}
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>

      {pedidoSelecionado && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPedidoSelecionado(null);
            }
          }}
        >
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
          >
            <div className="admin-modal-heading">
              <div>
                <p className="admin-eyebrow">DETALHES DO PEDIDO</p>
                <h2 id="admin-modal-title">{pedidoSelecionado.nome}</h2>
              </div>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setPedidoSelecionado(null)}
                aria-label="Fechar detalhes"
              >
                <X size={21} />
              </button>
            </div>

            <div className="admin-detail-grid">
              <div>
                <span>Empresa</span>
                <strong>{pedidoSelecionado.empresa || "Não indicada"}</strong>
              </div>
              <div>
                <span>Telefone</span>
                <strong>{pedidoSelecionado.telefone}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{pedidoSelecionado.email || "Não indicado"}</strong>
              </div>
              <div>
                <span>Tipo de carga</span>
                <strong>{pedidoSelecionado.tipo_carga}</strong>
              </div>
              <div>
                <span>Origem</span>
                <strong>
                  <MapPin size={15} />
                  {pedidoSelecionado.origem}
                </strong>
              </div>
              <div>
                <span>Destino</span>
                <strong>
                  <MapPin size={15} />
                  {pedidoSelecionado.destino}
                </strong>
              </div>
              <div>
                <span>Peso ou quantidade</span>
                <strong>{pedidoSelecionado.peso || "Não indicado"}</strong>
              </div>
              <div>
                <span>Data pretendida</span>
                <strong>
                  <CalendarDays size={15} />
                  {formatarData(pedidoSelecionado.data_transporte)}
                </strong>
              </div>
              <div>
                <span>Recebido em</span>
                <strong>{formatarDataHora(pedidoSelecionado.criado_em)}</strong>
              </div>
            </div>

            <div className="admin-detail-notes">
              <span>Detalhes adicionais</span>
              <p>{pedidoSelecionado.detalhes || "Sem detalhes adicionais."}</p>
            </div>

            <div className="admin-detail-status">
              <label htmlFor="admin-status-select">Estado do pedido</label>
              <select
                id="admin-status-select"
                value={pedidoSelecionado.estado}
                disabled={atualizando === pedidoSelecionado.id}
                onChange={(event) =>
                  void alterarEstado(
                    pedidoSelecionado.id,
                    event.target.value as EstadoPedido
                  )
                }
              >
                {ESTADOS.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
              {atualizando === pedidoSelecionado.id && (
                <span>A guardar alteração...</span>
              )}
            </div>

            <div className="admin-modal-actions">
              <a
                href={linkWhatsApp(pedidoSelecionado.telefone)}
                target="_blank"
                rel="noreferrer"
                className="admin-whatsapp-button"
              >
                <Phone size={18} />
                Contactar no WhatsApp
                <ExternalLink size={15} />
              </a>

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setPedidoSelecionado(null)}
              >
                Fechar
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
