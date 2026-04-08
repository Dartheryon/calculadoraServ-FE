export interface HomeData {
  firstFloor: string;
  secondFloor: string;
  thirdFloor: string;
  local: string;
  nameRecipient: string;
}

export interface CalculationResult {
  message: string;
  success: boolean;
  error?: string;
}

export interface ServiceBill {
  bill: string;
  billSince: Date | string;
  billTo: Date | string;
  billDate: Date | string;
  total: string;
}
