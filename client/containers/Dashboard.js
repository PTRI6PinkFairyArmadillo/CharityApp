import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Popup from "reactjs-popup";
import Menu from "./hamburger/Menu";
import BurgerIcon from "./hamburger/BurgerIcon";
import './hamburger/index.css'

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

class Dashboard extends Component {

    render(){
        return(
            <div>
                <h1>Bank Account List</h1>
                <h1>Hamburger Menu</h1>
                <div>
                <Router>
                    <div>
                        <Popup
                        modal
                        overlayStyle={{ background: "rgba(255,255,255,0.98" }}
                        contentStyle={contentStyle}
                        closeOnDocumentClick={false}
                        trigger={open => <BurgerIcon open={open} />}
                        >
                        {close => <Menu close={close} />}
                        </Popup>

                        <hr />
                        {/* <Route exact path="/" component={Home} /> */}
                        <Routes>
                        <Route path="/addBank" component={AddBank} />
                        <Route path="/contributions" component={Contributions} />
                        </Routes>
                    </div>
                    </Router>
                </div>
            </div>
        )
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Dashboard;