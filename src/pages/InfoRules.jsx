import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useApp } from "../context/AppContext";
import { 
  HiOutlineShieldCheck, 
  HiOutlineKey, 
  HiOutlineVideoCamera, 
  HiOutlineUserGroup,
  HiOutlineLocationMarker,
  HiOutlinePhone
} from "react-icons/hi";

const InfoRules = () => {
  const [activeTab, setActiveTab] = useState("rules");
  const { rules, contact } = useApp();

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8">
      {/* Header Halaman */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-extrabold uppercase text-primary-dark tracking-tight">Informasi & Aturan Kos</h1>
        <p className="text-xs text-accent-text/60 max-w-lg">
          Demi kenyamanan, keamanan, dan keharmonisan hidup bersama di Eternal Kos, seluruh penghuni wajib menaati peraturan yang berlaku.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-[var(--color-primary-light)]/40 justify-center md:justify-start gap-4">
        {[
          { id: "rules", label: "Tata Tertib Kos" },
          { id: "security", label: "Keamanan & Fasilitas" },
          { id: "location", label: "Lokasi & Kontak" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-2 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-accent-text/60 hover:text-accent-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "rules" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rules.map((rule, idx) => (
              <Card key={idx} padding="p-8" className="flex flex-col justify-between">
                <div>
                  <span className="text-sm font-black text-primary/70 block mb-3">PASAL 0{idx + 1}</span>
                  <h3 className="text-base font-extrabold text-primary-dark uppercase mb-3">{rule.title}</h3>
                  <p className="text-xs md:text-sm text-accent-text/75 leading-relaxed">{rule.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-12">
            {/* Keamanan */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase text-primary-dark tracking-wider">Sistem Keamanan Utama</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flex items-start gap-4" padding="p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <HiOutlineKey size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-accent-text uppercase">Smart Door Lock</h4>
                    <p className="text-[11px] text-accent-text/70 leading-relaxed">Setiap penghuni dibekali kartu akses unik / kode PIN khusus untuk akses pintu gerbang utama.</p>
                  </div>
                </Card>

                <Card className="flex items-start gap-4" padding="p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <HiOutlineVideoCamera size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-accent-text uppercase">Pemantauan CCTV 24/7</h4>
                    <p className="text-[11px] text-accent-text/70 leading-relaxed">CCTV aktif memantau lorong kos, area parkir kendaraan, dapur, dan gerbang masuk utama demi keamanan.</p>
                  </div>
                </Card>

                <Card className="flex items-start gap-4" padding="p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <HiOutlineShieldCheck size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-accent-text uppercase">Penjagaan Berkala</h4>
                    <p className="text-[11px] text-accent-text/70 leading-relaxed">Staf pengelola melakukan kontrol berkala di malam hari untuk memastikan ketertiban lingkungan kos.</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Fasilitas Komunal */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase text-primary-dark tracking-wider">Fasilitas Bersama (Komunal)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card padding="p-0 overflow-hidden" hoverable={true}>
                  <div className="h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800" 
                      alt="Dapur Bersama" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-sm font-bold text-primary-dark uppercase">Dapur Komunal Lengkap</h4>
                    <p className="text-xs text-accent-text/70 leading-relaxed">Dilengkapi dengan kompor gas tanam, kulkas bersama, dispenser air minum, microwave, dan peralatan masak lengkap yang dapat digunakan bersama.</p>
                  </div>
                </Card>

                <Card padding="p-0 overflow-hidden" hoverable={true}>
                  <div className="h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" 
                      alt="Rooftop Lounge" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-sm font-bold text-primary-dark uppercase">Rooftop Lounge & Area Coworking</h4>
                    <p className="text-xs text-accent-text/70 leading-relaxed">Area bersantai dan belajar bersama yang luas di lantai atas, dilengkapi kursi belajar ergonomis, stop kontak melimpah, dan Wi-Fi dengan bandwith kencang.</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Lokasi Text & Kontak */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-primary-dark uppercase">Kontak Pengelola</h3>
                  <p className="text-xs text-accent-text/70">Ingin survey lokasi langsung atau menanyakan status kamar? Hubungi pengelola kami.</p>
                </div>
                
                <div className="space-y-4 border-t border-[var(--color-primary-light)]/20 pt-4">
                  <div className="flex gap-3 text-xs items-center">
                    <HiOutlineLocationMarker size={18} className="text-primary shrink-0" />
                    <div>
                      <span className="font-bold text-accent-text block">Alamat Kos</span>
                      <span className="text-accent-text/70">{contact.address}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs items-center">
                    <HiOutlinePhone size={18} className="text-primary shrink-0" />
                    <div>
                      <span className="font-bold text-accent-text block">Nomor Telepon / WhatsApp</span>
                      <span className="text-accent-text/70">{contact.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                      <HiOutlineUserGroup size={16} /> Hubungi Lewat WhatsApp
                    </Button>
                  </a>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7 h-[350px] md:h-[450px] rounded-2xl overflow-hidden border border-[var(--color-primary-light)]/40 shadow-sm">
              <iframe 
                title="Peta Lokasi PCR"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6201659779374!2d101.42318721475355!3d0.5701831995839958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!2f0!4e2!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ab670868f0ef%3A0xcd19e48f72782e4e!2sPoliteknik%20Caltex%20Riau!5e0!3m2!1sid!2sid!4v1686000000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoRules;
