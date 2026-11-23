import { Car, Info, ShieldCheck } from 'lucide-react';
import { vehicleData } from '../data/mockData';
import './Vehicles.css';

export default function Vehicles() {
  const vehicle = vehicleData;

  return (
    <div className="vehicles-page-wrapper">
      <div className="page-header">
        <div>
          <h1>مشخصات خودرو</h1>
          <p>اطلاعات ثبت‌شده و وضعیت خودرو در سامانه</p>
        </div>
      </div>

      <div className="vehicle-profile-card">
        <div className="profile-image-area">
          <img src={vehicle.image} alt="Peugeot 405" className="profile-car-img" />
        </div>
        
        <div className="profile-info-area">
          <div className="profile-title">
            <h2>{vehicle.make} {vehicle.model}</h2>
            <span className="status-badge running"><span className="dot"></span> موتور روشن</span>
          </div>
          
          <div className="profile-grid">
            <div className="info-item">
              <span>شناسه خودرو</span>
              <strong>{vehicle.vehicle_id}</strong>
            </div>
            <div className="info-item">
              <span>سال ساخت</span>
              <strong>{vehicle.model_year}</strong>
            </div>
            <div className="info-item">
              <span>شناسه جلسه فعال</span>
              <strong>{vehicle.session_id}</strong>
            </div>
            <div className="info-item">
              <span>منبع داده</span>
              <strong>شبیه‌ساز (Simulated)</strong>
            </div>
          </div>

          <div className="profile-footer">
            <div className="mil-info">
              <Info size={18} />
              <span>وضعیت چراغ MIL: <strong className="text-danger">روشن</strong></span>
            </div>
            <div className="health-info">
              <ShieldCheck size={18} />
              <span>وضعیت سلامت: <strong className="text-orange">نیازمند بررسی</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}