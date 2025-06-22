import React, { useState, useEffect } from 'react';
import { Database, MapPin, Calendar, Package, FileText, ExternalLink, CheckCircle } from 'lucide-react';

const IPFSViewer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState<any>(null);

  // Mock IPFS data
  const mockIPFSData = {
    cid: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    name: "Farm Potato Batch 014",
    origin: "Punjab, India",
    harvest_date: "2025-01-15",
    expiry: "2025-03-15",
    batchId: "F014P",
    farmer: "Rajesh Kumar",
    farm_location: {
      latitude: 30.3753,
      longitude: 76.7821,
      address: "Village Khanna, District Ludhiana, Punjab, India"
    },
    certification: "Organic",
    quality_grade: "A+",
    quantity: "1000 kg",
    processing_date: "2025-01-16",
    storage_conditions: "Cool, dry place at 4-8°C",
    transportation: {
      method: "Refrigerated truck",
      temperature: "4°C",
      humidity: "65%"
    },
    quality_metrics: {
      moisture_content: "78%",
      starch_content: "20%",
      sugar_content: "0.5%",
      ph_level: "6.2"
    },
    certifications: [
      { name: "Organic India", valid_until: "2025-12-31" },
      { name: "ISO 22000", valid_until: "2025-08-15" },
      { name: "FSSAI", valid_until: "2025-06-30" }
    ],
    supply_chain: [
      { stage: "Planting", date: "2024-10-01", location: "Punjab Farm" },
      { stage: "Harvesting", date: "2025-01-15", location: "Punjab Farm" },
      { stage: "Processing", date: "2025-01-16", location: "Processing Unit" },
      { stage: "Packaging", date: "2025-01-17", location: "Packaging Facility" },
      { stage: "Distribution", date: "2025-01-18", location: "Distribution Center" }
    ]
  };

  useEffect(() => {
    // Simulate IPFS fetch
    const fetchMetadata = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMetadata(mockIPFSData);
      setLoading(false);
    };

    fetchMetadata();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span className="text-gray-600">Loading IPFS metadata...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Database className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">IPFS Metadata</h3>
                <p className="text-sm text-gray-600">Decentralized product information</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>CID:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                {metadata?.cid}
              </code>
              <button className="text-blue-600 hover:text-blue-800">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{metadata?.name}</h4>
                  <p className="text-sm text-gray-600">Batch ID: {metadata?.batchId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Origin</p>
                    <p className="text-sm font-medium text-gray-900">{metadata?.origin}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Harvest Date</p>
                    <p className="text-sm font-medium text-gray-900">{metadata?.harvest_date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="text-sm font-medium text-gray-900">{metadata?.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Expiry Date</p>
                    <p className="text-sm font-medium text-gray-900">{metadata?.expiry}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {metadata?.certification}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Grade {metadata?.quality_grade}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  Fresh
                </span>
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">Quality Metrics</h5>
              <div className="space-y-3">
                {Object.entries(metadata?.quality_metrics || {}).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: Math.random() * 40 + 60 + '%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metadata?.certifications?.map((cert: any, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{cert.name}</p>
                  <p className="text-sm text-gray-600">Valid until {cert.valid_until}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supply Chain */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Supply Chain Traceability</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {metadata?.supply_chain?.map((stage: any, index: number) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{stage.stage}</p>
                      <p className="text-sm text-gray-600">{stage.location}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {stage.date}
                    </div>
                  </div>
                </div>
                {index < metadata.supply_chain.length - 1 && (
                  <div className="absolute left-4 mt-8 w-0.5 h-6 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transportation & Storage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Transportation</h3>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Method:</span>
              <span className="font-medium">{metadata?.transportation?.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Temperature:</span>
              <span className="font-medium">{metadata?.transportation?.temperature}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Humidity:</span>
              <span className="font-medium">{metadata?.transportation?.humidity}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Storage</h3>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Conditions:</span>
              <span className="font-medium">{metadata?.storage_conditions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Date:</span>
              <span className="font-medium">{metadata?.processing_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Farmer:</span>
              <span className="font-medium">{metadata?.farmer}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPFSViewer;