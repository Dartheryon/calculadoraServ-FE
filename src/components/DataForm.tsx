import MainForm from './MainForm'
import { HomeData, ServiceBill, PaymentPerFloor } from '../interfaces/AppInterfaces'

interface Props {
  serviceBill: ServiceBill
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>
  homeData: HomeData,
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>
  setTotalPerFloor: React.Dispatch<React.SetStateAction<PaymentPerFloor>>
}

const DataForm = ({
  serviceBill,
  setServiceBill,
  homeData,
  setHomeData,
  setTotalPerFloor
}: Props) => {
  return (
    <div
      className="md:w-1/2 lg:w-2/4 mx-5"
    >
      <MainForm
        serviceBill={serviceBill}
        setServiceBill={setServiceBill}
        homeData={homeData}
        setHomeData={setHomeData}
        setTotalPerFloor={setTotalPerFloor}
      />
    </div>
  )
}
export default DataForm