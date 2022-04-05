import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Collapsible from 'react-collapsible';
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

//fetch data

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

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({

});

class Dashboard extends Component {
    constructor(props) {
		super(props);
		this.state = {
            total: 'block',
            ytd: 'none',
            month: 'none'
		};
	  }
        changeTotal= () => {
		    this.setState({total: "block"})
			this.setState({ ytd: "none" })
			this.setState({ month: "none" })
	    }
        changeYtd= () => {
		    this.setState({ytd: "block"})
			this.setState({ total: "none" })
			this.setState({ month: "none" })
	    }
        changeMonth= () => {
		    this.setState({month: "block"})
			this.setState({ ytd: "none" })
			this.setState({ total: "none" })
	    }

      signOut(e) {
        fetch('/loginSignUp/signout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            window.location.href = "http://localhost:8080/logIn"
        })
        .catch(err => console.log('handleLogin: ERROR: ',err))
    }

    render(){
        return(
            <div className="dashboardBackground">
                <div className="collapsibleContainer">
                <div className="one">
       
                <div className="chart">
                    <div className="chartNav"><button className="buttonNav"  onClick={this.changeTotal}>total</button><button className="buttonNav" onClick={this.changeYtd}>ytd</button><button className="buttonNav" onClick={this.changeMonth}>month</button><button className="signout" onClick={(e) => this.signOut(e)}>signout</button></div>
                    
                    <div className="total" style={{display: this.state.total}}>
                    <Chart
                        chartType="PieChart"
                        data={dataPie}
                        options={optionsPie}
                        width={"100%"}
                        height={"400px"}
                    />
                    </div>
                    <div className="ytd" style={{display: this.state.ytd}}>
                    <Chart
                        chartType="AreaChart"
                        width="100%"
                        height="400px"
                        data={dataChart}
                        options={optionsChart}
                    />
                    </div>
                    <div className="month" style={{display: this.state.month}}>
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
}

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Dashboard;
