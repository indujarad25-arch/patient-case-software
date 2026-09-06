import { useState } from "react";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
};

const patients: Patient[] = [
  {
    id: "PT-1001",
    name: "Arun Kumar",
    age: 42,
    gender: "Male",
    condition: "Hypertension",
  },
  {
    id: "PT-1002",
    name: "Priya Sharma",
    age: 29,
    gender: "Female",
    condition: "Migraine",
  },
  {
    id: "PT-1003",
    name: "Rahul Raj",
    age: 35,
    gender: "Male",
    condition: "Diabetes",
  },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("Dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showQR, setShowQR] = useState(false);
  const [qrPatientId, setQrPatientId] = useState("");
  const [scannedPatient, setScannedPatient] = useState<Patient | null>(null);

  const [showOptions, setShowOptions] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      setError("Please enter your Doctor ID or Email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your Password.");
      return;
    }

    setError("");
    setLoggedIn(true);
    setPage("Dashboard");
  };

  const handleQRSearch = () => {
    const patient = patients.find(
      (p) => p.id.toLowerCase() === qrPatientId.trim().toLowerCase()
    );

    if (patient) {
      setScannedPatient(patient);
      setShowQR(false);
      setQrPatientId("");
    } else {
      alert("Patient not found. Please check the Patient ID.");
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
                Dr. Ananya Kumar
              </p>

              <p className="text-xs text-teal-600">
                General Physician
              </p>

            </div>

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200 flex items-center justify-center text-xl">
              👩‍⚕️
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
                    Dr. Ananya Kumar
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
            />
          )}

          {page === "Patients" && <Patients />}

          {page === "New Case" && <NewCase />}

          {page === "Cases" && (
            <InfoPage
              title="Clinical Cases"
              icon="📋"
              text="View and manage patient clinical case records."
            />
          )}

          {page === "Documents" && (
            <InfoPage
              title="Medical Documents"
              icon="📁"
              text="Manage patient reports, scans and medical documents."
            />
          )}

          {page === "History" && (
            <InfoPage
              title="Medical History"
              icon="🕒"
              text="View patient medical history and previous consultations."
            />
          )}

          {page === "Prescriptions" && <Prescription />}

          {page === "AI Assistant" && <AIAssistant />}

          {page === "Profile" && <Profile />}

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

          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>

          <div>
            <h3 className="text-xl font-bold">
              {patient.name}
            </h3>

            <p className="text-cyan-100">
              {patient.id}
            </p>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-6">

        <PatientInfo title="Patient ID" value={patient.id} />

        <PatientInfo title="Patient Name" value={patient.name} />

        <PatientInfo
          title="Age"
          value={`${patient.age} years`}
        />

        <PatientInfo title="Gender" value={patient.gender} />

        <PatientInfo
          title="Medical Condition"
          value={patient.condition}
        />

        <PatientInfo
          title="Record Status"
          value="Active"
        />

      </div>

      <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">

        <p className="text-emerald-700 text-sm font-medium">
          ✓ Patient information successfully retrieved.
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
}: {
  setPage: (page: string) => void;
  setShowQR: (value: boolean) => void;
}) {
  return (
    <>

      <div className="mb-7">

        <div className="flex flex-wrap justify-between items-end gap-4">

          <div>
            <p className="text-sm font-medium text-teal-600 mb-1">
              OVERVIEW
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Good Morning, Dr. Ananya 👋
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
                Recently accessed patient records
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

            {patients.map((p) => (

              <div
                key={p.id}
                className="flex justify-between items-center border border-cyan-100 rounded-xl p-4 hover:bg-cyan-50 hover:border-cyan-200 transition"
              >

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                    👤
                  </div>

                  <div>
                    <b className="text-slate-800">
                      {p.name}
                    </b>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {p.id} • {p.age} years • {p.gender}
                    </p>
                  </div>

                </div>

                <span className="text-xs sm:text-sm bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-full font-medium">
                  {p.condition}
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
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    `${p.name} ${p.id} ${p.condition}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
            Search and manage registered patients.
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
                Condition
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((p) => (

              <tr
                key={p.id}
                className="border-t border-blue-100 hover:bg-blue-50 transition"
              >

                <td className="p-4 text-blue-700 font-semibold">
                  {p.id}
                </td>

                <td className="p-4 font-medium text-slate-800">
                  {p.name}
                </td>

                <td className="p-4 text-slate-600">
                  {p.age}
                </td>

                <td className="p-4 text-slate-600">
                  {p.gender}
                </td>

                <td className="p-4">

                  <span className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-full text-sm font-medium">
                    {p.condition}
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

function NewCase() {
  return (
    <div className="bg-gradient-to-br from-white via-orange-50/40 to-amber-50/60 border border-orange-200 rounded-2xl p-6 shadow-sm">

      <p className="text-sm font-medium text-orange-600">
        CLINICAL DOCUMENTATION
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-1">
        New Clinical Case
      </h2>

      <p className="text-slate-500 mt-1">
        Enter patient consultation details.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mt-7">

        <Input label="Patient Name" placeholder="Enter patient name" />

        <Input label="Patient ID" placeholder="PT-XXXX" />

        <Input label="Chief Complaint" placeholder="Main complaint" />

        <Input label="Duration" placeholder="e.g. 3 days" />

        <Input label="Blood Pressure" placeholder="120/80 mmHg" />

        <Input label="Temperature" placeholder="98.6 °F" />

      </div>

      <div className="mt-6">

        <label className="block text-sm font-semibold mb-2 text-orange-800">
          Clinical Notes
        </label>

        <textarea
          rows={5}
          placeholder="Enter clinical case notes..."
          className="w-full border border-orange-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition"
        />

      </div>

      <button className="mt-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
        Save Clinical Case →
      </button>

    </div>
  );
}

/* =========================
   INPUT
========================= */

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>

      <label className="block text-sm font-semibold mb-2 text-slate-700">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="w-full border border-cyan-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition"
      />

    </div>
  );
}

/* =========================
   INFO PAGE
========================= */

function InfoPage({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) {
  const isDocuments = title === "Medical Documents";
  const isHistory = title === "Medical History";

  return (
    <div
      className={`${
        isDocuments
          ? "bg-gradient-to-br from-white via-amber-50/50 to-yellow-50/70 border-amber-200"
          : isHistory
          ? "bg-gradient-to-br from-white via-cyan-50/50 to-sky-50/70 border-cyan-200"
          : "bg-gradient-to-br from-white via-violet-50/50 to-indigo-50/70 border-violet-200"
      } border rounded-2xl p-10 text-center shadow-sm`}
    >

      <div
        className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-5xl ${
          isDocuments
            ? "bg-gradient-to-br from-amber-100 to-yellow-100 border border-amber-200"
            : isHistory
            ? "bg-gradient-to-br from-cyan-100 to-sky-100 border border-cyan-200"
            : "bg-gradient-to-br from-violet-100 to-indigo-100 border border-violet-200"
        }`}
      >
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mt-5">
        {title}
      </h2>

      <p className="text-slate-500 mt-2 max-w-md mx-auto">
        {text}
      </p>

      <button
        className={`mt-6 text-white px-6 py-3 rounded-xl font-semibold shadow-md ${
          isDocuments
            ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
            : isHistory
            ? "bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700"
            : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
        }`}
      >
        Add Record →
      </button>

    </div>
  );
}

/* =========================
   PRESCRIPTION
========================= */

function Prescription() {
  return (
    <div className="bg-gradient-to-br from-white via-pink-50/50 to-purple-50/70 border border-pink-200 rounded-2xl p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl border border-pink-200">
          💊
        </div>

        <div>
          <p className="text-sm font-medium text-pink-600">
            MEDICATION
          </p>

          <h2 className="text-xl font-bold text-slate-800">
            Prescriptions
          </h2>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-7">

        <Input label="Patient ID" placeholder="PT-1001" />

        <Input label="Medicine" placeholder="Medicine name" />

        <Input label="Dosage" placeholder="Dosage" />

        <Input label="Duration" placeholder="Duration" />

      </div>

      <button className="mt-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md">
        Create Prescription →
      </button>

    </div>
  );
}

/* =========================
   AI ASSISTANT
========================= */

function AIAssistant() {
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
            Patient record assistance
          </p>

        </div>

      </div>

      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 mt-6 min-h-40">

        <div className="flex gap-3">

          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200 rounded-full flex items-center justify-center">
            🤖
          </div>

          <p className="text-purple-700 text-sm pt-1">
            AI responses will appear here when the backend AI service is
            connected.
          </p>

        </div>

      </div>

      <div className="flex gap-3 mt-5">

        <input
          placeholder="Ask about a patient record..."
          className="flex-1 border border-purple-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition"
        />

        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 rounded-xl font-semibold shadow-md">
          Send
        </button>

      </div>

    </div>
  );
}

/* =========================
   PROFILE
========================= */

function Profile() {
  return (
    <div className="bg-gradient-to-br from-white via-rose-50/50 to-pink-50/70 border border-rose-200 rounded-2xl p-6 max-w-2xl shadow-sm">

      <div className="flex gap-5 items-center">

        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-4xl border border-rose-200">
          👩‍⚕️
        </div>

        <div>

          <p className="text-sm font-medium text-rose-600">
            DOCTOR PROFILE
          </p>

          <h2 className="text-2xl font-bold text-slate-800">
            Dr. Ananya Kumar
          </h2>

          <p className="text-rose-600">
            General Physician
          </p>

          <p className="text-sm text-slate-400 mt-1">
            Doctor ID: DOC-2026-001
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-8">

        <Input
          label="Email"
          placeholder="doctor@medicare.com"
        />

        <Input
          label="Phone"
          placeholder="+91 XXXXX XXXXX"
        />

        <Input
          label="Department"
          placeholder="General Medicine"
        />

        <Input
          label="Hospital"
          placeholder="MediCare Hospital"
        />

      </div>

      <button className="mt-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md">
        Update Profile →
      </button>

    </div>
  );
}

export default App;