import React, {useState} from "react";
import Calendar from 'react-calendar';
import "./Form.css"

type Topic = {
    name: string;
    description: string;
}

const day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function computeStyle(index: number, from: number | null, to: number | null, hover: number) {
    if (from) {
        if (index === from) return "Form-hour selected";
        else {
            if (index > from && index <= hover) {
                if (to) return "Form-hour selected"
                else return "Form-hour to-hover"
            } else return "Form-hour"
        }
    } else if (index === hover) return "Form-hour to-hover"
    else return "Form-hour"
}

const options = ["Work", "Housework"]

function Former() {
    const [prodV, setProd] = useState(0)
    return <form className={"wrapperForm"}>
        <h3>
            New activity
        </h3>
        <select>
            <option value="">--Select activity--</option>
            {options.map(value => <option value={value}>{value}</option>)}
        </select>
        <div className="Former-productivity">
            {[...Array(3).keys()].map((value, index) => <label className="Form-checkBranchContainer">
                <input name="score"
                       className="Form-checkBranchInput"
                       type="checkbox"
                       checked={(prodV >= 1)}
                       onChange={e => setProd(1)}
                />
                <span className="Form-checkBranchMark"></span>
            </label>)}
        </div>

    </form>
}

function Form() {
    const [isDay, setDay] = useState(false);
    const [click, setClick] = useState(-1);
    const [from, setFrom] = useState<number | null>(null)
    const [to, setTo] = useState<number | null>(null)
    const [hover, setHover] = useState(-1);


    return <div className="Form-container">
        <h3>New activity</h3>
        <form>
            <input id="inputDay" type="checkbox" checked={isDay} onInput={() => setDay(prevState => !prevState)}/>
            <label htmlFor={"inputDay"}>isDay</label>
        </form>
        {isDay ?
        <div className="Form-cal day">

                <ul className={"Form-hours"}>
                    <li className={"Form-hour"}>{"Day"}</li>
                    {[...Array(24).keys()].map((value, index) =>
                        <li key={index} className={computeStyle(index, from, to, hover)} role={"button"}
                            onMouseDown={() => {
                                if (from) setTo(index)
                                else setFrom(index)
                            }}
                            onMouseEnter={() => {
                                if (!to) setHover(index)
                            }}
                        >{value}</li>)}
                </ul>

        </div> :
            <div className="Form-cal">
                {day_names.map(value => <ul className={"Form-hours"}>
                    <li className={"Form-hour"}>{value}</li>
                    {[...Array(24).keys()].map((value, index) => <li className={"Form-hour"}>{value}</li>)}
                </ul>
                )}
            </div>
        }
        {
            to && <Former/>
        }


    </div>
}

export default Form
