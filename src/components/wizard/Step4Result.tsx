import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

interface Props {
  message: string
  onReset: () => void
}

async function copyWithFormat(text: string): Promise<void> {
  // Preserve newlines via text/html — more reliable on mobile apps (WhatsApp, etc.)
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  const html = `<div style="white-space:pre-wrap;font-family:sans-serif;font-size:14px">${escaped}</div>`

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/plain': new Blob([text], { type: 'text/plain' }),
        'text/html': new Blob([html], { type: 'text/html' }),
      }),
    ])
    return
  } catch {
    // ClipboardItem not supported — try writeText
  }

  try {
    await navigator.clipboard.writeText(text)
    return
  } catch {
    // Legacy execCommand fallback
  }

  const el = document.createElement('textarea')
  el.value = text
  el.style.cssText = 'position:fixed;opacity:0;top:0;left:0'
  document.body.appendChild(el)
  el.focus()
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const Step4Result = ({ message, onReset }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await copyWithFormat(message)
    setCopied(true)
    toast.success('Texto copiado al portapapeles')
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Resultado</h3>
      </div>
      <p className="text-base text-slate-400 text-center mb-4">Tocá el texto para copiarlo</p>

      <motion.div
        onClick={handleCopy}
        whileTap={{ scale: 0.99 }}
        className={`
          rounded-2xl px-5 py-4 cursor-pointer border transition-all duration-200
          ${copied
            ? 'bg-emerald-50 border-emerald-300'
            : 'bg-white/70 border-emerald-100 hover:bg-emerald-50/60 hover:border-emerald-200'
          }
        `}
      >
        <pre className="whitespace-pre-wrap text-lg text-slate-700 font-sans leading-relaxed break-words">
          {message}
        </pre>
      </motion.div>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 border border-emerald-200 hover:bg-emerald-50 text-emerald-700 font-semibold py-2.5 px-4 rounded-xl transition-colors text-lg"
        >
          Calcular de nuevo
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className={`
            flex-1 font-semibold py-2.5 px-4 rounded-xl transition-all text-lg flex items-center justify-center gap-2
            ${copied
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
            }
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {copied
              ? <polyline points="20 6 9 17 4 12" />
              : <>
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </>
            }
          </svg>
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
    </div>
  )
}

export default Step4Result
