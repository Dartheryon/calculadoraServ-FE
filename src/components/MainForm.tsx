/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { HomeData, ServiceBill, PaymentPerFloor } from '../interfaces/AppInterfaces';
import { formatCash, formatDate, formatShortDate } from "../helpers";
interface Props {
  serviceBill: ServiceBill
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>
  homeData: HomeData
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>
  totalPerFloor: PaymentPerFloor
  setTotalPerFloor: React.Dispatch<React.SetStateAction<PaymentPerFloor>>
  setIsMessageReady: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const MainForm = ({
  serviceBill,
  setServiceBill,
  homeData,
  setHomeData,
  totalPerFloor,
  setTotalPerFloor,
  setIsMessageReady,
  setMessage
}: Props) => {

  const [errorBill, setErrorBill] = useState<boolean>(false)
  const [errorAmmountBill, setErrorAmmountBill] = useState<boolean>(false)
  const [errorBillDate, setErrorBillDate] = useState<boolean>(false)
  const [errorBillSince, setErrorBillSince] = useState<boolean>(false)
  const [errorBillTo, setErrorBillTo] = useState<boolean>(false)

  const { firstFloor, secondFloor, thirdFloor, local, isWaterBill, nameRecipient } = homeData
  const { bill, billDate, billSince, billTo, total } = serviceBill


  const calculate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(billDate)
    if (bill === '') {
      setErrorBill(true)
      return
    }
    if (billSince === '') {
      setErrorBillSince(true)
      return
    }
    if (billTo === '') {
      setErrorBillTo(true)
      return
    }
    if (total === '0') {
      setErrorAmmountBill(true)
      return
    }
    if (billDate === '') {
      setErrorBillDate(true)
      return
    }
    const totalPeople: number = parseInt(firstFloor) + parseInt(secondFloor) + parseInt(thirdFloor);
    const valuePerson: number = (isWaterBill) ? ((parseInt(total) - parseInt(local)) / totalPeople) : (parseInt(total) / totalPeople);
    const valueFirstfloor: number = valuePerson * parseInt(firstFloor);
    const valueSecondFloor: number = valuePerson * parseInt(secondFloor);
    const valueThirdFloor: number = valuePerson * parseInt(thirdFloor);
    setTotalPerFloor({
      totalFirstFloor: Math.round(valueFirstfloor / 50) * 50,
      totalSecondFloor: Math.round(valueSecondFloor / 50) * 50,
      totalThirdFloor: Math.round(valueThirdFloor / 50) * 50,
    })
    setMessage(
      `Buenas tardes ${homeData.nameRecipient}, 
este mensaje es para informarle que llegó el recibo de ${serviceBill.bill} 
por valor de ${formatCash(parseInt(total))} total pesos. 
Período facturado del ${formatShortDate(serviceBill.billSince)} al ${formatShortDate(serviceBill.billTo)}.

1º piso x ${homeData.firstFloor} personas = ${formatCash(totalPerFloor.totalFirstFloor)} pesos.
2º piso x ${homeData.secondFloor} personas = ${formatCash(totalPerFloor.totalSecondFloor)} pesos.
3º piso x ${homeData.thirdFloor} persona = ${formatCash(totalPerFloor.totalThirdFloor)} pesos.

Fecha límite de pago es el ${formatDate(serviceBill.billDate)}.
Favor cancelar mínimo 2 días antes para poder cancelar a tiempo.
Por favor confirmar el recibo de este mensaje. Gracias. Tenga un buen día.`
    );
    setIsMessageReady(true);
  };

  useEffect(() => {
    if (bill === 'acueducto') {
      setHomeData({ ...homeData, isWaterBill: true })
    }
    else {
      setHomeData({ ...homeData, isWaterBill: false })
    }
  }, [bill])

  return (
    <>
      <h2 className="font-black text-2xl text-center my-5">Configura los datos correspondientes para calcular el valor a pagar por piso</h2>
      <form
        className='bg-white shadow-md px-8 pt-6 pb-8 rounded-md my-3'
        onSubmit={calculate}
      >
        {
          errorBill && <p className='text-center font-bold text-white py-5 bg-red-700'>Por favor elige un servicio público</p>
        }
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
        {
          errorBillSince && <p className='text-center font-bold text-white py-5 bg-red-700'>Por favor elige una fecha</p>
        }
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='finalDate'>Período facturado desde: </label>
          <input
            className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
            text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='date'
            onChange={e => setServiceBill({ ...serviceBill, billSince: new Date(e.target.value) })}
            name='billSince'
            id='billSince' />
        </div>
        {
          errorBillTo && <p className='text-center font-bold text-white py-5 bg-red-700'>Por favor elige una fecha</p>
        }
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='finalDate'>Período facturado hasta: </label>
          <input
            className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
            text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='date'
            onChange={e => setServiceBill({ ...serviceBill, billTo: new Date(e.target.value) })}
            name='BillTo'
            id='BillTo' />
        </div>
        {
          errorAmmountBill && <p className='text-center font-bold text-white py-5 bg-red-700'>Por favor digita el valor de la factura</p>
        }
        <div className='flex flex-col my-3'>
          <label className='mb-1' htmlFor='firstFlat'>total a pagar: </label>
          <input className="shadow appearance-none border-cyan-700 border rounded w-full py-2 px-3
              text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            type='number'
            value={total}
            onChange={e => setServiceBill({ ...serviceBill, total: Number(e.target.value).toString() })}
          />
          <span className="text-xl text-emerald-700">{formatCash(parseInt(total))}</span>
        </div>
        {
          errorBillDate && <p className='text-center font-bold text-white py-5 bg-red-700'>Por favor elige una fecha</p>
        }
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
          <button className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded shadow-lg w-full" type="submit">Calcular</button>
        </div>


      </form>
    </>
  );
};
export default MainForm;
