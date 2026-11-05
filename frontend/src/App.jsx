// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App











































import { useEffect, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadDashboard() {
      try {
        const response = await fetch(`${API_URL}/api/dashboard/overview`)
        if (!response.ok) throw new Error(`خطای سرور: ${response.status}`)

        const result = await response.json()
        if (active) {
          setData(result)
          setError('')
        }
      } catch {
        if (active) setError('ارتباط با سرور برقرار نشد. مطمئن شو بک‌اند و دیتابیس در دسترس هستند.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadDashboard()
    const timer = setInterval(loadDashboard, 10000)

    return () => {
      active = false
      clearInterval(timer)
    }
  }, [])

  const summary = data?.summary || {}
  const vehicles = data?.vehicles || []

  return (
    <div className="app" dir="rtl">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">🚘</span>
          <div>
            <strong>AutoSense</strong>
            <small>Vehicle Monitoring</small>
          </div>
        </div>

        <div className="menu-title">منوی اصلی</div>
        <div className="menu-item active">▦ <span>داشبورد</span></div>
        <div className="menu-item">🚗 <span>خودروها</span></div>
        <div className="menu-item">◷ <span>جلسات ثبت داده</span></div>
        <div className="menu-item">⌁ <span>داده‌های سنسورها</span></div>
        <div className="menu-item">⚠ <span>خطاهای ECU</span></div>

        <div className="sidebar-bottom">
          <span className="status-dot" />
          سامانه پایش خودرو
          <small>نسخه 1.0</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>داشبورد پایش خودرو</h1>
            <p>نمای کلی وضعیت خودروها و داده‌های OBD</p>
          </div>
          <div className="live-badge"><span /> پایش زنده</div>
        </header>

        {loading && <div className="notice">در حال دریافت اطلاعات...</div>}
        {error && <div className="notice error">{error}</div>}

        <section className="stats-grid">
          <StatCard icon="🚘" label="تعداد خودروها" value={summary.total_vehicles ?? '—'} />
          <StatCard icon="◷" label="تعداد جلسات" value={summary.total_sessions ?? '—'} />
          <StatCard icon="⌁" label="نمونه‌های ثبت‌شده" value={summary.total_samples ?? '—'} />
          <StatCard icon="⚠" label="کدهای خطا" value={summary.total_dtcs ?? '—'} />
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>وضعیت خودروها</h2>
              <p>آخرین اطلاعات دریافتی از هر خودرو</p>
            </div>
            <span className="count">{vehicles.length} خودرو</span>
          </div>

          {!loading && !error && vehicles.length === 0 && (
            <div className="empty-state">
              <span>🚗</span>
              <h3>هنوز خودرویی ثبت نشده است</h3>
              <p>پس از ثبت خودرو و ارسال داده‌ها، اطلاعات در این قسمت نمایش داده می‌شود.</p>
            </div>
          )}

          <div className="vehicle-grid">
            {vehicles.map((item, index) => {
              const vehicle = item.vehicle || {}
              const sample = item.latest_sample || {}
              const session = item.latest_session || {}
              const dtcs = item.dtcs || []

              return (
                <article className="vehicle-card" key={vehicle.vehicle_id || index}>
                  <div className="vehicle-heading">
                    <div className="car-icon">🚙</div>
                    <div>
                      <h3>{vehicle.make || 'خودرو'} {vehicle.model || ''}</h3>
                      <p>{vehicle.vehicle_id}</p>
                    </div>
                    <span className={`engine-badge ${sample.engine_state === 'running' ? 'running' : ''}`}>
                      {sample.engine_state === 'running' ? 'روشن' :
                        sample.engine_state === 'off' ? 'خاموش' : 'نامشخص'}
                    </span>
                  </div>

                  <div className="sensor-grid">
                    <Sensor label="دور موتور" value={sample.rpm} unit="RPM" />
                    <Sensor label="سرعت" value={sample.speed} unit="km/h" />
                    <Sensor label="دمای آب" value={sample.coolant_temp} unit="°C" />
                    <Sensor label="ولتاژ باتری" value={sample.adapter_voltage} unit="V" />
                    <Sensor label="بار موتور" value={sample.engine_load} unit="%" />
                    <Sensor label="دریچه گاز" value={sample.throttle} unit="%" />
                  </div>

                  <div className="vehicle-footer">
                    <span>جلسه: {session.session_id || 'بدون جلسه'}</span>
                    <span className={dtcs.length ? 'fault-text' : 'normal-text'}>
                      {dtcs.length ? `${dtcs.length} خطا` : 'بدون خطای ثبت‌شده'}
                    </span>
                  </div>

                  {dtcs.length > 0 && (
                    <div className="dtc-list">
                      {dtcs.map((dtc, i) => <span key={i}>{dtc.code}</span>)}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <footer>AutoSense · سامانه پایش و تحلیل داده‌های خودرو</footer>
      </main>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div><p>{label}</p><strong>{value}</strong></div>
    </article>
  )
}

function Sensor({ label, value, unit }) {
  return (
    <div className="sensor">
      <span>{label}</span>
      <strong>{value == null ? '—' : value} <small>{unit}</small></strong>
    </div>
  )
}

export default App