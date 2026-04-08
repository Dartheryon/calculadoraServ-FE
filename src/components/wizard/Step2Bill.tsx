import type { ServiceBill } from '../../interfaces/AppInterfaces';
import { formatCash } from '../../helpers';
import DatePicker from '../DatePicker';

interface Props {
  serviceBill: ServiceBill;
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>;
  errors: string[];
}

const Step2Bill = ({ serviceBill, setServiceBill, errors }: Props) => {
  const { billSince, billTo, billDate, total } = serviceBill;

  return (
    <div>
      <h3 className="text-lg font-bold text-center text-slate-800 mb-5 tracking-tight">
        Datos de la factura
      </h3>
      {errors.map((error, i) => (
        <p key={i} className="text-red-500 text-xs font-medium mb-2 px-1">
          {error}
        </p>
      ))}

      <DatePicker
        id="billSince"
        label="Período facturado desde"
        value={billSince}
        onChange={(date) => setServiceBill({ ...serviceBill, billSince: date })}
      />

      <DatePicker
        id="billTo"
        label="Período facturado hasta"
        value={billTo}
        onChange={(date) => setServiceBill({ ...serviceBill, billTo: date })}
      />

      <div className="flex flex-col my-3">
        <label className="label-premium" htmlFor="total">
          Total a pagar
        </label>
        <input
          className="input-premium"
          type="number"
          id="total"
          name="total"
          value={total}
          onChange={(e) =>
            setServiceBill({ ...serviceBill, total: Number(e.target.value).toString() })
          }
        />
        <span className="text-xl font-bold text-red-600 mt-1.5 px-1">
          {formatCash(parseInt(total) || 0)}
        </span>
      </div>

      <DatePicker
        id="billDate"
        label="Fecha de vencimiento"
        value={billDate}
        onChange={(date) => setServiceBill({ ...serviceBill, billDate: date })}
      />
    </div>
  );
};

export default Step2Bill;
