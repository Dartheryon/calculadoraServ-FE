import MainForm from './MainForm'
import { HomeData, ServiceBill } from '../interfaces/AppInterfaces'

interface Props {
  serviceBill: ServiceBill
  setServiceBill: React.Dispatch<React.SetStateAction<ServiceBill>>
  homeData: HomeData,
  setHomeData: React.Dispatch<React.SetStateAction<HomeData>>
  setIsMessageReady: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const DataForm = ({
  serviceBill,
  setServiceBill,
  homeData,
  setHomeData,
  setIsMessageReady,
  setMessage
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
        setIsMessageReady={setIsMessageReady}
        setMessage={setMessage}
      />
    </div>
  )
}
export default DataForm