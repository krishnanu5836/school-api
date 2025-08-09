const express = require('express');
const router = express.Router();
const pool = require('../db');
const { addSchoolSchema } = require('../validators/schoolValidator');
const { haversineDistance } = require('../utils/distance');

router.post('/addSchool', async (req, res) => {
  try {
    const { error, value } = addSchoolSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }
    const { name, address, latitude, longitude } = value;

    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(sql, [name, address, latitude, longitude]);

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      schoolId: result.insertId
    });
  } catch (err) {
    console.error('addSchool error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/listSchools', async (req, res) => {
  try {
    const { latitude, longitude, limit = 100, offset = 0 } = req.query;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, error: 'latitude and longitude query params are required' });
    }
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    if (Number.isNaN(userLat) || Number.isNaN(userLon)) {
      return res.status(400).json({ success: false, error: 'latitude and longitude must be numbers' });
    }

    const [rows] = await pool.execute('SELECT id, name, address, latitude, longitude, created_at FROM schools');

    const schoolsWithDistance = rows.map(s => {
      const distKm = haversineDistance(userLat, userLon, Number(s.latitude), Number(s.longitude));
      return { ...s, distance_km: Number(distKm.toFixed(4)) };
    });

    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    const lim = Math.min(1000, Math.max(1, parseInt(limit)));
    const off = Math.max(0, parseInt(offset));
    const paged = schoolsWithDistance.slice(off, off + lim);

    return res.json({
      success: true,
      total: schoolsWithDistance.length,
      returned: paged.length,
      data: paged
    });

  } catch (err) {
    console.error('listSchools error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
