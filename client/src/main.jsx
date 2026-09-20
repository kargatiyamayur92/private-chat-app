
import { createRoot } from 'react-dom/client'
import './index.css'

import { ToastContainer } from 'react-toastify'
import App from './App'


createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer autoClose='600'/>
    <App/>

  </>

)
