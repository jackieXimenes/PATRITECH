"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface AddAtivoModalProps {
  onSuccess: () => void; // Função para atualizar a lista de ativos na página principal
}

export default function AddAtivoModal({ onSuccess }: AddAtivoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [dataAtivo, setDataAtivo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !dataAtivo) return toast.warning("Preencha todos os campos!");

    setLoading(true);
    try {
      const res = await fetch("/api/ativos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Item: nome, data: dataAtivo }),
      });

      if (!res.ok) throw new Error();

      toast.success("Ativo adicionado com sucesso!");
      setNome("");
      setDataAtivo("");
      setIsOpen(false);
      onSuccess(); // Atualiza a lista na página principal
    } catch (error) {
      toast.error(`Erro ao adicionar ativo ${error}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botão de Abrir */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
      >
        <span>+</span> Novo Ativo
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1b1c1f] border border-[#2c2d30] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#2c2d30] flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Adicionar Novo Ativo</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Nome do Item</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-[#25262b] border border-[#2c2d30] rounded-xl p-3 mt-1 text-white focus:border-indigo-500 outline-none"
                  placeholder="Ex: Notebook Dell"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Data de Aquisição</label>
                <input
                  type="date"
                  value={dataAtivo}
                  onChange={(e) => setDataAtivo(e.target.value)}
                  className="w-full bg-[#25262b] border border-[#2c2d30] rounded-xl p-3 mt-1 text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
              >
                {loading ? "Salvando..." : "Salvar Ativo"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}