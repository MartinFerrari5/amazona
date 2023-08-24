import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './Components/App'
import { CommerceContextProvider } from './Context/context'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Assets/index.css"
import {HelmetProvider} from "react-helmet-async"
import {PayPalScriptProvider} from "@paypal/react-paypal-js"

const root= ReactDOM.createRoot(
document.querySelector('#root')
)
root.render(<StrictMode>
    <HelmetProvider>
    <CommerceContextProvider>
        {/* deferLoading=true no carga paypal at the begining of the application */}
        <PayPalScriptProvider deferLoading={true}>
        <App />
        </PayPalScriptProvider>
    </CommerceContextProvider>
    </HelmetProvider>
</StrictMode>)