export interface FeeBreakdown {
  tuitionFee: number;
  studyMaterialFee: number;
  examRegistrationFee: number;
  discountAmount: number;
  netPayable: number;
  installmentCount: number;
  installmentAmount: number;
}

export function computeTuitionFees(baseFee: number, discountPct: number = 0, installments: number = 3): FeeBreakdown {
  const studyMaterialFee = Math.round(baseFee * 0.1);
  const examRegistrationFee = 1500;
  const gross = baseFee + studyMaterialFee + examRegistrationFee;
  const discountAmount = Math.round((gross * discountPct) / 100);
  const netPayable = gross - discountAmount;
  const installmentCount = Math.max(1, installments);
  const installmentAmount = Math.round(netPayable / installmentCount);

  return {
    tuitionFee: baseFee,
    studyMaterialFee,
    examRegistrationFee,
    discountAmount,
    netPayable,
    installmentCount,
    installmentAmount
  };
}
