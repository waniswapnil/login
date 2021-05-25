import React from 'react'
import zxcvbn from 'zxcvbn';

export default function PasswordStrengthMeter({password}) {
    const testResult = zxcvbn(password);
    const num = testResult.score * 100 /4;
    console.log(testResult);
    console.log(num);
    const createPassLabel = ()=>{
        switch (testResult.score) {
            case 0:
                return "Very Weak"
            case 1:
                return "Weak"
            case 2:
                return "Fear"
            case 3:
                return "Good"
            case 4:
                return "Strong"
            default:
                return 'none';
        };
    }
    const funcStatusBarColor = () =>{
        switch (testResult.score) {
            case 0:
                return "#828282"
            case 1:
                return "#EA111111"
            case 2:
                return "#FFAD00"
            case 3:
                return "#9bc158"
            case 4:
                return "#00b500"
            default:
                return 'none';
        };
    }

    const changePasswordColor   = () => ({
        width: `${num}%`,
        background: funcStatusBarColor(),
        height: '7px'
    })
    return (
       <>
        <div className="progress" style={{height: '7px', width: '100%' }} >
            <div className="progress-bar" style={changePasswordColor()} ></div>
        </div>
        <div>
            <p>{createPassLabel()}</p>
        </div>
       </>
    )
}
