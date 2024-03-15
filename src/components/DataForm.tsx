import MainForm from './MainForm'
import { HomeData, ServiceBill, PaymentPerFloor } from '../interfaces/AppInterfaces'

interface Props {
  serviceBill: ServiceBill
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>
  homeData: HomeData,
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>
  totalPerFloor: PaymentPerFloor
  setTotalPerFloor: React.Dispatch<React.SetStateAction<PaymentPerFloor>>
}

const DataForm = ({
  serviceBill,
  setServiceBill,
  homeData,
  setHomeData,
  totalPerFloor,
  setTotalPerFloor,
}: Props) => {
  return (
    <div
      className="md:w-1/2 mx-5"
    >
      <MainForm
        serviceBill={serviceBill}
        setServiceBill={setServiceBill}
        homeData={homeData}
        setHomeData={setHomeData}
        totalPerFloor={totalPerFloor}
        setTotalPerFloor={setTotalPerFloor}
      />
    </div>
  )
}
export default DataForm