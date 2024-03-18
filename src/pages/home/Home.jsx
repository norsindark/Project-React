import React from 'react';
import Nav from '../../layouts/nav/Nav';
import { Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <div>
        <Nav/>
    <div>
    <Outlet/>
    </div>
    </div>
  )
}

export default Home