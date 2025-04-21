import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleRight } from 'react-icons/fa6'
import { FaAngleLeft } from "react-icons/fa";

const SimpleNextArrow = (props)=>{
  const {className,style,onClick} = props;
  return(
    <div className={className} style={{...style,display:"block" , background:"red"}} onClick={onClick}>NEXT</div>
  )
}

const SimplePrevArrow = (props)=>{
  const {className,style,onClick} = props;
  return(
    <div className={className} style={{...style,display:"block" , background:"green"}} onClick={onClick}>PREV</div>
  )
}

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item)=>
          item.category ==="popular"
          
        )
        //console.log(specials);
        setRecipes(specials)
      });
  }, []);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    
    nextArrow : <SimpleNextArrow/>,
    prevArrow : <SimplePrevArrow/>
  };

  return (
    <div className="relative my-20 section-container">
      <div>
        <p className="subtitle">Special Dishes</p>
        <h3 className="title md:w-[520px]">Standout Dishes From Our Menu</h3>
      </div>
      {/* arrow btn */ }
      <div className="top-8 right-12 md:absolute ">
        <button onClick={()=>slider?.current?.slickPrev()} className="p-2 ml-5 rounded-full btn"><FaAngleLeft className="w-8 h-8 p-1"></FaAngleLeft></button>
        <button onClick={()=>slider?.current?.slickNext()} className="p-2 ml-2 rounded-full btn bg-green"><FaAngleRight className="w-8 h-8 p-1"></FaAngleRight></button>
      </div>
      <Slider ref={slider} {...settings} className="mt-10 space-x-5 overflow-hidden">
        {
          recipes.map((item,i)=>(
            <Cards key={i} item={item}></Cards>
          ))
        }
      </Slider>
    </div>
  );
};

export default SpecialDishes;
