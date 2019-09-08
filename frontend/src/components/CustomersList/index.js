import React, { Component } from 'react'
import { Paper } from '@material-ui/core';

import { connect } from 'react-redux';
import { getCustomerByID } from '../../actions/customer_action';

class CustomerList extends Component {

    showCustomerData=(accountID)=>{
        this.props.getCustomerInfo(true,"");
        this.props.dispatch(getCustomerByID(accountID)).then((result)=>{
            this.props.getCustomerInfo(false,result.payload);
        })
    }

    render() {
        return (
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
                {
                    this.props.customersData.map(val=>(
                        <Paper
                         className={"account_tile"}
                         style={{padding:"20px",width:'20%',margin:'10px',display:'flex',justifyContent:'center',backgroundColor:'#E3F2FD'}}
                         key={val.accountID}
                         onClick={()=>this.showCustomerData(val.accountID)}
                         >
                            {val.accountID}
                        </Paper>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers
    }
}

export default connect(mapStateToProps)(CustomerList);
