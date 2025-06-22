import React, { useState } from 'react';
import { Send, AlertTriangle, CheckCircle, Loader } from 'lucide-react';

interface TransferFormProps {
  wallet: {
    connected: boolean;
    address: string;
    balance: number;
    isAdmin: boolean;
  };
  onTransfer: (transaction: any) => void;
  onBalanceUpdate: (newBalance: number) => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ wallet, onTransfer, onBalanceUpdate }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock blacklisted addresses
  const blacklistedAddresses = [
    'ALGOBLACKLIST1',
    'ALGOBLACKLIST2',
    'ALGOSPAMMER123'
  ];

  const validateRecipient = (address: string) => {
    if (!address) return 'Recipient address is required';
    if (address.length < 10) return 'Invalid address format';
    if (address === wallet.address) return 'Cannot transfer to yourself';
    if (blacklistedAddresses.some(blocked => address.includes(blocked))) {
      return 'Recipient address is blacklisted';
    }
    return '';
  };

  const validateAmount = (value: string) => {
    if (!value) return 'Amount is required';
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) return 'Amount must be greater than 0';
    if (numValue > wallet.balance) return 'Insufficient balance';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const recipientError = validateRecipient(recipient);
    const amountError = validateAmount(amount);

    if (recipientError || amountError) {
      setError(recipientError || amountError);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const transaction = {
        id: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        type: 'transfer',
        from: wallet.address,
        to: recipient,
        amount: parseFloat(amount),
        message: message || 'Token transfer',
        timestamp: new Date().toISOString(),
        status: 'completed'
      };

      onTransfer(transaction);
      onBalanceUpdate(wallet.balance - parseFloat(amount));
      setSuccess(`Successfully transferred ${amount} FT to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`);
      
      // Reset form
      setRecipient('');
      setAmount('');
      setMessage('');
    } catch (err) {
      setError('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Send className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Transfer FarmTokens</h3>
              <p className="text-sm text-gray-600">Send tokens to another address</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Balance Display */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Available Balance</span>
              <span className="text-xl font-bold text-green-700">{wallet.balance.toLocaleString()} FT</span>
            </div>
          </div>

          {/* Recipient Address */}
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ALGO1234567890ABCDEF..."
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the recipient's Algorand address
            </p>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount (FT)
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 text-sm">FT</span>
              </div>
            </div>
            <div className="mt-1 flex justify-between">
              <p className="text-xs text-gray-500">Minimum: 0.01 FT</p>
              <button
                type="button"
                onClick={() => setAmount(wallet.balance.toString())}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Use Max
              </button>
            </div>
          </div>

          {/* Optional Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a note for this transfer..."
              rows={3}
            />
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Send Tokens</span>
              </>
            )}
          </button>

          {/* Security Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Security Notice</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Transfers to blacklisted addresses will be automatically rejected. 
                  Always verify the recipient address before sending.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferForm;