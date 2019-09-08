import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from "@material-ui/core/Collapse";

class CollapseCheckbox extends Component {

    state={
        open:false,
        checked:[],
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
                <ListItem key={value.name} style={{padding:"10px 0"}}>
                    <ListItemText primary={value.name}/>
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={()=>this.handleToggle(value.name)}
                            checked={this.state.checked.indexOf(value.name) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        :
        null
    )

    handleToggle=(value)=>{
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex == -1){
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex,1);
        }
        
        this.setState({checked:newChecked},()=>{
            this.props.handleFilters(newChecked);
        });

    }

    render() {
        return (
            <div className="collapse_items_wrapper">
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
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}

export default CollapseCheckbox;
