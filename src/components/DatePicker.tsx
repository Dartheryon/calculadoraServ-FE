import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const DAY_HEADERS = ['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do']

interface CalendarCell {
  day: number
  type: 'prev' | 'current' | 'next'
  date: Date
}

interface Props {
  id: string
  label: string
  value: Date | string
  onChange: (date: Date) => void
}

function parseValue(value: Date | string): Date | null {
  if (!value) return null
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value
  const d = new Date(value + 'T12:00:00')
  return isNaN(d.getTime()) ? null : d
}

function formatText(date: Date | null): string {
  if (!date) return ''
  return `${date.getDate()} de ${MONTHS[date.getMonth()].toLowerCase()} de ${date.getFullYear()}`
}

function buildCalendar(year: number, month: number): CalendarCell[] {
  const firstDow = new Date(year, month, 1).getDay()
  const offset = firstDow === 0 ? 6 : firstDow - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()
  const cells: CalendarCell[] = []

  for (let i = offset - 1; i >= 0; i--) {
    const day = daysInPrev - i
    cells.push({ day, type: 'prev', date: new Date(year, month - 1, day) })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, type: 'current', date: new Date(year, month, day) })
  }
  const remaining = 42 - cells.length
  for (let day = 1; day <= remaining; day++) {
    cells.push({ day, type: 'next', date: new Date(year, month + 1, day) })
  }
  return cells
}

function isSameDay(a: Date | null, b: Date): boolean {
  if (!a) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const DatePicker = ({ id, label, value, onChange }: Props) => {
  const selected = parseValue(value)
  const today = new Date()

  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth())
  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear())

  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected) {
      setViewMonth(selected.getMonth())
      setViewYear(selected.getFullYear())
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const cells = buildCalendar(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const handleDayClick = (date: Date) => {
    onChange(date)
    setOpen(false)
  }

  const currentYear = today.getFullYear()
  const years = Array.from({ length: 16 }, (_, i) => currentYear - 8 + i)

  const calendar = open ? createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/15 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Calendar panel */}
      <div
        ref={popupRef}
        className="relative bg-emerald-50/90 backdrop-blur-2xl border border-emerald-200/80 shadow-2xl rounded-3xl p-5 w-72"
        style={{ boxShadow: '0 25px 60px -10px rgba(16,185,129,0.18), 0 8px 24px -6px rgba(0,0,0,0.12)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-emerald-600 hover:bg-emerald-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <span className="font-bold text-lg text-emerald-900 tracking-tight">
            {MONTHS[viewMonth]} {viewYear}
          </span>

          <button
            type="button"
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-emerald-600 hover:bg-emerald-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Month / Year dropdowns */}
        <div className="flex gap-2 mb-4">
          <select
            value={viewMonth}
            onChange={e => setViewMonth(Number(e.target.value))}
            className="flex-1 text-base border border-emerald-200 rounded-xl px-2.5 py-1.5 text-emerald-800 bg-white/70 focus:outline-none focus:border-emerald-400 cursor-pointer font-medium"
          >
            {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <select
            value={viewYear}
            onChange={e => setViewYear(Number(e.target.value))}
            className="w-[72px] text-base border border-emerald-200 rounded-xl px-2 py-1.5 text-emerald-800 bg-white/70 focus:outline-none focus:border-emerald-400 cursor-pointer font-medium"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_HEADERS.map(h => (
            <div key={h} className="text-center text-base font-bold text-emerald-500 py-1">
              {h}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((cell, i) => {
            const isSelected = isSameDay(selected, cell.date)
            const isCurrent = cell.type === 'current'
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleDayClick(cell.date)}
                className={`
                  h-8 w-8 mx-auto text-base rounded-full flex items-center justify-center transition-colors font-medium
                  ${isSelected
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : isCurrent
                      ? 'text-emerald-900 hover:bg-emerald-200/70 hover:text-emerald-800'
                      : 'text-emerald-300 hover:bg-emerald-100/50'
                  }
                `}
              >
                {cell.day}
              </button>
            )
          })}
        </div>

        {/* Close hint */}
        <p className="text-center text-base text-emerald-400 mt-3">
          Presioná Esc o tocá afuera para cerrar
        </p>
      </div>
    </div>,
    document.body
  ) : null

  return (
    <div className="flex flex-col my-3">
      <label htmlFor={id} className="label-premium">
        {label}
      </label>

      <button
        type="button"
        id={id}
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-left w-full transition-all duration-200 bg-white/80 border ${
          open
            ? 'border-emerald-400 ring-2 ring-emerald-100'
            : 'border-emerald-100 hover:border-emerald-400'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500 shrink-0"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        <span className={`text-lg ${selected ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
          {selected ? formatText(selected) : 'Seleccioná una fecha'}
        </span>
      </button>

      {calendar}
    </div>
  )
}

export default DatePicker
