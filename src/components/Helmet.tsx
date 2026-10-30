type HelmetProps = {
  on?: boolean
  className?: string
  id?: string
}

/** Mũ S.A.F.E. vẽ tay bằng SVG: vỏ ngọc trai, dải LED trạng thái. */
export function Helmet({ on = true, className, id }: HelmetProps) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label={on ? "Mũ bảo hiểm S.A.F.E. đang hoạt động" : "Mũ bảo hiểm S.A.F.E. đang ở chế độ chờ"}
      id={id}
    >
      <path
        d="M40 164 C40 82 98 34 172 34 C244 34 300 84 300 156 L300 182 C300 202 288 214 266 214 L102 214 C66 214 40 196 40 164 Z"
        fill="#eef2f7"
        stroke="#0f172a"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M40 164 C40 112 70 68 122 48 C110 84 106 128 114 176 L40 176 Z" fill="#dbe3ee" />
      <path
        d="M148 74 L248 66 C266 64 276 80 276 104 L276 142 C276 158 266 168 250 170 L166 176 C152 177 144 168 144 152 L144 94 C144 80 146 76 148 74 Z"
        fill="#0f172a"
      />
      <path d="M158 90 L240 80 L240 96 L158 106 Z" fill="#334155" />
      <rect x="150" y="48" width="16" height="8" rx="4" fill="#cbd5e1" />
      <rect x="180" y="46" width="16" height="8" rx="4" fill="#cbd5e1" />
      <rect x="210" y="50" width="16" height="8" rx="4" fill="#cbd5e1" />
      <rect x="132" y="190" width="76" height="7" rx="3.5" fill="#94a3b8" />
      <rect x="132" y="202" width="54" height="7" rx="3.5" fill="#94a3b8" />
      <rect
        x="236"
        y="188"
        width="54"
        height="9"
        rx="4.5"
        fill={on ? "#10b981" : "#cbd5e1"}
      />
    </svg>
  )
}
