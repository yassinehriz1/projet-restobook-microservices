require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { getLastConnectedUser, startGRPCClient } = require('./grpc-client');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/api/current-user', (req, res) => {
  const username = getLastConnectedUser();
  if (!username) {
    return res.status(404).json({ error: "Aucun utilisateur connecté pour le moment." });
  }
  res.json({ username });
});


mongoose.connect("mongodb://admin:pass@mongodb-statefulset-0.mongo-service:27017,mongodb-statefulset-1.mongo-service:27017/catalogue?replicaSet=rs0&authSource=admin")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

startGRPCClient();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Catalogue service running on port ${process.env.PORT}`);
});
