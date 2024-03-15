import { paymentPerFloor } from '../interfaces/AppInterfaces'
interface Props {
  totalPerFloor: paymentPerFloor
}

const DataPresentation = ({ totalPerFloor }: Props) => {
  const { totalFirstFloor, totalSecondFloor, totalThirdFloor } = totalPerFloor
  return (
    <>
      <div className='flex flex-col'>
        <p>totalFirstFloor: {totalFirstFloor}</p>
        <p>totalSecondFloor: {totalSecondFloor}</p>
        <p>totalThirdFloor: {totalThirdFloor}</p>
      </div>
    </>
  )
}
export default DataPresentation