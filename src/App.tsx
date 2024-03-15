import { useState } from 'react';

import { HomeData, ServiceBill, paymentPerFloor } from './interfaces/AppInterfaces'
import DataForm from './components/DataForm';
import Header from './components/Header';
import DataPresentation from './components/DataPresentation';

const SERVICE_BILL_INITIAL_STATE: ServiceBill = {
  bill: '',
  billDate: new Date(),
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
const TOTAL_PER_FLOOR_INITIAL_STATE: paymentPerFloor = {
  totalFirstFloor: 0,
  totalSecondFloor: 0,
  totalThirdFloor: 0
}
function App() {
  const [serviceBill, setServiceBill] = useState<ServiceBill>(SERVICE_BILL_INITIAL_STATE)
  const [homeData, setHomeData] = useState<HomeData>(HOME_DATA_INITIAL_STATE)
  const [totalPerFloor, setTotalPerFloor] = useState<paymentPerFloor>(TOTAL_PER_FLOOR_INITIAL_STATE)


  const { firstFloor, secondFloor, thirdFloor, local, isWaterBill } = homeData
  const { total } = serviceBill
  const calculate = (e: React.FormEvent) => {
    e.preventDefault()
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

  };
  return (
    <div className="container mt-20 mx-auto">
      <Header />
      <div className='md:flex mt-10'>
        <DataForm
          serviceBill={serviceBill}
          setServiceBill={setServiceBill}
          homeData={homeData}
          setHomeData={setHomeData}
          calculate={calculate}
        />
        <DataPresentation
          totalPerFloor={totalPerFloor}
        />
      </div>
    </div>
  )
}

export default App
