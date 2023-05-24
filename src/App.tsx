import { Banner } from 'components/Banner';
import { Testimonials } from 'components/Testimonials/Testimonials';
import { Header } from './components/Header'

function App() {
  return (
    <div className="App">
      <Header/>

      <main>
        <Banner />
        <Testimonials />
      </main>
    </div>
  )
}

export default App;
