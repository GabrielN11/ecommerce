import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Root } from "./styles";
import { Header, Footer, Main } from './components'
import { GlobalProvider, GlobalContext } from './components/GlobalContext';
import './App.css'
import Loading from './components/Loading/Loading';
import Warning from './Warning';

function App() {
  return (
    <GlobalProvider>
      <Ecommerce />
    </GlobalProvider>
  )
}

function Ecommerce() {
  const { loading, fetchCart, getCategories } = React.useContext(GlobalContext)

  React.useEffect(() => {
    fetchCart()
    getCategories()
  }, [fetchCart, getCategories])


  return (
    <BrowserRouter>
      <Root>
        <Header />
        <Main>
          <Loading loading={loading}/>
          <Warning/> {/*remove this component for a production scenario*/}
        </Main>
        <Footer />
      </Root>
    </BrowserRouter>
  );
} //Testing netlify build

export default App