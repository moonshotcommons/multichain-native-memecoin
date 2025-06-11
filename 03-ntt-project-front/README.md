# Wormhole NTT Connect demo

This project sets up a Vite-React TypeScript application and integrates it with the Wormhole Connect SDK.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** & **TypeScript**
- **npm** or **yarn**

## Setup

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/wormhole-foundation/demo-ntt-connect.git
cd demo-ntt-connect
```

### 2. Download Dependencies

Make sure to install all required dependencies using `npm` or `yarn`:

```bash
# Using npm
npm install

# Or using yarn
yarn
```

### 3. Adjust WormholeConnectConfig

Adjust the `WormholeConnectConfig` in `App.tsx` based on the `deployment.json` file from your NTT deployment. This configuration is essential to ensure proper integration with your deployment environment.

### 4. Run the App

Finally, run your application:

```bash
yarn dev
```

or, if using npm:

```bash
npm run dev
```

### 5. Important Notes
   - Use a private RPC for mainnet, to prevent timeouts


```mermaid
graph TD
    %% 用户操作
    A[用户批准代币销毁] -->|发起跨链请求| B(NTT Manager 处理请求)
    
    %% 源链（Source Chain）流程
    B -->|通知 Wormhole 传输器| C(Wormhole Transceiver 发送消息)
    C -->|准备销毁信息| D(Wormhole 核心合约记录销毁)
    D -->|广播销毁消息| E(Wormhole 网络 Guardian 验证)
    
    %% Guardian 网络（Off-Chain 验证）
    E -->|至少 13/19 Guardian 签署| F(VAA（Verified Action Approval） 交易证明)
    
    %% 目标链（Destination Chain）处理
    F -->|提交交易至目标链| G(Wormhole 传输器接收 VAA)
    G -->|调用核心合约验证 VAA| H(Wormhole 核心合约验证签名)
    H -->|验证通过| I(NTT Manager 在目标链铸造新代币)
    
    %% 用户接收代币
    I -->|用户成功收到新代币| J[用户完成跨链转移]
```