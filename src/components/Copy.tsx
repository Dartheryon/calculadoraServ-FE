import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'

interface Props {
  code: string
  title: string
}

const Copy = ({ code, title }: Props) => {
  return (
    <>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-600/70 mt-4 mb-1.5">
        {title}
      </h2>
      <CopyToClipboard text={code}>
        <div
          onClick={() => toast.success('Código copiado')}
          className="bg-white/70 border border-emerald-100 px-4 py-3.5 rounded-xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 active:scale-[0.98]"
        >
          <p className="text-center text-lg text-emerald-700 font-black tracking-widest">
            {code}
          </p>
        </div>
      </CopyToClipboard>
    </>
  )
}

export default Copy
