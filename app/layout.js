import './globals.css'

import { Header } from '@/components/Header'
import { LeftPanel } from '@/components/LeftPanel'
import { CenterPanel } from '@/components/CenterPanel'
import { RightPanel } from '@/components/RightPanel'
import { InitGame } from '@/components/InitGame'

export const metadata = {
  title: 'Alchemiz.ing',
  description: 'Become the Greatest Alchemist'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <link rel='icon' href='/favicon.png' type='image/png' />
      <body className='text-sm uppercase w-full h-full'>
        {children}
        <div
          className='h-full w-full flex flex-col overflow-hidden'
          id='whole-page'
        >
          <InitGame />
          <Header />
          <div
            className='flex grow w-full px-16 gap-8 overflow-hidden '
            id='panels-container'
          >
            <LeftPanel />
            <div className='h-full w-[2px] bg-[#3d3d3d] transmute-flash'></div>
            <CenterPanel />{' '}
            <div className='h-full w-[2px] bg-[#3d3d3d] transmute-flash'></div>
            <RightPanel />
          </div>
          <div className='h-[50px] min-h-[50px]' id='footer-space'></div>
        </div>
      </body>
    </html>
  )
}
