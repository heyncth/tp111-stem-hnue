import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LAYERS = [
  {
    id: 1,
    title: 'Vỏ Khí Động Học & Lớp Xốp Hấp Thụ Lực',
    desc: 'Phân tán xung lực cơ học ban đầu, giữ an toàn vùng đầu. Vỏ ngoài dẫn hướng va chạm, xốp hấp thụ năng lượng trước khi truyền tới sọ.',
  },
  {
    id: 2,
    title: 'Cảm Biến Chạm Đỉnh Đầu (TTP223)',
    desc: 'Nhận biết người dùng có đang đội mũ hay không, tự chuyển về chế độ nghỉ khi treo mũ, chống 100% báo động giả khi cầm tay.',
  },
  {
    id: 3,
    title: 'Bộ Xử Lý Trung Tâm & Cảm Biến Quán Tính 6 Trục',
    desc: 'Vi xử lý 2 nhân ESP32 liên tục đọc xung lực, góc nghiêng và trạng thái bất động để phát hiện cú ngã trong tích tắc.',
  },
  {
    id: 4,
    title: 'Bộ Định Vị Vệ Tinh GPS & Còi Báo Động',
    desc: 'Lấy tọa độ cứu hộ độc lập từ vệ tinh và phát âm thanh cảnh báo nhịp tăng dần, hoạt động ngay cả khi điện thoại không còn bên người.',
  },
]

function LayerArt({ id, active }: { id: number; active: boolean }) {
  const ink = active ? '#10b981' : '#94a3b8'
  const fill = active ? '#ecfdf5' : '#eef2f7'
  if (id === 1) {
    return (
      <g>
        <path
          d="M60 92 C60 42 118 12 176 12 C234 12 276 48 276 96 L276 108 L250 114 L240 144 L150 148 L140 122 L60 122 Z"
          fill={fill}
          stroke={ink}
          strokeWidth="4"
        />
        <path d="M60 92 C60 56 88 30 128 22 C118 46 114 84 122 122 L60 122 Z" fill={active ? '#d1fae5' : '#e2e8f0'} />
        <path d="M74 96 L246 74 L246 96 L86 114 Z" fill="#0f172a" opacity="0.85" />
        <text x="168" y="176" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill={ink}>
          Vỏ ABS · xốp EPS
        </text>
      </g>
    )
  }
  if (id === 2) {
    return (
      <g>
        <rect x="96" y="40" width="144" height="96" rx="16" fill={fill} stroke={ink} strokeWidth="4" />
        <circle cx="168" cy="88" r="30" fill="none" stroke={ink} strokeWidth="4" />
        <circle cx="168" cy="88" r="12" fill={ink} />
        <rect x="118" y="150" width="100" height="10" rx="5" fill={ink} opacity="0.5" />
        <text x="168" y="176" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill={ink}>
          TTP223 · GPIO4
        </text>
      </g>
    )
  }
  if (id === 3) {
    return (
      <g>
        <rect x="70" y="34" width="196" height="112" rx="12" fill={fill} stroke={ink} strokeWidth="4" />
        <rect x="92" y="56" width="84" height="48" rx="6" fill="#0f172a" />
        <rect x="196" y="60" width="46" height="26" rx="4" fill={ink} />
        <rect x="196" y="96" width="46" height="26" rx="4" fill={ink} opacity="0.6" />
        <rect x="92" y="118" width="150" height="8" rx="4" fill={ink} opacity="0.4" />
        <text x="168" y="176" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill={ink}>
          ESP32 · MPU-6050 (I2C 0x68)
        </text>
      </g>
    )
  }
  return (
    <g>
      <rect x="70" y="46" width="130" height="86" rx="10" fill={fill} stroke={ink} strokeWidth="4" />
      <rect x="86" y="62" width="98" height="42" rx="4" fill={active ? '#10b981' : '#cbd5e1'} />
      <circle cx="252" cy="90" r="34" fill={fill} stroke={ink} strokeWidth="4" />
      <circle cx="252" cy="90" r="14" fill={ink} />
        <path d="M100 148 L240 148" stroke={ink} strokeWidth="6" strokeLinecap="round" />
        <text x="168" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill={ink}>
          GP-02 GPS · còi GPIO23
        </text>
    </g>
  )
}

export function Exploded() {
  const [active, setActive] = useState(3)
  const current = LAYERS.find((l) => l.id === active)!

  return (
    <section id="mo-xe" className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-[18ch] text-[clamp(30px,4.4vw,56px)] font-bold leading-[1.08] tracking-[-0.03em]"
        >
          Mổ xẻ bốn tầng bên trong chiếc mũ
        </motion.h2>

        <figure className="mt-10">
          <img
            src="img/full-face-helmet-9274.jpg"
            alt="Mũ bảo hiểm full-face tiêu chuẩn"
            width={1920}
            height={1838}
            loading="lazy"
            decoding="async"
            className="h-[38svh] w-full object-cover md:h-[48svh]"
          />
          <figcaption className="pt-3 text-[14px] text-muted">
            Mũ bảo hiểm tiêu chuẩn, phần cứng nền tảng của dự án.
          </figcaption>
        </figure>

        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:items-center md:gap-14">
          <div className="hidden rounded-3xl bg-alabaster p-4 md:block">
            <svg viewBox="0 0 348 660" className="w-full" role="img" aria-label="Sơ đồ bóc tách bốn tầng linh kiện">
              {LAYERS.map((l, i) => (
                <motion.g
                  key={l.id}
                  animate={{ y: i * 150, x: active === l.id ? 14 : 0 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActive(l.id)}
                >
                  <g transform="translate(0,10)">
                    <LayerArt id={l.id} active={active === l.id} />
                  </g>
                </motion.g>
              ))}
            </svg>
          </div>

          <div>
            <div className="mb-6 rounded-3xl bg-alabaster p-4 md:hidden">
              <svg viewBox="0 0 348 210" className="w-full" role="img" aria-label={`Minh hoạ tầng ${active}`}>
                <g transform="translate(0,0)">
                  <LayerArt id={active} active />
                </g>
              </svg>
            </div>
            <ul className="space-y-3">
              {LAYERS.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => setActive(l.id)}
                    aria-pressed={active === l.id}
                    className={`w-full rounded-2xl px-5 py-4 text-left transition ${
                      active === l.id ? 'bg-[#ecfdf5]' : 'bg-slatefield hover:bg-line'
                    }`}
                  >
                    <span
                      className={`block text-[16px] font-semibold leading-snug ${
                        active === l.id ? 'text-safedark' : 'text-ink'
                      }`}
                    >
                      {l.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-6 rounded-3xl bg-alabaster p-6"
              >
                <p className="text-[16px] leading-[1.6] text-ink">{current.desc}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 overflow-x-auto rounded-3xl bg-slatefield p-5">
              <table className="w-full text-left text-[14px]">
                <caption className="mb-3 text-[14px] font-semibold text-ink">
                  Thông số phần cứng đang chạy trên bản dựng
                </caption>
                <tbody className="[&_td]:py-1.5 [&_th]:py-1.5 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-ink">
                  <tr>
                    <th scope="row">Vi xử lý</th>
                    <td className="font-figure">ESP32-WROOM-32 · 2 nhân Xtensa 240 MHz</td>
                  </tr>
                  <tr>
                    <th scope="row">Cảm biến IMU</th>
                    <td className="font-figure">MPU-6050 (GY-521) · ±8 g · ±500 °/s · 100 Hz · I2C 0x68</td>
                  </tr>
                  <tr>
                    <th scope="row">Chạm</th>
                    <td className="font-figure">TTP223 · nhận biết đội / tháo mũ</td>
                  </tr>
                  <tr>
                    <th scope="row">Định vị</th>
                    <td className="font-figure">GP-02 (GPS) · tọa độ 1 Hz</td>
                  </tr>
                  <tr>
                    <th scope="row">Báo động</th>
                    <td className="font-figure">Còi GPIO23 + LED RGB · âm lượng tăng dần</td>
                  </tr>
                  <tr>
                    <th scope="row">Gửi tin</th>
                    <td className="font-figure">Wi-Fi 2.4 GHz → Telegram · kèm tọa độ GPS</td>
                  </tr>
                  <tr>
                    <th scope="row">Hủy báo</th>
                    <td className="font-figure">Nút vật lý GPIO2 · vòng đếm 15 s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
