// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_ROOMS,
  INITIAL_TENANTS,
  INITIAL_TRANSACTIONS,
  INITIAL_ISSUES
} from "../config/constants";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- STATE ---
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem("eternal_rooms");
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [tenants, setTenants] = useState(() => {
    const saved = localStorage.getItem("eternal_tenants");
    return saved ? JSON.parse(saved) : INITIAL_TENANTS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("eternal_transactions");
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem("eternal_issues");
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("eternal_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users"); // Sesuai dengan Login.jsx sebelumnya
    const initialUsers = [
      { name: "Owner Ethernal", email: "owner@ethernal.com", password: "admin", role: "owner" },
      { name: "Siti Rahma", email: "siti@gmail.com", password: "user", role: "tenant", roomId: "A102" },
      { name: "Amelia Putri", email: "amelia@gmail.com", password: "user", role: "tenant", roomId: "B202" }
    ];
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("eternal_reservations");
    return saved ? JSON.parse(saved) : [];
  });

  // --- SYNC WITH LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem("eternal_rooms", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("eternal_tenants", JSON.stringify(tenants));
  }, [tenants]);

  useEffect(() => {
    localStorage.setItem("eternal_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("eternal_issues", JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("eternal_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("eternal_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("eternal_reservations", JSON.stringify(reservations));
  }, [reservations]);

  // --- AUTH ACTIONS ---
  const loginUser = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: "Email atau password salah." };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const registerUser = (name, email, password, phone = "") => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      return { success: false, message: "Email sudah terdaftar." };
    }
    const newUser = { name, email, password, role: "tenant", phone };
    setUsers([...users, newUser]);
    return { success: true };
  };

  // --- ROOM ACTIONS ---
  const addRoom = (room) => {
    setRooms([...rooms, room]);
  };

  const updateRoom = (updatedRoom) => {
    setRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  };

  const deleteRoom = (roomId) => {
    setRooms(rooms.filter((r) => r.id !== roomId));
  };

  // --- TENANT ACTIONS ---
  const addTenant = (tenant) => {
    setTenants([...tenants, tenant]);
    // Update status kamar menjadi Terisi
    if (tenant.roomId) {
      setRooms(rooms.map(r => r.id === tenant.roomId ? { ...r, status: "Terisi" } : r));
    }
  };

  const updateTenant = (updatedTenant) => {
    setTenants(tenants.map((t) => (t.id === updatedTenant.id ? updatedTenant : t)));
  };

  const deleteTenant = (tenantId) => {
    const tenant = tenants.find(t => t.id === tenantId);
    setTenants(tenants.filter((t) => t.id !== tenantId));
    // Bebaskan kamar jika ada
    if (tenant && tenant.roomId) {
      setRooms(rooms.map(r => r.id === tenant.roomId ? { ...r, status: "Tersedia" } : r));
    }
  };

  // --- TRANSACTION ACTIONS ---
  const addTransaction = (tx) => {
    const newTx = {
      id: "TX" + Date.now(),
      ...tx
    };
    setTransactions([newTx, ...transactions]);
  };

  const deleteTransaction = (txId) => {
    setTransactions(transactions.filter((t) => t.id !== txId));
  };

  // --- ISSUE ACTIONS ---
  const addIssue = (issue) => {
    const newIssue = {
      id: "IS" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      ...issue
    };
    setIssues([newIssue, ...issues]);
  };

  const updateIssueStatus = (issueId, status) => {
    setIssues(issues.map((i) => (i.id === issueId ? { ...i, status } : i)));
  };

  // --- RESERVATION ACTIONS ---
  const addReservation = (res) => {
    const newRes = {
      id: "RSV" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      status: "Menunggu Konfirmasi",
      ...res
    };
    setReservations([newRes, ...reservations]);
  };

  const updateReservationStatus = (resId, status) => {
    setReservations(reservations.map((r) => {
      if (r.id === resId) {
        // Jika disetujui, daftarkan sebagai penghuni baru secara otomatis
        if (status === "Disetujui") {
          const newTenantId = "T" + Date.now();
          const entryDate = new Date().toISOString().split("T")[0];
          // Hitung jatuh tempo sebulan berikutnya
          const nextMonth = new Date();
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          const dueDate = nextMonth.toISOString().split("T")[0];

          addTenant({
            id: newTenantId,
            name: r.name,
            email: r.email,
            phone: r.phone,
            roomId: r.roomId,
            entryDate,
            dueDate,
            status: "Aktif"
          });
        }
        return { ...r, status };
      }
      return r;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        tenants,
        transactions,
        issues,
        currentUser,
        users,
        reservations,
        loginUser,
        logoutUser,
        registerUser,
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
        updateReservationStatus
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
