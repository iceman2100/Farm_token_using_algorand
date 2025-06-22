import React, { useState } from 'react';
import { Activity, ArrowUpRight, ArrowDownLeft, Plus, Minus, Filter, Search } from 'lucide-react';

interface TransactionLogsProps {
  transactions: any[];
}

const TransactionLogs: React.FC<TransactionLogsProps> = ({ transactions }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock additional transactions for demo
  const mockTransactions = [
    {
      id: 'TXN001',
      type: 'mint',
      amount: 1000,
      timestamp: '2025-01-15T10:30:00Z',
      status: 'completed',
      from: 'System',
      to: 'Current User'
    },
    {
      id: 'TXN002',
      type: 'transfer',
      amount: 250,
      timestamp: '2025-01-14T15:45:00Z',
      status: 'completed',
      from: 'ALGO123...ABC',
      to: 'Current User'
    },
    {
      id: 'TXN003',
      type: 'transfer',
      amount: 100,
      timestamp: '2025-01-13T09:20:00Z',
      status: 'completed',
      from: 'Current User',
      to: 'ALGO456...DEF'
    },
    {
      id: 'TXN004',
      type: 'burn',
      amount: 50,
      timestamp: '2025-01-12T14:15:00Z',
      status: 'completed',
      from: 'Current User',
      to: 'System'
    },
    {
      id: 'TXN005',
      type: 'transfer',
      amount: 75,
      timestamp: '2025-01-11T11:30:00Z',
      status: 'failed',
      from: 'Current User',
      to: 'ALGOBLACKLIST1',
      error: 'Recipient is blacklisted'
    }
  ];

  const allTransactions = [...transactions, ...mockTransactions];

  const filteredTransactions = allTransactions.filter(tx => {
    const matchesFilter = filter === 'all' || tx.type === filter;
    const matchesSearch = !searchTerm || 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const formatAddress = (address: string) => {
    if (!address || address === 'System' || address === 'Current User') return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'failed') {
      return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
    }

    switch (type) {
      case 'mint':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'burn':
        return <Minus className="h-4 w-4 text-red-600" />;
      case 'transfer':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'transfer', label: 'Transfers' },
    { value: 'mint', label: 'Mints' },
    { value: 'burn', label: 'Burns' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Transaction Logs</h3>
                <p className="text-sm text-gray-600">Real-time transaction history</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredTransactions.length} transactions
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No transactions found</p>
              <p className="text-sm text-gray-500 mt-1">
                {searchTerm ? 'Try adjusting your search terms' : 'Transaction history will appear here'}
              </p>
            </div>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTransactionIcon(transaction.type, transaction.status)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {transaction.type}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <span>{transaction.amount} FT</span>
                        {transaction.from && transaction.to && (
                          <>
                            <span>•</span>
                            <span>
                              {formatAddress(transaction.from)} → {formatAddress(transaction.to)}
                            </span>
                          </>
                        )}
                      </div>
                      {transaction.error && (
                        <p className="text-sm text-red-600 mt-1">{transaction.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{formatDate(transaction.timestamp)}</p>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      {transaction.id}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Transactions', 
            value: allTransactions.length,
            color: 'blue'
          },
          { 
            label: 'Successful', 
            value: allTransactions.filter(tx => tx.status === 'completed').length,
            color: 'green'
          },
          { 
            label: 'Failed', 
            value: allTransactions.filter(tx => tx.status === 'failed').length,
            color: 'red'
          },
          { 
            label: 'This Month', 
            value: allTransactions.filter(tx => 
              new Date(tx.timestamp).getMonth() === new Date().getMonth()
            ).length,
            color: 'purple'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionLogs;