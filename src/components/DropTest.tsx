import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MapPin, ShieldCheck, Siren, XCircle } from 'lucide-react'
import { Helmet } from './Helmet'

type Phase = 'idle' | 'fall' | 'impact' | 'measure' | 'countdown' | 'canceled' | 'rescue'

const STEPS = [
  { at: 0, label: 'Rơi tự do & Va chạm', time: '0 ms' },
  { at: 42, label: 'Cảm biến nhận diện xung lực va đập', time: '+42 ms' },
  { at: 85, label: 'Phân tích góc nghiêng và quán tính', time: '+85 ms' },
  { at: 118, label: 'Xác nhận tai nạn & Kích hoạt đếm ngược', time: '118 ms' },
]

const COUNT_MS = 15000
const R = 56
const C = 2 * Math.PI * R

export function DropTest({ wearing }: { wearing: boolean }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [ms, setMs] = useState(0)
  const [left, setLeft] = useState(COUNT_MS)
  const [accidentAt, setAccidentAt] = useState('')
  const [rescueBy, setRescueBy] = useState<'timeout' | 'sos'>('timeout')
  const timers = useRef<number[]>([])

  const clearAll = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clearAll, [])

  const start = () => {
    clearAll()
    setMs(0)
    setLeft(COUNT_MS)
    setPhase('fall')
    if (reduce) {
      timers.current.push(window.setTimeout(() => hit(), 200))
    }
  }

  const hit = () => {
    setPhase('impact')
    timers.current.push(window.setTimeout(() => measure(), reduce ? 100 : 420))
  }

  const measure = () => {
    setPhase('measure')
    if (reduce) {
      setMs(118)
      timers.current.push(window.setTimeout(() => beginCountdown(), 500))
      return
    }
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 950)
      setMs(Math.round(p * 118))
      if (p < 1) requestAnimationFrame(tick)
      else timers.current.push(window.setTimeout(() => beginCountdown(), 350))
    }
    requestAnimationFrame(tick)
  }

  const beginCountdown = () => {
    setAccidentAt(
      new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    )
    setPhase('countdown')
    const end = performance.now() + COUNT_MS
    const tick = () => {
      const rest = Math.max(0, end - performance.now())
      setLeft(rest)
      if (rest <= 0) {
        setRescueBy('timeout')
        setPhase('rescue')
        return
      }
      timers.current.push(window.setTimeout(tick, 100))
    }
    tick()
  }

  const cancel = () => {
    clearAll()
    setPhase('canceled')
  }
  const sos = () => {
    clearAll()
    setRescueBy('sos')
    setPhase('rescue')
  }
  const reset = () => {
    clearAll()
    setMs(0)
    setLeft(COUNT_MS)
    setPhase('idle')
  }

  const stepIndex = phase === 'idle' || phase === 'fall' ? 0 : ms >= 118 ? 3 : ms >= 85 ? 2 : ms >= 42 ? 1 : 0
  const running = phase === 'fall' || phase === 'impact' || phase === 'measure'
  const secs = Math.ceil(left / 1000)

  // SOS: giữ 0,8 giây
  const holdRef = useRef<number | null>(null)
  const holdStart = () => {
    if (phase !== 'countdown' || holdRef.current) return
    holdRef.current = window.setTimeout(sos, 800)
  }
  const holdEnd = () => {
    if (holdRef.current) {
      clearTimeout(holdRef.current)
      holdRef.current = null
    }
  }
  useEffect(() => holdEnd, [])

  return (
    <section id="thu-nghiem" className="bg-alabaster py-24 md:py-36">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-[18ch] text-[clamp(30px,4.4vw,56px)] font-bold leading-[1.15] tracking-[-0.03em]"
        >
          Thử nghiệm thả rơi và tốc độ phản hồi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-5 max-w-[52ch] text-[16px] leading-[1.55] text-ink"
        >
          Lấy mẫu gia tốc và góc nghiêng ở tần số 100&nbsp;Hz, hệ thống chốt nhận định tai nạn
          trong 118&nbsp;ms, rồi mở vòng đếm 15&nbsp;giây cho người lái.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-12">
          {/* Khung thả rơi */}
          <div className="relative overflow-hidden rounded-3xl bg-paper">
            <div className="flex items-center justify-between px-6 pt-5">
              <span className="text-[14px] font-medium text-muted">Hộp chịu lực thử nghiệm</span>
              <span className="font-figure text-[14px] font-semibold text-safedark">
                {phase === 'idle' ? 'CHỜ' : running ? 'ĐO' : phase === 'countdown' ? 'ĐẾM NGƯỢC' : 'KẾT THÚC'}
              </span>
            </div>
            <div className="relative mx-4 mt-4 h-[300px] overflow-hidden rounded-2xl bg-slatefield md:h-[340px]">
              <motion.div
                className="absolute left-1/2 top-4 w-[46%] max-w-[190px] -translate-x-1/2"
                animate={
                  phase === 'fall' && !reduce
                    ? { y: [0, 210], rotate: [0, -6] }
                    : phase === 'impact'
                      ? { y: 210, x: [0, -7, 7, -4, 0] }
                      : phase === 'measure' || phase === 'countdown' || phase === 'rescue' || phase === 'canceled'
                        ? { y: 210, rotate: -6 }
                        : { y: 0, rotate: 0 }
                }
                transition={
                  phase === 'fall'
                    ? { duration: 1.05, ease: [0.4, 0, 1, 1] }
                    : phase === 'impact'
                      ? { duration: 0.4 }
                      : { duration: 0.3 }
                }
                onAnimationComplete={() => {
                  if (phase === 'fall' && !reduce) hit()
                }}
              >
                <Helmet on={phase !== 'idle'} className="w-full" />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 h-14 border-t-4 border-ink bg-[#e2e8f0]" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
              <button
                type="button"
                disabled={!wearing && (phase === 'idle' || phase === 'canceled' || phase === 'rescue')}
                onClick={phase === 'idle' || phase === 'canceled' || phase === 'rescue' ? start : reset}
                className="min-h-[52px] rounded-full bg-safe px-7 text-[16px] font-semibold text-inkdeep transition hover:bg-safedark hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
              >
                {phase === 'idle'
                  ? 'Bắt Đầu Thả Rơi Mũ Thử Nghiệm'
                  : phase === 'canceled' || phase === 'rescue'
                    ? 'Thử Lại'
                    : 'Đang Thả…'}
              </button>
              <span className="font-figure text-[14px] text-muted">Mô hình GY-521 · ±8 g</span>
            </div>
          </div>

          {/* Đồng hồ phản hồi + pipeline */}
          <div className="flex flex-col justify-between rounded-3xl bg-paper p-6 md:p-8">
            <div>
              <div className="flex items-end gap-3">
                <span className="font-figure text-[clamp(48px,7vw,84px)] font-semibold leading-[0.9] tracking-[-0.04em] text-ink tabular-nums">
                  {ms}
                </span>
                <span className="pb-3 text-[20px] font-medium text-muted">ms</span>
              </div>
              <p className="mt-2 text-[16px] font-medium text-safedark">
                Nhận diện tai nạn tức thời, nhanh hơn 1 cái chớp mắt
              </p>

              <ol className="mt-7 space-y-3">
                {STEPS.map((s, i) => (
                  <li
                    key={s.time}
                    className={`flex items-baseline justify-between gap-4 rounded-2xl px-4 py-3 text-[16px] leading-snug transition-colors ${
                      i <= stepIndex && phase !== 'idle' ? 'bg-[#ecfdf5] text-ink font-medium' : 'bg-slatefield text-ink'
                    }`}
                  >
                    <span className={i <= stepIndex && phase !== 'idle' ? 'font-medium' : ''}>{s.label}</span>
                    <span
                      className={`font-figure shrink-0 font-semibold tabular-nums ${
                        i <= stepIndex && phase !== 'idle' ? 'text-safedark' : 'text-ink'
                      }`}
                    >
                      {s.time}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <AnimatePresence mode="wait">
              {phase === 'countdown' && (
                <motion.div
                  key="cd"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="mt-7 rounded-2xl bg-[#fffbeb] p-5"
                >
                  <div className="flex items-center gap-5">
                    <svg viewBox="0 0 128 128" className="h-[92px] w-[92px] shrink-0 -rotate-90" aria-hidden="true">
                      <circle cx="64" cy="64" r={R} fill="none" stroke="#fde68a" strokeWidth="10" />
                      <circle
                        cx="64"
                        cy="64"
                        r={R}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={C}
                        strokeDashoffset={C * (1 - left / COUNT_MS)}
                      />
                    </svg>
                    <div>
                      <p className="font-figure text-[36px] font-semibold leading-none tabular-nums text-amberink">
                        {secs}s
                      </p>
                      <p className="mt-2 text-[16px] leading-snug text-ink">
                        15 giây đếm ngược. Hủy cảnh báo nếu bạn vẫn ổn.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={cancel}
                      className="min-h-[52px] flex-1 rounded-full bg-safe px-5 text-[16px] font-semibold text-inkdeep transition hover:bg-safedark hover:text-white active:scale-[0.98]"
                    >
                      Tôi Vẫn Ổn (Hủy Cảnh Báo)
                    </button>
                    <button
                      type="button"
                      onPointerDown={holdStart}
                      onPointerUp={holdEnd}
                      onPointerLeave={holdEnd}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          holdStart()
                        }
                      }}
                      onKeyUp={holdEnd}
                      aria-label="Giữ 0,8 giây để kích hoạt SOS khẩn cấp"
                      className="min-h-[52px] flex-1 rounded-full bg-alarm px-5 text-[16px] font-semibold text-white transition hover:bg-[#b91c1c] active:scale-[0.98]"
                    >
                      Khẩn Cấp (Nhấn Giữ SOS)
                    </button>
                  </div>
                </motion.div>
              )}

              {(phase === 'canceled' || phase === 'rescue') && (
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`mt-7 rounded-2xl p-5 ${phase === 'canceled' ? 'bg-[#ecfdf5]' : 'bg-[#fef2f2]'}`}
                >
                  {phase === 'canceled' ? (
                    <>
                      <p className="flex items-center gap-2 text-[16px] font-semibold text-safedark">
                        <ShieldCheck size={20} aria-hidden="true" /> Đã hủy cảnh báo
                      </p>
                      <p className="mt-2 text-[16px] leading-snug text-ink">
                        Bạn vẫn làm chủ tay lái. Hệ thống giữ nguyên chế độ bảo vệ chủ động và im lặng
                        chờ va chạm tiếp theo.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="flex items-center gap-2 text-[16px] font-semibold text-alarm">
                        <Siren size={20} aria-hidden="true" /> Thẻ điều phối cấp cứu tự động
                      </p>
                      <dl className="mt-3 space-y-2 text-[16px] leading-snug text-ink">
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted">Thời gian tai nạn</dt>
                          <dd className="font-figure font-semibold tabular-nums">{accidentAt}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted">Tình trạng nạn nhân</dt>
                          <dd className="text-right font-medium">
                            {rescueBy === 'sos' ? 'Bấm khẩn cấp SOS' : 'Bất động, quá 15 giây'}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted">Tọa độ GP-02</dt>
                          <dd className="font-figure font-semibold tabular-nums text-gps">
                            16.0748° N, 108.2240° E
                          </dd>
                        </div>
                      </dl>
                      <a
                        href="https://www.google.com/maps?q=16.0748,108.2240"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gps px-5 text-[16px] font-semibold text-white transition hover:bg-[#1d4ed8]"
                      >
                        <MapPin size={18} aria-hidden="true" /> Mở vị trí trên Google Maps
                      </a>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 text-[16px] font-semibold text-ink transition hover:bg-slatefield"
                  >
                    <XCircle size={18} aria-hidden="true" /> Chạy thử lại từ đầu
                  </button>
                </motion.div>
              )}

              {(phase === 'idle' || running) && (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-7 rounded-2xl bg-slatefield px-5 py-4 text-[16px] leading-snug text-ink"
                >
                  {!wearing
                    ? 'Mũ đang ở trạng thái Tháo. Bật “Đội Mũ” ở đầu trang rồi chạy thử.'
                    : phase === 'idle'
                      ? 'Bấm nút thả rơi để quan sát toàn bộ chuỗi: va chạm, chốt 118 ms, rồi vòng đếm 15 giây.'
                      : 'Cảm biến đang đọc xung lực, hãy chờ hệ thống chốt nhận định.'}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
