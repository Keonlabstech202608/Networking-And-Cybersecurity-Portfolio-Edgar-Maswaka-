import { useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { Pharmacy } from "./pages/Pharmacy";
import { Logistics } from "./pages/Logistics";
import { Referrals } from "./pages/Referrals";
import { USSD } from "./pages/USSD";
import { 
  LayoutDashboard, 
  Pill, 
  Car, 
  FileText, 
  Smartphone,
  Heart,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, component: Dashboard },
  { id: "pharmacy", label: "Pharmacy", icon: Pill, component: Pharmacy },
  { id: "logistics", label: "Logistics", icon: Car, component: Logistics },
  { id: "referrals", label: "Referrals", icon: FileText, component: Referrals },
  { id: "ussd", label: "USSD", icon: Smartphone, component: USSD },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Info Bar */}
      <div className="bg-[#0093D5] text-white py-2">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between text-sm gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>Emergency: 999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>keonlabs@smartcitytech.zm</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>Keonlabs tech cities, Zambia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#0093D5] rounded-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  AI-DFC Health System
                </h1>
                <p className="text-sm text-gray-600">Advanced Healthcare Management for Zambia</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-4 border-b-3 transition-colors ${
                    isActive
                      ? "border-[#0093D5] text-[#0093D5] bg-blue-50/50"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <ActiveComponent />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#0093D5] rounded-lg">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Keonlabs Health system</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Advancing healthcare through innovative technology and integrated systems. And Making Zambia a Smart Tech Nation(ZMTN)
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facilities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Emergency Care</li>
                <li>Pharmacy Services</li>
                <li>Medical Referrals</li>
                <li>Mobile Health (USSD)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+260 xxx xxx xxx</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>keonlabs@smartcitytech.zm</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Keonlabs smart cities, Zambia</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Keonlabs Health System, Zambia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
