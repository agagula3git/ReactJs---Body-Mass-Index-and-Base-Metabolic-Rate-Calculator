import React, {Component} from 'react'
import GenderBtn from './components/GenderBtn'
import WeightBtn from './components/WeightBtn'
import CalculateBtn from './components/CalculateBtn'
import './BodyMassIndexApp.css'
import nutrition from './nutrition.jpg'

class BodyMassIndexApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            gender: "",
            weight: 78,
            height: 193,
            age: 22,
            calculate: false,
            isBmi: false,
            isBmr: false
        }
    }

    setMale = () => {
        this.setState({gender: "MALE"});
    }

    setFemale = () =>{
        this.setState({gender: "FEMALE"});
    }

    handleChange = (e) =>{
        const {name, value, checked, type} = e.target;
        type === "checkbox" ? this.setState({[name]: checked}) : this.setState({height: value});
        if(this.state.isBmi){
            if(name==="isBmr" && checked){
                this.setState({isBmi: false});
            }
        }else if(this.state.isBmr){
            if(name==="isBmi" && checked){
                this.setState({isBmr: false});
            }
        }
    } 

    reduceWeight = () =>{
        if(this.state.weight > 0){
            this.setState({weight: this.state.weight - 1});
        }
    }

    enlargeWeight = () => this.setState({weight: this.state.weight + 1})
    
    reduceAge = () =>{
        if(this.state.age > 0){
            this.setState({age: this.state.age - 1});
        }
    }

    enlargeAge = () => this.setState({age: this.state.age + 1})

    adjustCalculate = ()=>{
        if((!this.state.isBmr && !this.state.isBmi) || (this.state.isBmr && this.state.gender==="")){
            alert("Re-enter the data, be sure to enter all the required data!")
        }else{
            this.setState({calculate: !this.state.calculate})
        }
    } 
    startOver = () => this.setState({calculate: !this.state.calculate, isBmi: false, isBmr: false, gender: ""});


    render(){
        const styleSpan={
            fontSize: "14pt",
            fontWeight: "lighter"
        };
        
        let heightCol =  this.state.height*100/210;
        let btnValue = this.state.calculate ? "RESET" : "CALCULATE";
        let result = ((this.state.weight*10000)/(this.state.height*this.state.height)).toFixed(2);

        function bmiCalculate(value){
            let bmiRange;
            if(value >= 18.5 && value <= 25){
                bmiRange="Normal weight";
            }else if(value < 18.5){
                bmiRange="Underweight";
            }else if(value >= 25 && value <=30){
                bmiRange="Overweight";
            }else{
                bmiRange="Obese";
            }
            return bmiRange;
        }

        function bmrCalculate(gender, height, weight, age){
            let bmrResult;
            if(gender === "MALE"){
                bmrResult= 66 + 13.7*weight + 5*height - 6.8*age; 
            }else if(gender === "FEMALE"){
                bmrResult= 655 + 9.6*weight + 1.8*height - 4.7*age;
            }
            return bmrResult;
        }

        return(
            <div className="bmiApp">
                <header className="header">
                    BASE METABOLIC RATE (BMR) & BODY MASS INDEX (BMI) Calculator
                </header>
                <div className="bmi-wrap"
                    style={{display: `${this.state.calculate ? "none":""}`}}
                >
                    <div className="btn-gender">
                        <GenderBtn handleClick={this.setMale}>MALE</GenderBtn>
                        <GenderBtn handleClick={this.setFemale}>FEMALE</GenderBtn>
                    </div>
                    <div className="height-range">
                        <div className="height-str">
                             HEIGHT  
                        </div>
                        <div className="height-value">
                            {this.state.height}<span style={styleSpan}>CM</span>
                        </div>
                        <input 
                            type="range" 
                            min={0} 
                            max={210} 
                            value={this.state.height} 
                            style={{background: `linear-gradient(90deg, rgba(128, 0, 128, 0.767) ${heightCol}%, rgb(214,214,214) ${heightCol}% )`}} 
                            className="slider" 
                            onChange={this.handleChange} 
                        /> 
                    </div>
                    <div className="weight-r">
                        <div className="weight-range">
                            <div className="weight-str">
                                WEIGHT
                            </div>
                            <div className="weight-value">
                                {this.state.weight}<span style={styleSpan}>Kg</span>
                            </div>
                            <div class="weight-btns">
                                <WeightBtn handleClick={this.reduceWeight}>-</WeightBtn>
                                <WeightBtn handleClick={this.enlargeWeight}>+</WeightBtn>
                            </div>
                        </div>
                        <div className="weight-range">
                            <div className="age-str">
                                AGE
                            </div>
                            <div className="age-value">
                                {this.state.age}<span style={styleSpan}>years</span>
                            </div>
                            <div class="age-btns">
                                <WeightBtn handleClick={this.reduceAge}>-</WeightBtn>
                                <WeightBtn handleClick={this.enlargeAge}>+</WeightBtn>
                            </div>
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="bmi-box">
                            <input 
                                type="checkbox" 
                                name="isBmi"
                                checked={this.state.isBmi} 
                                onChange={this.handleChange}>
                            </input>
                            <label for="isBmi">BMI</label>
                        </div>
                        <div className="bmr-box">
                            <input 
                                type="checkbox" 
                                name="isBmr"
                                checked={this.state.isBmr} 
                                onChange={this.handleChange}>
                            </input>
                            <label for="isBmr">BMR</label>
                        </div>   
                    </div>
                    <CalculateBtn 
                        handleClick={this.adjustCalculate} 
                        value={`${this.state.calculate ? "RESET" : "CALCULATE"}`}
                    >
                        {btnValue}
                    </CalculateBtn> 
                </div>
                <div className="result-wrap" style={{display: `${!this.state.calculate ? "none":""}`}}>
                    <div 
                        className="bmi-result"
                        style={{display: `${!this.state.isBmi ? "none" : ""}`}}
                    >
                        <p>For the information you entered: <br/>
                            Height: {this.state.height} centimeters<br/>
                            Weight: {this.state.weight} kilograms<br/>
                             Your BMI is {result}, indicating your weight is in the {bmiCalculate(result)} category for adults of your height.
                        </p>
                    </div>
                    <div
                        className="bmr-result"
                        style={{display: `${!this.state.isBmr ? "none" : ""}`}}
                    >
                        <p>For the information you entered: <br/>
                            Gender: {this.state.gender.toUpperCase()}<br/>
                            Height: {this.state.height}<br/>
                            Weight: {this.state.weight}<br/>
                            Age: {this.state.age}<br/>
                            Your BMR is {bmrCalculate(this.state.gender, this.state.height, this.state.weight, this.state.age)}calories/day<br/>
                            Basal metabolic rate is the number of calories your body needs to accomplish 
                            its most basic (basal) life-sustaining functions.<br/>
                        </p>
                    </div>
                    <button className="back-btn" onClick={this.startOver} >
                        Back
                    </button>
                </div>
            </div>
        )
    }
}

export default BodyMassIndexApp