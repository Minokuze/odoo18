import Header from './Header.js'
import 'primeicons/primeicons.css'; 
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact Theme
import 'primereact/resources/primereact.min.css'; // PrimeReact CSS
import 'primeflex/primeflex.css'
import { PrimeReactProvider } from 'primereact/api';



function App() {
  const value = {
    ripple: true
  }
  return (

    <PrimeReactProvider value={value}>
      <Header/>
    </PrimeReactProvider >
  );
}

export default App;

