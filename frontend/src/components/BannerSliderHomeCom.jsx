// import React from 'react';
// import Image from 'next/image';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import banner1 from '../../public/images/banner1.jpg'
// import banner2 from '../../public/images/banner2.jpg'
// import banner3 from '../../public/images/banner3.jpg'
// import banner4 from '../../public/images/banner4.jpg'
// import banner5 from '../../public/images/banner5.jpg'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
// import { Carousel } from "react-responsive-carousel";



// const NextJsCarousel = () => {
//   return (
//       // <div className="max-w-screen-lg mx-auto">

//       <div className="w-full">
          
//           <Carousel 
//               showThumbs={false} 
//               autoPlay 
//               infiniteLoop 
//               interval={3000}
//               showStatus={false}
//           >
//               <div>
//                   <Image
//                       src={banner1}
//                       alt="image1"
//                       className="w-full h-[87vh] object-cover"
//                   />
//                   {/* <p className="legend">Image 1</p> */}
//               </div>
//               <div>
//                   <Image
//                       src={banner2}
//                       alt="image2"
//                       className="w-full h-[87vh] object-cover"
//                   />
//                   {/* <p className="legend">Image 2</p> */}
//               </div>
//               <div>
//                   <Image
//                       src={banner3}
//                       alt="image3"
//                       className="w-full h-[87vh] object-cover"
//                   />
//                   {/* <p className="legend">Image 3</p> */}
//               </div>
//               <div>
//                   <Image
//                       src={banner4}
//                       alt="image4"
//                       className="w-full h-[87vh] object-cover"
//                   />
//                   {/* <p className="legend">Image 4</p> */}
//               </div>
//               <div>
//                   <Image
//                       src={banner5}
//                       alt="image5"
//                       className="w-full h-[87vh] object-cover"
//                   />
//                   {/* <p className="legend">Image 5</p> */}
//               </div>
//           </Carousel>
//       </div>
//   );
// };

// export default NextJsCarousel;







import React from 'react';
import Image from 'next/image';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../public/images/banner1.jpg';
import banner2 from '../../public/images/banner2.jpg';
import banner3 from '../../public/images/banner3.jpg';
import banner4 from '../../public/images/banner4.jpg';
import banner5 from '../../public/images/banner5.jpg';
import ad1 from '../../public/images/banner1.jpg';
import ad2 from '../../public/images/banner2.jpg';
import ad3 from '../../public/images/banner3.jpg';
import ad4 from '../../public/images/banner4.jpg';
import ad5 from '../../public/images/banner5.jpg';

const HomePage = () => {
  const categories = [
    "Mobile", "Cup", "Bicycle", "Laptop", "Glasses", "Makeup", "Suits",
    "Mobile", "Cup", "Bicycle", "Laptop", "Glasses", "Makeup", "Suits",
    "Mobile", "Cup", "Bicycle", "Laptop", "Glasses", "Makeup", "Suits",
    "Laptop", "Glasses", "Makeup", "Suits", 
  ];

  // Split categories into 3 columns
  const column1 = categories.slice(0, 8);
  const column2 = categories.slice(8, 16);
  const column3 = categories.slice(17);

  return (
    <div className="mx-10"> {/* Added left and right margins here */}
      <div className="container mx-auto px-4 py-4">
        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-0">
          {/* Categories Section - Left Side */}
          <div className="w-full md:w-1/4 bg-gray-200 p-6 shadow h-[50vh] overflow-y-auto"> {/* Added fixed height and scroll */}
            <h2 className="text-xl font-bold mb-4 text-gray-900 sticky top-0 ">Categories</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Column 1 */}
              <ul className="space-y-3">
                {column1.map((category, index) => (
                  <li key={index} className="hover:text-blue-600 text-gray-900 cursor-pointer transition-colors">
                    {category}
                  </li>
                ))}
              </ul>
              
              {/* Column 2 */}
              <ul className="space-y-3">
                {column2.map((category, index) => (
                  <li key={index+3} className="hover:text-blue-600 text-gray-900 cursor-pointer transition-colors">
                    {category}
                  </li>
                ))}
              </ul>
              
              {/* Column 3 */}
              <ul className="space-y-3">
                {column3.map((category, index) => (
                  <li key={index+5} className="hover:text-blue-600 text-gray-900 cursor-pointer transition-colors">
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image Slider - Right Side */}
          <div className="w-full md:w-3/4 h-[50vh]"> {/* Added fixed height */}
            <Carousel 
              showThumbs={false} 
              autoPlay 
              infiniteLoop 
              interval={3000}
              showStatus={false}
              className="overflow-hidden shadow h-full"
            >
              <div className="h-full">
                <Image
                  src={banner1}
                  alt="image1"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="h-full">
                <Image
                  src={banner2}
                  alt="image2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-full">
                <Image
                  src={banner3}
                  alt="image3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-full">
                <Image
                  src={banner4}
                  alt="image4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-full">
                <Image
                  src={banner5}
                  alt="image5"
                  className="w-full h-full object-cover"
                />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Ads Slider Section */}
        <div className="mb-8 mt-6"> {/* Added margin-top */}
          <Carousel 
            showThumbs={false} 
            autoPlay 
            infiniteLoop 
            interval={2500}
            showStatus={false}
            className="overflow-hidden shadow"
          >
            <div>
              <Image
                src={ad1}
                alt="ad1"
                className="w-full h-[24vh] object-cover"
              />
            </div>
            <div>
              <Image
                src={ad2}
                alt="ad2"
                className="w-full h-[24vh] object-cover"
              />
            </div>
            <div>
              <Image
                src={ad3}
                alt="ad3"
                className="w-full h-[24vh] object-cover"
              />
            </div>
            <div>
              <Image
                src={ad4}
                alt="ad3"
                className="w-full h-[24vh] object-cover"
              />
            </div>
            <div>
              <Image
                src={ad5}
                alt="ad3"
                className="w-full h-[24vh] object-cover"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomePage;