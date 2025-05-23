import React from 'react'
import Image from 'next/image';
import img1 from '../../public/images/1.jpg'
import img2 from '../../public/images/2.jpg'
import img3 from '../../public/images/3.jpg'


 <div className="container mx-auto my-4 ml-8 mr-2 w-[calc(100%-6rem)] mt-16">
            <h2 className="text-1xl mb-4">SALES</h2>
            <br />
            <br />
            {/* {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>} */}
            <br/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
                {records.length > 0 ? (
                    records.map((item) => (
                        <div
                            key={item.id}
                            className="card-5 cursor-pointer"
                            onClick={() => handleProductClick(item.id)}
                        >
                            <img
                                src={`http://localhost:8000/${item.image}`}
                                className="card-image5 clickable-image w-full h-40 object-cover transform 
                                transition-transform duration-300 hover:scale-105"
                                alt={item.name}
                            />
                            <div className="card-body5 p-4"></div>
const Services = () => {
    const text1 = `E-commerce, or electronic commerce, refers to the buying and selling of goods and services over the
     internet. It encompasses a wide range of online business activities, including:
      1. Online Retail: This is the most common form of e-commerce, where businesses sell products directly to consumers
      through online platforms. Examples include Amazon, eBay, and Shopify-based stores.`;
  
    const text2 = `Categories in e-commerce play a crucial role in organizing products and enhancing the shopping 
    experience for customers. They help in:
     1. Simplified Navigation: Categories allow customers to easily navigate through an online store, quickly finding the 
     products they are looking for. This reduces the time and effort needed to locate items, leading to a more pleasant shopping experience.`;
  
    const text3 = `products are the cornerstone of any online retail business. They represent the goods or services that 
    are being offered to customers through a digital platform. Here are some key points about products in the realm of
     e-commerce:
     1. Physical Products: Tangible items that require shipping, such as clothing, electronics, and household goods.`;
  
    const text4 = `Discovering the latest additions to your favorite online store is always an exciting experience. 
     Explore New Arrivals is all about diving into the freshest trends, the newest products, and the most innovative items
     that have just hit the shelves.`;
  
  return (
    <div className="container mx-auto my-8 px-4 ml-56 w-3/4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Services</h1>
          <p className="text-lg mb-4">Some text about who we are and what we do.</p>
          <p className="text-sm">Resize the browser window to see that this page is responsive by the way.</p>
        </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={img1} alt="Service 1" className="w-full h-48 object-cover" width={500} height={300} />
      <div className="p-4 h-44">
        <h5 className="text-xl font-semibold mb-2 text-black">E-Commerce</h5>
        {/* <Readmore text={text1} maxLength={200} /> */}
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={img2} alt="Service 2" className="w-full h-48 object-cover" width={500} height={300} />
      <div className="p-4 h-44">
        <h5 className="text-xl font-semibold mb-2 text-black">Web Developing</h5>
        {/* <Readmore text={text2} maxLength={200} /> */}
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={img3} alt="Service 3" className="w-full h-48 object-cover" width={500} height={300} />
      <div className="p-4 h-44">
        <h5 className="text-xl font-semibold mb-2 text-black">Mobile App Developing</h5>
        {/* <Readmore text={text3} maxLength={200} /> */}
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={img3} alt="Service 4" className="w-full h-48 object-cover" width={500} height={300} />
      <div className="p-4 h-44">
        <h5 className="text-xl font-semibold mb-2 text-black">Machine Learning</h5>
        {/* <Readmore text={text4} maxLength={200} /> */}
      </div>
    </div>
  </div>
</div>
    );
  };
  
  export default Services;