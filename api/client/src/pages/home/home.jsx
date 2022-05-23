import React from 'react';
import './home.css';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts';


export const Home = () => {
  return (
    <>
    <div className='home-wrapper'>
        <HeroBanner/>
        <div className='sidebar-and-post-container'>
        <div className='sidebar-and-post-wrapper'>
        <Posts/>
        <Sidebar/>
        </div>
        </div>
    </div>
    </>
  )
}
