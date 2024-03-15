/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { HomeData, ServiceBill } from '../interfaces/AppInterfaces';
import { formatDate } from "../helpers";
interface Props {
  serviceBill: ServiceBill
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>
  homeData: HomeData
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>
  calculate: (e: React.FormEvent) => void
}

const MainForm = ({
  serviceBill,
  setServiceBill,
  homeData,
  setHomeData,
  calculate
}: Props) => {

  const { firstFloor, secondFloor, thirdFloor, local, isWaterBill, nameRecipient } = homeData
  const { bill, billDate, total } = serviceBill
  useEffect(() => {
    if (bill === 'acueducto') {
      setHomeData({ ...homeData, isWaterBill: true })
    }
    else {
      setHomeData({ ...homeData, isWaterBill: false })
    }
  }, [bill])

  useEffect(() => {
    console.log(formatDate(billDate))
  }, [billDate])
  return (
    <>
      <h2>Configura los datos correspondientes para cada piso</h2>
      <form
        className='bg-white shadow-md px-8 pt-6 pb-8 rounded-md my-3'
        onSubmit={calculate}
      >
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='Servicio'>Servicio Público</label>
          <select
            className='shadow appearance-none border rounded w-full py-2 px-3 border-cyan-700
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='Servicio'
            name='Servicio'
            value={bill}
            onChange={e => setServiceBill({ ...serviceBill, bill: e.target.value })}
          >
            <option value=''>-- Selecciona una opción --</option>
            <option value='acueducto'>Acueducto</option>
            <option value='Energia'>Energía</option>
            <option value='internet'>Internet</option>
          </select>
        </div>
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='firstFlat'>total a pagar: </label>
          <input className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
              text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='number'
            value={total}
            onChange={e => setServiceBill({ ...serviceBill, total: Number(e.target.value).toString() })}
            name='total'
            id='total' />
        </div>
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='finalDate'>Fecha de vencimiento: </label>
          <input
            className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
            text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='date'
            onChange={e => setServiceBill({ ...serviceBill, billDate: new Date(e.target.value) })}
            name='finalDate'
            id='finalDate' />
        </div>

        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='firstFlat'>Personas en el piso 1: </label>
          <input
            className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
            text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='number'
            value={firstFloor}
            onChange={e => setHomeData({ ...homeData, firstFloor: Number(e.target.value).toString() })}
            name='firstFlat'
            id='firstFlat' />
        </div>
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='firstFlat'>Personas en el piso 2: </label>
          <input className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
          text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='number'
            value={secondFloor}
            onChange={e => setHomeData({ ...homeData, secondFloor: Number(e.target.value).toString() })}
            name='secondFlat'
            id='secondFlat' />
        </div>
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='firstFlat'>Personas en el piso 3: </label>
          <input className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
          text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='number'
            value={thirdFloor}
            onChange={e => setHomeData({ ...homeData, thirdFloor: Number(e.target.value).toString() })}
            name='thirdFlat'
            id='thirdFlat' />
        </div>
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='firstFlat'>Encargado del piso 2: </label>
          <input className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
          text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='text'
            value={nameRecipient}
            onChange={e => setHomeData({ ...homeData, nameRecipient: e.target.value })}
            name='recipient'
            id='recipient' />
        </div>
        {
          isWaterBill && (
            <div className='flex flex-col my-3'>
              <label className='mb-1' htmlFor='firstFlat'>Pago de agua del local: </label>
              <input className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
              text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                type='number'
                value={local}
                onChange={e => setHomeData({ ...homeData, local: Number(e.target.value).toString() })}
                name='local'
                id='local' />
            </div>
          )
        }
        <div className='flex flex-col my-3'>
          <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded shadow-lg w-full" type="submit">Calcular</button>
        </div>


      </form>
    </>
  );
};
export default MainForm;
