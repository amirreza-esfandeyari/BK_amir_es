import { ChevronLeft } from 'lucide-react';
import { vehicleData, sensorDefinitions } from '../data/mockData';
import './Sensors.css';

export default function Sensors({ onNavigate }) {
  const vehicle = vehicleData;

  return (
    <div className="sensors-page-wrapper">
      <div className="page-header">
        <div>
          <h1>سنسورها و پارامترها</h1>
          <p>تمام مقادیر دریافت‌شده از ECU خودرو</p>
        </div>
        <span className="count-badge">{sensorDefinitions.length} پارامتر فعال</span>
      </div>

      <div className="sensors-full-grid">
        {sensorDefinitions.map((sensor) => {
          const Icon = sensor.icon;
          const value = vehicle.sample[sensor.key];
          
          return (
            <div 
              key={sensor.key} 
              className="sensor-full-card"
              onClick={() => onNavigate('sensor-detail', sensor.key)}
            >
              <div className="sensor-card-top">
                <div className="sensor-icon-large" style={{ color: sensor.color, backgroundColor: `${sensor.color}15` }}>
                  <Icon size={28} />
                </div>
                <ChevronLeft size={20} className="arrow-icon" />
              </div>
              <div className="sensor-card-body">
                <h3>{sensor.title}</h3>
                <p>{sensor.desc}</p>
                <div className="sensor-full-value">
                  {value ?? '—'} <small>{sensor.unit}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}