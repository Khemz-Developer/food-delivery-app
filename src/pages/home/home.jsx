
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'


const home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <SpecialDishes/>
      <Testimonials/>
      <OurServices/>
 
    </div>
  )
}

export default home
