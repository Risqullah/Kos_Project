import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { HiPlus, HiTrash, HiPencil, HiSave, HiDocumentText, HiQuestionMarkCircle, HiPhone } from "react-icons/hi";

const TABS = [
  { id: "rules", label: "Tata Tertib", icon: HiDocumentText },
  { id: "faq", label: "FAQ", icon: HiQuestionMarkCircle },
  { id: "contact", label: "Kontak", icon: HiPhone },
];

const AdminInfo = () => {
  const [activeTab, setActiveTab] = useState("rules");
  const { rules, faqs, contact: dbContact, saveRules, saveFaqs, saveContact } = useApp();

  // ── Rules ──
  const [ruleForm, setRuleForm] = useState({ title: "", desc: "" });
  const [editingRuleIdx, setEditingRuleIdx] = useState(null);

  // ── FAQ ──
  const [faqForm, setFaqForm] = useState({ q: "", a: "" });
  const [editingFaqIdx, setEditingFaqIdx] = useState(null);

  // ── Contact ──
  const [contact, setContact] = useState({ address: "", phone: "", whatsapp: "" });

  useEffect(() => {
    if (dbContact) {
      setContact(dbContact);
    }
  }, [dbContact]);

  // ── Rules Handlers ──
  const handleEditRule = (idx) => { setEditingRuleIdx(idx); setRuleForm({ title: rules[idx].title, desc: rules[idx].desc }); };
  const handleSaveRule = () => {
    if (!ruleForm.title.trim() || !ruleForm.desc.trim()) return;
    const updated = [...rules]; updated[editingRuleIdx] = ruleForm; saveRules(updated);
    setEditingRuleIdx(null); setRuleForm({ title: "", desc: "" });
  };
  const handleDeleteRule = (idx) => { if (window.confirm("Hapus aturan ini?")) saveRules(rules.filter((_, i) => i !== idx)); };
  const handleAddRule = () => {
    if (!ruleForm.title.trim() || !ruleForm.desc.trim()) return;
    saveRules([...rules, ruleForm]); setRuleForm({ title: "", desc: "" });
  };

  // ── FAQ Handlers ──
  const handleEditFaq = (idx) => { setEditingFaqIdx(idx); setFaqForm({ q: faqs[idx].q, a: faqs[idx].a }); };
  const handleSaveFaq = () => {
    if (!faqForm.q.trim() || !faqForm.a.trim()) return;
    const updated = [...faqs]; updated[editingFaqIdx] = faqForm; saveFaqs(updated);
    setEditingFaqIdx(null); setFaqForm({ q: "", a: "" });
  };
  const handleDeleteFaq = (idx) => { if (window.confirm("Hapus FAQ ini?")) saveFaqs(faqs.filter((_, i) => i !== idx)); };
  const handleAddFaq = () => {
    if (!faqForm.q.trim() || !faqForm.a.trim()) return;
    saveFaqs([...faqs, faqForm]); setFaqForm({ q: "", a: "" });
  };

  // ── Contact Handlers ──
  const handleContactChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });
  const handleSaveContact = () => {
    saveContact(contact);
    alert("Kontak berhasil disimpan!");
  };

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)]">
          Informasi & Aturan
        </h1>
        <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 font-sans">
          Kelola tata tertib, FAQ, dan kontak pengelola kos.
        </p>
      </div>

      {/* ── Tab Navigation (Neumorphic) ── */}
      <Card variant="tertiary" padding="p-1.5" className="flex gap-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white shadow-neumorphic-sm text-[var(--color-primary-dark)]"
                  : "text-[var(--color-accent-text)]/50 hover:text-[var(--color-accent-text)]"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </Card>

      {/* ── Tab Content ── */}

      {/* ── TAB: Rules ── */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, idx) => (
              <Card key={idx} variant="default" padding="p-5" className="space-y-3">
                {editingRuleIdx === idx ? (
                  <div className="space-y-3">
                    <Input label="Judul" value={ruleForm.title} onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })} />
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">Deskripsi</label>
                      <textarea value={ruleForm.desc} onChange={(e) => setRuleForm({ ...ruleForm, desc: e.target.value })} rows={3}
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition resize-none" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveRule} variant="primary" size="sm" icon={HiSave}>Simpan</Button>
                      <Button onClick={() => setEditingRuleIdx(null)} variant="outline" size="sm">Batal</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="chip" className="bg-[var(--color-primary)]/10 text-[var(--color-primary)]">PASAL {String(idx + 1).padStart(2, "0")}</Badge>
                        <h4 className="text-sm font-bold text-[var(--color-accent-text)] mt-2 font-sans">{rule.title}</h4>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => handleEditRule(idx)} className="p-1.5 text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg"><HiPencil size={14} /></button>
                        <button onClick={() => handleDeleteRule(idx)} className="p-1.5 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-lg"><HiTrash size={14} /></button>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-accent-text)]/70 leading-relaxed font-sans">{rule.desc}</p>
                  </>
                )}
              </Card>
            ))}
          </div>

          {/* Add Rule */}
          {editingRuleIdx === null && (
            <Card variant="tertiary" padding="p-5" className="space-y-3 border-2 border-dashed border-[var(--color-primary-light)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/60">Tambah Aturan Baru</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Judul" value={ruleForm.title} onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })} placeholder="Misal: Kebijakan Parkir" />
                <Input label="Deskripsi" value={ruleForm.desc} onChange={(e) => setRuleForm({ ...ruleForm, desc: e.target.value })} placeholder="Keterangan aturan..." />
              </div>
              <Button onClick={handleAddRule} variant="primary" size="sm" icon={HiPlus}>Tambah Aturan</Button>
            </Card>
          )}
        </div>
      )}

      {/* ── TAB: FAQ ── */}
      {activeTab === "faq" && (
        <div className="space-y-4">
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Card key={idx} variant="default" padding="p-5" className="space-y-3">
                {editingFaqIdx === idx ? (
                  <div className="space-y-3">
                    <Input label="Pertanyaan" value={faqForm.q} onChange={(e) => setFaqForm({ ...faqForm, q: e.target.value })} />
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/80">Jawaban</label>
                      <textarea value={faqForm.a} onChange={(e) => setFaqForm({ ...faqForm, a: e.target.value })} rows={3}
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition resize-none" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveFaq} variant="primary" size="sm" icon={HiSave}>Simpan</Button>
                      <Button onClick={() => setEditingFaqIdx(null)} variant="outline" size="sm">Batal</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-[10px] font-bold">Q</span>
                        <h4 className="text-sm font-bold text-[var(--color-accent-text)] font-sans">{faq.q}</h4>
                      </div>
                      <p className="text-sm text-[var(--color-accent-text)]/60 mt-1 ml-7 font-sans">{faq.a}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => handleEditFaq(idx)} className="p-1.5 text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg"><HiPencil size={14} /></button>
                      <button onClick={() => handleDeleteFaq(idx)} className="p-1.5 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-lg"><HiTrash size={14} /></button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Add FAQ */}
          {editingFaqIdx === null && (
            <Card variant="tertiary" padding="p-5" className="space-y-3 border-2 border-dashed border-[var(--color-primary-light)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-text)]/60">Tambah FAQ Baru</h4>
              <Input label="Pertanyaan" value={faqForm.q} onChange={(e) => setFaqForm({ ...faqForm, q: e.target.value })} placeholder="Misal: Apakah boleh masak?" />
              <Input label="Jawaban" value={faqForm.a} onChange={(e) => setFaqForm({ ...faqForm, a: e.target.value })} placeholder="Tulis jawaban di sini..." />
              <Button onClick={handleAddFaq} variant="primary" size="sm" icon={HiPlus}>Tambah FAQ</Button>
            </Card>
          )}
        </div>
      )}

      {/* ── TAB: Contact ── */}
      {activeTab === "contact" && (
        <Card variant="default" padding="p-6" className="space-y-5 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Alamat Kos" name="address" value={contact.address} onChange={handleContactChange} placeholder="Alamat lengkap" />
            <Input label="No. Telepon" name="phone" value={contact.phone} onChange={handleContactChange} placeholder="0812-XXXX" />
          </div>
          <Input label="WhatsApp (Internasional)" name="whatsapp" value={contact.whatsapp} onChange={handleContactChange} placeholder="628123456789" />
          <Button onClick={handleSaveContact} variant="primary" icon={HiSave}>Simpan Kontak</Button>
        </Card>
      )}
    </div>
  );
};

export default AdminInfo;
