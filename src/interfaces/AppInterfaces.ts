export interface HomeData {
  firstFloor: string;
  secondFloor: string;
  thirdFloor: string;
  local: string;
  isWaterBill: boolean;
  nameRecipient: string;
}

export interface ServiceBill {
  bill: string;
  billSince: Date | string;
  billTo: Date | string;
  billDate: Date | string;
  total: string;
}
