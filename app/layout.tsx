import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/NavBar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import CreateProjectModal from './components/Modals/CreateProjectModal'
import SearchModal from './components/Modals/SearchModal'


export const metadata: Metadata = {
  title: 'CodeCollab',
  description: 'A way for developers to build a community and link up.',
}

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout(
  { children,}: {children: React.ReactNode} //takes in children as props of type react node
  ) {
    const currentUser = await getCurrentUser()
  return ( 
    <html lang="en">
      <body className={font.className}> 
        <ClientOnly>
          <ToasterProvider></ToasterProvider>
          <SearchModal></SearchModal>
          <LoginModal></LoginModal>
          <RegisterModal></RegisterModal>
          <CreateProjectModal></CreateProjectModal>
          <Navbar currentUser={currentUser}></Navbar>
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
