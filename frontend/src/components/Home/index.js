import React, { Component } from 'react';
import CollapseCheckbox from '../utils/collapseCheckbox';
import CollapseRadio from '../utils/collapseRadio';
import CustomerProfile from '../CustomerProfile';
import CustomersList from '../CustomersList';
import { HomeOutlined } from '@material-ui/icons';


import { connect } from 'react-redux';
import { getAllCustomersData,getCustomers, makeCurrentClientNull } from '../../actions/customer_action';
import { CircularProgress, Button,IconButton,Icon } from '@material-ui/core';

class Home extends Component {

    state={
        filterLoader:false,
        customerLoader:false,
        currentCustomer:"",
        loadMoreLoader:false,
        limit:17,
        skip:0,
        filters:{
            risk_level:[],
            probableBusiness:[],
            income:[],
            loan_amount:[],
        }
    }

    handleFilters=(filters,type)=>{
        console.log(filters);

        this.props.dispatch(makeCurrentClientNull());
        const newFilters = {...this.state.filters};

        newFilters[type] = filters;

        this.showFilteredResult(newFilters);
        this.setState({
            filters:newFilters,
            filterLoader:true
        })

    }

    loadMoreCustomers = () => {
        let skip = this.state.skip + this.state.limit;
        this.setState({loadMoreLoader:true});
        this.props.dispatch(getCustomers(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.customers['toCustomer']
        )).then(()=>{
            this.setState({
                skip,
                loadMoreLoader:false,
            })
        })
    }

    showFilteredResult=(filters)=>{
        this.props.dispatch(getCustomers(
            0,
            this.state.limit,
            filters,
        )).then(()=>{
            this.setState({
                skip:0,
                filterLoader:false
            })
        })
    }

    getCustomerInfo=(customerLoader,currentCustomer)=>{
        this.setState({
            customerLoader,
            currentCustomer
        });
    }

    componentDidMount(){
        this.props.dispatch(getCustomers(0,17,{}));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.customers['currentCustomer']){
            this.setState({currentCustomer:nextProps.customers['currentCustomer']})
        }
        else if(nextProps.customers['currentCustomer'] === ""){
            this.setState({currentCustomer:""})
        }
    }

    goToHome=()=>{
        this.props.dispatch(makeCurrentClientNull());
        this.setState({currentCustomer:""});
    }

    render() {
        console.log(this.state.currentCustomer)
        console.log(this.props)
        return (
            <div style={{backgroundColor:"",height:"100vh",display:"flex"}}>
                <div style={{display:"flex",flexDirection:"column",flexGrow:1,backgroundColor:"",width:"22%",overflowY:"Scroll",padding:"10px"}}>
                    <CollapseCheckbox
                        initState={true}
                        title="Customer Risk"
                        list={[{"name":"Low"},{"name":"Moderate"},{"name":"High"}]}
                        handleFilters={(filters)=>this.handleFilters(filters,"risk_level")}
                    />

                    <CollapseCheckbox
                        initState={false}
                        title="Probable Business"
                        list={[{name:"Apply"}]}
                        handleFilters={(filters)=>this.handleFilters(filters,"credit_worthy")}
                    />

                    <CollapseRadio
                        initState={false}
                        title="Income"
                        list={[{"name":"Any","array":[]},{"name":"Below 5 LPA","array":[0,500000]},{"name":"5 LPA to 10 LPA","array":[500000,1000000]},{"name":"Above 10 LPA","array":[1000000,20000000]}]}
                        handleFilters={(filters)=>this.handleFilters(filters,"income")}
                    />
                    <CollapseRadio
                        initState={true}
                        title="Loan Availed"
                        list={[{"name":"Any","array":[]},{"name":"Less than 5 Lakhs","array":[0,500000]},{"name":"5 to 10 Lakhs","array":[500000,1000000]},{"name":"Above 10 Lakhs","array":[1000000,20000000]}]}            
                        handleFilters={(filters)=>this.handleFilters(filters,"loan_amount")}
                    />
                </div>
                <div style={{width:"78%",overflowY:'scroll'}}>
                    <IconButton style={{backgroundColor:"#eeeeee",marginLeft:'10px',marginBottom:'5px'}} onClick={this.goToHome}><HomeOutlined/></IconButton>
                    {
                        this.props.customers['toCustomer'] === undefined || this.state.customerLoader || this.state.filterLoader ?
                        <div style={{height:'100%',display:'flex',justifyContent:'center',alignContent:'center',alignItems:"center"}}>
                            <CircularProgress/>
                        </div>
                        :(
                        this.state.currentCustomer?
                        <CustomerProfile currentCustomer={this.state.currentCustomer}/>
                        :
                        <div style={{display:'flex',flexDirection:'column',alignContent:'center',alignItems:'center'}}>
                            <CustomersList getCustomerInfo={this.getCustomerInfo} customersData = {this.props.customers['toCustomer']}/>
                            {
                                this.state.loadMoreLoader?
                                    <CircularProgress/>
                                :
                                <Button 
                                    onClick={this.loadMoreCustomers}
                                    style={{width:'20%',marginTop:"8px"}}
                                    variant="contained" color="primary"
                                    disabled={this.props.customers.toCustomerSize === 0}
                                >
                                   Load More
                               </Button>

                            }
                        </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers
    }
}

export default connect(mapStateToProps)(Home);