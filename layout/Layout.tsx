import React from 'react'
import Navbar from '@/components/Navbar';

type LayoutProps ={
  children:any;
}

const Layout:React.FC<LayoutProps> = ({children}) => {
  return (
    <React.Fragment>
      <div>
        <Navbar />
      </div>
      {children}
      
    </React.Fragment>
  )
}

export default Layout