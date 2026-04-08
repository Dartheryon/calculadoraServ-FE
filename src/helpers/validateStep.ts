import type { ServiceBill, HomeData } from '../interfaces/AppInterfaces';

export function validateStep(
  step: 0 | 1 | 2,
  serviceBill: ServiceBill,
  homeData: HomeData
): string[] {
  const errors: string[] = [];
  const isWaterBill = serviceBill.bill === 'acueducto';

  if (step === 0) {
    if (serviceBill.bill === '') {
      errors.push('Por favor elige un servicio público');
    }
  }

  if (step === 1) {
    if (serviceBill.billSince === '') {
      errors.push('Por favor elige la fecha de inicio del período');
    }
    if (serviceBill.billTo === '') {
      errors.push('Por favor elige la fecha de fin del período');
    }
    if (serviceBill.total === '0' || serviceBill.total === '') {
      errors.push('Por favor digita el valor de la factura');
    }
    if (serviceBill.billDate === '') {
      errors.push('Por favor elige la fecha de vencimiento');
    }
  }

  if (step === 2) {
    if (isWaterBill && (homeData.local === '0' || homeData.local === '')) {
      errors.push('Por favor digita el valor del agua del local');
    }
  }

  return errors;
}
