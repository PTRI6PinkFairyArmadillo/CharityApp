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

  const options = {
    "useCustomTime": false,
    "width": "100%",
    "height": "100%",
    "border": true,
    "borderColor": "#525252",
    "baseColor": "#ffc0ce",
    "centerColor": "#ffc0ce",
    "centerBorderColor": "#ffffff",
    "handColors": {
      "second": "#d81c7a",
      "minute": "#ffffff",
      "hour": "#ffffff"
    }
  }

export const dataBar = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];
  
  export const optionsBar = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
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

    const navigateToCharities = (e) => {
      e.preventDefault();
      navigate('/dashboard/charities')
    }

    const [total, changeTotal] = useState('block')
    const [ytd, changeYtd] = useState('block')
    const [month, changeMonth] = useState('block')

        return(
            <div className="dashboardBackground">
                <div className="collapsibleContainer">
                <div className="one">
       
                <div className="chart">
                    <div className="chartNav"><button className="buttonNav"  onClick={() => changeTotal('block')}>total</button><button className="buttonNav" onClick={() => changeYtd('block')}>ytd</button><button className="buttonNav" onClick={() => changeMonth('block')}>month</button><button className="signout" onClick={(e) => props.logout(e)}>signout</button><button className="buttonNav" onClick={navigateToBanks}>banks</button></div>
                    {/* for testing charity front end  */}
                    <button className="charityNav"  onClick={(e) => navigateToCharities(e)}>Go to Charities List</button>

                    <div className="total" style={{display: total}}>
                    <Chart
                        chartType="PieChart"
                        data={dataPie}
                        options={optionsPie}
                        width={"100%"}
                        height={"400px"}
                    />
                    </div>
                    <div className="ytd" style={{display: ytd}}>
                    <Chart
                        chartType="AreaChart"
                        width="100%"
                        height="400px"
                        data={dataChart}
                        options={optionsChart}
                    />
                    </div>
                    <div className="month" style={{display: month}}>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={dataBar}
                        options={optionsBar}
                    />
                    </div>

                </div>
                <div className="amounts">
                    <div className="amountsInside">
                        <h2>contributions</h2><h1>2400$</h1>
                    </div>
                    <div className="amountsInside">
                        <h2>donations</h2><h1>14</h1>
                    </div>
                    <div className="amountsInside">
                        <h2>contributions</h2><h1>2400$</h1>
                    </div>
                    <div className="amountsInside">
                        <h2>donations</h2><h1>14</h1>
                    </div>
                </div>
               
                
                </div>

                <div className="donate"><img src={donate} alt="donate"/></div>
                </div>
                <div className="two">
                
                <div className="clock"><AnalogClock {...options} /></div>
                <div className = "calendar"><Calendar/></div>
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
