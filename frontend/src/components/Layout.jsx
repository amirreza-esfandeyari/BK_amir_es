import { useState } from 'react';
import { LayoutDashboard, Car, Activity, AlertTriangle, Menu, X } from 'lucide-react';
import './Layout.css';

const navItems = [
  { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { id: 'vehicles', label: 'مشخصات خودرو', icon: Car },
  { id: 'sensors', label: 'سنسورها', icon: Activity },
  { id: 'alerts', label: 'خطاها', icon: AlertTriangle },
];

export default function Layout({ children, activePage, setActivePage }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="app-container">
      {/* سایدبار */}
      <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-box">
            <Activity size={24} color="#3B82F6" />
          </div>
          <div>
            <h2>AutoSense</h2>
            <span>سامانه پایش خودرو</span>
          </div>
          <button className="close-mobile" onClick={() => setIsMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-btn ${activePage === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileOpen(false);
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot"></div>
          <span>وضعیت: آنلاین (نمایشی)</span>
        </div>
      </aside>

      {/* بخش اصلی */}
      <main className="main-content">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setIsMobileOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="topbar-title">
            {navItems.find((n) => n.id === activePage)?.label}
          </div>
          <div className="user-profile">
            <div className="avatar">م</div>
          </div>
        </header>
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}