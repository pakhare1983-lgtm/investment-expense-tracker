const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const incomeController = require('../controllers/incomeController');

// All routes require authentication
router.use(authenticate);

// Income routes
router.get('/', incomeController.getIncome);
router.post('/', incomeController.createIncome);
router.get('/summary', incomeController.getIncomeSummary);
router.get('/:id', incomeController.getIncomeEntry);
router.put('/:id', incomeController.updateIncome);
router.delete('/:id', incomeController.deleteIncome);
router.get('/type/:type', incomeController.getIncomeByType);

module.exports = router;