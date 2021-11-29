import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Root } from "./styles";
import { Header, Footer, Main } from './components'
import { GlobalProvider, GlobalContext } from './components/GlobalContext';
import Alert from './components/Alert/Alert'
import './App.css'
import Loading from './components/Loading/Loading';

function App() {
  return (
    <GlobalProvider>
      <Ecommerce />
    </GlobalProvider>
  )
}

function Ecommerce() {
  const { loading, alert, fetchCart } = React.useContext(GlobalContext)

  React.useEffect(() => {
    fetchCart()
  }, [fetchCart])


  return (
    <BrowserRouter>
      <Root>
        <Header />
        <Main>
          <Loading loading={loading}/>
          {alert && <Alert alert={alert}/>}
        </Main>
        <Footer />
      </Root>
    </BrowserRouter>
  );
}

export default App