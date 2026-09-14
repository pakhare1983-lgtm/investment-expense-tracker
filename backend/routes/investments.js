const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const investmentController = require('../controllers/investmentController');

// All routes require authentication
router.use(authenticate);

// Investment routes
router.get('/', investmentController.getInvestments);
router.post('/', investmentController.createInvestment);
router.get('/portfolio/summary', investmentController.getPortfolioSummary);
router.get('/:id', investmentController.getInvestment);
router.put('/:id', investmentController.updateInvestment);
router.delete('/:id', investmentController.deleteInvestment);

module.exports = router;