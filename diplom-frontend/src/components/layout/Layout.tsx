import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";
import { NavMenu } from "../nav/NavMenu";
import { Footer } from "../footer/Footer";

export const Layout: FC = () =>{
   
    return (
      <div className='wrapper'>
          <div className = 'content'>
            <Header />
            <NavMenu />
            <main>
              <Outlet/>
            </main>
          </div>
          <Footer />
      </div>
    );
}