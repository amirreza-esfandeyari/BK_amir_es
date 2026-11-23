
import carImg from '../assets/car.png';
import { Activity, Thermometer, Gauge, Zap, BarChart2, Sliders, Wind, Droplets, Timer, MapPin, Flame, Waves, Settings } from 'lucide-react';

export const vehicleData = {
  vehicle_id: 'VH-2048',
  make: 'پژو',
  model: '405',
  model_year: 1398,
  engine_state: 'running',
  session_id: 'SESSION-2026-0113',
  source: 'simulated',
  mil_on: true,
  image: carImg,
  sample: {
    rpm: 2180,
    coolant_temp: 91,
    speed: 64,
    adapter_voltage: 13.9,
    engine_load: 42,
    throttle: 28,
    intake_air_temp: 34,
    maf: 18.6,
    stft_b1: 3.2,
    ltft_b1: 5.1,
    ctrl_module_voltage: 14.0,
    o2_b1s1_v: 0.75,
    o2_b1s2_v: 0.45,
    timing_advance: 12.5,
    run_time: 1240,
    dist_with_mil: 15,
    ambient_temp: 26,
    map: 45,
  },
  dtcs: [
    { code: 'P0171', desc: 'Fuel System Too Lean – Bank 1' },
    { code: 'P0300', desc: 'Random/Multiple Cylinder Misfire' }
  ],
};

// لیست کامل سنسورها طبق فایل db_tables.json
export const sensorDefinitions = [
  { key: 'rpm', title: 'دور موتور', unit: 'RPM', color: '#3B82F6', desc: 'سرعت چرخش میل‌لنگ موتور (PID 0x0C)', icon: Activity },
  { key: 'coolant_temp', title: 'دمای آب موتور', unit: '°C', color: '#F59E0B', desc: 'دمای مایع خنک‌کننده موتور (PID 0x05)', icon: Thermometer },
  { key: 'speed', title: 'سرعت خودرو', unit: 'km/h', color: '#10B981', desc: 'سرعت لحظه‌ای خودرو (PID 0x0D)', icon: Gauge },
  { key: 'adapter_voltage', title: 'ولتاژ آداپتور', unit: 'V', color: '#8B5CF6', desc: 'ولتاژ اندازه‌گیری‌شده توسط آداپتور (ATRV)', icon: Zap },
  { key: 'engine_load', title: 'بار موتور', unit: '%', color: '#3B82F6', desc: 'بار محاسبه‌شده موتور (PID 0x04)', icon: BarChart2 },
  { key: 'throttle', title: 'دریچه گاز', unit: '%', color: '#10B981', desc: 'درصد بازشدگی دریچه گاز (PID 0x11)', icon: Sliders },
  { key: 'intake_air_temp', title: 'دمای هوای ورودی', unit: '°C', color: '#06B6D4', desc: 'دمای هوای ورودی به موتور (PID 0x0F)', icon: Wind },
  { key: 'maf', title: 'جریان جرمی هوا', unit: 'g/s', color: '#8B5CF6', desc: 'جرم هوای ورودی در واحد زمان (PID 0x10)', icon: Waves },
  { key: 'stft_b1', title: 'اصلاح کوتاه‌مدت سوخت', unit: '%', color: '#F59E0B', desc: 'Short Term Fuel Trim – Bank 1 (PID 0x06)', icon: Settings },
  { key: 'ltft_b1', title: 'اصلاح بلندمدت سوخت', unit: '%', color: '#F59E0B', desc: 'Long Term Fuel Trim – Bank 1 (PID 0x07)', icon: Settings },
  { key: 'ctrl_module_voltage', title: 'ولتاژ ECU', unit: 'V', color: '#8B5CF6', desc: 'ولتاژ تغذیه ماژول کنترل (PID 0x42)', icon: Zap },
  { key: 'o2_b1s1_v', title: 'سنسور اکسیژن (بالادست)', unit: 'V', color: '#EF4444', desc: 'ولتاژ سنسور اکسیژن، بانک ۱ سنسور ۱ (PID 0x14)', icon: Droplets },
  { key: 'o2_b1s2_v', title: 'سنسور اکسیژن (پایین‌دست)', unit: 'V', color: '#EF4444', desc: 'ولتاژ سنسور اکسیژن، بانک ۱ سنسور ۲ (PID 0x15)', icon: Droplets },
  { key: 'timing_advance', title: 'زمان‌بندی جرقه', unit: 'deg', color: '#F59E0B', desc: 'زمان‌بندی جرقه (PID 0x0E)', icon: Flame },
  { key: 'run_time', title: 'زمان کارکرد موتور', unit: 's', color: '#64748B', desc: 'زمان از شروع موتور (PID 0x1F)', icon: Timer },
  { key: 'dist_with_mil', title: 'مسافت با چراغ MIL', unit: 'km', color: '#EF4444', desc: 'مسافت طی‌شده با چراغ MIL روشن (PID 0x21)', icon: MapPin },
  { key: 'ambient_temp', title: 'دمای محیط', unit: '°C', color: '#06B6D4', desc: 'دمای هوای محیط (PID 0x46)', icon: Thermometer },
  { key: 'map', title: 'فشار مانیفولد', unit: 'kPa', color: '#3B82F6', desc: 'فشار مطلق مانیفولد ورودی (PID 0x0B)', icon: Gauge },
];

// تولید داده‌های نمودار
export const generateChartData = (baseValue, points = 24) => {
  return Array.from({ length: points }).map((_, i) => ({
    time: `${i}:00`,
    value: baseValue + (Math.random() * 20 - 10) + (i * 0.5),
  }));
};