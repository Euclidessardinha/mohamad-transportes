
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  AlertCircle,
} from "lucide-react";
import { supabase } from "./lib/supabase";
import "./QuoteForm.css";

type QuoteData = {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  tipoCarga: string;
  origem: string;
  destino: string;
  peso: string;
  data: string;
  detalhes: string;
};

type QuoteFormProps = {
  initialService?: string;
};

const initialForm: QuoteData = {
  nome: "",
  empresa: "",
  telefone: "",
  email: "",
  tipoCarga: "",
  origem: "",
  destino: "",
  peso: "",
  data: "",
  detalhes: "",
};

function QuoteForm({ initialService = "" }: QuoteFormProps) {
  const [form, setForm] = useState<QuoteData>(() => ({
    ...initialForm,
    tipoCarga: initialService,
  }));

  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("pedidos_cotacao")
        .insert({
          nome: form.nome.trim(),
          empresa: form.empresa.trim() || null,
          telefone: form.telefone.trim(),
          email: form.email.trim() || null,
          tipo_carga: form.tipoCarga,
          origem: form.origem.trim(),
          destino: form.destino.trim(),
          peso: form.peso.trim() || null,
          data_transporte: form.data || null,
          detalhes: form.detalhes.trim() || null,
        });

      if (error) {
        console.error("Erro ao guardar pedido de cotação:", error);
        throw error;
      }

      setSubmitted(true);
    } catch (error: unknown) {
      console.error("Não foi possível enviar a cotação:", error);

      setErrorMessage(
        "Não foi possível enviar o pedido. Verifique a sua ligação à Internet e tente novamente. Os dados preenchidos foram preservados."
      );
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setForm({
      ...initialForm,
      tipoCarga: initialService,
    });
    setSubmitted(false);
    setErrorMessage("");
  }

  return (
    <section className="quote-section" id="cotacao">
      <div className="quote-container">
        <div className="quote-intro">
          <span className="quote-eyebrow">
            <ClipboardList size={17} />
            PEDIDO DE COTAÇÃO
          </span>

          <h2>
            Vamos levar a sua carga
            <span> ao destino certo.</span>
          </h2>

          <p>
            Partilhe os detalhes do transporte de que precisa.
            Com estas informações, a nossa equipa poderá analisar
            o pedido e preparar uma proposta adequada.
          </p>

          <div className="quote-benefit">
            <CheckCircle2 size={20} />
            <span>Informações organizadas para análise do pedido</span>
          </div>

          <div className="quote-benefit">
            <CheckCircle2 size={20} />
            <span>Detalhes da carga, origem e destino</span>
          </div>
        </div>

        <div className="quote-card">
          <div className="quote-card-heading">
            <span className="quote-card-number">01</span>
            <div>
              <h3>Solicitar cotação</h3>
              <p>Preencha os campos abaixo.</p>
            </div>
          </div>

          {submitted ? (
            <div className="quote-success" role="status">
              <CheckCircle2 size={42} />

              <h3>Pedido enviado com sucesso!</h3>

              <p>
                O seu pedido de cotação foi registado.
                A equipa da MOHAMAD Transportes poderá agora
                analisar as informações fornecidas.
              </p>

              <button
                type="button"
                className="quote-secondary-button"
                onClick={resetForm}
              >
                Criar outro pedido
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div
                  className="quote-error"
                  role="alert"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    background: "#fff1f0",
                    color: "#b42318",
                    fontSize: "14px",
                  }}
                >
                  <AlertCircle size={19} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="quote-fields">
                <label>
                  Nome completo *
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="O seu nome"
                    autoComplete="name"
                    required
                    disabled={saving}
                  />
                </label>

                <label>
                  Empresa
                  <input
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    placeholder="Nome da empresa (opcional)"
                    autoComplete="organization"
                    disabled={saving}
                  />
                </label>

                <label>
                  Telefone *
                  <input
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="+258 ..."
                    autoComplete="tel"
                    type="tel"
                    required
                    disabled={saving}
                  />
                </label>

                <label>
                  E-mail
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="nome@empresa.com"
                    autoComplete="email"
                    type="email"
                    disabled={saving}
                  />
                </label>

                <label className="quote-field-full">
                  Tipo de carga *
                  <select
                    name="tipoCarga"
                    value={form.tipoCarga}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  >
                    <option value="">Seleccione o tipo de carga</option>
                    <option value="Granel">Mercadorias a granel</option>
                    <option value="Contentores">Contentores</option>
                    <option value="Combustíveis">Combustíveis</option>
                    <option value="Transfronteiriço">
                      Transporte transfronteiriço
                    </option>
                    <option value="Outro">Outro tipo de carga</option>
                  </select>
                </label>

                <label>
                  Local de recolha *
                  <input
                    name="origem"
                    value={form.origem}
                    onChange={handleChange}
                    placeholder="Cidade ou local de origem"
                    required
                    disabled={saving}
                  />
                </label>

                <label>
                  Local de entrega *
                  <input
                    name="destino"
                    value={form.destino}
                    onChange={handleChange}
                    placeholder="Cidade ou local de destino"
                    required
                    disabled={saving}
                  />
                </label>

                <label>
                  Peso ou quantidade
                  <input
                    name="peso"
                    value={form.peso}
                    onChange={handleChange}
                    placeholder="Ex.: 20 toneladas"
                    disabled={saving}
                  />
                </label>

                <label>
                  Data pretendida
                  <input
                    name="data"
                    type="date"
                    value={form.data}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    disabled={saving}
                  />
                </label>

                <label className="quote-field-full">
                  Informações adicionais
                  <textarea
                    name="detalhes"
                    value={form.detalhes}
                    onChange={handleChange}
                    placeholder="Descreva a carga ou outras necessidades do transporte..."
                    rows={4}
                    disabled={saving}
                  />
                </label>
              </div>

              <p className="quote-required-note">
                * Campos obrigatórios
              </p>

              <button
                className="quote-submit"
                type="submit"
                disabled={saving}
              >
                {saving ? "A enviar pedido..." : "Enviar pedido"}
                {!saving && <ArrowRight size={19} />}
              </button>

              <p className="quote-privacy">
                Utilize apenas os dados necessários para este pedido.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default QuoteForm;
