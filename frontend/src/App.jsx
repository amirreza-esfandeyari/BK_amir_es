import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SensorDetails from './pages/SensorDetails';
import Sensors from './pages/Sensors';
import Alerts from './pages/Alerts';
import Vehicles from './pages/Vehicles';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedSensor, setSelectedSensor] = useState('rpm');

  const handleNavigate = (page, sensorKey = null) => {
    setActivePage(page);
    if (sensorKey) setSelectedSensor(sensorKey);
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {activePage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {activePage === 'vehicles' && <Vehicles />}
      {activePage === 'sensors' && <Sensors onNavigate={handleNavigate} />}
      {activePage === 'alerts' && <Alerts />}
      {activePage === 'sensor-detail' && (
        <SensorDetails 
          sensorKey={selectedSensor} 
          onBack={() => setActivePage('dashboard')} 
        />
      )}
    </Layout>
  );
}