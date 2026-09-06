const express = require('express');
const cors = require('cors');
const path = require('path');
const env = require('./config/env');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const caseRoutes = require('./routes/caseRoutes');
const documentRoutes = require('./routes/documentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const hospitalRecordRoutes = require('./routes/hospitalRecordRoutes');
const doctorAIRoutes = require('./routes/doctorAIRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: env.corsOrigin,
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static file serving for uploads
app.use('/uploads', express.static(env.uploadDir));

// Root & Healthcheck
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MediCare Patient Case Software API Server',
    apiUrl: `http://localhost:${env.port}/api`,
    healthUrl: `http://localhost:${env.port}/api/health`,
    endpoints: [
      '/api/health',
      '/api/auth',
      '/api/patients',
      '/api/cases',
      '/api/documents',
      '/api/prescriptions',
      '/api/hospital-records',
      '/api/doctor-ai'
    ]
  });
});

app.get('/api', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MediCare Patient Case Software API Server',
    version: '1.0.0',
    time: new Date().toISOString(),
    endpoints: {
      health: `/api/health`,
      auth: `/api/auth`,
      patients: `/api/patients`,
      cases: `/api/cases`,
      documents: `/api/documents`,
      prescriptions: `/api/prescriptions`,
      hospitalRecords: `/api/hospital-records`,
      doctorAI: `/api/doctor-ai`
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Patient Case Software API',
    time: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/hospital-records', hospitalRecordRoutes);
app.use('/api/doctor-ai', doctorAIRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const server = app.listen(env.port, () => {
  console.log(`====================================================`);
  console.log(`🏥 MediCare Patient Case Backend API Server Running`);
  console.log(`📡 URL: http://localhost:${env.port}/api`);
  console.log(`📁 Static Uploads: http://localhost:${env.port}/uploads`);
  console.log(`====================================================`);
});

module.exports = app;
