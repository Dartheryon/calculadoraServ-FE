import type { ServiceBill, HomeData } from '../../interfaces/AppInterfaces';
import { formatCash } from '../../helpers';

interface Props {
  serviceBill: ServiceBill;
  homeData: HomeData;
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>;
  errors: string[];
}

const Step3Occupants = ({ serviceBill, homeData, setHomeData, errors }: Props) => {
  const { firstFloor, secondFloor, thirdFloor, local, nameRecipient } = homeData;
  const isWaterBill = serviceBill.bill === 'acueducto';

  return (
    <div>
      <h3 className="text-2xl font-bold text-center text-slate-800 mb-5 tracking-tight">
        Ocupantes por piso
      </h3>
      {errors.map((error, i) => (
        <p key={i} className="text-red-500 text-base font-medium mb-2 px-1">
          {error}
        </p>
      ))}

      <div className="flex flex-col my-3">
        <label className="label-premium" htmlFor="firstFloor">
          Personas en el piso 1
        </label>
        <input
          className="input-premium"
          type="number"
          id="firstFloor"
          name="firstFloor"
          value={firstFloor}
          onChange={(e) =>
            setHomeData({ ...homeData, firstFloor: Number(e.target.value).toString() })
          }
        />
      </div>

      <div className="flex flex-col my-3">
        <label className="label-premium" htmlFor="secondFloor">
          Personas en el piso 2
        </label>
        <input
          className="input-premium"
          type="number"
          id="secondFloor"
          name="secondFloor"
          value={secondFloor}
          onChange={(e) =>
            setHomeData({ ...homeData, secondFloor: Number(e.target.value).toString() })
          }
        />
      </div>

      <div className="flex flex-col my-3">
        <label className="label-premium" htmlFor="thirdFloor">
          Personas en el piso 3
        </label>
        <input
          className="input-premium"
          type="number"
          id="thirdFloor"
          name="thirdFloor"
          value={thirdFloor}
          onChange={(e) =>
            setHomeData({ ...homeData, thirdFloor: Number(e.target.value).toString() })
          }
        />
      </div>

      <div className="flex flex-col my-3">
        <label className="label-premium" htmlFor="nameRecipient">
          Encargado del piso 2
        </label>
        <input
          className="input-premium"
          type="text"
          id="nameRecipient"
          name="nameRecipient"
          value={nameRecipient}
          onChange={(e) => setHomeData({ ...homeData, nameRecipient: e.target.value })}
        />
      </div>

      {isWaterBill && (
        <div className="flex flex-col my-3">
          <label className="label-premium" htmlFor="local">
            Pago de agua del local
          </label>
          <input
            className="input-premium"
            type="number"
            id="local"
            name="local"
            value={local}
            onChange={(e) =>
              setHomeData({ ...homeData, local: Number(e.target.value).toString() })
            }
          />
          <span className="text-3xl font-bold text-red-600 mt-1.5 px-1">
            {formatCash(parseInt(local) || 0)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Step3Occupants;
