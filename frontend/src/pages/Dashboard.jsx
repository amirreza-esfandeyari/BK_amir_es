import { Activity, Thermometer, Gauge, Zap, BarChart2, Sliders, AlertTriangle, ChevronLeft } from 'lucide-react';
import { vehicleData, sensorDefinitions } from '../data/mockData';
import './Dashboard.css';

// تبدیل نام آیکون به کامپوننت
// const iconMap = { Activity, Thermometer, Gauge, Zap, BarChart2, Sliders };

export default function Dashboard({ onNavigate }) {
  const vehicle = vehicleData;
  const mainSensors = sensorDefinitions.slice(0, 6);
  

  return (
    <div className="dashboard-wrapper">
      {/* ردیف بالا: کارت خودرو، وضعیت سلامت، خلاصه */}
      <div className="top-grid">
        
        {/* کارت خودرو */}
        <div className="card vehicle-card">
          <div className="vehicle-header">
            <div className="car-image-container">
              <img src={vehicle.image} alt="Peugeot 405" className="car-img" />
            </div>
            <div className="vehicle-info">
              <span className="status-badge running"><span className="dot"></span> موتور روشن</span>
              <h2>{vehicle.make} {vehicle.model}</h2>
              <p>مدل {vehicle.model_year} · شناسه {vehicle.vehicle_id}</p>
            </div>
          </div>
          <div className="vehicle-meta">
            <div><span>شناسه جلسه</span><strong>{vehicle.session_id}</strong></div>
            <div><span>منبع داده</span><strong>شبیه‌ساز</strong></div>
          </div>
        </div>

        {/* کارت وضعیت سلامت */}
        <div className="card health-card">
          <div className="card-header">
            <h3>وضعیت کلی پایش</h3>
            <Activity size={20} className="text-blue" />
          </div>
          <div className="health-score">
            <h2>نیازمند بررسی</h2>
            <span className="alert-badge">{vehicle.dtcs.length} خطا</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width: '65%'}}></div></div>
          <p className="health-desc">بر اساس کدهای خطای ثبت‌شده در جلسه جاری</p>
          <button className="text-btn" onClick={() => onNavigate('alerts')}>
            مشاهده هشدارها <ChevronLeft size={16} />
          </button>
        </div>

        {/* کارت خلاصه */}
        <div className="card summary-card">
          <div className="card-header">
            <h3>خلاصه اطلاعات</h3>
            <BarChart2 size={20} className="text-blue" />
          </div>
          <div className="summary-list">
            <div className="summary-item"><span>کل جلسات</span><strong>۱۲</strong></div>
            <div className="summary-item"><span>نمونه‌های دریافتی</span><strong>۱٬۸۴۲</strong></div>
            <div className="summary-item"><span>پارامترهای فعال</span><strong>{sensorDefinitions.length}</strong></div>
          </div>
        </div>
      </div>

      {/* بخش پارامترهای اصلی */}
      <div className="section-title">
        <h2>پارامترهای اصلی خودرو</h2>
        <button className="text-btn" onClick={() => onNavigate('sensors')}>
          همه سنسورها <ChevronLeft size={16} />
        </button>
      </div>
      
      <div className="sensors-grid">
        {mainSensors.map((sensor) => {
          const Icon = sensor.icon;
          const value = vehicle.sample[sensor.key];
          return (
            <div 
              key={sensor.key} 
              className="card sensor-card"
              onClick={() => onNavigate('sensor-detail', sensor.key)}
            >
              <div className="sensor-icon" style={{ color: sensor.color, backgroundColor: `${sensor.color}15` }}>
                <Icon size={24} />
              </div>
              <div className="sensor-content">
                <span className="sensor-title">{sensor.title}</span>
                <div className="sensor-value">
                  {value} <small>{sensor.unit}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* بخش پایینی: هشدارها و وضعیت موتور */}
      <div className="bottom-grid">
        <div className="card alerts-card">
          <div className="card-header">
            <h3>آخرین خطاها</h3>
            <AlertTriangle size={20} className="text-orange" />
          </div>
          <div className="alert-list">
            {vehicle.dtcs.map((dtc, idx) => (
              <div className="alert-row" key={idx}>
                <div className="alert-icon"><AlertTriangle size={16} /></div>
                <div className="alert-info">
                  <strong>{dtc.code}</strong>
                  <p>{dtc.desc}</p>
                </div>
                <span className="alert-status">ثبت‌شده</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}