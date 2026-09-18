export interface FeeBreakdown {
  tuitionFee: number;
  examFee: number;
  studyMaterialFee: number;
  discount: number;
  gst: number;
  total: number;
}

export function calculateFeeBreakdown(tuitionFee: number, discountPercent = 0): FeeBreakdown {
  const discount = Math.round((tuitionFee * discountPercent) / 100);
  const discountedTuition = tuitionFee - discount;
  const examFee = 1500;
  const studyMaterialFee = 2500;
  const taxable = discountedTuition + examFee + studyMaterialFee;
  const gst = Math.round(taxable * 0.18);
  const total = taxable + gst;

  return {
    tuitionFee,
    examFee,
    studyMaterialFee,
    discount,
    gst,
    total
  };
}
