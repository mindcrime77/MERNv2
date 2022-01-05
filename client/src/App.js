
import Header2 from './components/Header2'
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'


const App = () => {

  return (
    <BrowserRouter>
      <Header2 />
      <Routes />
    </BrowserRouter>
  )
}

export default App;
