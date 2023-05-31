import { Header } from './components/Header'
import { Banner } from 'components/Banner';
import { Testimonials } from 'components/Testimonials/Testimonials';
import { Form } from 'components/Form';

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
