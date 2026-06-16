/* eslint-disable react-refresh/only-export-components */
// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

const hashPassword = async (password) => {
  if (!password) return "";
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- STATE ---
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [issues, setIssues] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [rules, setRules] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [contact, setContact] = useState({
    address: "Jl. Rumbai Indah No. 77, Pekanbaru, Riau (Dekat Kampus PCR)",
    phone: "0812-3456-7890",
    whatsapp: "6281234567890",
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("eternal_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  // --- FETCH DATA FROM SUPABASE ---
  const fetchData = async () => {
    try {
      // 1. Fetch Kamar
      const { data: roomsData, error: roomsErr } = await supabase
        .from("kamar")
        .select("*")
        .order("id_kamar", { ascending: true });
      
      if (roomsErr) {
        console.error("Koneksi Supabase Gagal (kamar):", roomsErr.message);
      } else {
        console.log("Koneksi Supabase Sukses! Kamar dimuat:", roomsData);
      }
      
      let mappedRooms = [];
      if (!roomsErr && roomsData) {
        mappedRooms = roomsData.map((r) => ({
          id: r.id_kamar.toString(),
          name: r.nama_kamar,
          type: r.tipe,
          price: r.harga,
          status: r.status,
          facilities: typeof r.fasilitas === "string" 
            ? JSON.parse(r.fasilitas) 
            : (Array.isArray(r.fasilitas) ? r.fasilitas : []),
          image: r.foto || "",
          description: r.deskripsi || "",
          size: r.ukuran || ""
        }));
        setRooms(mappedRooms);
      }

      // 2. Fetch Penghuni
      const { data: tenantsData, error: tenantsErr } = await supabase
        .from("penghuni")
        .select("*")
        .order("id_penghuni", { ascending: true });
      
      let mappedTenants = [];
      if (!tenantsErr && tenantsData) {
        mappedTenants = tenantsData.map((t) => ({
          id: t.id_penghuni.toString(),
          name: t.nama,
          email: t.email,
          phone: t.no_hp,
          roomId: t.id_kamar ? t.id_kamar.toString() : "",
          entryDate: t.tanggal_masuk || "",
          dueDate: t.tanggal_jatuh_tempo || "",
          status: t.status
        }));
        setTenants(mappedTenants);
      }

      // 3. Fetch Keuangan
      const { data: txData, error: txErr } = await supabase
        .from("keuangan")
        .select("*")
        .order("id_keuangan", { ascending: false });
      
      if (!txErr && txData) {
        const mappedTx = txData.map((tx) => {
          const parts = tx.keterangan.split(" - ");
          const category = parts[0] || "Lain-lain";
          const desc = parts[1] || tx.keterangan;
          return {
            id: tx.id_keuangan.toString(),
            date: tx.tanggal,
            type: tx.jenis_transaksi,
            category: category,
            amount: tx.nominal,
            desc: desc
          };
        });
        setTransactions(mappedTx);
      }

      // 4. Fetch Laporan (Pengaduan)
      const { data: issuesData, error: issuesErr } = await supabase
        .from("laporan")
        .select("*, penghuni(*)")
        .order("id_laporan", { ascending: false });
      
      if (!issuesErr && issuesData) {
        const mappedIssues = issuesData.map((i) => ({
          id: i.id_laporan.toString(),
          tenantName: i.penghuni ? i.penghuni.nama : "Penghuni",
          roomId: i.penghuni && i.penghuni.id_kamar ? i.penghuni.id_kamar.toString() : "102",
          category: i.judul,
          desc: i.deskripsi,
          image: i.foto_bukti || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400",
          status: i.status,
          date: i.tanggal_laporan
        }));
        setIssues(mappedIssues);
      }

      // 5. Fetch Reservasi
      const { data: resData, error: resErr } = await supabase
        .from("reservasi")
        .select("*, penghuni(*), kamar(*)")
        .order("id_reservasi", { ascending: false });
      
      if (!resErr && resData) {
        const mappedRes = resData.map((r) => ({
          id: r.id_reservasi.toString(),
          date: r.tanggal_reservasi,
          name: r.penghuni ? r.penghuni.nama : "Calon Penghuni",
          email: r.penghuni ? r.penghuni.email : "",
          phone: r.penghuni ? r.penghuni.no_hp : "",
          roomId: r.id_kamar ? r.id_kamar.toString() : "",
          roomName: r.kamar ? r.kamar.nama_kamar : (r.id_kamar ? `Kamar ${r.id_kamar}` : "-"),
          duration: r.durasi_sewa || 1,
          status: r.status_konfirmasi
        }));
        setReservations(mappedRes);
      }

      // 6. Fetch Informasi (Rules, FAQ, Contact)
      const { data: infoData, error: infoErr } = await supabase
        .from("informasi")
        .select("*")
        .order("id_informasi", { ascending: true });

      const processInfo = (data) => {
        const rulesList = data.filter(d => d.kategori === "rules").map(d => ({ title: d.judul, desc: d.isi }));
        const faqsList = data.filter(d => d.kategori === "faq").map(d => ({ q: d.judul, a: d.isi }));
        
        const addressObj = data.find(d => d.kategori === "contact" && d.judul === "address");
        const phoneObj = data.find(d => d.kategori === "contact" && d.judul === "phone");
        const waObj = data.find(d => d.kategori === "contact" && d.judul === "whatsapp");

        setRules(rulesList);
        setFaqs(faqsList);
        setContact({
          address: addressObj ? addressObj.isi : "Jl. Rumbai Indah No. 77, Pekanbaru, Riau (Dekat Kampus PCR)",
          phone: phoneObj ? phoneObj.isi : "0812-3456-7890",
          whatsapp: waObj ? waObj.isi : "6281234567890"
        });
      };

      if (!infoErr && infoData) {
        processInfo(infoData);
      }
    } catch (err) {
      console.error("Gagal mengambil data dari Supabase:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- AUTH ACTIONS ---
  const loginUser = async (email, password) => {
    const hashed = await hashPassword(password);
    // 1. Cek tabel owner
    const { data: ownerData, error: ownerErr } = await supabase
      .from("owner")
      .select("*")
      .eq("email", email);

    if (!ownerErr && ownerData && ownerData.length > 0) {
      const owner = ownerData[0];
      if (owner.password === hashed || owner.password === password) {
        const user = {
          id: owner.id_owner.toString(),
          name: owner.nama,
          email: owner.email,
          role: "owner"
        };
        setCurrentUser(user);
        localStorage.setItem("eternal_current_user", JSON.stringify(user));
        return { success: true, user };
      }
    }

    // 2. Cek tabel penghuni
    const { data: tenantData, error: tenantErr } = await supabase
      .from("penghuni")
      .select("*")
      .eq("email", email);

    if (!tenantErr && tenantData && tenantData.length > 0) {
      const tenant = tenantData[0];
      if (tenant.password === hashed || tenant.password === password) {
        const user = {
          id: tenant.id_penghuni.toString(),
          name: tenant.nama,
          email: tenant.email,
          phone: tenant.no_hp,
          roomId: tenant.id_kamar ? tenant.id_kamar.toString() : "",
          role: "tenant"
        };
        setCurrentUser(user);
        localStorage.setItem("eternal_current_user", JSON.stringify(user));
        return { success: true, user };
      }
    }

    return { success: false, message: "Email atau password salah." };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("eternal_current_user");
  };

  const registerUser = async (name, email, password, phone = "") => {
    // Cek email unik di owner
    const { data: ownerData } = await supabase
      .from("owner")
      .select("email")
      .eq("email", email);

    // Cek email unik di penghuni
    const { data: tenantData } = await supabase
      .from("penghuni")
      .select("email")
      .eq("email", email);

    if ((ownerData && ownerData.length > 0) || (tenantData && tenantData.length > 0)) {
      return { success: false, message: "Email sudah terdaftar." };
    }

    const hashedPassword = await hashPassword(password);

    // Masukkan ke tabel penghuni
    const { error } = await supabase
      .from("penghuni")
      .insert({
        nama: name,
        email: email,
        password: hashedPassword,
        no_hp: phone,
        status: "Nonaktif"
      });

    if (!error) {
      await fetchData();
      return { success: true };
    }
    return { success: false, message: "Gagal mendaftarkan akun baru." };
  };

  // --- ROOM ACTIONS ---
  const addRoom = async (roomData) => {
    const { error } = await supabase
      .from("kamar")
      .insert({
        nama_kamar: roomData.name,
        tipe: roomData.type,
        harga: roomData.price,
        status: roomData.status || "Tersedia",
        foto: roomData.image,
        fasilitas: JSON.stringify(roomData.facilities)
      });
    if (!error) {
      await fetchData();
    }
  };

  const updateRoom = async (updatedRoom) => {
    const { error } = await supabase
      .from("kamar")
      .update({
        nama_kamar: updatedRoom.name,
        tipe: updatedRoom.type,
        harga: updatedRoom.price,
        status: updatedRoom.status,
        foto: updatedRoom.image,
        fasilitas: JSON.stringify(updatedRoom.facilities)
      })
      .eq("id_kamar", parseInt(updatedRoom.id));
    if (!error) {
      await fetchData();
    }
  };

  const deleteRoom = async (roomId) => {
    const { error } = await supabase
      .from("kamar")
      .delete()
      .eq("id_kamar", parseInt(roomId));
    if (!error) {
      await fetchData();
    }
  };

  // --- TENANT ACTIONS ---
  const addTenant = async (tenantData) => {
    const hashedPassword = await hashPassword("user");
    const { error } = await supabase
      .from("penghuni")
      .insert({
        nama: tenantData.name,
        email: tenantData.email,
        password: hashedPassword,
        no_hp: tenantData.phone,
        tanggal_masuk: tenantData.entryDate || null,
        tanggal_jatuh_tempo: tenantData.dueDate || null,
        status: tenantData.status || "Aktif",
        id_kamar: tenantData.roomId ? parseInt(tenantData.roomId) : null
      });
    
    if (!error) {
      if (tenantData.roomId) {
        await supabase
          .from("kamar")
          .update({ status: "Terisi" })
          .eq("id_kamar", parseInt(tenantData.roomId));
      }
      await fetchData();
    }
  };

  const updateTenant = async (updatedTenant) => {
    const { error } = await supabase
      .from("penghuni")
      .update({
        nama: updatedTenant.name,
        email: updatedTenant.email,
        no_hp: updatedTenant.phone,
        tanggal_masuk: updatedTenant.entryDate || null,
        tanggal_jatuh_tempo: updatedTenant.dueDate || null,
        status: updatedTenant.status,
        id_kamar: updatedTenant.roomId ? parseInt(updatedTenant.roomId) : null
      })
      .eq("id_penghuni", parseInt(updatedTenant.id));
    if (!error) {
      await fetchData();
    }
  };

  const deleteTenant = async (tenantId) => {
    try {
      const parsedTenantId = parseInt(tenantId);
      
      // 1. Ambil info kamar penghuni untuk dikosongkan nanti
      const { data: tenantData } = await supabase
        .from("penghuni")
        .select("id_kamar")
        .eq("id_penghuni", parsedTenantId);

      // 2. Hapus data di tabel referensi untuk menghindari foreign key constraint error
      await supabase
        .from("laporan")
        .delete()
        .eq("id_penghuni", parsedTenantId);

      await supabase
        .from("reservasi")
        .delete()
        .eq("id_penghuni", parsedTenantId);

      // 3. Hapus data utama di tabel penghuni
      const { error } = await supabase
        .from("penghuni")
        .delete()
        .eq("id_penghuni", parsedTenantId);

      if (!error) {
        // 4. Update status kamar menjadi Tersedia
        if (tenantData && tenantData.length > 0 && tenantData[0].id_kamar) {
          await supabase
            .from("kamar")
            .update({ status: "Tersedia" })
            .eq("id_kamar", tenantData[0].id_kamar);
        }
        await fetchData();
      } else {
        console.error("Gagal menghapus penghuni:", error);
        alert("Gagal menghapus data penghuni: " + error.message);
      }
    } catch (err) {
      console.error("Error pada deleteTenant:", err);
    }
  };

  // --- TRANSACTION ACTIONS ---
  const addTransaction = async (tx) => {
    const { error } = await supabase
      .from("keuangan")
      .insert({
        jenis_transaksi: tx.type,
        tanggal: tx.date || new Date().toISOString().split("T")[0],
        keterangan: `${tx.category} - ${tx.desc}`,
        nominal: tx.amount
      });
    if (!error) {
      await fetchData();
    }
  };

  const deleteTransaction = async (txId) => {
    const { error } = await supabase
      .from("keuangan")
      .delete()
      .eq("id_keuangan", parseInt(txId));
    if (!error) {
      await fetchData();
    }
  };

  // --- ISSUE ACTIONS ---
  const addIssue = async (issue) => {
    const { data: tenantData } = await supabase
      .from("penghuni")
      .select("id_penghuni")
      .eq("email", currentUser.email);

    if (tenantData && tenantData.length > 0) {
      const { error } = await supabase
        .from("laporan")
        .insert({
          judul: issue.category,
          deskripsi: issue.desc,
          foto_bukti: issue.image || "",
          tanggal_laporan: new Date().toISOString().split("T")[0],
          status: "Pending",
          id_penghuni: tenantData[0].id_penghuni
        });
      if (!error) {
        await fetchData();
      }
    }
  };

  const updateIssueStatus = async (issueId, status) => {
    const { error } = await supabase
      .from("laporan")
      .update({ status })
      .eq("id_laporan", parseInt(issueId));
    if (!error) {
      await fetchData();
    }
  };

  // --- RESERVATION ACTIONS ---
  const addReservation = async (res) => {
    const { data: roomData } = await supabase
      .from("kamar")
      .select("status")
      .eq("id_kamar", parseInt(res.roomId));

    if (!roomData || roomData.length === 0 || roomData[0].status !== "Tersedia") {
      return { success: false, message: "Kamar tidak tersedia untuk reservasi." };
    }

    let tenantId;
    const { data: existingTenant } = await supabase
      .from("penghuni")
      .select("id_penghuni")
      .eq("email", res.email);

    if (existingTenant && existingTenant.length > 0) {
      tenantId = existingTenant[0].id_penghuni;
    } else {
      const hashedPassword = await hashPassword("user");
      const { data: newTenant, error: newTenantErr } = await supabase
        .from("penghuni")
        .insert({
          nama: res.name,
          email: res.email,
          password: hashedPassword,
          no_hp: res.phone,
          status: "Nonaktif"
        })
        .select();
      
      if (newTenantErr || !newTenant || newTenant.length === 0) {
        console.error("Gagal mendaftarkan profil pendaftar:", newTenantErr);
        return { success: false, message: "Gagal mendaftarkan profil pendaftar: " + (newTenantErr?.message || "") };
      }
      tenantId = newTenant[0].id_penghuni;
    }

    const insertObj = {
      tanggal_reservasi: new Date().toISOString().split("T")[0],
      tanggal_mulai: res.startDate || new Date().toISOString().split("T")[0],
      status_konfirmasi: "Menunggu Konfirmasi",
      id_kamar: parseInt(res.roomId),
      id_penghuni: tenantId,
      durasi_sewa: res.duration || 1
    };

    let { error } = await supabase
      .from("reservasi")
      .insert(insertObj);

    if (error) {
      // Jika kolom durasi_sewa tidak ada di database, kirim ulang tanpa kolom durasi_sewa
      if (error.code === "PGRST204" || error.message?.includes("durasi_sewa")) {
        console.warn("Kolom durasi_sewa tidak ditemukan di database. Mengirim reservasi tanpa kolom durasi_sewa.");
        const fallbackInsertObj = { ...insertObj };
        delete fallbackInsertObj.durasi_sewa;
        
        const fallbackRes = await supabase
          .from("reservasi")
          .insert(fallbackInsertObj);
        
        error = fallbackRes.error;
      }
    }

    if (!error) {
      await fetchData();
      return { success: true };
    }
    console.error("Gagal menyimpan reservasi ke DB:", error);
    return { success: false, message: "Gagal mengirim pengajuan reservasi: " + error.message };
  };

  const updateReservationStatus = async (resId, status) => {
    const { data: resData } = await supabase
      .from("reservasi")
      .select("*, kamar(*), penghuni(*)")
      .eq("id_reservasi", parseInt(resId));

    if (resData && resData.length > 0) {
      const res = resData[0];
      const { error } = await supabase
        .from("reservasi")
        .update({ status_konfirmasi: status })
        .eq("id_reservasi", parseInt(resId));

      if (!error) {
        if (status === "Disetujui") {
          const entryDate = res.tanggal_mulai || new Date().toISOString().split("T")[0];
          const nextMonth = new Date(entryDate);
          const dur = res.durasi_sewa || 1;
          nextMonth.setMonth(nextMonth.getMonth() + dur);
          const dueDate = nextMonth.toISOString().split("T")[0];

          await supabase
            .from("penghuni")
            .update({
              tanggal_masuk: entryDate,
              tanggal_jatuh_tempo: dueDate,
              status: "Aktif",
              id_kamar: res.id_kamar
            })
            .eq("id_penghuni", res.id_penghuni);

          await supabase
            .from("kamar")
            .update({ status: "Terisi" })
            .eq("id_kamar", res.id_kamar);

          // Record income transaction to keuangan
          const amount = (res.kamar?.harga || 0) * dur;
          await supabase
            .from("keuangan")
            .insert({
              jenis_transaksi: "pemasukan",
              tanggal: new Date().toISOString().split("T")[0],
              keterangan: `Sewa Kamar - Pembayaran awal sewa kamar ${res.kamar?.nama_kamar || ""} oleh ${res.penghuni?.nama || ""} selama ${dur} Bulan`,
              nominal: amount
            });
        }
        await fetchData();
      }
    }
  };

  const updateProfile = async (updatedData) => {
    if (!currentUser) return;
    
    if (currentUser.role === "owner") {
      const updateFields = {
        nama: updatedData.name,
        no_hp: updatedData.phone
      };
      if (updatedData.password) {
        updateFields.password = await hashPassword(updatedData.password);
      }
      const { error } = await supabase
        .from("owner")
        .update(updateFields)
        .eq("email", currentUser.email);

      if (!error) {
        const updated = { ...currentUser, ...updatedData };
        setCurrentUser(updated);
        localStorage.setItem("eternal_current_user", JSON.stringify(updated));
      }
    } else {
      const updateFields = {
        nama: updatedData.name,
        no_hp: updatedData.phone
      };
      if (updatedData.password) {
        updateFields.password = await hashPassword(updatedData.password);
      }
      const { error } = await supabase
        .from("penghuni")
        .update(updateFields)
        .eq("email", currentUser.email);

      if (!error) {
        const updated = { ...currentUser, ...updatedData };
        setCurrentUser(updated);
        localStorage.setItem("eternal_current_user", JSON.stringify(updated));
      }
    }
  };

  // --- RULES, FAQ, CONTACT ACTIONS ---
  const saveRulesToDb = async (updatedRules) => {
    await supabase.from("informasi").delete().eq("kategori", "rules");
    const newRules = updatedRules.map(r => ({ kategori: "rules", judul: r.title, isi: r.desc }));
    const { error } = await supabase.from("informasi").insert(newRules);
    if (!error) await fetchData();
  };

  const saveFaqsToDb = async (updatedFaqs) => {
    await supabase.from("informasi").delete().eq("kategori", "faq");
    const newFaqs = updatedFaqs.map(f => ({ kategori: "faq", judul: f.q, isi: f.a }));
    const { error } = await supabase.from("informasi").insert(newFaqs);
    if (!error) await fetchData();
  };

  const saveContactToDb = async (updatedContact) => {
    await supabase.from("informasi").delete().eq("kategori", "contact");
    const newContacts = [
      { kategori: "contact", judul: "address", isi: updatedContact.address },
      { kategori: "contact", judul: "phone", isi: updatedContact.phone },
      { kategori: "contact", judul: "whatsapp", isi: updatedContact.whatsapp }
    ];
    const { error } = await supabase.from("informasi").insert(newContacts);
    if (!error) await fetchData();
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        tenants,
        transactions,
        issues,
        currentUser,
        reservations,
        rules,
        faqs,
        contact,
        loginUser,
        logoutUser,
        registerUser,
        updateProfile,
        addRoom,
        updateRoom,
        deleteRoom,
        addTenant,
        updateTenant,
        deleteTenant,
        addTransaction,
        deleteTransaction,
        addIssue,
        updateIssueStatus,
        addReservation,
        updateReservationStatus,
        saveRules: saveRulesToDb,
        saveFaqs: saveFaqsToDb,
        saveContact: saveContactToDb
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp harus digunakan di dalam AppProvider");
  }
  return context;
};
