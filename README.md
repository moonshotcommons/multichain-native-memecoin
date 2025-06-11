# Multichain Native Memecoin

This is a multichain native Memecoin project based on the Wormhole NTT framework, implementing cross-chain token issuance and transfer functionality. The project allows developers to issue a native token HackQuest(HQ) using the Burn-and-Mint model, supporting seamless transfers between Solana, OptimismSepolia, and ArbitrumSepolia blockchains.
![Cross-chain Flow](./1.webp)

To learn more about this project, visit: https://arena.wormhole.com/zh-cn/courses/1bee7446-5ed5-8140-9ec4-e800f40a41bc

## Project Features

- **Native Token Support**: Each chain's token is native, not wrapped, providing better user experience and lower transaction costs
- **Burn-and-Mint Model**: Innovative burn-and-mint mechanism ensuring secure and reliable cross-chain transfers
- **Multi-chain Support**:
  - Solana: High-performance blockchain with fast transactions and low fees
  - OptimismSepolia: Layer2 solution offering Ethereum compatibility and low costs
  - ArbitrumSepolia: Popular Layer2 network providing additional scalability options
- **Seamless Cross-chain**: Secure and reliable cross-chain messaging through Wormhole Protocol
- **User-friendly**: Intuitive web interface with wallet connection and cross-chain operations

## Project Structure

The project consists of three main modules, each responsible for different functionalities:

### 01-example-ntt-token
Smart contract module implementing core functionality for multichain token deployment:
- **PeerToken Contract**: Implements Burn-and-Mint model token contract
  - Token minting functionality
  - Token burning functionality
  - Token transfer functionality
  - Minting permission management
- **Deployment Tools**: Using Foundry framework for contract deployment and interaction
  - Multi-chain deployment support
  - Token minting and query functionality
  - Environment variable configuration

### 02-my-ntt-project
NTT (Native Token Transfer) framework configuration module:
- **Chain Configuration**: Configuring supported blockchain networks
  - OptimismSepolia configuration
  - Solana configuration
  - ArbitrumSepolia configuration
- **Cross-chain Settings**:
  - Token contract address configuration
  - Cross-chain mode settings (Burn-and-Mint)
  - Permission management configuration
- **Deployment Management**:
  - Configuration synchronization (ntt pull/push)
  - Cross-chain parameter validation
  - Deployment status management

### 03-ntt-project-front
Frontend interface based on Connect Widget:
![Project Architecture](./image.png)

- **User Interface**:
  - Wallet connection integration
  - Token balance display
  - Cross-chain transfer operations
  - Transaction status tracking
- **Technical Implementation**:
  - Based on Vite + React + TypeScript
  - Wormhole Connect SDK integration
  - Responsive design
  - Real-time status updates

## Detailed Deployment Process

### Step 1: Deploy ERC20 Contract
First, we need to deploy our token contract on the Optimism Sepolia testnet. This contract will serve as our native token on the Optimism network.

```bash
# Clone example token project
git clone https://github.com/wormhole-foundation/example-ntt-token.git
cd example-ntt-token

# Set environment variables
export HACKQUEST=0xAe3759Ccc3E0877fFBb4d533a88Bf9AD0F2Df3F8  # Your wallet address
export OP_PRIVATE_KEY=your_private_key  # Your private key

# Deploy token contract
forge create --rpc-url "https://sepolia.optimism.io" \
  --private-key $OP_PRIVATE_KEY \
  --broadcast src/PeerToken.sol:PeerToken \
  --constructor-args "HackQuest" "HQ" $HACKQUEST $HACKQUEST

# Record token address
export OP_TOKEN_ADDRESS=deployed_token_address
```

### Step 2: Mint Tokens
After deployment, we need to mint the initial token supply. Here we mint 1000 tokens.

```bash
# Mint 1000 tokens
cast send --private-key $OP_PRIVATE_KEY \
  --rpc-url "https://sepolia.optimism.io" \
  $OP_TOKEN_ADDRESS \
  "mint(address,uint256)" \
  $HACKQUEST \
  1000000000000000000000  # 1000 tokens (18 decimals)

# Check balance to confirm minting
cast call $OP_TOKEN_ADDRESS "balanceOf(address)(uint256)" $HACKQUEST \
  --rpc-url "https://sepolia.optimism.io"
```

### Step 3: Add Optimism Sepolia Chain
Now we need to configure the NTT framework, starting with adding the Optimism Sepolia chain.

```bash
# Initialize NTT project
ntt new my-ntt-project
ntt init Testnet

# Set environment variables
export ETH_PRIVATE_KEY=your_private_key
export OPTIMISMSEPOLIA_SCAN_API_KEY=your_api_key
export OP_TOKEN_ADDRESS=your_token_address

# Add chain configuration
ntt add-chain OptimismSepolia --latest --mode burning --token $OP_TOKEN_ADDRESS
```

### Step 4: Modify Token Minting Permission
To ensure cross-chain functionality works properly, we need to transfer token minting permission to the NTT Manager.

```bash
export NTT_MANAGER_ADDRESS=your_ntt_manager_address
cast send $OP_TOKEN_ADDRESS "setMinter(address)" $NTT_MANAGER_ADDRESS \
  --private-key $OP_PRIVATE_KEY \
  --rpc-url "https://sepolia.optimism.io"
```

### Step 5: Create Solana Account
Next, we need to create necessary accounts on the Solana network.

```bash
# Generate account with specific prefix (for transaction fees)
solana-keygen grind --starts-with w:1

# Set as default account
solana config set --keypair your_keypair.json

# Export private key (for NTT configuration)
ntt solana key-base58 <keypair>

# Get test tokens
solana airdrop 2
solana balance
```

### Step 6: Deploy SPL Token
Create our token on Solana.

```bash
# Create token
spl-token create-token

# Create token account
spl-token create-account your_token_address
```

### Step 7: Set Token Metadata
Set metadata information for the Solana token, including name, symbol, and image.

```bash
# Clone metadata project
git clone https://github.com/wormhole-foundation/demo-metaplex-metadata
cd demo-metaplex-metadata

# Install dependencies
npm install

# Set environment variables
export SOL_PRIVATE_KEY="your_private_key"

# Update metadata information
# In the configuration file:
# - name: "HackQuest"
# - symbol: "HQ"
# - uri: "your_metadata_uri"

# Create metadata
npm run create-metadata
```

### Step 8: Set Mint Permission
Configure Solana token minting permission to ensure NTT framework can control token minting.

```bash
# Generate NTT program account (for controlling token minting)
solana-keygen grind --starts-with ntt:1

# Generate corresponding PDA account (Program Derived Address)
ntt solana token-authority your_ntt_program_keypair

# Authorize minting permission to NTT program
spl-token authorize your_token_address mint your_derived_pda
```

### Step 9: Add Solana Chain
Add Solana chain to NTT configuration.

```bash
ntt add-chain Solana --latest --mode burning \
  --token your_token_address \
  --payer your_keypair.json \
  --program-key your_ntt_program_keypair.json
```

### Step 10: Configure NTT
Synchronize and update NTT configuration.

```bash
# Pull latest configuration
ntt pull

# Push configuration updates
ntt push --payer your_keypair.json
```

### Step 11: Deploy Frontend Interface
Finally, deploy the user interface for convenient cross-chain operations.

```bash
# Clone frontend project
git clone https://github.com/wormhole-foundation/demo-ntt-connect.git
cd demo-ntt-connect

# Install dependencies
npm install

# Start development server
npm run dev
```

