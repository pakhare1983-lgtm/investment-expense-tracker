const Investment = require('../models/Investment');

// Get all investments for a user
exports.getInvestments = async (req, res, next) => {
  try {
    const { type, startDate, endDate } = req.query;
    const filter = { userId: req.user.id };

    if (type) filter.type = type;

    if (startDate || endDate) {
      filter.purchaseDate = {};
      if (startDate) filter.purchaseDate.$gte = new Date(startDate);
      if (endDate) filter.purchaseDate.$lte = new Date(endDate);
    }

    const investments = await Investment.find(filter).sort({ purchaseDate: -1 });

    res.json({
      success: true,
      data: investments,
      count: investments.length,
    });
  } catch (error) {
    next(error);
  }
};

// Get single investment
exports.getInvestment = async (req, res, next) => {
  try {
    const investment = await Investment.findById(req.params.id);

    if (!investment) {
      return res.status(404).json({
        error: {
          message: 'Investment not found',
          status: 404,
        },
      });
    }

    if (investment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        error: {
          message: 'Unauthorized',
          status: 403,
        },
      });
    }

    res.json({
      success: true,
      data: investment,
    });
  } catch (error) {
    next(error);
  }
};

// Create investment
exports.createInvestment = async (req, res, next) => {
  try {
    const {
      type,
      name,
      symbol,
      quantity,
      purchasePrice,
      currentPrice,
      currency,
      purchaseDate,
      broker,
      notes,
      fixedDepositDetails,
      recurringDepositDetails,
      lifeInsuranceDetails,
      bankAccountDetails,
    } = req.body;

    const totalInvested = quantity * purchasePrice;
    const currentValue = quantity * currentPrice;
    const gainLoss = currentValue - totalInvested;
    const gainLossPercentage = (gainLoss / totalInvested) * 100;

    const investment = new Investment({
      userId: req.user.id,
      type,
      name,
      symbol,
      quantity,
      purchasePrice,
      currentPrice,
      currency,
      purchaseDate,
      totalInvested,
      currentValue,
      gainLoss,
      gainLossPercentage,
      broker,
      notes,
      fixedDepositDetails,
      recurringDepositDetails,
      lifeInsuranceDetails,
      bankAccountDetails,
    });

    await investment.save();

    res.status(201).json({
      success: true,
      data: investment,
      message: 'Investment created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update investment
exports.updateInvestment = async (req, res, next) => {
  try {
    let investment = await Investment.findById(req.params.id);

    if (!investment) {
      return res.status(404).json({
        error: {
          message: 'Investment not found',
          status: 404,
        },
      });
    }

    if (investment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        error: {
          message: 'Unauthorized',
          status: 403,
        },
      });
    }

    // Recalculate gain/loss if prices changed
    if (req.body.currentPrice || req.body.purchasePrice) {
      const currentPrice = req.body.currentPrice || investment.currentPrice;
      const purchasePrice = req.body.purchasePrice || investment.purchasePrice;
      const quantity = req.body.quantity || investment.quantity;

      const totalInvested = quantity * purchasePrice;
      const currentValue = quantity * currentPrice;
      const gainLoss = currentValue - totalInvested;
      const gainLossPercentage = (gainLoss / totalInvested) * 100;

      req.body.totalInvested = totalInvested;
      req.body.currentValue = currentValue;
      req.body.gainLoss = gainLoss;
      req.body.gainLossPercentage = gainLossPercentage;
    }

    investment = await Investment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: investment,
      message: 'Investment updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete investment
exports.deleteInvestment = async (req, res, next) => {
  try {
    const investment = await Investment.findById(req.params.id);

    if (!investment) {
      return res.status(404).json({
        error: {
          message: 'Investment not found',
          status: 404,
        },
      });
    }

    if (investment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        error: {
          message: 'Unauthorized',
          status: 403,
        },
      });
    }

    await Investment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Investment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get portfolio summary
exports.getPortfolioSummary = async (req, res, next) => {
  try {
    const investments = await Investment.find({ userId: req.user.id });

    const totalInvested = investments.reduce((sum, inv) => sum + inv.totalInvested, 0);
    const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalGainLoss = totalCurrentValue - totalInvested;
    const totalGainLossPercentage = (totalGainLoss / totalInvested) * 100;

    const byType = {};
    investments.forEach(inv => {
      if (!byType[inv.type]) {
        byType[inv.type] = {
          count: 0,
          totalInvested: 0,
          totalCurrentValue: 0,
        };
      }
      byType[inv.type].count += 1;
      byType[inv.type].totalInvested += inv.totalInvested;
      byType[inv.type].totalCurrentValue += inv.currentValue;
    });

    res.json({
      success: true,
      data: {
        totalInvested,
        totalCurrentValue,
        totalGainLoss,
        totalGainLossPercentage,
        totalInvestments: investments.length,
        byType,
      },
    });
  } catch (error) {
    next(error);
  }
};
