import React, {Component} from 'react'
import './CalculateBtn.css'

class CalculateBtn extends Component{
    render(){
        return(
            <div className={`calc-btn ${this.props.children === "RESET" ? "reset-btn" : ""}`}
            onClick={()=>this.props.handleClick(this.props.children)}>
                {this.props.children}
            </div>
        )
    }
}

export default CalculateBtn
