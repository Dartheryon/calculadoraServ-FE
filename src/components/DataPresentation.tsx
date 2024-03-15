import { PaymentPerFloor } from '../interfaces/AppInterfaces'
interface Props {
  totalPerFloor: PaymentPerFloor
}

const DataPresentation = ({ totalPerFloor }: Props) => {
  const { totalFirstFloor, totalSecondFloor, totalThirdFloor } = totalPerFloor
  return (
    <>
      <div
        className="md:w-1/2 mx-5 bg-white shadow-md px-8 pt-6 pb-8 rounded-md my-3"
      >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, tempora iure obcaecati deserunt veritatis cum earum atque asperiores, ea facere molestiae reprehenderit laudantium. Magnam doloremque officia sequi tenetur quis dicta.</p>
      </div>
    </>
  )
}
export default DataPresentation