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
  billDate: Date;
  total: string;
}

export interface paymentPerFloor {
  totalFirstFloor: number;
  totalSecondFloor: number;
  totalThirdFloor: number;
}
