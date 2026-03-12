import { useState } from "react";
import { Smartphone, Send, Radio, Shield, Zap } from "lucide-react";
import { HealthStore } from "../utils/store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function USSD() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Awaiting Signal...");
  const [ussdState, setUssdState] = useState(0);

  const handleSubmit = () => {
    if (ussdState === 0) {
      setOutput("Welcome to Keonlabs Health system\n1. Emergency Yango\n2. Pharmacy Stock\n3. View Referrals");
      setUssdState(1);
    } else if (ussdState === 1) {
      if (input === '1') {
        // Simulate emergency dispatch
        const drivers = HealthStore.getDrivers();
        const available = drivers.filter(d => d.status === 'Active');
        
        if (available.length > 0) {
          const driver = available[Math.floor(Math.random() * available.length)];
          const dispId = Date.now();
          
          const dispatches = HealthStore.getDispatches();
          dispatches.push({
            id: dispId,
            driverName: driver.name,
            status: 'Pending',
            time: new Date().toLocaleTimeString()
          });
          
          const newDrivers = drivers.map(d =>
            d.name === driver.name ? { ...d, status: 'Dispatched' as const } : d
          );
          
          HealthStore.setDispatches(dispatches);
          HealthStore.setDrivers(newDrivers);
          
          setOutput(`Searching for nearest Yango driver in Lusaka...\nDriver ${driver.name} dispatched from ${driver.location}`);
        } else {
          setOutput("No drivers available. Please try again later.");
        }
        setUssdState(0);
      } else if (input === '2') {
        const stock = HealthStore.getStock();
        const stockList = Object.entries(stock)
          .map(([name, data]) => `${name} (${data.quantity})`)
          .join("\n");
        setOutput(stockList || "No stock listed.");
        setUssdState(0);
      } else if (input === '3') {
        const referrals = HealthStore.getReferrals();
        const refList = referrals
          .slice(0, 2)
          .map(r => `${r.patient}: ${r.status}`)
          .join("\n");
        setOutput(refList || "No referrals.");
        setUssdState(0);
      } else {
        setOutput("Invalid selection. Ending session.");
        setUssdState(0);
      }
    }
    setInput("");
  };

  const handleReset = () => {
    setUssdState(0);
    setOutput("Awaiting Signal...");
    setInput("");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Section with Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="relative h-[300px] md:h-[350px]">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbW9iaWxlJTIwcGhvbmUlMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc3MzIxMTE0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Zambian Mobile Healthcare Access"
            className="w-full h-full object-cover"
          />
          {/* Text overlay with gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              USSD Portal Access
            </h2>
            <p className="text-xl text-white/90 max-w-2xl">
              Offline healthcare connectivity via *567# for communities without internet
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-md">
              <Radio className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Network Coverage</h4>
              <p className="text-sm text-gray-600">Works on Zamtel, Airtel, MTN and Zedmobiles networks</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-md">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">No Internet Required</h4>
              <p className="text-sm text-gray-600">Access vital services on basic mobile phones</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-md">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Access</h4>
              <p className="text-sm text-gray-600">Real-time connection to health system services</p>
            </div>
          </div>
        </div>
      </div>

      {/* USSD Simulator */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-md">
            <Smartphone className="w-5 h-5 text-[#0093D5]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              USSD Portal Simulator (*567#)
            </h3>
            <p className="text-sm text-gray-600">Test the offline connectivity interface</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-6 border-2 border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-full p-3 shadow-md">
              <Smartphone className="w-8 h-8 text-[#0093D5]" />
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mb-4">
            Dial <span className="font-bold text-[#0093D5]">*567#</span> on your mobile phone
          </p>
          <p className="text-center text-gray-500 text-xs">
            Zamtel | Airtel | MTN | Zedmobiles
          </p>
        </div>

        {/* USSD Screen Output */}
        <div className="mb-6 p-6 bg-gray-900 rounded-lg border-4 border-gray-700 shadow-xl">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
            <span className="text-green-400 text-xs font-mono">USSD SESSION</span>
            <span className="text-green-400 text-xs font-mono">*567#</span>
          </div>
          <pre className="font-mono text-green-400 whitespace-pre-wrap text-sm leading-relaxed min-h-[100px]">
            {output}
          </pre>
        </div>

        {/* Input Section */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter selection..."
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          />
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0093D5] text-white font-medium rounded-md hover:bg-[#007BB5] transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>

        <button
          onClick={handleReset}
          className="px-5 py-2 bg-gray-100 text-gray-700 border border-gray-300 font-medium rounded-md hover:bg-gray-200 transition-colors"
        >
          Reset Session
        </button>

        {/* Instructions */}
        <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#0093D5]" />
            How to Use the USSD Portal:
          </h4>
          <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
            <li>Click <strong>Submit</strong> to start the USSD session</li>
            <li>Enter the number corresponding to your selection (1, 2, or 3)</li>
            <li>Click <strong>Submit</strong> to confirm your choice</li>
            <li>View the results displayed on the screen</li>
            <li>Click <strong>Reset Session</strong> to start over</li>
          </ol>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <h5 className="font-semibold text-gray-900 text-sm mb-2">Available Services:</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>1:</strong> Emergency Yango - Request medical transport</li>
              <li>• <strong>2:</strong> Pharmacy Stock - Check medicine availability</li>
              <li>• <strong>3:</strong> View Referrals - See patient referral status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}