import React, { Component } from 'react'
import InputBase from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, Divider,CircularProgress } from '@material-ui/core';
import SnackBar from './SnackBar';


import { connect } from 'react-redux';
import { goToHome, saveFilteredData, getCustomerByID, makeCurrentClientNull } from '../../../actions/customer_action';

class Input extends Component {

    state={
        customers:[],
        currentCustomer:"",
        filteredCustomers:[],
        search:"",
        searchLoading:false,
        error:'',
    }

    handleChange=(e)=>{
        this.props.dispatch(goToHome(""));
        this.setState({search:e.target.value,});
    }

    onClickSearchButton=()=>{
      console.log(this.state.search.length)
      if(this.state.search.length !== 0){
      this.setState({searchLoading:true})
      this.props.dispatch(getCustomerByID(this.state.search)).then((result)=>{
        console.log(result)
        setTimeout(() => this.setState({ searchLoading: false}), 1000);
      }).catch((err)=>{
        this.props.dispatch(makeCurrentClientNull());
        this.setState({error:"customer not found!!!",searchLoading: false })
      })
    }else{
      this.setState({error:"Enter Valid Acoount id!!!",searchLoading: false })

    }
    }

    handleSearchMessages = () => {
      //   console.log(this.props.customers.customersData)
      //   if(this.state.search.length === 17){
      //   const tempCustomers = [...this.props.customers.customersData];
      //   const regex = new RegExp(this.state.search, "gi");
      //   const searchResults = tempCustomers.reduce((acc, message) => {
      //     if (
      //       (message.accountID && message.accountID.match(regex))
      //     ) {
      //       acc.push(message);
      //     }
      //     return acc;
      //   }, []);
      //   this.setState({ filteredCustomers:searchResults });
      //   this.props.dispatch(saveFilteredData(searchResults)).then(()=>{
          
      //   })
      // }else{
      //   this.setState({filteredCustomers:[]});
      // }
        
      };

    render() {
        const {classes} = this.props;
        console.log(this.state.filteredCustomers);
        return (
            <div style={{display:"flex",justifyContent:'center',alignItems:"center"}}>

          {this.state.error && <SnackBar open={true} error={this.state.error}/>}
          <div style={{display:"none"}}> {this.state.error && setTimeout(()=> this.setState({error:''}),6000)}</div>

               {this.state.searchLoading ? <CircularProgress size={20} style={{color:"#1da"}}/>:null}
            <div className={classes.search}>
            <InputBase
              placeholder="Enter Complete Account Id..."
              value={this.state.serach}
              onChange={this.handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> 
          <div className={classes.searchIcon}>
            <IconButton onClick={this.onClickSearchButton} style={{color:'#fff'}}><SearchIcon /></IconButton>
            </div>
          </div>

        )
    }
}

const mapStateToProps = (state) => {
  return {
      customers: state.customers
  }
}

export default connect(mapStateToProps)(Input);
