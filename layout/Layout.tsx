import React from 'react'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <Footer/>
      
    </React.Fragment>
  )
}

export default Layout