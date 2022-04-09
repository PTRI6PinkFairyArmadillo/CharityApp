import React, { useEffect, useState, Component } from 'react';
import Cookies from 'universal-cookie';
import Popup from "reactjs-popup";
import Menu from "./hamburger/Menu";
import BurgerIcon from "./hamburger/BurgerIcon";
import Calendar from 'react-calendar'
import AnalogClock from 'analog-clock-react';
import './hamburger/index.css';
import './dashboard.css';
import 'react-calendar/dist/Calendar.css';
import donate from '../public/donate.png';
import { Chart } from "react-google-charts";
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { UseScrollLeft, UseScrollRight, UseScrollNav, UseScrollCharts, UseScrollNumbers } from "./UseScroll";
import manHoldingKid from '../assets/manHoldingKid.jpg'
import dollar from '../assets/dollar.png'
import heart from '../assets/heart.png'
import world from '../assets/world.png'
import settlment from '../assets/settlment.jpg'

const AddBank = () => (
    <div>
      <h2>Add Bank</h2>
    </div>
  );
  
  const Contributions = () => (
    <div>
      <h2>Add Contributions</h2>
    </div>
  );

  // const options = {
  //   "useCustomTime": false,
  //   "width": "100%",
  //   "height": "100%",
  //   "border": true,
  //   "borderColor": "#525252",
  //   "baseColor": "#ffc0ce",
  //   "centerColor": "#ffc0ce",
  //   "centerBorderColor": "#ffffff",
  //   "handColors": {
  //     "second": "#d81c7a",
  //     "minute": "#ffffff",
  //     "hour": "#ffffff"
  //   }
  // }

export const dataBar = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];
  
  export const optionsBar = {
    backgroundColor: { fill:'transparent' },
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017"
    }
  };
  export const dataPie = [
    ["CHARITY", "AMOUNT"],
    ["FOR GREENER FUTURE", 11],
    ["HUNGRY CHILDREN", 2],
    ["RECYCLE ME2DAY", 2],
    ["28JUN", 2],
    ["CAR FOR ALL", 7],
  ];
  export const optionsPie = {
    backgroundColor: { fill:'transparent' },
    title: "Total Donations",
  };

  export const dataChart = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];
  
  export const optionsChart = {
    backgroundColor: { fill:'transparent' },
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
  };

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    marginTop: "40px"
  };
  const contentStyle = {
    background: "rgba(255,255,255,0)",
    width: "80%",
    border: "none"
  };

const Dashboard = (props) => {
    useEffect (() => {
      fetch('/dashboard')
      .then(response => response.json())
      .then(data => console.log('this is response', data))   
    }, []);

    let navigate = useNavigate();

    const navigateToBanks = (e) => {
      e.preventDefault();
      navigate('/dashboard/banks')
    }

    const [state, setState] = useState({
      total: "block",
      ytd: "none",
      month: "none",
      scrolling: false
    })

    const hidden = UseScrollLeft();
    const hidden2 = UseScrollRight();
    const hidden3 = UseScrollNav();
    const hidden4 = UseScrollCharts();
    const hidden5 = UseScrollNumbers();

    const changeTotal = () => {
      setState({...state, total: "block", ytd: "none", month: "none"});
    }
    const changeYtd = () => {
      setState({...state, total: "none", ytd: "block", month: "none"});
    }
    // const changeMonth = () => {
    //   setState({...state, total: "none", ytd: "none", month: "block"});
    // }
 
        return(
          // style ={ { background: "linear-gradient(-15deg, #e73c7e, #23a6d5, #23d5ab)" }}
            <div className="dashboardBackground">
                     
                <div className="collapsibleContainer">
      
                
                <div className="one">
                
                <article class="card">
                      <div class="modest-vid-embed modest-vid-embed--auto">
                        <div class="modest-vid-embed__wrapper">
                          <iframe class="modest-vid-embed__item" style={{width: '100%', height: '55%'}}src="https://www.youtube.com/embed/BQ0mxQXmLsk?mute=1&autoplay=1&modestbranding=1&loop=1&rel=0&amp;controls=0&amp;showinfo=0&playlist=E1xkXZs0cAQ" frameborder="0" allowfullscreen></iframe>
                        </div>
                      </div>
                    </article>
                  
                  <div className="h1video"><h1 className="h1test">Charity App</h1><p className="p1test">be the change the world needs</p></div>
 
                    
                    <div>
                    <div className='icons'>
                      <div className='icon'>
                        <img src={heart}/><h3>Each donation brings families together</h3>
                      </div>
                      <div className='icon'>
                        <img  style={{width:'96px', height: '96px'}} src={world}/><h3>Your donations are instantly transfered across the world</h3>
                      </div>
                      <div className='icon'>
                        <img src={dollar}/><h3>90% of your donations go to the ones in need</h3>
                      </div>
                    </div>
                    {!hidden && (
                      <div className='left'>
                        <div className='leftText'>
                        <h2>Help in a time of need</h2>
                        <h4>Since Charity App was founded, more than 3405 families received necessary economic support in warn tarn countries, such as Yemen, Iraq, Somalia and Sirya.</h4>
                        <hr></hr>
                        <p>Image: Photo of a man holding a kid in a war torn Yemen, by Istvan Suli</p>
                        </div>
                        <div className='leftImage'>
                        <img src={manHoldingKid}/>
                        </div>
                      </div>
                      )}
                      {!hidden2 && (
                      <div className='right'>
                      <div className='rightImage'>
                        <img src={settlment}/>
                        </div>
                      <div className='rightText'>
                        <h2>Make a lasting impact</h2>
                        <h4>Our organization is determined to help families start all over when all hopes and dreams are crushed. More than one third of world's population is hungry, desipite UN's best effort.</h4>
                        <hr></hr>
                        <p>Image: Photo of an older lady struggling to produce food, by Ahmed Akacha</p>
                        </div>
                      </div>
                   
                      )}
                      {!hidden3 && (
                    <div className="chartNav">
                    <button className="buttonNav"  onClick={() => changeTotal('block')}>total</button><button className="buttonNav" onClick={() => changeYtd('block')}>ytd</button><button className="buttonNav" onClick={(e) => props.logout(e)}>signout</button>

                    <div className="charts">
                    <div className="total" style={{display: state.total}}>
                    <Chart
                        chartType="PieChart"
                        data={dataPie}
                        options={optionsPie}
                        width={"700px"}
                        height={"400px"}
                    />
                    </div>
                    <div className="ytd" style={{display: state.ytd}}>
                    
                    <Chart
                        chartType="AreaChart"
                        width="700px"
                        height="400px"
                        data={dataChart}
                        options={optionsChart}
                    />
                    
                    </div>
  
                    </div>
                    </div>
                    
                    )}
                      {!hidden4 && (
                       <div className='center'>
                        <h3>"Charity App helped me and my family to open the first store in our village"</h3>
                        <p>Hanh Nguyen, Vietnam</p>
                      </div>
                      )}
                    </div>
                 
                    
                    {!hidden5 && (
                <div className="amounts">
                    <div className="amountsInside">
                        <h2>contributions</h2><CountUp style ={{fontSize:"50px"}} end={2400} duration={7.75}/>
                    </div>
                    <div className="amountsInside">
                        <h2>donations</h2><CountUp style ={{fontSize:"50px"}} end={143} duration={7.75}/>
                    </div>
                    <div className="amountsInside">
                        <h2>transactions</h2><CountUp style ={{fontSize:"50px"}} end={18} duration={7.75}/>
                    </div>
                    <div className="amountsInside">
                        <h2>countires</h2><CountUp style ={{fontSize:"50px"}} end={10} duration={7.75}/>
                    </div>
                </div>
               )}
                <div className='footer'>
                <div className='box'>
                        <h3>Team Name: Pink Fairy Armadillo</h3>
                    </div>
                    <div className='box'>
                        <h3>Team:</h3>
                        <p>Sigele Nickerson-Adams</p>
                        <p>Javan Ang</p>
                        <p>Josh Merrell</p>
                        <p>Nathan Crawford</p>
                        <p>Milos Popovic</p>
                    </div>

                </div>
                </div>
                
                <div><img onClick={navigateToBanks} className="donate" style={{width: "25%", height: "18%"}}src={donate} alt="donate"/></div>
                
                </div>
                <div>
                
                    <div>
                        <Popup
                        modal
                        className="test" overlayStyle={{ background: "rgba(255,255,255,0.98"}}
                        contentStyle={contentStyle}
                        closeOnDocumentClick={false}
                        trigger={open => <BurgerIcon open={open} />}
                        >
                        {close => <Menu close={close} />}
                        </Popup>

                    </div>
               
                </div>
            </div>
        )
}

export default Dashboard;
