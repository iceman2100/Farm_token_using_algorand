# 🌱 Farm Food Tokenization Platform

A comprehensive Algorand-based dApp for tokenizing and tracing agricultural products using smart contracts, IPFS metadata, and modern web technologies.

## 🚀 Features

### Smart Contract (AlgoPy)

- **ASA Creation**: Custom FarmToken with ARC-53 metadata
- **Mint/Burn**: Admin-controlled token supply management
- **Transfer Restrictions**: Blacklist/whitelist enforcement
- **Multisig Security**: 2-of-3 signature requirement for critical operations
- **IPFS Integration**: Decentralized metadata storage

### Frontend (React + TypeScript)

- **Wallet Integration**: Pera Wallet and MyAlgo support
- **Real-time Dashboard**: Balance, metadata, and transaction history
- **Token Transfers**: Secure P2P transfers with blacklist validation
- **Admin Panel**: Mint/burn tokens and manage user permissions
- **IPFS Viewer**: Rich agricultural product metadata display
- **Responsive Design**: Mobile-first, production-ready UI

## 📦 Tech Stack

- **Smart Contracts**: Python (AlgoKit + AlgoPy)
- **Frontend**: React + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Blockchain**: Algorand
- **Wallets**: Pera Wallet, MyAlgo
- **Storage**: IPFS for metadata
- **Testing**: Pytest for contracts, React Testing Library
- **Deployment**: AlgoKit CLI

## 🏗️ Project Structure

farm-food-tokenization/
├── contracts/
│   └── farm_food_tokenizer.py      # Main smart contract
├── scripts/
│   ├── deploy_farm_food.py         # Deployment script
│   └── deploy_config.json          # Network configurations
├── tests/
│   └── test_farm_food.py           # Comprehensive test suite
├── frontend/src/
│   ├── components/                 # React components
│   │   ├── WalletConnect.tsx       # Wallet connection UI
│   │   ├── Dashboard.tsx           # Main dashboard
│   │   ├── TransferForm.tsx        # Token transfer form
│   │   ├── AdminPanel.tsx          # Admin controls
│   │   ├── IPFSViewer.tsx          # Metadata viewer
│   │   └── TransactionLogs.tsx     # Transaction history
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # App entry point
├── deployments/                    # Deployment artifacts
└── README.md

## 🛠️ Setup Instructions

### Prerequisites

1. **Node.js** (v18+)
2. **Python** (v3.10+)
3. **AlgoKit CLI**
4. **Git**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd farm-food-tokenization

# Install frontend dependencies
npm install

# Install Python dependencies (for actual deployment)
pip install algokit
pip install -r requirements.txt  # Create this file with: algopy, pytest, etc.
```

### Development Setup

```bash
# Start the frontend development server
npm run dev

# The app will be available at http://localhost:5173
```

### AlgoKit Setup (for actual blockchain deployment)

```bash
# Install AlgoKit
pip install algokit

# Initialize AlgoKit project (if starting fresh)
algokit init

# Start LocalNet
algokit localnet start

# Deploy to LocalNet
python scripts/deploy_farm_food.py --network localnet

# Deploy to TestNet
python scripts/deploy_farm_food.py --network testnet
```

## 🧪 Testing

### Frontend Testing

bash
npm run test        # Run React component tests
npm run test:watch  # Run tests in watch mode

### Smart Contract Testing

```bash
# Run all contract tests
pytest tests/test_farm_food.py -v

# Run specific test
pytest tests/test_farm_food.py::TestFarmFoodTokenizer::test_create_asa -v

# Run with coverage
pytest tests/test_farm_food.py --cov=contracts --cov-report=html
```

## 🌐 Deployment

### LocalNet (Development)

```bash
# Start LocalNet
algokit localnet start

# Deploy contract
python scripts/deploy_farm_food.py --network localnet

# Contract will be deployed and ASA created
# Check deployments/localnet_deployment.json for details
```

### TestNet (Staging)

```bash
# Deploy to TestNet
python scripts/deploy_farm_food.py --network testnet

# Fund your account first:
# https://testnet.algoexplorer.io/dispenser

# Check deployments/testnet_deployment.json for details
```

### MainNet (Production)

```bash
# Deploy to MainNet (use with caution)
python scripts/deploy_farm_food.py --network mainnet

# Ensure you have:
# 1. Sufficient ALGO for deployment
# 2. Proper security review
# 3. Tested thoroughly on TestNet
```

## 📊 Contract Specifications

### FarmToken (ASA)

- **Name**: FarmToken
- **Symbol**: FT
- **Total Supply**: 1,000,000 FT
- **Decimals**: 2
- **Metadata**: IPFS-based ARC-53 standard

### Core Methods

```python
# ASA Management
create_asa(name, unit_name, supply, decimals, metadata_cid) -> asset_id
mint_tokens(recipient, amount) -> success
burn_tokens(amount) -> success

# Access Control
add_to_blacklist(address) -> success
remove_from_blacklist(address) -> success
is_blacklisted(address) -> bool

# Metadata Management
get_metadata_cid() -> cid
update_metadata_cid(new_cid) -> success
get_contract_info() -> (name, asset_id, supply)
```

## 📄 IPFS Metadata Schema

```json
{
  "name": "Farm Potato Batch 014",
  "origin": "Punjab, India",
  "harvest_date": "2025-01-15",
  "expiry": "2025-03-15",
  "batchId": "F014P",
  "farmer": "Rajesh Kumar",
  "farm_location": {
    "latitude": 30.3753,
    "longitude": 76.7821,
    "address": "Village Khanna, District Ludhiana, Punjab, India"
  },
  "certification": "Organic",
  "quality_grade": "A+",
  "quantity": "1000 kg",
  "quality_metrics": {
    "moisture_content": "78%",
    "starch_content": "20%",
    "sugar_content": "0.5%",
    "ph_level": "6.2"
  },
  "supply_chain": [
    {"stage": "Planting", "date": "2024-10-01", "location": "Punjab Farm"},
    {"stage": "Harvesting", "date": "2025-01-15", "location": "Punjab Farm"},
    {"stage": "Processing", "date": "2025-01-16", "location": "Processing Unit"}
  ]
}
```

## 🔐 Security Features

### Smart Contract Security

- **Admin-only operations**: Minting, burning, blacklist management
- **Multisig enforcement**: 2-of-3 signatures for critical operations
- **Transfer restrictions**: Automatic blacklist validation
- **Input validation**: All parameters validated before execution

### Frontend Security

- **Wallet integration**: Secure connection to Pera/MyAlgo
- **Transaction signing**: All transactions signed by user wallet
- **Error handling**: Comprehensive error states and user feedback
- **Input sanitization**: All user inputs validated and sanitized

## 🎯 Usage Examples

### Connect Wallet

1. Click "Connect Wallet" button
2. Choose Pera Wallet or MyAlgo
3. Approve connection in wallet app
4. Dashboard loads with your FarmToken balance

### Transfer Tokens

1. Navigate to "Transfer" tab
2. Enter recipient address and amount
3. Add optional message
4. Click "Send Tokens"
5. Confirm transaction in wallet

### View Product Metadata

1. Navigate to "Metadata" tab
2. View rich agricultural product information
3. See supply chain traceability
4. Check quality metrics and certifications

### Admin Functions (Admin accounts only)

1. Navigate to "Admin" tab
2. Mint new tokens or burn existing ones
3. Add/remove addresses from blacklist
4. Monitor token supply and user activity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript/Python best practices
- Write comprehensive tests for new features
- Update documentation for API changes
- Use conventional commit messages
- Ensure responsive design for UI changes

## 📚 Resources

### Algorand Development

- [Algorand Developer Portal](https://developer.algorand.org/)
- [AlgoKit Documentation](https://github.com/algorandfoundation/algokit-cli)
- [AlgoPy Documentation](https://github.com/algorandfoundation/puya)
- [ARC Standards](https://github.com/algorandfoundation/ARCs)

### Frontend Development

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

### IPFS Integration

- [IPFS Documentation](https://docs.ipfs.io/)
- [Web3.Storage](https://web3.storage/)
- [ARC-53 Standard](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0053.md)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Algorand Foundation for the excellent developer tools
- The open-source community for React and TypeScript
- IPFS Protocol Labs for decentralized storage
- Agricultural communities for inspiration and use cases

---

//link of the project on youtube for more information:
<https://youtu.be/dSgSq2m-ulw?si=sX81IoP3fv3qiwNb>

**Note**: This is a demonstration/template project. For production deployment, ensure you have proper testing, security audits, and compliance with local regulations for agricultural tokenization
