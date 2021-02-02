import React, {Component} from 'react'
import './GenderBtn.css'

class GenderBtn extends Component{
    checkGender=value =>{
        return value === "FEMALE";
    }
    render(){
        return(
            <div className={`btn-male ${this.checkGender(this.props.children) ? "btn-female" : ""}`}
            onClick={()=>this.props.handleClick(this.props.children)}>
                {this.props.children}
            </div>
        )
    }
}

export default GenderBtn