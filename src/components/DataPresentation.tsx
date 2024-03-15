import { CopyToClipboard } from 'react-copy-to-clipboard'
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
      <div
        className=" bg-white shadow-md px-5 pt-6 pb-8 rounded-2xl my-3 mx-5"
      >
        <span className='font-sans'>
          <CopyToClipboard text={message}>
            <pre className='whitespace-pre-wrap w-full'>
              {message}
            </pre>
          </CopyToClipboard>
        </span>
      </div>
    </div>
  )
}
export default DataPresentation