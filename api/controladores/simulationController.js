
function simulateStandard({ amount, months }) {
  const annualRatePct = 16.5;
  const i = (annualRatePct / 100) / 12;
  const pow = Math.pow(1 + i, months);
  const monthlyInstallment = amount * (i * pow) / (pow - 1);
  const totalPaid = monthlyInstallment * months;
  const totalInterest = totalPaid - amount;

  return {
    ok: true,
    rate: {
      annualRatePct,
      monthlyRatePct: Number((annualRatePct / 12).toFixed(4))
    },
    result: {
      monthlyInstallment: Math.round(monthlyInstallment),
      totalPaid: Math.round(totalPaid),
      totalInterest: Math.round(totalInterest)
    }
  };
}

module.exports = { simulateStandard };
