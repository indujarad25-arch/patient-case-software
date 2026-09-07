import { useState, useEffect } from "react";
import { authService } from "./api/authService";
import { patientService } from "./api/patientService";
import { caseService } from "./api/caseService";
import { documentService } from "./api/documentService";
import { historyService } from "./api/historyService";
import { prescriptionService } from "./api/prescriptionService";
import { doctorAIService } from "./api/doctorAIService";
import type { Doctor, Patient, ClinicalCase, MedicalDocument, HistoryEvent, Prescription as PrescriptionType, AISource } from "./types";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("Dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [doctorProfile, setDoctorProfile] = useState<Doctor | null>(null);

  const [showQR, setShowQR] = useState(false);
  const [qrPatientId, setQrPatientId] = useState("");
  const [scannedPatient, setScannedPatient] = useState<Patient | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const [patientList, setPatientList] = useState<Patient[]>([]);

  useEffect(() => {
    if (loggedIn) {
      authService.getProfile().then((doc) => setDoctorProfile(doc)).catch(() => {});
      patientService.getPatients().then((res) => {
        if (res && res.data) setPatientList(res.data);
      }).catch(() => {});
    }
  }, [loggedIn]);

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("Please enter your Doctor ID or Email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your Password.");
      return;
    }

    try {
      setError("");
      const res = await authService.login({ identifier: email, password });
      if (res && res.doctor) {
        setDoctorProfile(res.doctor);
      }
      setLoggedIn(true);
      setPage("Dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  const handleQRSearch = async () => {
    if (!qrPatientId.trim()) return;
    try {
      const patient = await patientService.getPatient(qrPatientId.trim());
      if (patient) {
        setScannedPatient(patient);
        setShowQR(false);
        setQrPatientId("");
      } else {
        alert("Patient not found. Please check the Patient ID.");
      }
    } catch {
      const found = patientList.find(
        (p) => p.patientId.toLowerCase() === qrPatientId.trim().toLowerCase() || p.id === qrPatientId.trim()
      );
      if (found) {
        setScannedPatient(found);
        setShowQR(false);
        setQrPatientId("");
      } else {
        alert("Patient not found. Please check the Patient ID.");
      }
    }
  };

  /* =========================
     LOGIN PAGE
  ========================= */

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-50 to-indigo-100">

        {/* Header */}
        <header className="bg-gradient-to-r from-white/95 via-cyan-50/90 to-indigo-50/90 backdrop-blur-md border-b border-cyan-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-teal-200">
                🏥
              </div>

              <div>
                <h1 className="font-bold text-xl text-slate-800">
                  MediCare Hospital
                </h1>

                <p className="text-xs text-cyan-700">
                  Advanced Healthcare & Patient Care
                </p>
              </div>

            </div>

            <span className="hidden sm:block text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full font-medium">
              🟢 Emergency Care • 24/7
            </span>

          </div>
        </header>

        {/* Login Area */}
        <main className="min-h-[calc(100vh-80px)] flex items-center">

          <div className="max-w-7xl mx-auto px-6 py-10 w-full grid md:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>

              <span className="inline-block bg-white/80 backdrop-blur border border-cyan-200 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                🩺 Trusted Healthcare Platform
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-6 leading-tight">

                Smart Healthcare.

                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600">
                  Better Patient Care.
                </span>

              </h2>

              <p className="text-slate-600 text-lg mt-6 leading-relaxed max-w-xl">
                A secure digital platform for doctors to manage patient
                cases, medical history, documents and prescriptions.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">

                <Feature
                  icon="👨‍⚕️"
                  title="Doctors"
                  color="bg-gradient-to-br from-teal-50 to-emerald-100 border-teal-200"
                />

                <Feature
                  icon="🔒"
                  title="Secure"
                  color="bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200"
                />

                <Feature
                  icon="📋"
                  title="Records"
                  color="bg-gradient-to-br from-indigo-50 to-violet-100 border-indigo-200"
                />

              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">

                <span className="bg-teal-50/80 px-4 py-2 rounded-full border border-teal-200 text-teal-700">
                  ✓ Digital Records
                </span>

                <span className="bg-sky-50/80 px-4 py-2 rounded-full border border-sky-200 text-sky-700">
                  ✓ Fast Access
                </span>

                <span className="bg-violet-50/80 px-4 py-2 rounded-full border border-violet-200 text-violet-700">
                  ✓ Doctor Portal
                </span>

              </div>

            </div>

            {/* Login Card */}
            <div className="bg-gradient-to-br from-white/95 via-cyan-50/70 to-indigo-50/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-200 p-8 max-w-md w-full mx-auto">

              <div className="text-center">

                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 via-cyan-100 to-indigo-100 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-inner border border-cyan-200">
                  👨‍⚕️
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mt-4">
                  Doctor Sign In
                </h3>

                <p className="text-cyan-700 text-sm mt-2">
                  Access your hospital dashboard
                </p>

              </div>

              {error && (
                <div className="mt-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  ⚠️ {error}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="space-y-5 mt-7"
              >

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Doctor ID / Email
                  </label>

                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="doctor@medicare.com"
                    className="w-full px-4 py-3.5 border border-cyan-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white/80 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter password"
                    className="w-full px-4 py-3.5 border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 transition"
                  />
                </div>

                <div className="flex justify-end">

                  <button
                    type="button"
                    className="text-sm text-indigo-700 hover:text-indigo-900 hover:underline"
                  >
                    Forgot Password?
                  </button>

                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600 hover:from-teal-700 hover:via-cyan-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-cyan-200 transition transform hover:-translate-y-0.5"
                >
                  Sign In →
                </button>

              </form>

              <div className="mt-6 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 rounded-xl p-4 text-sm">

                <p className="font-bold text-amber-800">
                  Demo Login
                </p>

                <p className="text-amber-700 mt-1">
                  Doctor ID: doctor@medicare.com
                </p>

                <p className="text-amber-700">
                  Password: doctor123
                </p>

              </div>

              <p className="text-center text-xs text-slate-400 mt-5">
                🔒 Authorized hospital personnel only
              </p>

            </div>

          </div>

        </main>

      </div>
    );
  }

  const doctorName = doctorProfile ? doctorProfile.name : "Dr. Rajesh Sharma";
  const doctorSpec = doctorProfile ? doctorProfile.specialization : "General Cardiology & Internal Medicine";

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-indigo-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-white via-cyan-50/80 to-indigo-50/90 backdrop-blur-xl border-r border-cyan-200 hidden md:block shadow-sm">

        <div className="p-5 border-b border-cyan-200">

          <div className="flex gap-3 items-center">

            <div className="w-11 h-11 bg-gradient-to-br from-teal-600 to-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-md">
              🏥
            </div>

            <div>
              <b className="text-slate-800">MediCare Hospital</b>

              <p className="text-xs text-cyan-600 mt-0.5">
                Doctor Portal
              </p>
            </div>

          </div>

        </div>

        <nav className="p-4 space-y-1.5">

          {[
            ["Dashboard", "📊"],
            ["Patients", "👥"],
            ["New Case", "➕"],
            ["Cases", "📋"],
            ["Documents", "📁"],
            ["History", "🕒"],
            ["Prescriptions", "💊"],
            ["AI Assistant", "🤖"],
            ["Profile", "👨‍⚕️"],
          ].map(([name, icon]) => (

            <button
              key={name}
              onClick={() => setPage(name)}
              className={`w-full text-left px-4 py-3 rounded-xl flex gap-3 items-center transition-all ${
                page === name
                  ? name === "AI Assistant"
                    ? "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 font-semibold border border-purple-200 shadow-sm"
                    : name === "Prescriptions"
                    ? "bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 font-semibold border border-pink-200 shadow-sm"
                    : name === "Patients"
                    ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 font-semibold border border-blue-200 shadow-sm"
                    : name === "New Case"
                    ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 font-semibold border border-orange-200 shadow-sm"
                    : name === "Documents"
                    ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 font-semibold border border-amber-200 shadow-sm"
                    : name === "History"
                    ? "bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 font-semibold border border-cyan-200 shadow-sm"
                    : name === "Profile"
                    ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 font-semibold border border-rose-200 shadow-sm"
                    : "bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 font-semibold border border-teal-200 shadow-sm"
                  : "text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
              }`}
            >
              <span className="text-lg">{icon}</span>
              {name}
            </button>

          ))}

        </nav>

        <div className="p-4 mt-5">

          <button
            onClick={() => {
              authService.logout().catch(() => {});
              setLoggedIn(false);
              setEmail("");
              setPassword("");
              setPage("Dashboard");
            }}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-600 hover:from-red-100 hover:to-rose-100 border border-red-200 transition font-medium"
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">

        <header className="bg-gradient-to-r from-white/95 via-cyan-50/80 to-indigo-50/90 backdrop-blur-xl border-b border-cyan-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">

          <div>

            <h1 className="text-xl font-bold text-slate-800">
              {page}
            </h1>

            <p className="text-sm text-cyan-700">
              MediCare Hospital • Doctor Portal
            </p>

          </div>

          {/* Doctor Profile + Options */}
          <div className="flex items-center gap-3 relative">

            <div className="hidden sm:block text-right">

              <p className="font-semibold text-slate-800">
                {doctorName}
              </p>

              <p className="text-xs text-teal-600">
                {doctorSpec}
              </p>

            </div>

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200 flex items-center justify-center text-xl overflow-hidden">
              {doctorProfile?.avatar ? (
                <img src={doctorProfile.avatar} alt="Doctor" className="w-full h-full object-cover" />
              ) : (
                "👩‍⚕️"
              )}
            </div>

            <button
              onClick={() => setShowOptions(!showOptions)}
              className="ml-1 px-3 py-2.5 rounded-xl bg-gradient-to-br from-cyan-50 to-indigo-50 border border-cyan-200 text-cyan-700 hover:from-cyan-100 hover:to-indigo-100 font-medium transition"
            >
              ⋮
            </button>

            {/* OPTIONS POPUP */}
            {showOptions && (
              <div className="absolute right-0 top-14 w-52 bg-gradient-to-br from-white to-cyan-50 border border-cyan-200 rounded-2xl shadow-2xl z-50 p-2">

                <div className="px-4 py-3 border-b border-cyan-100 mb-1">
                  <p className="text-xs text-slate-400">
                    ACCOUNT
                  </p>
                  <p className="font-semibold text-slate-800">
                    {doctorName}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setPage("Profile");
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-rose-50 text-slate-700 transition"
                >
                  👨‍⚕️ Profile
                </button>

                <button
                  onClick={() => {
                    setPage("AI Assistant");
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-purple-50 text-slate-700 transition"
                >
                  🤖 AI Assistant
                </button>

                <button
                  onClick={() => {
                    authService.logout().catch(() => {});
                    setLoggedIn(false);
                    setEmail("");
                    setPassword("");
                    setPage("Dashboard");
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition"
                >
                  🚪 Logout
                </button>

              </div>
            )}

          </div>

        </header>

        <div className="p-4 md:p-6 min-h-[calc(100vh-80px)]">

          {/* Dashboard */}
          {page === "Dashboard" && (
            <Dashboard
              setPage={setPage}
              setShowQR={setShowQR}
              doctorName={doctorName}
            />
          )}

          {page === "Patients" && <Patients />}

          {page === "New Case" && <NewCase setPage={setPage} />}

          {page === "Cases" && <CasesView setPage={setPage} />}

          {page === "Documents" && <DocumentsView />}

          {page === "History" && <HistoryView />}

          {page === "Prescriptions" && <PrescriptionView />}

          {page === "AI Assistant" && <AIAssistantView />}

          {page === "Profile" && <ProfileView doctor={doctorProfile} setDoctor={setDoctorProfile} />}

          {scannedPatient && (
            <div className="mt-6">
              <ScannedPatient
                patient={scannedPatient}
                onClose={() => setScannedPatient(null)}
              />
            </div>
          )}

        </div>

      </main>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-indigo-950/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">

          <div className="bg-gradient-to-br from-white via-cyan-50/60 to-indigo-50/70 border border-cyan-200 rounded-3xl p-7 max-w-md w-full shadow-2xl">

            <div className="text-center">

              <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-indigo-100 rounded-2xl mx-auto flex items-center justify-center text-4xl border border-cyan-200">
                📱
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mt-5">
                Scan Patient QR
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Enter the Patient ID stored in the patient's QR code.
              </p>

            </div>

            <div className="mt-6">

              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Patient ID
              </label>

              <input
                value={qrPatientId}
                onChange={(e) => setQrPatientId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleQRSearch();
                  }
                }}
                placeholder="Example: PT-1001"
                className="w-full border border-cyan-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition"
              />

            </div>

            <div className="flex gap-3 mt-5">

              <button
                onClick={handleQRSearch}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-md transition"
              >
                🔍 Find Patient
              </button>

              <button
                onClick={() => {
                  setShowQR(false);
                  setQrPatientId("");
                }}
                className="px-5 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium text-slate-600 transition"
              >
                Cancel
              </button>

            </div>

            <div className="mt-5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 text-sm">

              <p className="font-semibold text-amber-800">
                Demo QR Patient IDs
              </p>

              <p className="text-amber-700 mt-2">
                PT-1001 • PT-1002 • PT-1003
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================
   SCANNED PATIENT
========================= */

function ScannedPatient({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  return (
    <div className="bg-gradient-to-br from-white via-cyan-50/50 to-teal-50/60 border border-cyan-200 rounded-2xl p-6 max-w-3xl shadow-lg">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Patient Information
          </h2>

          <p className="text-sm text-cyan-700 mt-1">
            Information retrieved using Patient QR
          </p>
        </div>

        <button
          onClick={onClose}
          className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl font-medium text-slate-600"
        >
          ← Back
        </button>

      </div>

      <div className="mt-6 bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl overflow-hidden">
            {patient.photo ? (
              <img src={patient.photo} alt={patient.fullName} className="w-full h-full object-cover" />
            ) : (
              "👤"
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold">
              {patient.fullName}
            </h3>

            <p className="text-cyan-100">
              {patient.patientId}
            </p>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-6">

        <PatientInfo title="Patient ID" value={patient.patientId} />

        <PatientInfo title="Patient Name" value={patient.fullName} />

        <PatientInfo
          title="Age"
          value={`${patient.age} years`}
        />

        <PatientInfo title="Gender" value={patient.gender} />

        <PatientInfo
          title="Medical Condition"
          value={patient.bloodGroup ? `Blood Group: ${patient.bloodGroup}` : "Active"}
        />

        <PatientInfo
          title="Record Status"
          value={patient.status || "Active"}
        />

      </div>

      <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">

        <p className="text-emerald-700 text-sm font-medium">
          ✓ Patient information successfully retrieved from Express Backend API.
        </p>

      </div>

    </div>
  );
}

function PatientInfo({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gradient-to-br from-white to-cyan-50 border border-cyan-100 rounded-xl p-4 hover:border-cyan-300 transition">

      <p className="text-sm text-cyan-700">
        {title}
      </p>

      <p className="font-semibold mt-1 text-slate-800">
        {value}
      </p>

    </div>
  );
}

/* =========================
   FEATURE
========================= */

function Feature({
  icon,
  title,
  color,
}: {
  icon: string;
  title: string;
  color: string;
}) {
  return (
    <div className={`${color} border rounded-2xl p-4 shadow-sm hover:shadow-md transition`}>

      <div className="text-2xl mb-2">
        {icon}
      </div>

      <b className="text-slate-800">
        {title}
      </b>

      <p className="text-xs text-slate-500 mt-1">
        Healthcare
      </p>

    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({
  setPage,
  setShowQR,
  doctorName,
}: {
  setPage: (page: string) => void;
  setShowQR: (value: boolean) => void;
  doctorName: string;
}) {
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);

  useEffect(() => {
    patientService.getPatients({ limit: 5 }).then((res) => {
      if (res && res.data) setRecentPatients(res.data);
    }).catch(() => {});
  }, []);

  return (
    <>

      <div className="mb-7">

        <div className="flex flex-wrap justify-between items-end gap-4">

          <div>
            <p className="text-sm font-medium text-teal-600 mb-1">
              OVERVIEW
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Welcome, {doctorName} 👋
            </h2>

            <p className="text-slate-500 mt-1">
              Here's what's happening in your hospital today.
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 border border-cyan-200 rounded-xl px-4 py-3 shadow-sm">
            <p className="text-xs text-cyan-600">
              TODAY
            </p>
            <p className="font-semibold text-slate-700">
              06 September 2026
            </p>
          </div>

        </div>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <Stat
          title="Total Patients"
          value="1,248"
          icon="👥"
          color="bg-gradient-to-br from-teal-500 to-emerald-600"
        />

        <Stat
          title="Today's Cases"
          value="24"
          icon="📋"
          color="bg-gradient-to-br from-blue-500 to-cyan-600"
        />

        <Stat
          title="Pending Reviews"
          value="8"
          icon="⏳"
          color="bg-gradient-to-br from-amber-400 to-orange-500"
        />

        <Stat
          title="Prescriptions"
          value="32"
          icon="💊"
          color="bg-gradient-to-br from-purple-500 to-fuchsia-600"
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">

        <div className="lg:col-span-2 bg-gradient-to-br from-white via-cyan-50/50 to-blue-50/60 border border-cyan-200 rounded-2xl p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <div>
              <h2 className="font-bold text-lg text-slate-800">
                Recent Patients
              </h2>

              <p className="text-xs text-cyan-600 mt-1">
                Recently accessed patient records from Express Backend
              </p>
            </div>

            <button
              onClick={() => setPage("Patients")}
              className="text-blue-700 text-sm font-semibold hover:text-blue-900"
            >
              View all →
            </button>

          </div>

          <div className="mt-5 space-y-3">

            {recentPatients.map((p) => (

              <div
                key={p.id}
                className="flex justify-between items-center border border-cyan-100 rounded-xl p-4 hover:bg-cyan-50 hover:border-cyan-200 transition"
              >

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center overflow-hidden">
                    {p.photo ? (
                      <img src={p.photo} alt={p.fullName} className="w-full h-full object-cover" />
                    ) : (
                      "👤"
                    )}
                  </div>

                  <div>
                    <b className="text-slate-800">
                      {p.fullName}
                    </b>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {p.patientId} • {p.age} years • {p.gender}
                    </p>
                  </div>

                </div>

                <span className="text-xs sm:text-sm bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-full font-medium">
                  {p.bloodGroup ? `Blood: ${p.bloodGroup}` : p.status}
                </span>

              </div>

            ))}

          </div>

        </div>

        <div className="bg-gradient-to-br from-teal-700 via-cyan-700 to-indigo-700 text-white rounded-2xl p-6 shadow-xl">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center text-xl">
              ⚡
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Quick Actions
              </h2>

              <p className="text-cyan-100 text-xs">
                Common doctor actions
              </p>
            </div>

          </div>

          <div className="space-y-3 mt-5">

            <button
              onClick={() => setPage("New Case")}
              className="w-full bg-white text-teal-700 py-3 rounded-xl font-semibold hover:bg-orange-50 transition"
            >
              ➕ Create New Case
            </button>

            <button
              onClick={() => setPage("Patients")}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/10 py-3 rounded-xl transition"
            >
              👥 Search Patients
            </button>

            <button
              onClick={() => setShowQR(true)}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/10 py-3 rounded-xl transition"
            >
              📱 Scan Patient QR
            </button>

            <button
              onClick={() => setPage("Prescriptions")}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/10 py-3 rounded-xl transition"
            >
              💊 Prescriptions
            </button>

          </div>

        </div>

      </div>

    </>
  );
}

/* =========================
   STAT
========================= */

function Stat({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-cyan-50 border border-cyan-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

          <p className="text-xs text-emerald-600 mt-2">
            ↑ Active records
          </p>

        </div>

        <span
          className={`text-2xl w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${color}`}
        >
          {icon}
        </span>

      </div>

    </div>
  );
}

/* =========================
   PATIENTS
========================= */

function Patients() {
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  const loadPatients = (q?: string) => {
    patientService.getPatients({ query: q }).then((res) => {
      if (res && res.data) setPatientsList(res.data);
    }).catch(() => {});
  };

  useEffect(() => {
    loadPatients(search);
  }, [search]);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/70 border border-blue-200 rounded-2xl p-6 shadow-sm">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

        <div>
          <p className="text-sm font-medium text-blue-600">
            PATIENT MANAGEMENT
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-1">
            Patient Records
          </h2>

          <p className="text-sm text-slate-500">
            Search and manage registered patients (Express API connected).
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search patient..."
          className="border border-blue-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white w-full md:w-64"
        />

      </div>

      <div className="overflow-x-auto rounded-xl border border-blue-200">

        <table className="w-full text-left">

          <thead className="bg-gradient-to-r from-blue-100 to-cyan-100">

            <tr>

              <th className="p-4 text-blue-800 text-sm">
                Patient ID
              </th>

              <th className="p-4 text-blue-800 text-sm">
                Name
              </th>

              <th className="p-4 text-blue-800 text-sm">
                Age
              </th>

              <th className="p-4 text-blue-800 text-sm">
                Gender
              </th>

              <th className="p-4 text-blue-800 text-sm">
                Condition / Blood Group
              </th>

            </tr>

          </thead>

          <tbody>

            {patientsList.map((p) => (

              <tr
                key={p.id}
                className="border-t border-blue-100 hover:bg-blue-50 transition"
              >

                <td className="p-4 text-blue-700 font-semibold">
                  {p.patientId}
                </td>

                <td className="p-4 font-medium text-slate-800">
                  {p.fullName}
                </td>

                <td className="p-4 text-slate-600">
                  {p.age}
                </td>

                <td className="p-4 text-slate-600">
                  {p.gender}
                </td>

                <td className="p-4">

                  <span className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-full text-sm font-medium">
                    {p.bloodGroup ? `Blood: ${p.bloodGroup}` : p.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* =========================
   NEW CASE
========================= */

function NewCase({ setPage }: { setPage: (p: string) => void }) {
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [duration, setDuration] = useState("");
  const [bp, setBp] = useState("");
  const [temp, setTemp] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chiefComplaint.trim()) {
      alert("Please enter chief complaint.");
      return;
    }
    setLoading(true);
    try {
      await caseService.createCase({
        patientId: patientId || "pt_1001",
        patientName: patientName || "Arun Kumar",
        chiefComplaint,
        duration,
        examinationFindings: `BP: ${bp || '120/80 mmHg'}, Temp: ${temp || '98.6 F'}`,
        additionalNotes: notes,
        status: 'Draft'
      });
      alert("Clinical case saved successfully to backend!");
      setPage("Cases");
    } catch (err) {
      alert("Error saving case to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white via-orange-50/40 to-amber-50/60 border border-orange-200 rounded-2xl p-6 shadow-sm">

      <p className="text-sm font-medium text-orange-600">
        CLINICAL DOCUMENTATION
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-1">
        New Clinical Case
      </h2>

      <p className="text-slate-500 mt-1">
        Enter patient consultation details (Saves directly to Express API).
      </p>

      <div className="grid md:grid-cols-2 gap-5 mt-7">

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Patient Name</label>
          <input
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name"
            className="w-full border border-cyan-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Patient ID</label>
          <input
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="PT-1001"
            className="w-full border border-cyan-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Chief Complaint</label>
          <input
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            placeholder="Main complaint"
            className="w-full border border-cyan-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Duration</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 3 days"
            className="w-full border border-cyan-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Blood Pressure</label>
          <input
            value={bp}
            onChange={(e) => setBp(e.target.value)}
            placeholder="120/80 mmHg"
            className="w-full border border-cyan-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Temperature</label>
          <input
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder="98.6 °F"
            className="w-full border border-cyan-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition"
          />
        </div>

      </div>

      <div className="mt-6">

        <label className="block text-sm font-semibold mb-2 text-orange-800">
          Clinical Notes
        </label>

        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter clinical case notes..."
          className="w-full border border-orange-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition"
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50"
      >
        {loading ? "Saving Case..." : "Save Clinical Case →"}
      </button>

    </form>
  );
}

/* =========================
   CASES VIEW
========================= */

function CasesView({ setPage }: { setPage: (p: string) => void }) {
  const [cases, setCases] = useState<ClinicalCase[]>([]);

  useEffect(() => {
    caseService.getCases().then((res) => {
      if (res) setCases(res);
    }).catch(() => {});
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-amber-50/50 to-orange-50/60 border border-orange-200 rounded-2xl p-6 shadow-sm">

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm font-medium text-orange-600">CLINICAL RECORDS</p>
          <h2 className="text-xl font-bold text-slate-800 mt-1">Clinical Cases</h2>
          <p className="text-sm text-slate-500">Live patient clinical case files from Express Backend.</p>
        </div>

        <button
          onClick={() => setPage("New Case")}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition"
        >
          ➕ New Case
        </button>
      </div>

      <div className="space-y-4">
        {cases.map((c) => (
          <div key={c.id} className="border border-orange-100 bg-white rounded-xl p-5 hover:border-orange-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold">
                  {c.caseNumber}
                </span>
                <h3 className="font-bold text-slate-800 text-lg mt-2">{c.patientName}</h3>
                <p className="text-sm text-slate-600 mt-1"><b>Chief Complaint:</b> {c.chiefComplaint}</p>
                {c.examinationFindings && (
                  <p className="text-xs text-slate-500 mt-1"><b>Examination:</b> {c.examinationFindings}</p>
                )}
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                c.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* =========================
   DOCUMENTS VIEW
========================= */

function DocumentsView() {
  const [docs, setDocs] = useState<MedicalDocument[]>([]);
  const [uploading, setUploading] = useState(false);

  const loadDocs = () => {
    documentService.getDocuments().then((res) => {
      if (res) setDocs(res);
    }).catch(() => {});
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await documentService.uploadDocument(
        {
          documentName: file.name,
          documentType: 'Lab Report',
          patientId: 'pt_1001',
          patientName: 'Arun Kumar'
        },
        file
      );
      alert('Document uploaded successfully to Express Backend!');
      loadDocs();
    } catch {
      alert('Error uploading document.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-amber-50/50 to-yellow-50/70 border border-amber-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm font-medium text-amber-600">MEDICAL RECORDS</p>
          <h2 className="text-xl font-bold text-slate-800 mt-1">Medical Documents</h2>
          <p className="text-sm text-slate-500">Patient lab reports, scans & digital documents.</p>
        </div>

        <label className="cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition">
          {uploading ? "Uploading..." : "📁 Upload Document"}
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {docs.map((d) => (
          <div key={d.id} className="border border-amber-200 bg-white rounded-xl p-5 hover:border-amber-400 transition">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center text-2xl">
                📄
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{d.documentName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{d.patientName} • {d.documentType} • {d.fileSize}</p>
                {d.extractedInfo && (
                  <p className="text-xs text-amber-900 bg-amber-50 border border-amber-100 rounded-lg p-2 mt-2">
                    {d.extractedInfo}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   HISTORY VIEW
========================= */

function HistoryView() {
  const [history, setHistory] = useState<HistoryEvent[]>([]);

  useEffect(() => {
    historyService.getHistory('pt_1001').then((res) => {
      if (res) setHistory(res);
    }).catch(() => {});
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-cyan-50/50 to-sky-50/70 border border-cyan-200 rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium text-cyan-600">CONSULTATION TIMELINE</p>
        <h2 className="text-xl font-bold text-slate-800 mt-1">Medical History</h2>
        <p className="text-sm text-slate-500">Chronological history events from Express Backend.</p>
      </div>

      <div className="space-y-4">
        {history.map((h) => (
          <div key={h.id} className="border border-cyan-100 bg-white rounded-xl p-5 flex gap-4 items-start hover:border-cyan-300 transition">
            <div className="w-10 h-10 bg-cyan-100 text-cyan-800 rounded-full flex items-center justify-center text-lg">
              🕒
            </div>
            <div>
              <span className="text-xs text-cyan-600 font-semibold">{h.date}</span>
              <h3 className="font-bold text-slate-800 text-base mt-0.5">{h.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{h.description}</p>
              <p className="text-xs text-slate-400 mt-1"><b>Doctor:</b> {h.doctor} • {h.hospital}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   PRESCRIPTION VIEW
========================= */

function PrescriptionView() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionType[]>([]);
  const [patientId, setPatientId] = useState("PT-1001");
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const loadPrescriptions = () => {
    prescriptionService.getPrescriptions().then((res) => {
      if (res) setPrescriptions(res);
    }).catch(() => {});
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicine.trim()) {
      alert("Please enter medicine name.");
      return;
    }
    setLoading(true);
    try {
      await prescriptionService.createPrescription({
        patientId: patientId || "pt_1001",
        patientName: "Arun Kumar",
        medicines: [
          {
            id: `med-${Date.now()}`,
            medicineName: medicine,
            dosage: dosage || "5mg",
            frequency: "1-0-1",
            duration: duration || "30 Days",
            instructions: "Take after food"
          }
        ],
        notes: "Take regularly as prescribed.",
        status: "Confirmed"
      });
      alert("Prescription created successfully on Express Backend!");
      setMedicine("");
      setDosage("");
      setDuration("");
      loadPrescriptions();
    } catch {
      alert("Error creating prescription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreatePrescription} className="bg-gradient-to-br from-white via-pink-50/50 to-purple-50/70 border border-pink-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl border border-pink-200">
            💊
          </div>
          <div>
            <p className="text-sm font-medium text-pink-600">MEDICATION</p>
            <h2 className="text-xl font-bold text-slate-800">Prescriptions</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-7">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Patient ID</label>
            <input
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="PT-1001"
              className="w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Medicine</label>
            <input
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              placeholder="Medicine name"
              className="w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Dosage</label>
            <input
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Dosage"
              className="w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Duration</label>
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration"
              className="w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Prescription →"}
        </button>
      </form>

      <div className="bg-white border border-pink-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Active Prescriptions</h3>
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="border border-pink-100 rounded-xl p-4 bg-pink-50/40">
              <div className="flex justify-between items-center">
                <span className="font-bold text-pink-700">{rx.prescriptionNumber}</span>
                <span className="text-xs bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-semibold">{rx.status}</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 mt-2">Patient: {rx.patientName}</p>
              <div className="mt-2 space-y-1">
                {rx.medicines?.map((m) => (
                  <p key={m.id} className="text-xs text-slate-600">
                    • <b>{m.medicineName}</b> ({m.dosage}) - {m.frequency} for {m.duration}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================
   AI ASSISTANT VIEW
========================= */

function AIAssistantView() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<AISource[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await doctorAIService.query({
        patientId: "pt_1001",
        question: question.trim()
      });
      if (res) {
        setAnswer(res.answer);
        setSources(res.sources || []);
      }
    } catch {
      setAnswer("Error connecting to Doctor AI Assistant API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/70 border border-purple-200 rounded-2xl p-6 max-w-3xl shadow-sm">

      <div className="flex gap-4 items-center">

        <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center text-2xl border border-purple-200">
          🤖
        </div>

        <div>

          <p className="text-sm font-medium text-purple-600">
            SMART ASSISTANCE
          </p>

          <h2 className="text-xl font-bold text-slate-800">
            Doctor AI Assistant
          </h2>

          <p className="text-sm text-slate-500">
            Patient record assistance (Connected to Express AI API)
          </p>

        </div>

      </div>

      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 mt-6 min-h-40">

        <div className="flex gap-3">

          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200 rounded-full flex items-center justify-center shrink-0">
            🤖
          </div>

          <div className="text-purple-900 text-sm pt-1 space-y-3">
            {loading ? (
              <p className="animate-pulse">Thinking and querying patient records...</p>
            ) : answer ? (
              <>
                <p className="leading-relaxed font-medium">{answer}</p>
                {sources.length > 0 && (
                  <div className="mt-3 border-t border-purple-200 pt-2">
                    <p className="text-xs font-semibold text-purple-700 mb-1">Sources Reference:</p>
                    <ul className="text-xs space-y-1">
                      {sources.map((s, idx) => (
                        <li key={idx} className="bg-purple-100/70 px-2.5 py-1 rounded-md">
                          📌 {s.type}: {s.title} ({s.date || 'Record'})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p className="text-purple-700">
                Ask a clinical question about patient records (e.g. "What is the patient blood pressure?", "Check Penicillin allergy", or "Lipid lab report").
              </p>
            )}
          </div>

        </div>

      </div>

      <div className="flex gap-3 mt-5">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Ask about a patient record..."
          className="flex-1 border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 rounded-xl font-semibold shadow-md transition disabled:opacity-50"
        >
          {loading ? "Asking..." : "Send"}
        </button>

      </div>

    </div>
  );
}

/* =========================
   PROFILE VIEW
========================= */

function ProfileView({ doctor, setDoctor }: { doctor: Doctor | null; setDoctor: (d: Doctor) => void }) {
  const [name, setName] = useState(doctor?.name || "Dr. Rajesh Sharma");
  const [email, setEmail] = useState(doctor?.email || "doctor@medicare.com");
  const [phone, setPhone] = useState(doctor?.mobile || "+91 98765 43210");
  const [department, setDepartment] = useState(doctor?.department || "Cardiology Department");
  const [hospital, setHospital] = useState(doctor?.hospital || "MediCare Super Speciality Hospital");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...(doctor || {
        id: "DOC-101",
        specialization: "General Cardiology & Internal Medicine",
        licenseNumber: "MCI-2015-884920",
        hospitalId: "HOSP-4002",
        role: "doctor" as const
      }),
      name,
      email,
      mobile: phone,
      department,
      hospital
    };
    setDoctor(updated);
    alert("Profile updated successfully!");
  };

  return (
    <form onSubmit={handleUpdate} className="bg-gradient-to-br from-white via-rose-50/50 to-pink-50/70 border border-rose-200 rounded-2xl p-6 max-w-2xl shadow-sm">

      <div className="flex gap-5 items-center">

        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-4xl border border-rose-200 overflow-hidden">
          {doctor?.avatar ? (
            <img src={doctor.avatar} alt="Doctor" className="w-full h-full object-cover" />
          ) : (
            "👩‍⚕️"
          )}
        </div>

        <div>

          <p className="text-sm font-medium text-rose-600">
            DOCTOR PROFILE
          </p>

          <h2 className="text-2xl font-bold text-slate-800">
            {name}
          </h2>

          <p className="text-rose-600 font-medium">
            {doctor?.specialization || "General Physician"}
          </p>

          <p className="text-sm text-slate-400 mt-1">
            Doctor ID: {doctor?.id || "DOC-101"}
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-8">

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Doctor Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-rose-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-rose-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-rose-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Department</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border border-rose-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Hospital</label>
          <input
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            className="w-full border border-rose-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white transition"
          />
        </div>

      </div>

      <button type="submit" className="mt-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
        Update Profile →
      </button>

    </form>
  );
}

export default App;