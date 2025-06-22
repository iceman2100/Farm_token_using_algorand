import React from 'react';
import { Coins, TrendingUp, Shield, Calendar, MapPin, Package } from 'lucide-react';

interface DashboardProps {
  wallet: {
    connected: boolean;
    address: string;
    balance: number;
    isAdmin: boolean;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ wallet }) => {
  const mockMetadata = {
    name: "Farm Potato Batch 014",
    origin: "Punjab, India",
    harvest_date: "2025-01-15",
    expiry: "2025-03-15",
    batchId: "F014P",
    farmer: "Rajesh Kumar",
    certification: "Organic",
    quality_grade: "A+"
  };

  const stats = [
    {
      title: "FarmToken Balance",
      value: wallet.balance.toLocaleString(),
      unit: "FT",
      icon: Coins,
      color: "green",
      trend: "+12.5%"
    },
    {
      title: "Total Transactions",
      value: "47",
      unit: "",
      icon: TrendingUp,
      color: "blue",
      trend: "+8.2%"
    },
    {
      title: "Verified Batches",
      value: "12",
      unit: "",
      icon: Shield,
      color: "purple",
      trend: "+3"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    {stat.unit && (
                      <span className="text-sm text-gray-500">{stat.unit}</span>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${
                    stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Token Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Current Token Holdings</h3>
          <p className="text-sm text-gray-600">Latest agricultural product information</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{mockMetadata.name}</h4>
                  <p className="text-sm text-gray-600">Batch ID: {mockMetadata.batchId}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Origin</p>
                    <p className="text-sm font-medium text-gray-900">{mockMetadata.origin}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Harvest Date</p>
                    <p className="text-sm font-medium text-gray-900">{mockMetadata.harvest_date}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {mockMetadata.certification}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Grade {mockMetadata.quality_grade}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  Fresh
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">Quality Metrics</h5>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Freshness</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Traceability</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Certification</span>
                    <span className="font-medium">Verified</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: "Received", amount: "250 FT", from: "ALGO123...ABC", time: "2 hours ago", type: "receive" },
              { action: "Transferred", amount: "100 FT", to: "ALGO456...DEF", time: "1 day ago", type: "send" },
              { action: "Minted", amount: "500 FT", batch: "F014P", time: "3 days ago", type: "mint" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'receive' ? 'bg-green-100' :
                    activity.type === 'send' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'receive' ? 'bg-green-500' :
                      activity.type === 'send' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action} {activity.amount}</p>
                    <p className="text-sm text-gray-600">
                      {activity.from && `from ${activity.from}`}
                      {activity.to && `to ${activity.to}`}
                      {activity.batch && `batch ${activity.batch}`}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;