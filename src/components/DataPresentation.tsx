import { formatDate } from '../helpers'
import { HomeData, ServiceBill, PaymentPerFloor } from '../interfaces/AppInterfaces'

interface Props {
  isMessageReady: boolean
  serviceBill: ServiceBill
  homeData: HomeData,
  totalPerFloor: PaymentPerFloor
}
const DataPresentation = ({
  isMessageReady,
  serviceBill,
  homeData,
  totalPerFloor,
}: Props) => {
  return isMessageReady && (
    <div className='flex flex-col'>
      <h2 className='text-center text-xl text-black'>Toca el siguiente texto para copiarlo y poder enviarlo a los destinatarios</h2>
      <div
        className="md:w-1/2 bg-white shadow-md px-8 pt-6 pb-8 rounded-2xl my-3 mx-auto"
      >
        <p className='mb-2'>{`Buenas tardes ${homeData.nameRecipient},`}</p>
        <p className='mb-2'>
          {`Este mensaje es para informarle que llegó el recibo de ${serviceBill.bill} por un valor de ${serviceBill.total} pesos.`}
        </p>
        <p className='mb-2'>
          {`Período facturado:`}
        </p>
        <p className='mb-2'>
          {`del 08 de febrero al 07 de marzo de 2024.`}
        </p>
        <p className='mb-2'>{`1º piso x ${homeData.firstFloor} personas = ${totalPerFloor.totalFirstFloor} pesos.`}</p>
        <p className='mb-1'>{`2º piso x ${homeData.secondFloor} personas = ${totalPerFloor.totalSecondFloor} pesos.`}</p>
        <p className='mb-3'>{`3º piso x ${homeData.thirdFloor} persona = ${totalPerFloor.totalThirdFloor} pesos.`}</p>
        <p className='mb-2'>
          {`Fecha límite de pago es el ${formatDate(serviceBill.billDate)}.`}.</p>
        <p className='mb-2'>
          {
            `Favor cancelar mínimo 2 días antes para poder cancelar a tiempo.
          Le pido por favor confirmar el recibo de este mensaje.
          Gracias. Tenga un buen día.`
          }
        </p>
      </div>
    </div>
  )
}
export default DataPresentation