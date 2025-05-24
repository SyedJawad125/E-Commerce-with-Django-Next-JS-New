// import React from 'react';
// import Image from 'next/image';
// import logo from '../../public/images/logo5.jpg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// const Footer = () => {
//     return (
//         <footer id="footer" className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//             <div className="flex justify-center md:justify-start ml-20">
//                 <a href="/">
//                     <Image src={logo} alt="Logo" width={150} height={75} className="footer-logo" />
//                 </a>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">SUPPORT</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/faq" className="hover:underline">FAQ</a></li>
//                     <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
//                     <li className="mb-2"><a href="/returns" className="hover:underline">Returns</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/" className="hover:underline">Home</a></li>
//                     <li className="mb-2"><a href="/about" className="hover:underline">About Us</a></li>
//                     <li className="mb-2"><a href="/contact" className="hover:underline">Contact Us</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Our Services</h2>
//                 <ul>
//                     <li className="mb-2"><a href="/publicproduct" className="hover:underline">Products</a></li>
//                     <li className="mb-2"><a href="/publiccategory" className="hover:underline">Categories</a></li>
//                     <li className="mb-2"><a href="/publiccategory" className="hover:underline">Categories</a></li>
//                 </ul>
//             </div>
//             <div className="flex flex-col">
//                 <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
//                 <ul>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />DHA 2, Islamabad Pakistan.</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />(+92) 333 1906382</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" />(+92) 51 0000000</li>
//                     <li className="mb-2 flex items-center"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />nicenick1992@gmail.com</li>
//                 </ul>
//                 <div className="flex justify-center md:justify-start space-x-4 mt-4">
//                     <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaFacebookF />
//                     </a>
//                     <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaTwitter />
//                     </a>
//                     <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaInstagram />
//                     </a>
//                     <a href="https://wa.me/923331906382" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaWhatsapp />
//                     </a>
//                     <a href="https://www.linkedin.com/in/syed-jawad-ali-080286b9/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaLinkedinIn />
//                     </a>
//                     <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
//                         <FaYoutube />
//                     </a>
//                 </div>
//             </div>
//         </div>
//         <div className="text-center mt-8">
//             <p>&copy; 2024 Your Company. All rights reserved.</p>
//         </div>
//     </footer>

//     );
// };

// export default Footer;




import React from 'react';
import Image from 'next/image';
import logo from '../../public/images/logo5.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn, FaYoutube, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="footer" className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <a href="/" className="mb-6 transition-transform hover:scale-105 duration-300">
                            <Image 
                                src={logo} 
                                alt="Logo" 
                                width={180} 
                                height={90} 
                                className="footer-logo object-contain"
                            />
                        </a>
                        <p className="text-gray-400 text-sm mb-6">
                            Luxury redefined. Discover our exquisite collection of premium products crafted for the discerning customer.
                        </p>
                        <div className="flex space-x-5">
                            <a 
                                href="https://facebook.com/yourpage" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="text-lg text-white" />
                            </a>
                            <a 
                                href="https://instagram.com/yourpage" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="text-lg text-white" />
                            </a>
                            <a 
                                href="https://twitter.com/yourpage" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="text-lg text-white" />
                            </a>
                            <a 
                                href="https://pinterest.com/yourpage" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Pinterest"
                            >
                                <FaPinterestP className="text-lg text-white" />
                            </a>
                            <a 
                                href="https://youtube.com/yourchannel" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="text-lg text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div className="flex flex-col">
                        <h2 className="text-xl font-playfair font-semibold mb-6 pb-2 border-b border-gray-700">SUPPORT</h2>
                        <ul className="space-y-3">
                            <li>
                                <a 
                                    href="/faq" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>FAQ</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/contact" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Contact Us</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/returns" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Returns</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/shipping" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Shipping Info</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/size-guide" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Size Guide</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col">
                        <h2 className="text-xl font-playfair font-semibold mb-6 pb-2 border-b border-gray-700">QUICK LINKS</h2>
                        <ul className="space-y-3">
                            <li>
                                <a 
                                    href="/" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/about" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>About Us</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/publicproducts" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Shop</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/publiccategories" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Collections</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/publicsalesproductpage" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Sales</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col">
                        <h2 className="text-xl font-playfair font-semibold mb-6 pb-2 border-b border-gray-700">OUR SERVICES</h2>
                        <ul className="space-y-3">
                            <li>
                                <a 
                                    href="/gift-cards" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Gift Cards</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/personal-styling" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Personal Styling</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/vip-members" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>VIP Members</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/store-locator" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Store Locator</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/careers" 
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-start"
                                >
                                    <span className="mr-2">•</span>
                                    <span>Careers</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col">
                        <h2 className="text-xl font-playfair font-semibold mb-6 pb-2 border-b border-gray-700">CONTACT US</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-primary-400" />
                                <span className="text-gray-400">DHA 2, Islamabad Pakistan</span>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faPhone} className="mr-3 text-primary-400" />
                                <a href="tel:+923331906382" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">(+92) 333 1906382</a>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faPhone} className="mr-3 text-primary-400" />
                                <a href="tel:+92510000000" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">(+92) 51 0000000</a>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-primary-400" />
                                <a href="mailto:nicenick1992@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">nicenick1992@gmail.com</a>
                            </li>
                        </ul>
                        
                        <h3 className="text-lg font-playfair font-medium mt-8 mb-4">NEWSLETTER</h3>
                        <form action="/subscribe" method="POST" className="flex">
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Your email address" 
                                className="bg-gray-700 text-white px-4 py-2 w-full rounded-l focus:outline-none focus:ring-2 focus:ring-primary-400"
                                required
                            />
                            <button 
                                type="submit"
                                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Luxury E-Commerce. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="/privacy-policy" className="text-gray-500 hover:text-primary-400 transition-colors duration-300 text-sm">Privacy Policy</a>
                        <a href="/terms-of-service" className="text-gray-500 hover:text-primary-400 transition-colors duration-300 text-sm">Terms of Service</a>
                        <a href="/cookies" className="text-gray-500 hover:text-primary-400 transition-colors duration-300 text-sm">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;