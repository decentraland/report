import { Footer as BaseFooter, SupportedLanguage } from 'decentraland-ui2'
import { FooterWrapper } from './Footer.styled'

function Footer() {
  return (
    <FooterWrapper>
      <BaseFooter languages={[{ code: SupportedLanguage.EN, name: 'English', flag: '🇺🇸' }]} hideSocialNetworks />
    </FooterWrapper>
  )
}

export { Footer }
