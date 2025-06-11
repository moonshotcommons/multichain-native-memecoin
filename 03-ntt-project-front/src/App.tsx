import WormholeConnect, {
    WormholeConnectConfig,
    nttRoutes,
    WormholeConnectTheme,
  } from '@wormhole-foundation/wormhole-connect';
  
  const wormholeConfig: WormholeConnectConfig = {
    network: 'Testnet',
    chains: ['ArbitrumSepolia', 'OptimismSepolia'],
    tokens: ['WSVarb', 'WSVsep'],
    ui: {
      title: 'Wormhole NTT UI',
      defaultInputs: {
        fromChain: 'ArbitrumSepolia',
        toChain: 'OptimismSepolia'
      },
      showHamburgerMenu: false,
    },
    // TODO: use a private RPC for mainnet
    // rpcs: {
    //   Solana: 'https://mainnet.helius-rpc.com/?api-key=$KEY',
    // },
    routes: [
      ...nttRoutes({
        tokens: {
          WSV_NTT: [
            {
              chain: 'ArbitrumSepolia',
              manager: '0xA54f7E03cA136892844A22d51B18f4E0bDb25ca3',
              token: '0xC2234C848e65200507d06245109b7e491679228E',
              transceiver: [
                {
                  address: '0x141d2229fc876937DF3e2F18676f06de1fC21400',
                  type: 'wormhole',
                },
              ],
            },
            {
              chain: 'OptimismSepolia',
              manager: '0x4a545E8df52d135b67B4450e94b276815653F8E9',
              token: '0x8df8c6FD0ECf36425082c5C02e77ab2c2D5d85f2',
              transceiver: [
                {
                  address: '0x90aD8bc09c0fb102FA90f6b5b74b9fC926D0018D',
                  type: 'wormhole',
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      WSVarb: {
        key: 'WSVarb',
        symbol: 'HQ4',
        nativeChain: 'ArbitrumSepolia',
        displayName: 'HQ4',
        tokenId: {
          chain: 'ArbitrumSepolia',
          address: '0xC2234C848e65200507d06245109b7e491679228E'
        },
        coinGeckoId: 'wormhole',
        icon: 'https://salmon-total-owl-496.mypinata.cloud/ipfs/bafkreigmo6tjfxspip6jtembwaurwpcinrv3rh4vdg2d5qoqnak5dnufba',
        decimals: 9
      },
      WSVsep: {
        key: 'WSVsep',
        symbol: 'HQ4',
        nativeChain: 'OptimismSepolia',
        displayName: 'HQ4',
        tokenId: {
          chain: 'OptimismSepolia',
          address: '0x8df8c6FD0ECf36425082c5C02e77ab2c2D5d85f2'
        },
        coinGeckoId: 'wormhole',
        icon: 'https://salmon-total-owl-496.mypinata.cloud/ipfs/bafkreigmo6tjfxspip6jtembwaurwpcinrv3rh4vdg2d5qoqnak5dnufba',
        decimals: 18
      },
    }
  }
  
  function App() {
    const theme: WormholeConnectTheme = {
      mode: 'dark',
      primary: '#78c4b6',
    };

    return (
      <div>
        <WormholeConnect config={wormholeConfig} theme={theme} />
      </div>
    )
  }
  export default App