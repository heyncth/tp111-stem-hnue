import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Helmet } from './components/Helmet'
import { DropTest } from './components/DropTest'
import { Exploded } from './components/Exploded'

const NAV = [
  { href: '#thu-nghiem', label: 'Thử Nghiệm Thả Rơi' },
  { href: '#mo-xe', label: 'Mổ Xẻ Cấu Trúc' },
  { href: '#uu-diem', label: 'Ưu Điểm Vượt Trội' },
  { href: '#doi-ngu', label: 'Đội Ngũ' },
]

// Brief khách hàng bắt buộc pill nav kính mờ + chấm trạng thái nhấp nháy.
const NAV_CLASS =
  'flex w-full max-w-[1320px] items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-card backdrop-blur-md md:gap-4 md:px-6' // taste-skill-ignore
const PING_CLASS = 'absolute inline-flex h-full w-full animate-ping rounded-full bg-safe opacity-60' // taste-skill-ignore

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Điều hướng chính" className={NAV_CLASS}>
        <a href="#top" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[14px] font-bold tracking-[-0.02em] text-ink sm:text-[16px]">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className={PING_CLASS} />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-safe" />
          </span>
          S.A.F.E. HELMET
          <span className="hidden whitespace-nowrap text-[14px] font-medium text-muted 2xl:inline">Sẵn sàng hoạt động</span>
        </a>

        <ul className="ml-auto hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="whitespace-nowrap text-[14px] font-medium text-muted transition hover:text-ink">
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="ml-auto hidden whitespace-nowrap rounded-full bg-slatefield px-3.5 py-1.5 text-[14px] font-semibold text-ink xl:inline xl:ml-6">
          THPT Nguyễn Khuyến • STEM 2026
        </span>

        <a
          href="#thu-nghiem"
          className="ml-auto hidden shrink-0 whitespace-nowrap rounded-full bg-safe px-4 py-2 text-[14px] font-semibold text-inkdeep transition hover:bg-safedark hover:text-white sm:inline-flex lg:ml-0"
        >
          Bấm Thử Va Chạm
        </a>

        <button
          type="button"
          className="ml-auto shrink-0 whitespace-nowrap text-[14px] font-semibold text-ink sm:ml-0 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Đóng' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div
          id="menu-mobile"
          className="absolute left-4 right-4 top-[68px] rounded-3xl border border-line bg-white p-4 shadow-card"
        >
          <ul className="space-y-1">
            <li>
              <a
                href="#thu-nghiem"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-full bg-safe px-4 py-3 text-center text-[16px] font-semibold text-inkdeep"
              >
                Bấm Thử Va Chạm
              </a>
            </li>
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[16px] font-medium text-ink hover:bg-slatefield"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="px-4 pt-2 text-[14px] text-muted">THPT Nguyễn Khuyến • STEM 2026</li>
          </ul>
        </div>
      )}
    </header>
  )
}

function Hero({ wearing, setWearing }: { wearing: boolean; setWearing: (v: boolean) => void }) {
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[46svh] bg-paper md:h-[50svh]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 top-[46svh] bg-safe md:top-[50svh]" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pt-[16svh] pb-10 md:block md:pt-0 md:pb-0">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="self-center rounded-full border border-line bg-white px-4 py-1.5 text-[14px] font-semibold text-ink md:absolute md:left-1/2 md:top-[13svh] md:-translate-x-1/2"
        >
          DỰ ÁN ĐẠI DIỆN VÒNG BÁN KẾT STEM 2026
        </motion.span>

        <h1 className="hero-title mx-auto mt-10 text-center md:mt-0">
          <span className="mx-auto flex max-w-[20ch] flex-wrap items-center justify-center gap-x-[0.28em]">
            <span className="text-ink">Bảo vệ chủ động</span>
            <motion.span
              initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex h-[1.05em] w-[1.5em] items-center justify-center"
              title={wearing ? 'Đang đội mũ' : 'Đã tháo mũ'}
            >
              <Helmet on={wearing} className="h-full w-full" />
            </motion.span>
          </span>
          <span className="block text-inkdeep">trên mọi cung đường đô thị</span>
        </h1>

        <div className="mt-auto flex flex-col items-center gap-5 pt-16 text-center md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:pt-0 md:pb-12">
          <motion.p
            {...rise(0.5)}
            className="max-w-[54ch] text-[16px] leading-[1.55] text-inkdeep md:text-[20px]"
          >
            Mũ bảo hiểm thông minh tự động nhận diện va chạm, kiểm tra ý thức người lái qua cửa sổ
            15 giây an toàn và kích hoạt định vị vệ tinh GPS độc lập, hoàn toàn không cần kết nối
            điện thoại.
          </motion.p>

          <motion.div
            {...rise(0.62)}
            className="flex flex-wrap items-center justify-center gap-3 rounded-full bg-white/50 px-4 py-2.5"
          >
            <span className="text-[14px] font-medium text-inkdeep">Trạng Thái Đội Mũ:</span>
            <div className="flex gap-1.5 rounded-full bg-white/60 p-1" role="group" aria-label="Bật tắt trạng thái đội mũ">
              <button
                type="button"
                onClick={() => setWearing(false)}
                aria-pressed={!wearing}
                className={`min-h-[40px] rounded-full px-4 text-[14px] font-semibold transition ${
                  !wearing ? 'bg-ink text-white' : 'bg-white/70 text-ink hover:bg-white'
                }`}
              >
                Tháo Mũ
              </button>
              <button
                type="button"
                onClick={() => setWearing(true)}
                aria-pressed={wearing}
                className={`min-h-[40px] rounded-full px-4 text-[14px] font-semibold transition ${
                  wearing ? 'bg-ink text-white' : 'bg-white/70 text-ink hover:bg-white'
                }`}
              >
                Đội Mũ
              </button>
            </div>
            <span className="basis-full text-center text-[14px] font-semibold text-inkdeep sm:basis-auto sm:text-left">
              ● {wearing ? 'Bảo vệ chủ động' : 'Chế độ chờ (Tiết kiệm pin)'}
            </span>
          </motion.div>

          <motion.div {...rise(0.74)} className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#thu-nghiem"
              className="min-h-[56px] rounded-full bg-ink px-7 text-[16px] font-semibold text-white transition hover:bg-[#1e293b]"
            >
              Xem Thử Nghiệm Thả Rơi (118 ms)
            </a>
            <a
              href="#mo-xe"
              className="min-h-[56px] rounded-full border-2 border-inkdeep px-7 text-[16px] font-semibold text-inkdeep transition hover:bg-white/40"
            >
              Mổ Xẻ Linh Kiện
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <h2 className="sr-only">Số liệu vận hành</h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-[60ch] text-[clamp(22px,2.7vw,36px)] font-medium leading-[1.25] tracking-[-0.02em] text-ink"
        >
          Mũ đọc xung lực <span className="font-semibold tabular-nums">100&nbsp;lần</span> mỗi giây,
          chốt nhận định tai nạn ở{' '}
          <span className="font-semibold tabular-nums text-safedark">118&nbsp;ms</span> và dành trọn{' '}
          <span className="font-semibold tabular-nums text-amberink">15&nbsp;giây</span> cho người lái
          trước khi gọi cứu hộ.
        </motion.p>
      </div>
    </section>
  )
}

function Band({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="bg-paper pb-6">
      <img
        src={src}
        alt={alt}
        width={1920}
        height={1280}
        loading="lazy"
        decoding="async"
        className="h-[46svh] w-full object-cover md:h-[56svh]"
      />
      <figcaption className="mx-auto max-w-[1180px] px-6 pt-4 text-[14px] text-muted md:px-10">
        {caption}
      </figcaption>
    </figure>
  )
}

const VALUES = [
  {
    title: 'Hoàn Toàn Không Cần Điện Thoại',
    body: 'Mũ tự chốt tọa độ GPS, kích hoạt còi báo và vòng đếm 15 giây ngay trên chip của mũ, không cần cài app. Điện thoại hết pin hay văng mất khi ngã xe cũng không ảnh hưởng; tin Telegram chỉ gửi đi khi Wi-Fi 2.4 GHz còn kết nối.',
    media: (
      <img
        src="img/kim-ma-motorbike-traffic-hn.jpg"
        alt="Dòng xe máy trên phố Kim Mã, Hà Nội"
        width={1920}
        height={1440}
        loading="lazy"
        decoding="async"
        className="w-full object-cover"
        style={{ aspectRatio: '4 / 3' }}
      />
    ),
    credit: 'Ảnh: Dragfyre, CC BY-SA 3.0, Wikimedia Commons',
  },
  {
    title: 'Không Báo Nhầm Khi Đi Đường Xấu',
    body: 'Thuật toán chỉ kích hoạt khi cả ba điều kiện cùng thỏa mãn: xung lực vượt ngưỡng, góc nghiêng vượt giới hạn và thời gian bất động đủ dài. Đi qua ổ gà gồ ghề hay phanh gấp không báo nhầm.',
    media: (
      <svg viewBox="0 0 240 180" className="w-full" role="img" aria-label="Bề mặt ổ gà dưới bánh xe, cảm biến không kích hoạt">
        <path d="M16 130 L90 130 L104 152 L146 152 L160 130 L224 130" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinejoin="round" />
        <circle cx="125" cy="96" r="30" fill="#eef2f7" stroke="#0f172a" strokeWidth="5" />
        <circle cx="125" cy="96" r="12" fill="#94a3b8" />
        <path d="M30 52 C60 52 70 74 100 74 C130 74 140 52 170 52 C194 52 204 64 214 64" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 8" />
        <circle cx="196" cy="44" r="20" fill="#ecfdf5" stroke="#10b981" strokeWidth="4" />
        <path d="M188 44 L194 50 L205 38" fill="none" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
    credit: 'Sơ đồ mô phỏng trạng thái cảm biến',
  },
  {
    title: '15 Giây Quyền Năng Cho Người Lái',
    body: 'Người lái còn tỉnh táo luôn có toàn quyền bấm nút hủy (GPIO2) trước khi hệ thống gửi tin cứu hộ. Một nút bấm là xong, hệ thống im lặng và tiếp tục bảo vệ.',
    media: (
      <svg viewBox="0 0 240 180" className="w-full" role="img" aria-label="Ngón tay chạm nút hủy trong vòng đếm 15 giây">
        <circle cx="120" cy="86" r="54" fill="none" stroke="#fde68a" strokeWidth="12" />
        <path d="M120 32 A54 54 0 0 1 172 106" fill="none" stroke="#b45309" strokeWidth="12" strokeLinecap="round" />
        <text x="120" y="100" textAnchor="middle" fontFamily="Inter Variable, sans-serif" fontSize="34" fontWeight="600" fill="#0f172a">15s</text>
        <path d="M150 150 L176 124 L192 140 L166 166 Z" fill="#eef2f7" stroke="#cbd5e1" strokeWidth="4" />
        <path d="M166 166 L150 150 L120 156" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
    credit: 'Sơ đồ vòng đếm 15 giây',
  },
]

function Values() {
  return (
    <section id="uu-diem" className="bg-alabaster py-24 md:py-36">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-[22ch] text-[clamp(30px,4.4vw,56px)] font-bold leading-[1.15] tracking-[-0.03em] md:pl-[18%]"
        >
          Vì sao chạy độc lập lại quan trọng
        </motion.h2>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {VALUES.map((v, i) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="grid items-start gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-14"
            >
              <div className="md:pl-[18%]">
                <h3 className="text-[clamp(24px,2.6vw,36px)] font-bold leading-[1.2] tracking-[-0.03em]">
                  {v.title}
                </h3>
                <p className="mt-4 max-w-[40ch] text-[16px] leading-[1.6] text-ink">{v.body}</p>
              </div>
              <div className={i % 2 === 0 ? 'md:ml-auto md:w-[85%]' : 'md:w-[70%]'}>
                <div className="overflow-hidden bg-paper p-5">{v.media}</div>
                {!v.credit.includes('Wikimedia') && (
                  <p className="mt-2 text-[14px] text-muted">{v.credit}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="doi-ngu" className="bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <h2 className="mb-10 text-[clamp(30px,4.4vw,56px)] font-bold leading-[1.15] tracking-[-0.03em]">
          Đội ngũ sáng chế
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="grid gap-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-14"
        >
          <div>
            <svg viewBox="0 0 160 160" className="w-[110px] md:w-full" role="img" aria-label="Chữ ký LĐT và NCTH">
              <rect width="160" height="160" fill="#0f172a" />
              <text x="80" y="74" textAnchor="middle" fontFamily="Be Vietnam Pro, sans-serif" fontSize="44" fontWeight="700" fill="#ffffff">LĐT</text>
              <text x="80" y="124" textAnchor="middle" fontFamily="Be Vietnam Pro, sans-serif" fontSize="44" fontWeight="700" fill="#10b981">NCTH</text>
            </svg>
            <dl className="mt-6 space-y-3 text-[14px]">
              <div>
                <dt className="text-muted">Nơi làm việc</dt>
                <dd className="font-medium">Đà Nẵng</dd>
              </div>
              <div>
                <dt className="text-muted">Lớp</dt>
                <dd className="font-medium">10/2</dd>
              </div>
              <div>
                <dt className="text-muted">Cuộc thi</dt>
                <dd className="font-medium">STEM 2026, Vòng Bán kết</dd>
              </div>
            </dl>
          </div>
          <div>
            <p className="text-[clamp(22px,2.5vw,36px)] leading-[1.3] tracking-[-0.02em] text-ink">
              <span className="font-semibold">Lê Diên Thắng</span> và{' '}
              <span className="font-semibold">Nguyễn Công Thuận Huy</span>, hai học sinh lớp 10/2,
              đã biến chiếc mũ thành thiết bị cảnh báo tai nạn.
            </p>
            <p className="mt-6 max-w-[62ch] text-[16px] leading-[1.6] text-ink">
              Hai bạn tự dựng bản phần cứng trên bàn học: cảm biến quán tính đọc liên tục, thuật toán
              đa tầng phân biệt va chạm thật với ổ gà, và vòng đếm 15 giây trả lại quyền quyết định
              cho người lái trước khi tin cứu hộ được gửi đi.
            </p>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-muted">
              Xếp hạng dự án: Vòng Bán kết Cuộc thi Khoa học Kỹ thuật &amp; STEM 2026.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="bg-ink py-24 text-white md:py-36">
      <div className="mx-auto flex min-h-[52svh] max-w-[1180px] flex-col justify-between gap-14 px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-[1180px] text-[clamp(36px,6vw,84px)] font-bold leading-[1.1] tracking-[-0.04em]"
        >
          Một nút bấm, mười lăm giây quyết định.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <p className="max-w-[38ch] text-[16px] leading-[1.55] text-white/80 md:text-[20px]">
            Xem mũ tự nhận diện một cú va chạm thật, ngay trên trang này. Không cần cài app, không
            cần mang thiết bị nào theo.
          </p>
          <a
            href="#thu-nghiem"
            className="min-h-[56px] shrink-0 whitespace-nowrap rounded-full bg-safe px-8 text-[16px] font-semibold text-inkdeep transition hover:bg-white"
          >
            Bấm Thử Va Chạm
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-safe text-inkdeep">
      <div className="mx-auto flex min-h-[92svh] max-w-[1180px] flex-col px-6 pt-14 pb-10 md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[64ch] space-y-2 text-[16px] leading-[1.5]">
            <p className="font-semibold">Trường THCS &amp; THPT Nguyễn Khuyến (Đà Nẵng)</p>
            <p>
              Nhóm tác giả sáng chế: Lê Diên Thắng (Lớp 10/2) &amp; Nguyễn Công Thuận Huy (Lớp 10/2).
            </p>
            <p>
              Toàn văn đề tài khoa học: “Nghiên cứu và phát triển hệ thống mũ bảo hiểm thông minh
              S.A.F.E - giải pháp cảnh báo tai nạn đa cảm biến, đa tầng, có khả năng tự vận hành độc
              lập khi mất kết nối, ứng dụng cho phương tiện hai bánh.”
            </p>
            <p className="font-medium">
              Phiên bản thử nghiệm phục vụ Vòng Bán kết Cuộc thi Khoa học Kỹ thuật &amp; STEM 2026.
            </p>
          </div>
          <a href="#top" className="text-[16px] font-semibold underline underline-offset-4">
            Về đầu trang
          </a>
        </div>

        <p
          className="mt-auto pt-24 font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(36px, 7vw, 84px)' }}
        >
          Nguyễn Khuyến,
          <br />
          Đà Nẵng
        </p>

        <div className="mt-10 space-y-2 text-[14px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>Lê Diên Thắng · Nguyễn Công Thuận Huy · Lớp 10/2</p>
            <p className="font-figure tabular-nums">Đà Nẵng · 2026</p>
          </div>
          <p className="max-w-[64ch] leading-[1.5]">
            Ảnh chụp thế giới quanh dự án, từ Wikimedia Commons: “Ho Chi Minh City, Vietnam, Street
            traffic” bởi Mike (CC BY 2.0); “Kim Ma motorbike traffic HN” bởi Dragfyre (CC BY-SA
            3.0); “2024-12-04 Da Nang at night” bởi Alexkom000 (CC BY 4.0); “Full-Face Helmet 9274”
            bởi Ashley Pomeroy (CC BY-SA 4.0). Các hình minh hoạ kỹ thuật vẽ bằng SVG cho dự án.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [wearing, setWearing] = useState(true)
  return (
    <div className="min-h-dvh bg-paper">
      <Nav />
      <main>
        <Hero wearing={wearing} setWearing={setWearing} />
        <Stats />
        <Band
          src="img/ho-chi-minh-city-vietnam-street-traffic.jpg"
          alt="Dòng xe máy đông đúc trên một đại lộ ở TP. Hồ Chí Minh"
          caption="Đường phố Việt Nam: mỗi ngày hàng triệu chuyến đi, chiếc mũ phải tự quyết định trong 15 giây."
        />
        <DropTest wearing={wearing} />
        <Exploded />
        <Values />
        <Team />
        <Band
          src="img/2024-12-04-da-nang-at-night.jpg"
          alt="Thành phố Đà Nẵng về đêm nhìn từ trên cao"
          caption="Đà Nẵng về đêm, nơi nhóm tác giả dựng dự án."
        />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
