// // import { useState } from 'react'
// // import heroImg from './assets/hero.png'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from './assets/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <section id="center">
// //         <div className="hero">
// //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// //           <img src={reactLogo} className="framework" alt="React logo" />
// //           <img src={viteLogo} className="vite" alt="Vite logo" />
// //         </div>
// //         <div>
// //           <h1>Get started</h1>
// //           <p>
// //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// //           </p>
// //         </div>
// //         <button
// //           type="button"
// //           className="counter"
// //           onClick={() => setCount((count) => count + 1)}
// //         >
// //           Count is {count}
// //         </button>
// //       </section>

// //       <div className="ticks"></div>

// //       <section id="next-steps">
// //         <div id="docs">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#documentation-icon"></use>
// //           </svg>
// //           <h2>Documentation</h2>
// //           <p>Your questions, answered</p>
// //           <ul>
// //             <li>
// //               <a href="https://vite.dev/" target="_blank">
// //                 <img className="logo" src={viteLogo} alt="" />
// //                 Explore Vite
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://react.dev/" target="_blank">
// //                 <img className="button-icon" src={reactLogo} alt="" />
// //                 Learn more
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //         <div id="social">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#social-icon"></use>
// //           </svg>
// //           <h2>Connect with us</h2>
// //           <p>Join the Vite community</p>
// //           <ul>
// //             <li>
// //               <a href="https://github.com/vitejs/vite" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#github-icon"></use>
// //                 </svg>
// //                 GitHub
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://chat.vite.dev/" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#discord-icon"></use>
// //                 </svg>
// //                 Discord
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://x.com/vite_js" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#x-icon"></use>
// //                 </svg>
// //                 X.com
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#bluesky-icon"></use>
// //                 </svg>
// //                 Bluesky
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="ticks"></div>
// //       <section id="spacer"></section>
// //     </>
// //   )
// // }

// // export default App











































// import { useEffect, useState } from 'react'
// import './App.css'

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// function App() {
//   const [data, setData] = useState(null)
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     let active = true

//     async function loadDashboard() {
//       try {
//         const response = await fetch(`${API_URL}/api/dashboard/overview`)
//         if (!response.ok) throw new Error(`خطای سرور: ${response.status}`)

//         const result = await response.json()
//         if (active) {
//           setData(result)
//           setError('')
//         }
//       } catch {
//         if (active) setError('ارتباط با سرور برقرار نشد. مطمئن شو بک‌اند و دیتابیس در دسترس هستند.')
//       } finally {
//         if (active) setLoading(false)
//       }
//     }

//     loadDashboard()
//     const timer = setInterval(loadDashboard, 10000)

//     return () => {
//       active = false
//       clearInterval(timer)
//     }
//   }, [])

//   const summary = data?.summary || {}
//   const vehicles = data?.vehicles || []

//   return (
//     <div className="app" dir="rtl">
//       <aside className="sidebar">
//         <div className="brand">
//           <span className="brand-icon">🚘</span>
//           <div>
//             <strong>AutoSense</strong>
//             <small>Vehicle Monitoring</small>
//           </div>
//         </div>

//         <div className="menu-title">منوی اصلی</div>
//         <div className="menu-item active">▦ <span>داشبورد</span></div>
//         <div className="menu-item">🚗 <span>خودروها</span></div>
//         <div className="menu-item">◷ <span>جلسات ثبت داده</span></div>
//         <div className="menu-item">⌁ <span>داده‌های سنسورها</span></div>
//         <div className="menu-item">⚠ <span>خطاهای ECU</span></div>

//         <div className="sidebar-bottom">
//           <span className="status-dot" />
//           سامانه پایش خودرو
//           <small>نسخه 1.0</small>
//         </div>
//       </aside>

//       <main className="main">
//         <header className="topbar">
//           <div>
//             <h1>داشبورد پایش خودرو</h1>
//             <p>نمای کلی وضعیت خودروها و داده‌های OBD</p>
//           </div>
//           <div className="live-badge"><span /> پایش زنده</div>
//         </header>

//         {loading && <div className="notice">در حال دریافت اطلاعات...</div>}
//         {error && <div className="notice error">{error}</div>}

//         <section className="stats-grid">
//           <StatCard icon="🚘" label="تعداد خودروها" value={summary.total_vehicles ?? '—'} />
//           <StatCard icon="◷" label="تعداد جلسات" value={summary.total_sessions ?? '—'} />
//           <StatCard icon="⌁" label="نمونه‌های ثبت‌شده" value={summary.total_samples ?? '—'} />
//           <StatCard icon="⚠" label="کدهای خطا" value={summary.total_dtcs ?? '—'} />
//         </section>

//         <section className="section">
//           <div className="section-heading">
//             <div>
//               <h2>وضعیت خودروها</h2>
//               <p>آخرین اطلاعات دریافتی از هر خودرو</p>
//             </div>
//             <span className="count">{vehicles.length} خودرو</span>
//           </div>

//           {!loading && !error && vehicles.length === 0 && (
//             <div className="empty-state">
//               <span>🚗</span>
//               <h3>هنوز خودرویی ثبت نشده است</h3>
//               <p>پس از ثبت خودرو و ارسال داده‌ها، اطلاعات در این قسمت نمایش داده می‌شود.</p>
//             </div>
//           )}

//           <div className="vehicle-grid">
//             {vehicles.map((item, index) => {
//               const vehicle = item.vehicle || {}
//               const sample = item.latest_sample || {}
//               const session = item.latest_session || {}
//               const dtcs = item.dtcs || []

//               return (
//                 <article className="vehicle-card" key={vehicle.vehicle_id || index}>
//                   <div className="vehicle-heading">
//                     <div className="car-icon">🚙</div>
//                     <div>
//                       <h3>{vehicle.make || 'خودرو'} {vehicle.model || ''}</h3>
//                       <p>{vehicle.vehicle_id}</p>
//                     </div>
//                     <span className={`engine-badge ${sample.engine_state === 'running' ? 'running' : ''}`}>
//                       {sample.engine_state === 'running' ? 'روشن' :
//                         sample.engine_state === 'off' ? 'خاموش' : 'نامشخص'}
//                     </span>
//                   </div>

//                   <div className="sensor-grid">
//                     <Sensor label="دور موتور" value={sample.rpm} unit="RPM" />
//                     <Sensor label="سرعت" value={sample.speed} unit="km/h" />
//                     <Sensor label="دمای آب" value={sample.coolant_temp} unit="°C" />
//                     <Sensor label="ولتاژ باتری" value={sample.adapter_voltage} unit="V" />
//                     <Sensor label="بار موتور" value={sample.engine_load} unit="%" />
//                     <Sensor label="دریچه گاز" value={sample.throttle} unit="%" />
//                   </div>

//                   <div className="vehicle-footer">
//                     <span>جلسه: {session.session_id || 'بدون جلسه'}</span>
//                     <span className={dtcs.length ? 'fault-text' : 'normal-text'}>
//                       {dtcs.length ? `${dtcs.length} خطا` : 'بدون خطای ثبت‌شده'}
//                     </span>
//                   </div>

//                   {dtcs.length > 0 && (
//                     <div className="dtc-list">
//                       {dtcs.map((dtc, i) => <span key={i}>{dtc.code}</span>)}
//                     </div>
//                   )}
//                 </article>
//               )
//             })}
//           </div>
//         </section>

//         <footer>AutoSense · سامانه پایش و تحلیل داده‌های خودرو</footer>
//       </main>
//     </div>
//   )
// }

// function StatCard({ icon, label, value }) {
//   return (
//     <article className="stat-card">
//       <div className="stat-icon">{icon}</div>
//       <div><p>{label}</p><strong>{value}</strong></div>
//     </article>
//   )
// }

// function Sensor({ label, value, unit }) {
//   return (
//     <div className="sensor">
//       <span>{label}</span>
//       <strong>{value == null ? '—' : value} <small>{unit}</small></strong>
//     </div>
//   )
// }

// export default App



import { useMemo, useState } from 'react'
import './App.css'

// مرحله اول: داده‌های نمایشی مطابق فیلدهای db_tables.json
// هنگام اتصال بک‌اند، این داده‌ها با خروجی API جایگزین خواهند شد.
const DEMO = {
  summary: { total_vehicles: 1, total_sessions: 12, total_samples: 1842, total_dtcs: 2 },
  vehicle: {
    vehicle_id: 'VH-2048', make: 'Hyundai', model: 'Elantra', model_year: 2021,
    engine_state: 'running', session_id: 'SESSION-2026-0113', source: 'simulated',
    mil_on: true,
    sample: {
      rpm: 2180, coolant_temp: 91, speed: 64, adapter_voltage: 13.9,
      engine_load: 42, throttle: 28, intake_air_temp: 34, maf: 18.6,
      stft_b1: 3.2, ltft_b1: 5.1, ctrl_module_voltage: 14.0,
    },
    dtcs: [{ code: 'P0171' }, { code: 'P0300' }],
  },
}

const sensorDefinitions = [
  { key: 'rpm', title: 'دور موتور', unit: 'RPM', icon: '◉', color: 'blue', description: 'سرعت چرخش میل‌لنگ موتور' },
  { key: 'coolant_temp', title: 'دمای آب موتور', unit: '°C', icon: '♨', color: 'orange', description: 'دمای مایع خنک‌کننده موتور' },
  { key: 'speed', title: 'سرعت خودرو', unit: 'km/h', icon: '↗', color: 'green', description: 'سرعت لحظه‌ای خودرو' },
  { key: 'adapter_voltage', title: 'ولتاژ آداپتور', unit: 'V', icon: 'ϟ', color: 'purple', description: 'ولتاژ اندازه‌گیری‌شده توسط آداپتور' },
  { key: 'engine_load', title: 'بار موتور', unit: '%', icon: '▥', color: 'blue', description: 'بار محاسبه‌شده موتور' },
  { key: 'throttle', title: 'موقعیت دریچه گاز', unit: '%', icon: '⌁', color: 'green', description: 'درصد بازشدگی دریچه گاز' },
  { key: 'intake_air_temp', title: 'دمای هوای ورودی', unit: '°C', icon: '❄', color: 'cyan', description: 'دمای هوای ورودی به موتور' },
  { key: 'maf', title: 'جریان جرمی هوا', unit: 'g/s', icon: '≋', color: 'purple', description: 'جرم هوای ورودی در واحد زمان' },
  { key: 'stft_b1', title: 'اصلاح کوتاه‌مدت سوخت', unit: '%', icon: '⌁', color: 'orange', description: 'Short Term Fuel Trim – Bank 1' },
  { key: 'ltft_b1', title: 'اصلاح بلندمدت سوخت', unit: '%', icon: '⌁', color: 'orange', description: 'Long Term Fuel Trim – Bank 1' },
  { key: 'ctrl_module_voltage', title: 'ولتاژ ECU', unit: 'V', icon: 'ϟ', color: 'purple', description: 'ولتاژ تغذیه ماژول کنترل' },
]

const chartSeries = {
  rpm: [1450, 1580, 1720, 1660, 1940, 2070, 1980, 2180, 2120, 2180, 2240, 2180],
  coolant_temp: [82, 83, 84, 85, 86, 87, 88, 89, 90, 90, 91, 91],
  speed: [32, 38, 45, 52, 48, 56, 61, 58, 64, 67, 62, 64],
  adapter_voltage: [12.4, 13.8, 13.9, 14.0, 13.8, 13.9, 14.1, 13.9, 14.0, 13.8, 13.9, 13.9],
}

const navItems = [
  { id: 'dashboard', label: 'داشبورد', icon: '▦' },
  { id: 'vehicles', label: 'خودروها', icon: '▰' },
  { id: 'sensors', label: 'سنسورها و تحلیل', icon: '⌁' },
  { id: 'alerts', label: 'خطاها و هشدارها', icon: '⚑', badge: '2' },
]

function formatValue(value) {
  return value == null ? '—' : Number.isInteger(value) ? value.toLocaleString('en-US') : value.toFixed(1)
}

function Icon({ children, className = '' }) {
  return <span aria-hidden="true" className={`icon ${className}`}>{children}</span>
}

function MetricCard({ item, value, onClick }) {
  return (
    <button className="metric-card" onClick={onClick} type="button">
      <div className={`metric-icon ${item.color}`}><Icon>{item.icon}</Icon></div>
      <div className="metric-copy">
        <span>{item.title}</span>
        <strong>{formatValue(value)} <small>{item.unit}</small></strong>
        <em>مشاهده تحلیل <b>←</b></em>
      </div>
    </button>
  )
}

function LineChart({ values, color = '#3478df', unit = '' }) {
  const width = 720
  const height = 220
  const pad = 18
  const min = Math.min(...values)
  const max = Math.max(...values)
  const spread = max - min || 1
  const points = values.map((value, index) => {
    const x = pad + (index / (values.length - 1)) * (width - pad * 2)
    const y = height - pad - ((value - min) / spread) * (height - pad * 2)
    return [x, y]
  })
  const line = points.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`
  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`نمودار تغییرات ${unit}`} preserveAspectRatio="none">
        {[0, 1, 2, 3].map((n) => <line key={n} x1="0" x2={width} y1={pad + n * ((height - pad * 2) / 3)} y2={pad + n * ((height - pad * 2) / 3)} className="chart-grid" />)}
        <polygon points={area} fill={color} opacity="0.09" />
        <polyline points={line} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="3.5" fill="white" stroke={color} strokeWidth="2" />)}
      </svg>
      <div className="chart-axis"><span>۱۲:۰۰</span><span>۱۲:۱۵</span><span>۱۲:۳۰</span><span>۱۲:۴۵</span><span>۱۳:۰۰</span></div>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedSensor, setSelectedSensor] = useState('coolant_temp')
  const [period, setPeriod] = useState('1h')
  const [mobileMenu, setMobileMenu] = useState(false)
  const vehicle = DEMO.vehicle
  const selected = sensorDefinitions.find((item) => item.key === selectedSensor) || sensorDefinitions[0]
  const selectedValues = chartSeries[selectedSensor] || [
    vehicle.sample[selectedSensor] * 0.82, vehicle.sample[selectedSensor] * 0.88,
    vehicle.sample[selectedSensor] * 0.91, vehicle.sample[selectedSensor] * 0.87,
    vehicle.sample[selectedSensor] * 0.95, vehicle.sample[selectedSensor] * 0.98,
    vehicle.sample[selectedSensor] * 0.94, vehicle.sample[selectedSensor] * 1.02,
    vehicle.sample[selectedSensor] * 0.99, vehicle.sample[selectedSensor] * 1.01,
    vehicle.sample[selectedSensor] * 1.03, vehicle.sample[selectedSensor],
  ]
  const normalCount = sensorDefinitions.length
  const alertCount = vehicle.dtcs.length
  const pageTitle = navItems.find((item) => item.id === activePage)?.label || 'جزئیات سنسور'
  const chartStats = useMemo(() => ({ min: Math.min(...selectedValues), max: Math.max(...selectedValues), avg: selectedValues.reduce((a, b) => a + b, 0) / selectedValues.length }), [selectedValues])

  function openSensor(key) {
    setSelectedSensor(key)
    setActivePage('sensor-detail')
  }

  return (
    <div className="app-shell" dir="rtl">
      <aside className={`sidebar ${mobileMenu ? 'open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><Icon>⌁</Icon></div>
          <div><strong>AutoSense</strong><span>سامانه پایش خودرو</span></div>
          <button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="بستن منو">×</button>
        </div>
        <div className="nav-caption">منوی اصلی</div>
        <nav className="side-nav">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => { setActivePage(item.id); setMobileMenu(false) }}>
              <Icon>{item.icon}</Icon><span>{item.label}</span>{item.badge && <b className="nav-badge">{item.badge}</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="connection-indicator"><i /> حالت نمایشی فعال</div>
          <span>نسخه رابط کاربری ۱.۰</span>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-start">
            <button className="mobile-menu" onClick={() => setMobileMenu(true)} aria-label="باز کردن منو">☰</button>
            <div><div className="breadcrumb">AutoSense <span>/</span> {pageTitle}</div><h1>{activePage === 'sensor-detail' ? selected.title : pageTitle}</h1></div>
          </div>
          <div className="topbar-actions">
            <span className="demo-label"><i /> داده نمایشی</span>
            <button className="avatar" aria-label="حساب کاربری">م</button>
          </div>
        </header>

        <div className="content-area">
          {activePage === 'dashboard' && <Dashboard vehicle={vehicle} alertCount={alertCount} normalCount={normalCount} onSensor={openSensor} onPage={setActivePage} />}
          {activePage === 'vehicles' && <Vehicles vehicle={vehicle} onSensor={openSensor} />}
          {activePage === 'sensors' && <Sensors vehicle={vehicle} onSensor={openSensor} />}
          {activePage === 'alerts' && <Alerts vehicle={vehicle} />}
          {activePage === 'sensor-detail' && <SensorDetails item={selected} value={vehicle.sample[selected.key]} values={selectedValues} stats={chartStats} period={period} setPeriod={setPeriod} onBack={() => setActivePage('sensors')} />}
          <footer className="page-footer">AutoSense · سامانه پایش و تحلیل داده‌های خودرو <span>این صفحه در حال حاضر با داده نمایشی اجرا می‌شود.</span></footer>
        </div>
      </main>
    </div>
  )
}

function Dashboard({ vehicle, alertCount, normalCount, onSensor, onPage }) {
  const metrics = sensorDefinitions.slice(0, 6)
  return <>
    <section className="welcome-row"><div><h2>نمای کلی وضعیت خودرو</h2><p>خلاصه‌ای از آخرین وضعیت ثبت‌شده خودرو و پارامترهای آن</p></div><div className="updated-chip"><span /> آخرین به‌روزرسانی: همین حالا</div></section>
    <section className="overview-grid">
      <div className="overview-card vehicle-overview">
        <div className="vehicle-top"><div className="vehicle-symbol"><Icon>▰</Icon></div><span className="status-pill success"><i /> موتور روشن</span></div>
        <div className="vehicle-name"><h3>{vehicle.make} {vehicle.model}</h3><span>{vehicle.model_year} · شناسه {vehicle.vehicle_id}</span></div>
        <div className="vehicle-meta"><div><span>شناسه جلسه</span><b>{vehicle.session_id}</b></div><div><span>منبع داده</span><b>شبیه‌سازی</b></div></div>
      </div>
      <div className="overview-card health-card"><div className="card-title"><span>وضعیت کلی پایش</span><Icon>◉</Icon></div><div className="health-score"><strong>نیازمند بررسی</strong><span className="health-tag">{alertCount} مورد خطا</span></div><div className="health-track"><span style={{ width: '72%' }} /></div><p>بر اساس خطاهای ثبت‌شده و وضعیت پارامترها</p><button className="text-link" onClick={() => onPage('alerts')}>مشاهده هشدارها ←</button></div>
      <div className="overview-card quick-stats"><div className="card-title"><span>خلاصه اطلاعات</span><Icon>▤</Icon></div><div className="quick-stat-line"><span>تعداد جلسات ثبت‌شده</span><b>۱۲</b></div><div className="quick-stat-line"><span>نمونه‌های دریافتی</span><b>۱٬۸۴۲</b></div><div className="quick-stat-line"><span>پارامترهای قابل نمایش</span><b>{normalCount}</b></div></div>
    </section>

    <section className="section-block"><div className="section-heading"><div><h2>پارامترهای اصلی خودرو</h2><p>برای مشاهده نمودار و جزئیات هر پارامتر انتخاب کنید.</p></div><button className="outline-button" onClick={() => onPage('sensors')}>همه سنسورها <b>←</b></button></div><div className="metrics-grid">{metrics.map((item) => <MetricCard key={item.key} item={item} value={vehicle.sample[item.key]} onClick={() => onSensor(item.key)} />)}</div></section>

    <section className="lower-grid">
      <div className="panel"><div className="panel-heading"><div><h3>آخرین هشدارها</h3><p>خطاهای ثبت‌شده در جلسه جاری</p></div><button className="text-link" onClick={() => onPage('alerts')}>مشاهده همه ←</button></div><div className="alert-list"><div className="alert-row"><span className="alert-symbol danger">!</span><div><b>کد خطای P0171</b><p>Fuel System Too Lean – Bank 1</p></div><small>ثبت‌شده</small></div><div className="alert-row"><span className="alert-symbol warning">!</span><div><b>کد خطای P0300</b><p>Random/Multiple Cylinder Misfire</p></div><small>ثبت‌شده</small></div></div></div>
      <div className="panel"><div className="panel-heading"><div><h3>وضعیت عملکرد موتور</h3><p>مقادیر لحظه‌ای منتخب</p></div><span className="status-pill success"><i /> فعال</span></div><div className="engine-data"><div><span>دور موتور</span><b>{formatValue(vehicle.sample.rpm)} <small>RPM</small></b></div><div><span>دمای آب</span><b>{formatValue(vehicle.sample.coolant_temp)} <small>°C</small></b></div><div><span>بار موتور</span><b>{formatValue(vehicle.sample.engine_load)} <small>%</small></b></div><div><span>ولتاژ ECU</span><b>{formatValue(vehicle.sample.ctrl_module_voltage)} <small>V</small></b></div></div></div>
    </section>
  </>
}

function Vehicles({ vehicle, onSensor }) {
  return <><section className="welcome-row"><div><h2>خودروهای ثبت‌شده</h2><p>فهرست خودروهای تحت پایش در سامانه</p></div><span className="count-chip">۱ خودرو</span></section><div className="panel vehicle-detail-panel"><div className="vehicle-large-icon">▰</div><div className="vehicle-large-info"><span className="status-pill success"><i /> موتور روشن</span><h2>{vehicle.make} {vehicle.model}</h2><p>مدل {vehicle.model_year} · شناسه {vehicle.vehicle_id}</p><div className="vehicle-info-grid"><div><span>شناسه جلسه فعال</span><b>{vehicle.session_id}</b></div><div><span>وضعیت MIL</span><b className="danger-text">روشن</b></div><div><span>منبع داده</span><b>شبیه‌سازی</b></div><div><span>تعداد خطاهای جلسه</span><b>{vehicle.dtcs.length}</b></div></div></div></div><section className="section-block"><div className="section-heading"><div><h2>پارامترهای آخرین نمونه</h2><p>انتخاب هر مورد، صفحه تحلیل آن را باز می‌کند.</p></div></div><div className="metrics-grid">{sensorDefinitions.map((item) => <MetricCard key={item.key} item={item} value={vehicle.sample[item.key]} onClick={() => onSensor(item.key)} />)}</div></section></>
}

function Sensors({ vehicle, onSensor }) {
  return <><section className="welcome-row"><div><h2>سنسورها و پارامترها</h2><p>مقادیر قابل دریافت از داده‌های OBD در ساختار فعلی پروژه</p></div><span className="count-chip">{sensorDefinitions.length} پارامتر</span></section><div className="metrics-grid sensors-page-grid">{sensorDefinitions.map((item) => <MetricCard key={item.key} item={item} value={vehicle.sample[item.key]} onClick={() => onSensor(item.key)} />)}</div><div className="info-note"><b>توجه:</b> نمایش هر پارامتر به پشتیبانی ECU و وجود مقدار معتبر در نمونه‌های ثبت‌شده وابسته است. مقادیر این نسخه صرفاً نمایشی هستند.</div></>
}

function Alerts({ vehicle }) {
  return <><section className="welcome-row"><div><h2>خطاها و هشدارها</h2><p>کدهای خطای ثبت‌شده برای جلسه انتخاب‌شده</p></div><span className="count-chip danger-count">۲ خطا</span></section><div className="alert-summary"><div><span className="alert-symbol danger">!</span><div><b>خطاهای ثبت‌شده ECU</b><p>این کدها از جدول dtcs خوانده می‌شوند.</p></div></div><strong>{vehicle.dtcs.length}</strong></div><div className="panel dtc-panel">{vehicle.dtcs.map((item) => <div className="dtc-item" key={item.code}><div className="dtc-code">{item.code}</div><div className="dtc-description"><b>{item.code === 'P0171' ? 'ترکیب سوخت و هوای رقیق – بانک ۱' : 'احتراق ناقص تصادفی یا چندسیلندری'}</b><p>{item.code === 'P0171' ? 'Fuel System Too Lean – Bank 1' : 'Random/Multiple Cylinder Misfire'}</p></div><span className="status-pill danger-pill">ثبت‌شده</span></div>)}</div><div className="info-note">روشن بودن چراغ MIL نیز از فیلد <code>mil_on</code> در اطلاعات نشست قابل بررسی است. شدت و اقدام پیشنهادی هر کد خطا باید بر اساس مرجع تشخیصی معتبر تعیین شود.</div></>
}

function SensorDetails({ item, value, values, stats, period, setPeriod, onBack }) {
  return <><button className="back-link" onClick={onBack}>→ بازگشت به سنسورها</button><section className="sensor-detail-hero"><div className={`metric-icon large ${item.color}`}><Icon>{item.icon}</Icon></div><div className="detail-title"><h2>{item.title}</h2><p>{item.description}</p></div><div className="current-reading"><span>آخرین مقدار ثبت‌شده</span><strong>{formatValue(value)} <small>{item.unit}</small></strong><em>مقدار نمایشی</em></div></section><section className="detail-stats"><div><span>کمترین مقدار</span><b>{formatValue(stats.min)} <small>{item.unit}</small></b></div><div><span>بیشترین مقدار</span><b>{formatValue(stats.max)} <small>{item.unit}</small></b></div><div><span>میانگین</span><b>{formatValue(stats.avg)} <small>{item.unit}</small></b></div><div><span>تعداد نقاط نمودار</span><b>{values.length}</b></div></section><section className="panel detail-chart-panel"><div className="panel-heading"><div><h3>نمودار تغییرات {item.title}</h3><p>روند تغییرات مقدار در بازه انتخاب‌شده</p></div><div className="period-switch">{[['1h', '۱ ساعت'], ['6h', '۶ ساعت'], ['24h', '۲۴ ساعت']].map(([key, label]) => <button key={key} className={period === key ? 'selected' : ''} onClick={() => setPeriod(key)}>{label}</button>)}</div></div><div className="chart-legend"><i /> {item.title} ({item.unit})</div><LineChart values={values} color={item.color === 'orange' ? '#e69a36' : item.color === 'green' ? '#22a477' : '#3478df'} unit={item.unit} /><div className="chart-disclaimer">نمودار حاضر نمونه رابط کاربری است؛ داده تاریخی واقعی پس از اتصال به API نمایش داده خواهد شد.</div></section><section className="panel parameter-info"><h3>اطلاعات پارامتر</h3><div><span>نام فیلد در دیتابیس</span><code>{item.key}</code></div><div><span>واحد اندازه‌گیری</span><b>{item.unit}</b></div><div><span>منبع</span><b>OBD / ECU</b></div></section></>
}

export default App
