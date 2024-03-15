import MainForm from './MainForm'
import { HomeData, ServiceBill } from '../interfaces/AppInterfaces'

interface Props {
  serviceBill: ServiceBill
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>
  homeData: HomeData,
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>
  calculate: (e: React.FormEvent) => void
}

const DataForm = ({
  serviceBill,
  setServiceBill,
  homeData,
  setHomeData,
  calculate
}: Props) => {
  return (
    <div
      className="md:w-1/2 lg:w-1/4 mx-5"
    >
      <MainForm
        serviceBill={serviceBill}
        setServiceBill={setServiceBill}
        homeData={homeData}
        setHomeData={setHomeData}
        calculate={calculate}
      />
    </div>
  )
}
export default DataForm