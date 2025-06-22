import React, { useState } from 'react';
import { Settings, Plus, Minus, UserX, UserCheck, AlertTriangle, CheckCircle } from 'lucide-react';

interface AdminPanelProps {
  wallet: {
    connected: boolean;
    address: string;
    balance: number;
    isAdmin: boolean;
  };
  onTransaction: (transaction: any) => void;
  onBalanceUpdate: (newBalance: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ wallet, onTransaction, onBalanceUpdate }) => {
  const [activeTab, setActiveTab] = useState('mint');
  const [mintAmount, setMintAmount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // Mock data
  const [blacklistedUsers, setBlacklistedUsers] = useState([
    { address: 'ALGOBLACKLIST1', reason: 'Suspicious activity', date: '2025-01-10' },
    { address: 'ALGOBLACKLIST2', reason: 'Policy violation', date: '2025-01-08' },
  ]);

  const [whitelistedUsers, setWhitelistedUsers] = useState([
    { address: 'ALGOWHITE123', verified: true, date: '2025-01-15' },
    { address: 'ALGOWHITE456', verified: true, date: '2025-01-12' },
  ]);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleMint = async () => {
    if (!mintAmount || parseFloat(mintAmount) <= 0) {
      showMessage('Please enter a valid amount', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const transaction = {
      id: `MINT${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      type: 'mint',
      amount: parseFloat(mintAmount),
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    onTransaction(transaction);
    onBalanceUpdate(wallet.balance + parseFloat(mintAmount));
    showMessage(`Successfully minted ${mintAmount} FT`, 'success');
    setMintAmount('');
    setIsLoading(false);
  };

  const handleBurn = async () => {
    if (!burnAmount || parseFloat(burnAmount) <= 0) {
      showMessage('Please enter a valid amount', 'error');
      return;
    }

    if (parseFloat(burnAmount) > wallet.balance) {
      showMessage('Insufficient balance', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const transaction = {
      id: `BURN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      type: 'burn',
      amount: parseFloat(burnAmount),
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    onTransaction(transaction);
    onBalanceUpdate(wallet.balance - parseFloat(burnAmount));
    showMessage(`Successfully burned ${burnAmount} FT`, 'success');
    setBurnAmount('');
    setIsLoading(false);
  };

  const handleBlacklist = async () => {
    if (!userAddress) {
      showMessage('Please enter a user address', 'error');
      return;
    }

    if (blacklistedUsers.some(user => user.address === userAddress)) {
      showMessage('User is already blacklisted', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setBlacklistedUsers(prev => [...prev, {
      address: userAddress,
      reason: 'Admin action',
      date: new Date().toISOString().split('T')[0]
    }]);

    showMessage(`User ${userAddress} has been blacklisted`, 'success');
    setUserAddress('');
    setIsLoading(false);
  };

  const handleWhitelist = async () => {
    if (!userAddress) {
      showMessage('Please enter a user address', 'error');
      return;
    }

    if (whitelistedUsers.some(user => user.address === userAddress)) {
      showMessage('User is already whitelisted', 'error');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setWhitelistedUsers(prev => [...prev, {
      address: userAddress,
      verified: true,
      date: new Date().toISOString().split('T')[0]
    }]);

    showMessage(`User ${userAddress} has been whitelisted`, 'success');
    setUserAddress('');
    setIsLoading(false);
  };

  const removeFromBlacklist = (address: string) => {
    setBlacklistedUsers(prev => prev.filter(user => user.address !== address));
    showMessage(`User ${address} removed from blacklist`, 'success');
  };

  const removeFromWhitelist = (address: string) => {
    setWhitelistedUsers(prev => prev.filter(user => user.address !== address));
    showMessage(`User ${address} removed from whitelist`, 'success');
  };

  const tabs = [
    { id: 'mint', label: 'Mint/Burn', icon: Plus },
    { id: 'users', label: 'User Management', icon: UserCheck },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Settings className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Admin Panel</h3>
              <p className="text-sm text-gray-600">Manage tokens and users</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-2 border-b border-gray-100">
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Message */}
          {message && (
            <div className={`mb-6 flex items-center space-x-2 p-4 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              )}
              <p className={`text-sm ${
                messageType === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {message}
              </p>
            </div>
          )}

          {/* Mint/Burn Tab */}
          {activeTab === 'mint' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mint Tokens */}
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Plus className="h-5 w-5 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Mint Tokens</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount to Mint
                      </label>
                      <input
                        type="number"
                        value={mintAmount}
                        onChange={(e) => setMintAmount(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <button
                      onClick={handleMint}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Mint Tokens</span>
                    </button>
                  </div>
                </div>

                {/* Burn Tokens */}
                <div className="bg-red-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Minus className="h-5 w-5 text-red-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Burn Tokens</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount to Burn
                      </label>
                      <input
                        type="number"
                        value={burnAmount}
                        onChange={(e) => setBurnAmount(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        max={wallet.balance}
                      />
                    </div>
                    <button
                      onClick={handleBurn}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="h-5 w-5" />
                      <span>Burn Tokens</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Token Supply Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Token Supply Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">1,000,000</p>
                    <p className="text-sm text-gray-600">Total Supply</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{wallet.balance.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Circulating Supply</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-600">{(1000000 - wallet.balance).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Remaining Supply</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Add/Remove Users */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Manage Users</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Address
                    </label>
                    <input
                      type="text"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ALGO1234567890ABCDEF..."
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleBlacklist}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <UserX className="h-5 w-5" />
                      <span>Blacklist</span>
                    </button>
                    <button
                      onClick={handleWhitelist}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <UserCheck className="h-5 w-5" />
                      <span>Whitelist</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* User Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Blacklisted Users */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h5 className="font-semibold text-gray-900">Blacklisted Users</h5>
                  </div>
                  <div className="p-6">
                    {blacklistedUsers.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No blacklisted users</p>
                    ) : (
                      <div className="space-y-3">
                        {blacklistedUsers.map((user, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{user.address}</p>
                              <p className="text-xs text-gray-600">{user.reason} • {user.date}</p>
                            </div>
                            <button
                              onClick={() => removeFromBlacklist(user.address)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Whitelisted Users */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h5 className="font-semibold text-gray-900">Whitelisted Users</h5>
                  </div>
                  <div className="p-6">
                    {whitelistedUsers.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No whitelisted users</p>
                    ) : (
                      <div className="space-y-3">
                        {whitelistedUsers.map((user, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{user.address}</p>
                              <p className="text-xs text-gray-600">Verified • {user.date}</p>
                            </div>
                            <button
                              onClick={() => removeFromWhitelist(user.address)}
                              className="text-green-600 hover:text-green-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;