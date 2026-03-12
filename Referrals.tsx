import { useState, useEffect } from "react";
import { FileText, Send, CheckCircle, XCircle, Hospital, Users } from "lucide-react";
import { HealthStore, Referral } from "../utils/store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const destinations = [
  "UTH Lusaka (Public)",
  "Maina Soko (Military)",
  "Levy Mwanawasa (General)",
  "CFB Medical (Private)"
];

export function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  
  const [patientName, setPatientName] = useState("");
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState(destinations[0]);
  const [emergency, setEmergency] = useState(false);
  const [selectedReferralId, setSelectedReferralId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setReferrals(HealthStore.getReferrals());
  };

  const submitReferral = () => {
    if (patientName) {
      const newReferral: Referral = {
        id: Date.now(),
        patient: patientName,
        reason,
        destination,
        status: 'Pending'
      };
      
      const newReferrals = [newReferral, ...referrals];
      HealthStore.setReferrals(newReferrals);
      setReferrals(newReferrals);
      
      setPatientName("");
      setReason("");
      setEmergency(false);
    }
  };

  const respondToReferral = (status: 'ACCEPTED' | 'DENIED') => {
    if (selectedReferralId) {
      const newReferrals = referrals.map(r =>
        r.id === parseInt(selectedReferralId) ? { ...r, status } : r
      );
      HealthStore.setReferrals(newReferrals);
      setReferrals(newReferrals);
      setSelectedReferralId("");
    }
  };

  const selectedReferral = referrals.find(r => r.id === parseInt(selectedReferralId));
  const pendingReferrals = referrals.filter(r => r.status === 'Pending');

  return (
    <div className="space-y-8">
      {/* Hero Section with Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="relative h-[300px] md:h-[350px]">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1631217868204-db1ed6bdd224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwaG9zcGl0YWwlMjBwYXRpZW50JTIwY2FyZXxlbnwxfHx8fDE3NzMyMTExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Zambian Hospital Patient Care"
            className="w-full h-full object-cover"
          />
          {/* Text overlay with gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Medical Referral System
            </h2>
            <p className="text-xl text-white/90 max-w-2xl">
              Seamless inter-facility patient transfer and coordination network
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-md">
              <Hospital className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Network Integration</h4>
              <p className="text-sm text-gray-600">Connect with major healthcare facilities across Zambia</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-md">
              <Send className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Communication</h4>
              <p className="text-sm text-gray-600">Real-time referral requests and status updates</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-md">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Patient-Centered</h4>
              <p className="text-sm text-gray-600">Streamlined care coordination for better outcomes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Outbound Referral Broadcast */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-md">
            <FileText className="w-5 h-5 text-[#0093D5]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Outbound Referral Broadcast
            </h3>
            <p className="text-sm text-gray-600">Send patient referral requests to facilities</p>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Patient Name"
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          />
          
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Medical Reason (e.g., Trauma, Advanced Surgery)"
            rows={3}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20 resize-none"
          />
          
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          >
            {destinations.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={emergency}
              onChange={(e) => setEmergency(e.target.checked)}
              className="w-4 h-4 accent-red-600 rounded"
            />
            <span>High Priority (Emergency)</span>
          </label>
        </div>

        <button
          onClick={submitReferral}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0093D5] text-white font-medium rounded-md hover:bg-[#007BB5] transition-colors"
        >
          <Send className="w-4 h-4" />
          Send to Facilities
        </button>

        {/* Referral Log */}
        {referrals.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Referral History</h4>
            <div className="space-y-2">
              {referrals.map((ref) => (
                <div
                  key={ref.id}
                  className="p-4 bg-gray-50 rounded-md border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{ref.patient}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="inline-flex items-center gap-1">
                          <Hospital className="w-3 h-3" />
                          {ref.destination}
                        </span>
                      </p>
                      {ref.reason && (
                        <p className="text-sm text-gray-600 mt-1">Reason: {ref.reason}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      ref.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                      ref.status === 'DENIED' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {ref.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Receiver Management */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 rounded-md">
            <FileText className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Receiver Management (Hospital Side)
            </h3>
            <p className="text-sm text-gray-600">Review and respond to incoming referrals</p>
          </div>
        </div>

        <select
          value={selectedReferralId}
          onChange={(e) => setSelectedReferralId(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20 mb-4"
        >
          <option value="">-- Select Pending Referral --</option>
          {pendingReferrals.map(ref => (
            <option key={ref.id} value={ref.id}>
              {ref.patient} - {ref.destination}
            </option>
          ))}
        </select>

        {selectedReferral && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <h5 className="font-semibold text-red-900 mb-2">Referral Details</h5>
            <p className="text-sm text-red-800">
              <strong>Patient:</strong> {selectedReferral.patient}
            </p>
            <p className="text-sm text-red-800">
              <strong>Reason:</strong> {selectedReferral.reason || "Not specified"}
            </p>
            <p className="text-sm text-red-800">
              <strong>Destination:</strong> {selectedReferral.destination}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => respondToReferral('ACCEPTED')}
            disabled={!selectedReferralId}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
          >
            <CheckCircle className="w-4 h-4" />
            Accept Patient
          </button>

          <button
            onClick={() => respondToReferral('DENIED')}
            disabled={!selectedReferralId}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
          >
            <XCircle className="w-4 h-4" />
            Decline (Full)
          </button>
        </div>
      </div>
    </div>
  );
}