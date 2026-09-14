const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const expenseController = require('../controllers/expenseController');

// All routes require authentication
router.use(authenticate);

// Expense routes
router.get('/', expenseController.getExpenses);
router.post('/', expenseController.createExpense);
router.get('/summary', expenseController.getExpenseSummary);
router.get('/:id', expenseController.getExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);
router.get('/category/:category', expenseController.getExpensesByCategory);

module.exports = router;