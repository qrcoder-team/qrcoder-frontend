import React from 'react'
import './App.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Header from './components/header'
import Body from './components/body'
import { Provider } from 'react-redux'
import { store } from './store'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Router } from "react-router";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

const darkTheme = createTheme({
  palette: {
    // mode: 'dark',
  },
})

function App() {
  return (
    <Provider store={store}>
      <Router history={customHistory}>
        <ThemeProvider theme={darkTheme}>
          <React.Fragment>
            <CssBaseline />
            <Header />
            <Body />
          </React.Fragment>
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

export default App
