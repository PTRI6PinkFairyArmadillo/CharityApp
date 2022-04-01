import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    
    render(){
        return(
            <div>
                <h1>Dashboard component</h1>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);