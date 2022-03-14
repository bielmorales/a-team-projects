import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Projects from './containers/Projects'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <Projects />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your Projects, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
