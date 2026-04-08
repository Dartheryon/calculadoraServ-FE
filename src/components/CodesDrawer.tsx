import { motion, AnimatePresence } from 'framer-motion'
import SerialCodes from './SerialCodes'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const CodesDrawer = ({ isOpen, onClose }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl flex flex-col border-l border-emerald-100"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-100">
              <div>
                <h2 className="font-bold text-base text-slate-900">Códigos de pago</h2>
                <p className="text-xs text-slate-400 mt-0.5">Tocá el código para copiarlo</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="p-2 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <SerialCodes />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default CodesDrawer
