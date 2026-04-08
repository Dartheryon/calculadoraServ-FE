import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { HomeData, ServiceBill } from './interfaces/AppInterfaces';
import WizardForm from './components/wizard/WizardForm';
import Navbar from './components/Navbar';
import CodesDrawer from './components/CodesDrawer';

const SERVICE_BILL_INITIAL_STATE: ServiceBill = {
  bill: '',
  billDate: '',
  billSince: '',
  billTo: '',
  total: '0'
}

const HOME_DATA_INITIAL_STATE: HomeData = {
  firstFloor: '2',
  secondFloor: '6',
  thirdFloor: '1',
  local: '115000',
  nameRecipient: 'Don Jorge'
}

function App() {
  const [serviceBill, setServiceBill] = useState<ServiceBill>(SERVICE_BILL_INITIAL_STATE)
  const [homeData, setHomeData] = useState<HomeData>(HOME_DATA_INITIAL_STATE)
  const [codesOpen, setCodesOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50">
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-48 w-[400px] h-[400px] rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 w-[350px] h-[350px] rounded-full bg-emerald-100/50 blur-3xl" />

      <Toaster position="bottom-center" />
      <Navbar onCodesOpen={() => setCodesOpen(true)} />

      <main className="max-w-xl mx-auto px-4 pt-24 pb-16">
        <WizardForm
          serviceBill={serviceBill}
          setServiceBill={setServiceBill}
          homeData={homeData}
          setHomeData={setHomeData}
        />
      </main>

      <CodesDrawer isOpen={codesOpen} onClose={() => setCodesOpen(false)} />
    </div>
  )
}

export default App
