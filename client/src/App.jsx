import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import './App.css';
import Hero from './components/hero/Hero';
const App = () => {
  return (
    <div className='main'>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
};

export default App
