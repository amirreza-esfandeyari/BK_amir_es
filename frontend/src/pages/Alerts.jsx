import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { vehicleData } from '../data/mockData';
import './Alerts.css';

export default function Alerts() {
  const vehicle = vehicleData;

  return (
    <div className="alerts-page-wrapper">
      <div className="page-header">
        <div>
          <h1>خطاها و هشدارها</h1>
          <p>کدهای خطای ثبت‌شده در جلسه پایش</p>
        </div>
        <span className="count-badge danger">{vehicle.dtcs.length} خطا</span>
      </div>

      <div className="alert-summary-box">
        <div className="alert-summary-icon"><ShieldAlert size={32} /></div>
        <div>
          <h3>وضعیت چراغ MIL</h3>
          <p>چراغ هشدار موتور در جلسه فعلی <strong>روشن</strong> است.</p>
        </div>
        <div className="mil-status">روشن</div>
      </div>

      <div className="dtc-list-container">
        <h2>کدهای خطای تشخیصی (DTC)</h2>
        {vehicle.dtcs.map((dtc, index) => (
          <div className="dtc-card" key={index}>
            <div className="dtc-card-icon"><AlertTriangle size={24} /></div>
            <div className="dtc-card-content">
              <div className="dtc-header">
                <h3>{dtc.code}</h3>
                <span className="dtc-status">ثبت‌شده</span>
              </div>
              <p>{dtc.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {vehicle.dtcs.length === 0 && (
        <div className="empty-state">
          <CheckCircle2 size={48} className="text-green" />
          <h3>هیچ خطایی ثبت نشده است</h3>
          <p>وضعیت خودرو در این جلسه سالم است.</p>
        </div>
      )}
    </div>
  );
}