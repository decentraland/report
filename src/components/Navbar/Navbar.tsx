import { memo, useCallback, useMemo } from 'react'
import type { Address } from 'viem'
import { useTokenBalance, useWallet } from '@dcl/core-web3'
import { ChainId, Network } from '@dcl/schemas'
import { Env } from '@dcl/ui-env'
import { type ManaBalancesProps, Navbar as NavbarComponent, type NavbarProps } from 'decentraland-ui2'
import { config, getEnv } from '../../config'
import { useGetProfileQuery } from '../../features/profile/profile.client'
import { redirectToAuth } from '../../utils/authRedirect'
import { NavbarErrorBoundary } from './NavbarErrorBoundary'

const isProd = config.is(Env.PRODUCTION)

const parseTokenBalance = (balance: string | null) => {
  if (balance === null) {
    return undefined
  }

  const parsed = Number(balance)
  return Number.isFinite(parsed) ? parsed : undefined
}

const NavbarInner = memo(function NavbarInner() {
  const { address, isConnected, isConnecting, isDisconnecting, disconnect } = useWallet()

  const { balance: manaBalanceEthereum } = useTokenBalance({
    tokenAddress: getEnv('MANA_TOKEN_ADDRESS_ETHEREUM') as Address,
    chainId: isProd ? ChainId.ETHEREUM_MAINNET : ChainId.ETHEREUM_SEPOLIA
  })

  const { balance: manaBalanceMatic } = useTokenBalance({
    tokenAddress: getEnv('MANA_TOKEN_ADDRESS_MATIC') as Address,
    chainId: isProd ? ChainId.MATIC_MAINNET : ChainId.MATIC_AMOY
  })

  const { data: profile } = useGetProfileQuery(address ?? undefined, {
    skip: !address
  })
  const avatar = profile?.avatars?.[0]

  const manaBalances = useMemo(() => {
    if (!isConnected) {
      return {}
    }

    const balances: ManaBalancesProps['manaBalances'] = {}
    const ethereumBalance = parseTokenBalance(manaBalanceEthereum)
    const maticBalance = parseTokenBalance(manaBalanceMatic)

    if (ethereumBalance !== undefined) {
      balances[Network.ETHEREUM] = ethereumBalance
    }

    if (maticBalance !== undefined) {
      balances[Network.MATIC] = maticBalance
    }

    return balances
  }, [isConnected, manaBalanceEthereum, manaBalanceMatic])

  const handleSignIn = useCallback(() => {
    redirectToAuth()
  }, [])

  const handleSignOut = useCallback(() => {
    disconnect()
  }, [disconnect])

  const navbarProps = useMemo(
    () =>
      ({
        activePage: 'extra',
        isSignedIn: isConnected,
        isSigningIn: isConnecting,
        isDisconnecting,
        address: address || undefined,
        avatar,
        manaBalances: manaBalances as ManaBalancesProps['manaBalances'],
        onClickSignIn: handleSignIn,
        onClickSignOut: handleSignOut,
        onClickNavbarItem: (event: React.MouseEvent<HTMLElement>) => {
          const target = event.currentTarget as HTMLAnchorElement
          if (target?.href) {
            window.location.href = target.href
          }
        }
      }) as NavbarProps,
    [isConnected, isConnecting, isDisconnecting, address, avatar, manaBalances, handleSignIn, handleSignOut]
  )

  return <NavbarComponent {...navbarProps} />
})

function Navbar() {
  return (
    <NavbarErrorBoundary>
      <NavbarInner />
    </NavbarErrorBoundary>
  )
}

export { Navbar }
