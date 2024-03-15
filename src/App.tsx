import { useState } from 'react';

import { HomeData, ServiceBill, PaymentPerFloor } from './interfaces/AppInterfaces'
import DataForm from './components/DataForm';
import Header from './components/Header';
import DataPresentation from './components/DataPresentation';

const SERVICE_BILL_INITIAL_STATE: ServiceBill = {
  bill: '',
  billDate: '',
  total: '0'
}

const HOME_DATA_INITIAL_STATE: HomeData = {
  firstFloor: '2',
  secondFloor: '3',
  thirdFloor: '1',
  local: '115000',
  isWaterBill: false,
  nameRecipient: 'Don Jorge'
}
const TOTAL_PER_FLOOR_INITIAL_STATE: PaymentPerFloor = {
  totalFirstFloor: 0,
  totalSecondFloor: 0,
  totalThirdFloor: 0
}
function App() {
  const [serviceBill, setServiceBill] = useState<ServiceBill>(SERVICE_BILL_INITIAL_STATE)
  const [homeData, setHomeData] = useState<HomeData>(HOME_DATA_INITIAL_STATE)
  const [totalPerFloor, setTotalPerFloor] = useState<PaymentPerFloor>(TOTAL_PER_FLOOR_INITIAL_STATE)
  const [message, setMessage] = useState<string>('')



  return (
    <div className="container mt-20 mx-auto">
      <Header />
      <div className='md:flex mt-10'>
        <DataForm
          serviceBill={serviceBill}
          setServiceBill={setServiceBill}
          homeData={homeData}
          setHomeData={setHomeData}
          totalPerFloor={totalPerFloor}
          setTotalPerFloor={setTotalPerFloor}
        />
        <DataPresentation
          serviceBill={serviceBill}
          homeData={homeData}
          totalPerFloor={totalPerFloor}
        />
      </div>
    </div>
  )
}

export default App
