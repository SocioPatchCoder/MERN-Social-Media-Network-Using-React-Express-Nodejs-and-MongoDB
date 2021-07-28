import React from 'react';
import Banner from '../components/Banner';
import HomeLeft from '../components/HomeLeft';
import HomeMid from '../components/HomeMid';
import HomeRight from '../components/HomeRight';
import "../styles/Home.css"

const Home = () =>{
    return (
        <div className="home">
            <div className="homebanner">
                <Banner/>
            </div>
            <div className="homemaincontainer">
                <div className="homemain-contentleft">
                    <HomeLeft/>
                </div>
                <div className="homemain-contentmid">
                    <HomeMid/>
                </div>
                <div className="homemain-contentright">
                    <HomeRight/>
                </div>
            </div>
            
        </div>
    )
}
export default Home;