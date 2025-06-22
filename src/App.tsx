import React, { useState, useEffect } from 'react';
import { Sprout, Wallet, Shield, Users, Activity, Settings } from 'lucide-react';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';
import TransferForm from './components/TransferForm';
import AdminPanel from './components/AdminPanel';
import IPFSViewer from './components/IPFSViewer';
import TransactionLogs from './components/TransactionLogs';

interface WalletState {
  connected: boolean;
  address: string;
  balance: number;
  isAdmin: boolean;
}

function App() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: '',
    balance: 0,
    isAdmin: false
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<any[]>([]);

  const handleWalletConnect = (address: string, isAdmin: boolean = false) => {
    setWallet({
      connected: true,
      address,
      balance: Math.floor(Math.random() * 10000) + 1000, // Mock balance
      isAdmin
    });
  };

  const handleWalletDisconnect = () => {
    setWallet({
      connected: false,
      address: '',
      balance: 0,
      isAdmin: false
    });
    setActiveTab('dashboard');
  };

  const addTransaction = (transaction: any) => {
    setTransactions(prev => [transaction, ...prev].slice(0, 10));
  };

  const updateBalance = (newBalance: number) => {
    setWallet(prev => ({ ...prev, balance: newBalance }));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'transfer', label: 'Transfer', icon: Users },
    { id: 'metadata', label: 'Metadata', icon: Sprout },
    { id: 'logs', label: 'Logs', icon: Shield },
    ...(wallet.isAdmin ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FarmToken</h1>
                <p className="text-xs text-gray-500">Food Tokenization Platform</p>
              </div>
            </div>
            <WalletConnect 
              wallet={wallet} 
              onConnect={handleWalletConnect}
              onDisconnect={handleWalletDisconnect}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!wallet.connected ? (
          <div className="text-center py-16">
            <div className="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Wallet className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">Connect your Algorand wallet to start tokenizing and tracking agricultural products.</p>
              <WalletConnect 
                wallet={wallet} 
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
                showButton={true}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-1">
              <nav className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-700 shadow-sm'
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

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'dashboard' && (
                <Dashboard wallet={wallet} />
              )}
              {activeTab === 'transfer' && (
                <TransferForm 
                  wallet={wallet} 
                  onTransfer={addTransaction}
                  onBalanceUpdate={updateBalance}
                />
              )}
              {activeTab === 'metadata' && (
                <IPFSViewer />
              )}
              {activeTab === 'logs' && (
                <TransactionLogs transactions={transactions} />
              )}
              {activeTab === 'admin' && wallet.isAdmin && (
                <AdminPanel 
                  wallet={wallet}
                  onTransaction={addTransaction}
                  onBalanceUpdate={updateBalance}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;