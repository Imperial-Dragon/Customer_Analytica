import React, { Component } from 'react'
import { Paper, Typography, Divider, List,ListItem, ListItemText,Avatar } from '@material-ui/core';

class CustomerProfile extends Component {

    state={
        demographic:[
            {
                id:'1',
                title:"Age : ",
                value:"39"
            },
            {
                id:'2',
                title:"Gender : ",
                value:"Male"
            },
            {
                id:'3',
                title:"Married : ",
                value:"Yes"
            },
            {
                id:'4',
                title:"Income : ",
                value:"35 LPA"
            },
            {
                id:'5',
                title:"Dependents : ",
                value:"4"
            },
            {
                id:'6',
                title:"Occupation : ",
                value:"Salaried"
            },
        ],
        geographic:[
            {
                id:"1",
                title:"Address : ",
                value:"Flat No.32,Hide Park Society,Gangadham,Pune-411003"
            },
            {
                id:"2",
                title:"Work Location : ",
                value:"Infotech Systems Hinjewadi Sector-4"
            },
            {
                id:"3",
                title:"Frequent Visited Places : ",
                value:"Movie Theaters,Luxury Restaurants."
            },
        ],
        financial:[
            {
                id:"1",
                title:'Credit Worthy',
                value:"Satisfactory Cibil Score Regular Repayment of Loan Verified From Bank Statements"
            },
            {
                id:"2",
                title:'Liabilities',
                value:"Home Loan Rs. 40.00 Lacs Car Loan Rs. 3.00 Lacs"
            },
            {
                id:"3",
                title:'Risk Level',
                value:"Moderate"
            },
            {
                id:"4",
                title:'Threshold',
                value:"Cibil Score 800"
            },
            {
                id:"5",
                title:'Deposits',
                value:"Rs. 5.00 Lacs"
            },
            {
                id:"6",
                title:'Asset',
                value:"Rs. 50 Lacs Flat For Which Home Loan is Availed"
            },
        ],
        psychographic:[
            {
                id:"1",
                title:"Lifestyle & Social Class",
                value:'Frequent online shopping. High Expenses on clothing.'
            },
            {
                id:"2",
                title:"Interests",
                value:'Follows fashion pages. Loves to watch movies.'
            },
            {
                id:"3",
                title:"Activities",
                value:'Gym Membership'
            },
            {
                id:"4",
                title:"Values",
                value:'Health Concious.'
            },
            {
                id:"5",
                title:"Concerns",
                value:'Online Banking Frauds. Cyber Security.'
            },
            {
                id:"6",
                title:"Attributes",
                value:'High Purchasing Power.'
            },
        ],
        behavioural:[
            {
                id:'1',
                title:'Bank Relationship',
                value:'Saving Account,Home Loan,Fixed Deposit,Vehicle Loan'
            },
            {
                id:'2',
                title:'Buying Preference',
                value:'Branded Items , Quality Concios'
            },
            {
                id:'3',
                title:'Repayment Pattern',
                value:'Regular Payment on due dates'
            },
            {
                id:'4',
                title:'Transaction History',
                value:'No. of Credits : 5LPM , No. of Debits : 4.50LPM'
            },
        ],
        demo:[],
        currentCustomer:{},
    }

    componentDidMount(){
        // let temp = [];
        // temp.push(demographic[0]);
        // this.setState({
        //     demo:temp,
        // });

        // this.setState({
        //     currentCustomer:demographic[0]
        // })
    }

    render() {
        console.log(this.props.currentCustomer)
        return (
            <div style={{display:"flex",width:"100%",padding:"10px"}}>
                <div style={{display:"flex",width:"30%",flexDirection:"column",marginRight:"10px"}}>
                 <Paper style={{backgroundColor:'#E3F2FD',display:"flex",justifyContent:"center",flexDirection:"column",alignItems:'center',padding:'20px'}}>
                    <Avatar style={{margin: 10,width: 80,height: 80,}}  src="https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png"></Avatar>
                    <Typography style={{marginLeft:'10px'}}  variant="h6" noWrap>
                        {this.props.currentCustomer.name}
                    </Typography>
                 </Paper>

                    <Paper style={{backgroundColor:'#E3F2FD',display:"flex",justifyContent:"center",flexDirection:"column",marginTop:"20px"}}>
                        <Typography style={{display:"flex",justifyContent:"center",alignContent:"center",marginTop:"5px"}}>Demographic Information</Typography>
                        <Divider style={{marginTop:"5px",marginBottom:"10px"}}/>
                        <List>
                            {

                                this.props.currentCustomer.demographic !== undefined &&
                                    Object.keys(this.props.currentCustomer.demographic).map((value,index)=>(
                                        <ListItem key={index.toString()} style={{height:"30px",display:"flex",justifyContent:"space-between"}}>
                                            <ListItemText><span style={{fontWeight:"bold",textTransform:'capitalize'}}>{value}&nbsp;</span>:<span>&nbsp;{this.props.currentCustomer.demographic[value]}</span></ListItemText>
                                        </ListItem>
                                    ))
                            }
                        </List>
                    </Paper>
                    <Paper style={{backgroundColor:'#E3F2FD',display:"flex",justifyContent:"center",flexDirection:"column",marginTop:"20px"}}>
                        <Typography style={{display:"flex",justifyContent:"center",alignContent:"center",marginTop:"5px"}}>Geographic Information</Typography>
                        <Divider style={{marginTop:"5px",marginBottom:"10px"}}/>
                        {
                            this.props.currentCustomer.geographic !== undefined &&
                            Object.keys(this.props.currentCustomer.geographic).map((val,i)=>(
                                <List key={i.toString()} style={{display:"flex",justifyContent:"center",alignContent:'center'}}>
                                    <ListItem style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                                        <ListItemText style={{textAlign:"center"}}>
                                            <span style={{fontWeight:"bold",textTransform:'capitalize'}}>{val.split('_')[0]+"  "+val.split('_')[1]}</span>
                                        </ListItemText>
                                        <span style={{textAlign:"center"}}>
                                            {this.props.currentCustomer.geographic[val]}
                                        </span>
                                    </ListItem>
                                </List>
                                ))
                        }
                    </Paper>
                </div>
                <div style={{display:"flex",width:"67%",flexDirection:"column"}}>
                    <Paper style={{display:"flex",justifyContent:"center",backgroundColor:'#E3F2FD',flexDirection:"column"}}>
                        <Typography style={{textAlign:"center",marginTop:"5px"}}>Financial Information</Typography>
                        <Divider style={{marginTop:"5px",marginBottom:"10px"}}/>

                        {
                            this.props.currentCustomer.financial !== undefined &&
                            Object.keys(this.props.currentCustomer.financial).map((val,i)=>(
                                    
                                <div style={{display:"flex",flexDirection:"column",alignContent:"center"}}> 
                                <div key={i.toString()} style={{height:"100%",display:"flex",marginBottom:'5px'}}>
                                    <ListItemText style={{width:'30%',height:'100%',textAlign:'center',display:"flex",justifyContent:'center'}}>
                                    <span style={{fontWeight:'bold',textTransform:'capitalize'}}>{val === 'credit_worthy' || val=== 'risk_level' || val === 'loan_amount' ?val.split('_')[0]+"  "+val.split('_')[1]:val}</span>
                                    </ListItemText>
                                    <span style={{height:'100%',flexGrow:1,textAlign:'center',width:"70%",display:"flex",justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                                        {this.props.currentCustomer.financial[val]}
                                    </span>
                                </div>
                                <div><Divider style={{width:"600px",marginLeft:"auto",marginRight:"auto",backgroundColor:"#fff"}}/></div>
                                </div>
                                ))
                        }
                    </Paper>
                    <Paper style={{display:"flex",justifyContent:"center",backgroundColor:'#E3F2FD',flexDirection:"column",marginTop:'20px'}}>
                        <Typography style={{textAlign:"center",marginTop:"5px"}}>Psychographic Information</Typography>
                        <Divider style={{marginTop:"5px",marginBottom:"10px"}}/>

                        {
                            this.props.currentCustomer.psychographic !== undefined &&
                                Object.keys(this.props.currentCustomer.psychographic).map((val,i)=>(
                                    
                                <div style={{display:"flex",flexDirection:"column",alignContent:"center"}}> 
                                <div key={i.toString()} style={{height:"100%",display:"flex",marginBottom:'5px'}}>
                                    <ListItemText style={{width:'30%',height:'100%',textAlign:'center',display:"flex",justifyContent:'center'}}>
                                    <span style={{fontWeight:'bold',textTransform:'capitalize'}}>{val}</span>
                                    </ListItemText>
                                    <span style={{height:'100%',flexGrow:1,textAlign:'center',width:"70%",display:"flex",justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                                        {this.props.currentCustomer.psychographic[val]}
                                    </span>
                                </div>
                                <div><Divider style={{width:"600px",marginLeft:"auto",marginRight:"auto",backgroundColor:"#fff"}}/></div>
                                </div>
                                ))
                        }
                    </Paper>
                    <Paper style={{display:"flex",justifyContent:"center",backgroundColor:'#E3F2FD',flexDirection:"column",marginTop:'20px'}}>
                        <Typography style={{textAlign:"center",marginTop:"5px"}}>Behavioural Information</Typography>
                        <Divider style={{marginTop:"5px",marginBottom:"10px"}}/>

                        {
                            this.props.currentCustomer.behavioural !== undefined &&
                            Object.keys(this.props.currentCustomer.behavioural).map((val,i)=>(
                                    
                                <div style={{display:"flex",flexDirection:"column",alignContent:"center"}}>
                                <div key={i.toString()} style={{height:"100%",display:"flex",marginBottom:'5px'}}>
                                    <ListItemText style={{width:'30%',height:'100%',textAlign:'center',display:"flex",justifyContent:'center'}}>
                                    <span style={{fontWeight:'bold',textTransform:'capitalize'}}>{val.split('_')[0]+"  "+val.split('_')[1]}</span>
                                    </ListItemText>
                                    <span style={{height:'100%',flexGrow:1,textAlign:'center',width:"70%",display:"flex",justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                                        {this.props.currentCustomer.behavioural[val]}
                                    </span>
                                </div>
                                <div><Divider style={{width:"600px",marginLeft:"auto",marginRight:"auto",backgroundColor:"#fff"}}/></div>
                                </div>
                                ))
                        }
                    </Paper>
                </div>

            </div>
        )
    }
}

export default CustomerProfile;
