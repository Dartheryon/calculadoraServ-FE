import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

interface Props {
  message: string
}

const ResultCard = ({ message }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mt-4 card-glass overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-emerald-100">
        <h3 className="font-semibold text-sm text-slate-700">Resultado del cálculo</h3>
        <p className="text-xs text-slate-400 mt-0.5">Tocá el texto para copiarlo</p>
      </div>
      <CopyToClipboard text={message}>
        <div
          onClick={() => toast.success('Texto copiado al portapapeles')}
          className="px-5 py-4 cursor-pointer hover:bg-emerald-50/40 transition-colors"
        >
          <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
            {message}
          </pre>
        </div>
      </CopyToClipboard>
    </motion.div>
  )
}

export default ResultCard
