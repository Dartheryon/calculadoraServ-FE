import type { ServiceBill, HomeData } from '../interfaces/AppInterfaces';
import { CalculationResult } from '../interfaces/AppInterfaces';
import { formatCash, formatDate, formatShortDate } from './index';

export function calculate(
  serviceBill: ServiceBill,
  homeData: HomeData,
): CalculationResult {
  const { bill, billDate, billSince, billTo, total } = serviceBill;
  const { firstFloor, secondFloor, thirdFloor, local, nameRecipient } =
    homeData;
  const isWaterBill = bill === 'acueducto';

  if (bill === '') {
    return {
      success: false,
      message: '',
      error: 'Por favor elige un servicio público',
    };
  }
  if (total === '0' || total === '') {
    return {
      success: false,
      message: '',
      error: 'Por favor digita el valor de la factura',
    };
  }

  let roundedTotal: number = Math.ceil(parseInt(total) / 50) * 50;
  if (roundedTotal < parseInt(total)) {
    roundedTotal += 50;
  }

  const totalPeople: number =
    parseInt(firstFloor) + parseInt(secondFloor) + parseInt(thirdFloor);
  const valuePerson: number = isWaterBill
    ? (roundedTotal - parseInt(local)) / totalPeople
    : roundedTotal / totalPeople;

  const valueFirstfloor: number = valuePerson * parseInt(firstFloor);
  const valueSecondFloor: number = valuePerson * parseInt(secondFloor);
  const valueThirdFloor: number = valuePerson * parseInt(thirdFloor);

  const message = !isWaterBill
    ? `Buenas tardes ${nameRecipient},
este mensaje es para informarle que llegó el recibo de ${bill}
por valor de ${formatCash(parseInt(total))} pesos.
Período facturado del ${formatShortDate(billSince)} al ${formatShortDate(billTo)}.

1º piso x ${firstFloor} personas = ${formatCash(Math.round(valueFirstfloor / 50) * 50)} pesos.
2º piso x ${secondFloor} personas = ${formatCash(Math.round(valueSecondFloor / 50) * 50)} pesos.
3º piso x ${thirdFloor} persona = ${formatCash(Math.round(valueThirdFloor / 50) * 50)} pesos.

Fecha límite de pago es el ${formatDate(billDate)}.
Favor cancelar mínimo 2 días antes para poder pagar a tiempo.
Por favor confirmar el recibo de este mensaje. Gracias. Tenga un buen día.`
    : `Buenas tardes ${nameRecipient},
este mensaje es para informarle que llegó el recibo de ${bill}
por valor de ${formatCash(parseInt(total))} pesos.
Período facturado del ${formatShortDate(billSince)} al ${formatShortDate(billTo)}.

1º piso x ${firstFloor} personas = ${formatCash(Math.round(valueFirstfloor / 50) * 50)} pesos.
2º piso x ${secondFloor} personas = ${formatCash(Math.round(valueSecondFloor / 50) * 50)} pesos.
3º piso x ${thirdFloor} persona = ${formatCash(Math.round(valueThirdFloor / 50) * 50)} pesos.
Cobro corespondiente al local = ${formatCash(parseInt(local))} pesos.

Fecha límite de pago es el ${formatDate(billDate)}.
Favor cancelar mínimo 2 días antes para poder pagar a tiempo.
Por favor confirmar el recibo de este mensaje. Gracias. Tenga un buen día.`;

  return { success: true, message };
}
