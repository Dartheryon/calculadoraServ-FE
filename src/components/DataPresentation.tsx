import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Toaster, toast } from 'react-hot-toast'
interface Props {
  isMessageReady: boolean
  message: string
}
const DataPresentation = ({
  isMessageReady,
  message
}: Props) => {

  return isMessageReady && (
    <div className='flex flex-col'>
      <h2 className='text-center text-xl mx-5 my-3 text-black'>Toca el siguiente texto para copiarlo y poder enviarlo a los destinatarios</h2>
      <Toaster position="bottom-center" />
      <div
        className=" bg-white shadow-md px-5 pt-6 pb-8 rounded-2xl my-3 mx-5"
      >
        <CopyToClipboard text={message}>
          <span onClick={() => toast.success('Texto Copiado al portapapeles')} className='font-sans'>
            <pre className='whitespace-pre-wrap w-full'>
              {message}
            </pre>
          </span>
        </CopyToClipboard>
      </div>
    </div>
  )
}
export default DataPresentation