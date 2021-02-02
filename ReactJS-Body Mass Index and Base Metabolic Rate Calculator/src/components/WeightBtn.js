import React, {Component} from 'react'
import './WeightBtn.css'

class WeightBtn extends Component{
    render(){
        return(
            <div className="btn-weight" onClick={()=>this.props.handleClick(this.props.children)}>
                {this.props.children}
            </div>
        )
    }
}

export default WeightBtn
