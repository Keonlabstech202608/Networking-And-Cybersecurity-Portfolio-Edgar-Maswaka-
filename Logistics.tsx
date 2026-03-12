import { useState, useEffect } from "react";
import { Car, AlertTriangle, UserPlus, Navigation, Clock, MapPin as MapPinIcon } from "lucide-react";
import { HealthStore, Driver, Dispatch } from "../utils/store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const locations = ["Kabulonga", "Town Center", "Manda Hill", "Woodlands", "Chelstone"];

export function Logistics() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [currentDriver, setCurrentDriver] = useState("");
  
  const [driverName, setDriverName] = useState("");
  const [driverLocation, setDriverLocation] = useState("Kabulonga");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setDrivers(HealthStore.getDrivers());
    setDispatches(HealthStore.getDispatches());
    setCurrentDriver(HealthStore.getCurrentDriver());
  };

  const registerDriver = () => {
    if (driverName) {
      const newDrivers = [...drivers];
      const existing = newDrivers.find(d => d.name === driverName);
      
      if (existing) {
        existing.location = driverLocation;
        existing.status = 'Active';
      } else {
        newDrivers.push({
          name: driverName,
          location: driverLocation,
          status: 'Active',
          trips: 0
        });
      }
      
      HealthStore.setDrivers(newDrivers);
      HealthStore.setCurrentDriver(driverName);
      setDrivers(newDrivers);
      setCurrentDriver(driverName);
    }
  };

  const dispatchEmergency = () => {
    const available = drivers.filter(d => d.status === 'Active');
    
    if (available.length > 0) {
      const driver = available[Math.floor(Math.random() * available.length)];
      const dispId = Date.now();
      
      const newDispatches = [...dispatches, {
        id: dispId,
        driverName: driver.name,
        status: 'Pending' as const,
        time: new Date().toLocaleTimeString()
      }];
      
      const newDrivers = drivers.map(d => 
        d.name === driver.name ? { ...d, status: 'Dispatched' as const } : d
      );
      
      HealthStore.setDispatches(newDispatches);
      HealthStore.setDrivers(newDrivers);
      
      setDispatches(newDispatches);
      setDrivers(newDrivers);
    } else {
      alert("No active drivers currently available in the Lusaka network.");
    }
  };

  const goActive = () => {
    const newDrivers = drivers.map(d =>
      d.name === currentDriver ? { ...d, status: 'Active' as const } : d
    );
    HealthStore.setDrivers(newDrivers);
    setDrivers(newDrivers);
  };

  const acceptTrip = (id: number) => {
    const newDispatches = dispatches.map(d =>
      d.id === id ? { ...d, status: 'En Route' as const } : d
    );
    HealthStore.setDispatches(newDispatches);
    setDispatches(newDispatches);
  };

  const completeTrip = (id: number) => {
    const newDrivers = drivers.map(d =>
      d.name === currentDriver ? { ...d, status: 'Active' as const, trips: d.trips + 1 } : d
    );
    const newDispatches = dispatches.filter(d => d.id !== id);
    
    HealthStore.setDrivers(newDrivers);
    HealthStore.setDispatches(newDispatches);
    
    setDrivers(newDrivers);
    setDispatches(newDispatches);
  };

  const activeDriver = drivers.find(d => d.name === currentDriver);
  const currentTask = dispatches.find(d => d.driverName === currentDriver);

  return (
    <div className="space-y-8">
      {/* Hero Section with Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="relative h-[300px] md:h-[350px]">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1639278002463-933e09b2b3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWVkaWNhbCUyMGFtYnVsYW5jZSUyMGVtZXJnZW5jeXxlbnwxfHx8fDE3NzMyMTExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Zambian Emergency Medical Services"
            className="w-full h-full object-cover"
          />
          {/* Text overlay with gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Emergency Logistics Hub
            </h2>
            <p className="text-xl text-white/90 max-w-2xl">
              Real-time driver dispatch and emergency transport coordination for Lusaka
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-md">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Fleet Management</h4>
              <p className="text-sm text-gray-600">Track and manage driver availability across the network</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-md">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Emergency Dispatch</h4>
              <p className="text-sm text-gray-600">Automatic nearest driver selection for rapid response</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-md">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Tracking</h4>
              <p className="text-sm text-gray-600">Monitor trip status and completion in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Console */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-md">
            <Car className="w-5 h-5 text-[#0093D5]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Yango Dispatch Console
            </h3>
            <p className="text-sm text-gray-600">Coordinate emergency medical transport</p>
          </div>
        </div>

        {/* Drivers List */}
        {drivers.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Driver</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Location</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Trips</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr
                    key={driver.name}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 font-medium">{driver.name}</td>
                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3 text-gray-500" />
                        {driver.location}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        driver.status === 'Active' ? 'bg-green-100 text-green-700' :
                        driver.status === 'Dispatched' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{driver.trips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={dispatchEmergency}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          Dispatch Nearest Driver (Emergency)
        </button>

        {/* Active Dispatches */}
        {dispatches.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Active Dispatches</h4>
            {dispatches.map((dispatch) => (
              <div
                key={dispatch.id}
                className="p-3 bg-blue-50 border border-blue-200 rounded-md"
              >
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-medium">{dispatch.driverName}</span>
                  <span className="text-gray-600">dispatched at {dispatch.time}</span>
                  <span className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold ${
                    dispatch.status === 'En Route' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {dispatch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Driver Interface */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-md">
            <Navigation className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Driver Interface (App Simulator)
            </h3>
            <p className="text-sm text-gray-600">Mobile driver application interface</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            placeholder="Driver Name"
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          />
          <select
            value={driverLocation}
            onChange={(e) => setDriverLocation(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <button
          onClick={registerDriver}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors mb-6"
        >
          <UserPlus className="w-4 h-4" />
          Sign In / Update Location
        </button>

        {activeDriver && (
          <>
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <h4 className="text-green-900 font-semibold text-lg mb-1">
                Driver: {activeDriver.name}
              </h4>
              <p className="text-sm text-green-700">
                Status: {activeDriver.status} • Completed Trips: {activeDriver.trips}
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-md mb-4 min-h-[120px]">
              {currentTask && currentTask.status === 'Pending' && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <p className="text-red-600 font-semibold">EMERGENCY TRIP REQUEST!</p>
                  </div>
                  <button
                    onClick={() => acceptTrip(currentTask.id)}
                    className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                  >
                    Accept Trip
                  </button>
                </div>
              )}
              {currentTask && currentTask.status === 'En Route' && (
                <div>
                  <p className="text-amber-600 font-medium mb-4">🚗 En route to medical facility...</p>
                  <button
                    onClick={() => completeTrip(currentTask.id)}
                    className="px-5 py-2.5 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Mark Trip Complete
                  </button>
                </div>
              )}
              {!currentTask && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-600">Awaiting assignments from HQ...</p>
                </div>
              )}
            </div>

            <button
              onClick={goActive}
              className="px-5 py-2.5 bg-[#0093D5] text-white font-medium rounded-md hover:bg-[#007BB5] transition-colors"
            >
              Switch to Active Status
            </button>
          </>
        )}
      </div>
    </div>
  );
}