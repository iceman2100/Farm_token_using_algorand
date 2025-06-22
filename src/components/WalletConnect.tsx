import React, { useState } from 'react';
import { Wallet, LogOut, Smartphone, Globe } from 'lucide-react';

interface WalletConnectProps {
  wallet: {
    connected: boolean;
    address: string;
    balance: number;
    isAdmin: boolean;
  };
  onConnect: (address: string, isAdmin?: boolean) => void;
  onDisconnect: () => void;
  showButton?: boolean;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ 
  wallet, 
  onConnect, 
  onDisconnect, 
  showButton = false 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async (walletType: string, isAdmin: boolean = false) => {
    setConnecting(true);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockAddress = `ALGO${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    onConnect(mockAddress, isAdmin);
    setConnecting(false);
    setShowModal(false);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (wallet.connected) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {formatAddress(wallet.address)}
          </div>
          <div className="text-xs text-gray-500">
            {wallet.balance.toLocaleString()} FT
            {wallet.isAdmin && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Admin
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onDisconnect}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
          showButton ? 'w-full justify-center' : ''
        }`}
      >
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Connect Wallet</h3>
            <p className="text-gray-600 mb-6">Choose your preferred wallet to connect</p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleConnect('pera')}
                disabled={connecting}
                className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all disabled:opacity-50"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Pera Wallet</div>
                  <div className="text-sm text-gray-500">Mobile wallet app</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect('myalgo')}
                disabled={connecting}
                className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all disabled:opacity-50"
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <Globe className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">MyAlgo</div>
                  <div className="text-sm text-gray-500">Web-based wallet</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect('admin', true)}
                disabled={connecting}
                className="w-full flex items-center space-x-3 p-4 border border-orange-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all disabled:opacity-50"
              >
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Wallet className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Admin Demo</div>
                  <div className="text-sm text-gray-500">Connect as admin user</div>
                </div>
              </button>
            </div>

            {connecting && (
              <div className="mt-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                <span className="ml-2 text-gray-600">Connecting...</span>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;