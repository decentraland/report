import type { ReactNode } from 'react'
import { Footer } from '../Footer/Footer'
import { Navbar } from '../Navbar/Navbar'
import { ContentWrapper, PageContainer } from './PageLayout.styled'

interface PageLayoutProps {
  children: ReactNode
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <PageContainer>
      <Navbar />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </PageContainer>
  )
}

export { PageLayout }
