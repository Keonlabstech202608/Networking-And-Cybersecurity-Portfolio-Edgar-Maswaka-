import { useState, useEffect } from "react";
import { Package, ShoppingCart, Plus, AlertCircle } from "lucide-react";
import { HealthStore, ZMW, StockItem, Sale } from "../utils/store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Pharmacy() {
  const [stock, setStock] = useState<Record<string, StockItem>>({});
  const [sales, setSales] = useState<Sale[]>([]);
  
  // Form states
  const [medName, setMedName] = useState("");
  const [medQuantity, setMedQuantity] = useState("");
  const [medPrice, setMedPrice] = useState("");
  const [saleMedName, setSaleMedName] = useState("");
  const [saleQuantity, setSaleQuantity] = useState("1");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStock(HealthStore.getStock());
    setSales(HealthStore.getSales());
  };

  const addStock = () => {
    if (medName && medQuantity) {
      const qty = parseInt(medQuantity);
      const price = parseFloat(medPrice) || 100;
      
      const newStock = { ...stock };
      newStock[medName] = {
        quantity: (newStock[medName]?.quantity || 0) + qty,
        price: price
      };
      
      HealthStore.setStock(newStock);
      setStock(newStock);
      
      setMedName("");
      setMedQuantity("");
      setMedPrice("");
    }
  };

  const recordSale = () => {
    if (saleMedName && stock[saleMedName]) {
      const qty = parseInt(saleQuantity);
      
      if (stock[saleMedName].quantity >= qty) {
        const newStock = { ...stock };
        newStock[saleMedName].quantity -= qty;
        
        const newSale: Sale = {
          item: saleMedName,
          qty,
          total: qty * stock[saleMedName].price,
          date: new Date().toLocaleDateString()
        };
        
        const newSales = [newSale, ...sales];
        
        HealthStore.setStock(newStock);
        HealthStore.setSales(newSales);
        
        setStock(newStock);
        setSales(newSales);
        
        setSaleMedName("");
        setSaleQuantity("1");
      } else {
        alert("Insufficient Stock!");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="relative h-[300px] md:h-[350px]">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1659174342084-1bc8e50c3e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcGhhcm1hY3klMjBtZWRpY2luZSUyMFphbWJpYXxlbnwxfHx8fDE3NzMyMTExNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Zambian Pharmacy Services"
            className="w-full h-full object-cover"
          />
          {/* Text overlay with gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Pharmacy & Sales Management
            </h2>
            <p className="text-xl text-white/90 max-w-2xl">
              Comprehensive stock control and sales tracking for medical supplies
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-md">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Stock Management</h4>
              <p className="text-sm text-gray-600">Track inventory levels and receive alerts for low stock items</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-md">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Sales Terminal</h4>
              <p className="text-sm text-gray-600">Process transactions and maintain detailed sales records</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 rounded-md">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Updates</h4>
              <p className="text-sm text-gray-600">Instant synchronization across all system modules</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Intake */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-md">
            <Package className="w-5 h-5 text-[#0093D5]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Stock Intake
            </h3>
            <p className="text-sm text-gray-600">Add new medicines to inventory</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            placeholder="Medicine Name"
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          />
          <input
            type="number"
            value={medQuantity}
            onChange={(e) => setMedQuantity(e.target.value)}
            placeholder="Quantity"
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          />
          <input
            type="number"
            value={medPrice}
            onChange={(e) => setMedPrice(e.target.value)}
            placeholder="Price (ZMW)"
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          />
        </div>

        <button
          onClick={addStock}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0093D5] text-white font-medium rounded-md hover:bg-[#007BB5] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add to Stock
        </button>

        {/* Stock List */}
        {Object.keys(stock).length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Item</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Qty</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stock).map(([name, data], idx) => (
                  <tr
                    key={name}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-700">{name}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">{data.quantity}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">{ZMW.format(data.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        data.quantity > 50 ? 'bg-green-100 text-green-700' :
                        data.quantity > 20 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {data.quantity > 50 ? 'In Stock' : data.quantity > 20 ? 'Low Stock' : 'Critical'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sale Terminal */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-md">
            <ShoppingCart className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Sale Terminal
            </h3>
            <p className="text-sm text-gray-600">Process customer transactions</p>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={saleMedName}
              onChange={(e) => setSaleMedName(e.target.value)}
              list="stock-options"
              placeholder="Item Name"
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
            />
            <datalist id="stock-options">
              {Object.keys(stock).map(name => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>
          <input
            type="number"
            value={saleQuantity}
            onChange={(e) => setSaleQuantity(e.target.value)}
            placeholder="Qty"
            className="w-24 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0093D5] focus:ring-2 focus:ring-[#0093D5]/20"
          />
          <button
            onClick={recordSale}
            className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            Finalize Sale
          </button>
        </div>

        {/* Sales Records */}
        {sales.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Transactions</h4>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Item</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Quantity</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(0, 5).map((sale, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-700">{sale.date}</td>
                    <td className="py-3 px-4 text-gray-700">{sale.item}</td>
                    <td className="py-3 px-4 text-gray-700">{sale.qty}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">{ZMW.format(sale.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}