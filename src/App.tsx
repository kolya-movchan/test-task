import { Banner } from 'components/Banner';
import { Form } from 'components/Form';
import { Testimonials } from 'components/Testimonials/Testimonials';
import { Header } from './components/Header'

function App() {
  return (
    <div className="App">
      <Header/>

      <main className='main'>
        <Banner />
        <Testimonials />
        <Form />
      </main>
    </div>
  )
}

export default App;
