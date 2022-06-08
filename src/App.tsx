import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./Form";

const triangle = (x: number, y: number, length: number) => {
  return `M ${x} ${y} h ${length} l ${- length / 2} ${-length * Math.sqrt(3) / 2 } z`
}

function App() {
  const [isDark, setDark] = useState(false)
  return (
    <div className={isDark ? "App dark" : "App"}>
      <header className="App-header" role="banner">
        <div className="App-headerTitle">
          <h1 id="titleApp">Calendar collector</h1>
        </div>
        <div className="App-headerOption" role="button" tabIndex={0} onMouseDown={() => setDark(prevState => !prevState)} >
          <svg xmlns="http://www.w3.org/2000/svg" className="Card-button" width="1.5em" viewBox="0 0 100 100">
            {
              isDark ?
                  <g id="light">
                    <circle className={"App-circleLight"} cx={50} cy={50} r={30} mask="url(#hole)"/>
                    {
                      [...Array(6).keys()].map(k =>
                          <path className={"App-triangle"} d={triangle(40, 15, 20)}
                                transform={`rotate(${60 * k}, 50, 50)`}
                          />)
                    }

                  </g> :
                  <g id={"dark"}>
                    <defs>
                      <mask id="hole">
                        <rect width="100%" height="100%" fill="white"/>
                        <circle cx={35} cy={50} r={40} fill="black"/>
                      </mask>
                    </defs>
                    <circle className={"App-circleDark"} cx={50} cy={50} r={50} mask="url(#hole)"/>
                  </g>

            }
          </svg>
        </div>
      </header>
      <div className="App-main">
          <Form/>
      </div>
    </div>
  );
}

export default App;
