import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'

interface Props {
  code: string
  title: string
}

const Copy = ({ code, title }: Props) => {
  return (
    <>
      <h2 className='text-center text-xl mx-5 my-3 text-black'>{title}</h2>
      <div
        className=" bg-white shadow-md px-5 pt-6 pb-8 rounded-2xl my-3 mx-5"
      >
        <CopyToClipboard text={code}>
          <span onClick={() => toast.success('Texto Copiado al portapapeles')} className='font-sans'>
            <p className='text-center text-2xl text-blue-800 font-black'>
              {code}
            </p>
          </span>
        </CopyToClipboard>
      </div>
    </>
  )
}
export default Copy