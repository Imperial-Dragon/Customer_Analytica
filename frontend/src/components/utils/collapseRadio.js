import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import Collapse from "@material-ui/core/Collapse";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLable from "@material-ui/core/FormControlLabel";




class CollapseRadio extends Component {

    state={
        open:false,
        value:"Any",
    }

    componentDidMount(){
        if(this.props.initState){
            this.setState({
                open:this.props.initState
            })
        }
    }

    handleAngle=()=>(
        this.state.open?
        <FontAwesomeIcon icon={faAngleUp} className="icon"/>
        :
        <FontAwesomeIcon icon={faAngleDown} className="icon"/>
    )

    renderList=()=>(
        this.props.list.length > 0?
            this.props.list.map((value)=>(
                <FormControlLable
                    key={value.name}
                    value={value.name}
                    control={<Radio/>}
                    label={value.name}
                />
            ))
        :
        null
    )


    handleChange=(e)=>{
        let valueArray = this.props.list.filter((val)=>val.name === e.target.value)[0];
        console.log(valueArray)
        this.props.handleFilters(valueArray.array);
        this.setState({value:e.target.value});
    }

    render() {
        return (
            <div>
                <List style={{borderBottom:"1px solid #dbdbdb",padding:"1px",cursor:"pointer"}}>
                    <ListItem
                     onClick={()=>this.setState({open:!this.state.open})}
                     style={{padding:"10px 23px 10px 0"}}
                    >
                        <ListItemText primary={this.props.title} className="collapse_title"/>
                        {this.handleAngle()}
                    </ListItem>

                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <RadioGroup
                                aria-label="prices"
                                name="prices"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                {this.renderList()}
                            </RadioGroup>
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}


export default CollapseRadio;