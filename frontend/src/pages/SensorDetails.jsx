import { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import { ArrowRight, Activity, Thermometer, Gauge, Zap, BarChart2, Sliders } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { sensorDefinitions, generateChartData } from '../data/mockData';
import './SensorDetails.css';

// const iconMap = { Activity, Thermometer, Gauge, Zap, BarChart2, Sliders };

export default function SensorDetails({ sensorKey, onBack }) {
  const [period, setPeriod] = useState('1h');
  
  const sensor = sensorDefinitions.find(s => s.key === sensorKey);
  const Icon = sensor.icon;

  // تولید داده بر اساس بازه زمانی (برای نمایشی)
  const chartData = useMemo(() => {
    const points = period === '1h' ? 12 : period === '6h' ? 18 : 24;
    return generateChartData(60, points); // عدد 60 فقط یه پایه برای شروع نمودار
  }, [period]);

  // محاسبه آمار
  const stats = useMemo(() => {
    const values = chartData.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return { min, max, avg };
  }, [chartData]);

  const currentValue = sensorKey === 'coolant_temp' ? 91 : sensorKey === 'rpm' ? 2180 : 64; // شبیه‌سازی مقدار لحظه‌ای

  return (
    <div className="sensor-detail-wrapper">
      <button className="back-btn" onClick={onBack}>
        <ArrowRight size={20} /> بازگشت به داشبورد
      </button>

      {/* هدر صفحه */}
      <div className="detail-header">
        <div className="detail-title-group">
          <div className="sensor-icon-large" style={{ color: sensor.color, backgroundColor: `${sensor.color}15` }}>
            <Icon size={32} />
          </div>
          <div>
            <h1>{sensor.title}</h1>
            <p>{sensor.desc}</p>
          </div>
        </div>
        
        {/* گیج (Gauge) نمایشی */}
        <div className="gauge-container">
          <svg viewBox="0 0 200 120" className="gauge-svg">
            {/* پس‌زمینه کمان */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border-color)" strokeWidth="15" strokeLinecap="round" />
            {/* کمان رنگی (مقدار) */}
            <path 
              d="M 20 100 A 80 80 0 0 1 180 100" 
              fill="none" 
              stroke={sensor.color} 
              strokeWidth="15" 
              strokeLinecap="round" 
              strokeDasharray="251" 
              strokeDashoffset={251 - (251 * 0.6)} // 60 درصد پر
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
            <text x="100" y="85" textAnchor="middle" fill="var(--text-main)" fontSize="28" fontWeight="bold">
              {currentValue}
            </text>
            <text x="100" y="105" textAnchor="middle" fill="var(--text-muted)" fontSize="14">
              {sensor.unit}
            </text>
          </svg>
        </div>
      </div>

      {/* کارت‌های آماری */}
      <div className="stats-cards">
        <div className="stat-box">
          <span>کمینه</span>
          <strong>{stats.min.toFixed(1)} <small>{sensor.unit}</small></strong>
        </div>
        <div className="stat-box">
          <span>بیشینه</span>
          <strong>{stats.max.toFixed(1)} <small>{sensor.unit}</small></strong>
        </div>
        <div className="stat-box">
          <span>میانگین</span>
          <strong>{stats.avg.toFixed(1)} <small>{sensor.unit}</small></strong>
        </div>
      </div>

      {/* نمودار */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>روند تغییرات {sensor.title}</h3>
          <div className="period-buttons">
            {['1h', '6h', '24h'].map(p => (
              <button 
                key={p} 
                className={period === p ? 'active' : ''} 
                onClick={() => setPeriod(p)}
              >
                {p === '1h' ? '۱ ساعت' : p === '6h' ? '۶ ساعت' : '۲۴ ساعت'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={sensor.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={sensor.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                itemStyle={{ color: sensor.color }}
              />
              <Area type="monotone" dataKey="value" stroke={sensor.color} strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}