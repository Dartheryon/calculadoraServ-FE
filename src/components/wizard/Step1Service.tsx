import type { ServiceBill } from '../../interfaces/AppInterfaces';

interface Props {
  serviceBill: ServiceBill;
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>;
  errors: string[];
}

const Step1Service = ({ serviceBill, setServiceBill, errors }: Props) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center text-slate-800 mb-3 tracking-tight">
        Seleccioná el servicio público
      </h3>
      {errors.map((error, i) => (
        <p key={i} className="text-red-500 text-base font-medium mb-2 px-1">
          {error}
        </p>
      ))}
      <div className="flex flex-col my-2">
        <label className="label-premium" htmlFor="bill">
          Servicio público
        </label>
        <div className="relative">
          <select
            className="select-premium pr-10"
            id="bill"
            name="bill"
            value={serviceBill.bill}
            onChange={(e) => setServiceBill({ ...serviceBill, bill: e.target.value })}
          >
            <option value="">-- Seleccioná una opción --</option>
            <option value="acueducto">Acueducto</option>
            <option value="energía">Energía</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Service;
