/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Hotel, 
  Utensils, 
  Flame, 
  ChevronDown, 
  MapPin, 
  Menu, 
  X,
  Wind,
  Coffee,
  Waves,
  Phone,
  Calendar,
  Clock,
  User,
  Home
} from "lucide-react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7EHmhgQdRo7UeeAarkkPWDinrQLwW86F-JemYxgWaY-ccmIL-7RzkScpVjeNoH7ANNsPUla-oEnGK0bbNRCeT3btcq9NRrNodoa5_tvP3gYBmASXP-FIybgnhE2d9H9n2upTFVKk3PCRS7GpzHsxkwnFEqs1hdULmSY9VA8Gx6y2zqtUqNENdW_vMbLDoW5bAZVXchlWshso_k8fzZYex2Yh8j4_zi5ULH8bBHVctwCNuOTvFUTERWoLyxS4Kf1mEMXX4FaklDm57",
  pool: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpjOUtFLibXkpAifSN-9Rv2FhCFpJeFJPNbWP9t85yp9sX0PiB28UE70Zrh4684CK1WxkuU3pAn8GGZGzdxORS2CA5FxHq1yvG2b4N6EiFglGlbApaFl3lMZZzGirwtI00b2eU0d4g-ukj0V6OvnN87Y2x-9BjXkAgixh0-YjYRqlsf3ZgAfn-EninbVpV6kgNW_kMcceVo2rvb_TGr1HS5bXZCL1twFnVhz4bzpaLIx_u45MT0ibgSfu6XLva1K66E2ogSMKNxpAp",
  room: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF9fLizQdYVFgj6OvR_g9P9kJCceoXU7kZojHJk80nry5GNwrTJd1nJvzdwWz491aaOH67fvt0GWYpQeuT5XhXd_1omUTYv5NgI6IQWs18HIqWcK0KNUW5ovVe5SJSy1O7XBD-DtWcaqAUU8shKi63HXqU0aO423flSuX6PQPgVHpjbfDmT1ufe4uuaQDXZz0P5AKQZCx48SfLi1dkjgkuNwh4Xux3gXV9LoHicoRyWavUpKwxMY79j1B3MX2jLoIO4X8n6zoOR1q3",
  dining: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0nBB6G98Wbgoh0DxC0q-XDTfdEsXM-k6YcSpUm_xNYd7rA30w9rkhPYrwH-bXqzBB953hFUemIDSGMyf8M4MtE7H7Tp42HUO9f3mHx-M3UBQ8S-QI07nkrf4KLqVKuLwu0ID5Ky9jzjcFYji4GWWQ2wZvCkOQ2yLsMhhZs-xj23e1y9p4AH-8jAQLXSTVzgJRLr4BjlnQz-6-9v8x7i4A-on1EtV6DNCkC42yaZhAl5aLSN3xtuafPoaSTimSI-NFjeHcwYYhhcVr",
  balcony: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRyu1ATOfuMaCgzc8iYRLWIKueLImUAmZe-lHIFFOua_CMywA42agYI1adRdQunxKZb91LK2OgDApI4whGai8sidh-t1pJvDY2NAmonz7L9-7Y7-crco2HkP1cs7BO7HTDEL5Z644cQO40hUk9k4fTTUSKWjJxdXLzqaMyXEnU_wyj5i4CTdNIPtA97nR3nuyL4lTyabuv78GaeVGnJvGhvwNTSmWHxeBknrLjx_gqGfk1xJ0tmNeqyNqvKasg4dfyzDLke4qyD8b7",
  campfire: "https://lh3.googleusercontent.com/aida-public/AB6AXuBge06lGzA5jtbg8f4_RmlrUt3GCaJWDIbCKGpvswoIr-DbpIaMsAr2Vc4D1XaQrHd2SY50lzqmPUTwJfD7voZapx5ufJEA0zBEAdKvPeRUSKjGXFDk6SJLkA_gyAiWNGgteFIZBtjKs8REi_bTnlCP_Av1qp4GSVvj7WwZIYM2gceTsBUmTiENJ_UaNzEXQC7yFgvNSOVsL2-_gIgazGF1pnFQPJZ51AhvsD2D_830HE7NB6pdSc75kyhGNgcGD2xwMfy60h1-eK19",
  map: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtedOlXjf4c97T5GRd299V7WQSxcxc7o3mtNFm8AE02Okh28IF4BhtuZrkRI0Y2H7y1uzwjj9xmw41AhA3UWmqACSUsxexIU9hxOo1_72tj-1ahLXHkLkOHW_RXbucTniPX3cUd4U4Cp6XAZbJ-qh_jTTSsT3llINiK6yqseAXy9uQlkeKBhncMukijjoLpJ5HiabrJtMSpFpryLoh3rXhzPJwQbz-3Ghu8Sv4qk4XRsjP96SaJcFoMqIe4Chtc0PjBvBIkGs43l4Q",
  bathroom: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1000",
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    secondaryMobile: "",
    checkInDate: "",
    checkInTime: "14:00",
    checkOutDate: "",
    address: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Booking Request - Azure Serenity*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Mobile:* ${formData.mobile}%0A` +
      `*Secondary Mobile:* ${formData.secondaryMobile}%0A` +
      `*Check-in:* ${formData.checkInDate} at ${formData.checkInTime}%0A` +
      `*Check-out:* ${formData.checkOutDate}%0A` +
      `*Address:* ${formData.address}`;
    
    window.open(`https://wa.me/91807211792?text=${message}`, "_blank");
    setBookingModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-headline-lg text-primary mb-2">Book Your Sanctuary</h2>
                    <p className="text-on-surface-variant font-light">Experience uncompromised tranquility.</p>
                  </div>
                  <button 
                    onClick={() => setBookingModalOpen(false)}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  >
                    <X size={24} className="text-primary" />
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-label-sm text-primary/40 flex items-center gap-2">
                        <User size={14} /> FULL NAME
                      </label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="bg-surface-bright/50 border border-black/5 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary/20 transition-all font-light"
                      />
                    </div>

                    {/* Mobile */}
                    <div className="flex flex-col gap-2">
                      <label className="text-label-sm text-primary/40 flex items-center gap-2">
                        <Phone size={14} /> MOBILE NUMBER
                      </label>
                      <input 
                        required
                        type="tel" 
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        placeholder="+91 00000 00000"
                        className="bg-surface-bright/50 border border-black/5 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary/20 transition-all font-light"
                      />
                    </div>

                    {/* Secondary Mobile */}
                    <div className="flex flex-col gap-2">
                      <label className="text-label-sm text-primary/40 flex items-center gap-2">
                        <Phone size={14} /> SECONDARY NUMBER
                      </label>
                      <input 
                        type="tel" 
                        value={formData.secondaryMobile}
                        onChange={(e) => setFormData({...formData, secondaryMobile: e.target.value})}
                        placeholder="+91 00000 00000"
                        className="bg-surface-bright/50 border border-black/5 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary/20 transition-all font-light"
                      />
                    </div>

                    {/* Check-in Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-label-sm text-primary/40 flex items-center gap-2">
                        <Calendar size={14} /> CHECK-IN DATE
                      </label>
                      <input 
                        required
                        type="date" 
                        value={formData.checkInDate}
                        onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                        className="bg-surface-bright/50 border border-black/5 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary/20 transition-all font-light"
                      />
                    </div>

                    {/* Check-in Time */}
                    <div className="flex flex-col gap-2">
                      <label className="text-label-sm text-primary/40 flex items-center gap-2">
                        <Clock size={14} /> CHECK-IN TIME
                      </label>
                      <select 
                        value={formData.checkInTime}
                        onChange={(e) => setFormData({...formData, checkInTime: e.target.value})}
                        className="bg-surface-bright/50 border border-black/5 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary/20 transition-all font-light appearance-none cursor-pointer"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {i.toString().padStart(2, '0')}:00
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Check-out Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-label-sm text-primary/40 flex items-center gap-2">
                        <Calendar size={14} /> CHECK-OUT DATE
                      </label>
                      <input 
                        required
                        type="date" 
                        value={formData.checkOutDate}
                        onChange={(e) => setFormData({...formData, checkOutDate: e.target.value})}
                        className="bg-surface-bright/50 border border-black/5 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary/20 transition-all font-light"
                      />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-label-sm text-primary/40 flex items-center gap-2">
                        <Home size={14} /> ADDRESS
                      </label>
                      <textarea 
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        rows={3}
                        placeholder="Enter your residential address"
                        className="bg-surface-bright/50 border border-black/5 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary/20 transition-all font-light resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full bg-primary text-white py-5 rounded-full text-label-sm font-bold tracking-[0.2em] shadow-ambient hover:bg-primary/95 transition-all active:scale-95"
                    >
                      CONFIRM BOOKING
                    </button>
                    <p className="text-center text-[10px] text-primary/30 mt-4 uppercase tracking-[0.1em]">
                      Secure interaction via encrypted WhatsApp protocol
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav 
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "glass-effect py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-container-max mx-auto px-6 md:px-margin-edge flex justify-between items-center">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[20px] md:text-headline-md font-serif tracking-[0.25em] font-medium text-primary cursor-pointer"
          >
            AZURE SERENITY
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {[
              { name: "Resort", id: "resort" },
              { name: "Rooms", id: "rooms" },
              { name: "Dining", id: "dining" },
              { name: "Gallery", id: "gallery" },
              { name: "Experiences", id: "experiences" }
            ].map((item) => (
              <button 
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-label-sm text-primary/70 hover:text-primary transition-colors cursor-pointer border-b border-transparent hover:border-primary/40 pb-1"
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => setBookingModalOpen(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg text-label-sm hover:bg-primary/90 transition-all shadow-ambient active:scale-95"
            >
              Book Your Stay
            </button>
          </div>

          <button 
            className="lg:hidden text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl py-8 px-6 flex flex-col gap-6 lg:hidden z-[60]"
            >
              {[
                { name: "Resort", id: "resort" },
                { name: "Rooms", id: "rooms" },
                { name: "Dining", id: "dining" },
                { name: "Gallery", id: "gallery" },
                { name: "Experiences", id: "experiences" }
              ].map((item) => (
                <button 
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-label-sm text-left text-primary/70 py-2 border-b border-black/5"
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="bg-primary text-white py-4 rounded-lg text-label-sm shadow-ambient"
              >
                Book Your Stay
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-primary/25 backdrop-brightness-95" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-white text-[48px] md:text-display-xl mb-6 leading-[1.1] drop-shadow-2xl">
              Azure Serenity:<br /><span className="italic font-normal">Tranquility Defined</span>
            </h1>
            <p className="text-white/90 text-body-lg mb-10 max-w-2xl mx-auto drop-shadow-lg font-light">
              Experience the pinnacle of whispered luxury. Where the horizon meets effortless service.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => setBookingModalOpen(true)}
                className="bg-white text-primary px-12 py-5 rounded-full text-label-sm hover:bg-surface-bright transition-all shadow-ambient hover:-translate-y-1 active:scale-95"
              >
                BOOK NOW
              </button>
              <button 
                onClick={() => scrollToSection('resort')}
                className="bg-primary/20 backdrop-blur-md text-white border border-white/30 px-12 py-5 rounded-full text-label-sm hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-95"
              >
                OUR STORY
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={() => scrollToSection('resort')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 animate-bounce cursor-pointer group"
        >
          <span className="text-label-sm mb-2 opacity-70 group-hover:opacity-100 transition-opacity">SCROLL TO EXPLORE</span>
          <ChevronDown size={24} />
        </motion.div>
      </header>

      {/* Philosophy Section */}
      <section className="py-section-padding bg-white px-6 md:px-margin-edge border-b border-black/5" id="resort">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-label-sm text-primary/40 mb-4 block"
              >
                OUR PHILOSOPHY
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-headline-lg text-primary mb-8"
              >
                Where minimal elegance meets untamed natural beauty.
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-body-lg text-on-surface-variant font-light"
              >
                <p>
                  Azure Serenity is designed for those who seek tranquility without compromise. Our spaces breathe with generous natural light, clean lines, and an understated luxury that anticipates your every need. Surrender to the rhythm of the ocean and the comfort of our meticulously curated sanctuaries.
                </p>
                <p>
                  We believe that true luxury is found in the details—the texture of hand-woven linens, the scent of sea salt on the breeze, and the silence of a hidden cove at dawn.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-3 gap-8 mt-12">
                {[
                  { label: "Villas", value: "24" },
                  { label: "Private Pools", value: "18" },
                  { label: "Michelin Stars", value: "2" }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[32px] font-serif text-primary">{stat.value}</div>
                    <div className="text-label-sm text-primary/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="rounded-2xl overflow-hidden shadow-2xl h-[600px]"
              >
                <img src={IMAGES.pool} alt="Philosophy" className="w-full h-full object-cover" />
              </motion.div>
              <div className="absolute -bottom-10 -left-10 bg-surface-dim p-8 rounded-2xl hidden xl:block shadow-xl max-w-xs">
                <p className="italic text-primary/80 font-serif">"The most beautiful thing we experience is the mysterious."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-section-padding bg-surface-bright px-6 md:px-margin-edge" id="rooms">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-20">
            <span className="text-label-sm text-primary/40 mb-4 block">THE RESIDENCES</span>
            <h2 className="text-headline-lg text-primary">Your Private Sanctuary</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Oceanfront Suite",
                price: "From $1,200 / night",
                img: IMAGES.room,
                features: ["Panoramic View", "Private Terrace", "Rain Shower"]
              },
              {
                title: "Serenity Penthouse",
                price: "From $2,800 / night",
                img: IMAGES.balcony,
                features: ["Rooftop Pool", "Personal Butler", "Full Kitchen"]
              }
            ].map((room) => (
              <motion.div 
                key={room.title}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-ambient">
                  <img src={room.img} alt={room.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-headline-md mb-2">{room.title}</h3>
                    <div className="flex gap-4">
                      {room.features.map(f => (
                        <span key={f} className="text-label-sm text-primary/40 flex items-center gap-1">
                          <Waves size={12} /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-label-sm text-primary/60 mb-2">{room.price}</p>
                    <button className="text-primary hover:underline font-medium">VIEW DETAILS</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section className="py-section-padding bg-white px-6 md:px-margin-edge" id="dining">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 aspect-square md:aspect-video lg:aspect-auto h-full max-h-[700px]">
              <div className="grid grid-cols-2 gap-6 h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden shadow-xl mt-12"
                >
                  <img src={IMAGES.dining} alt="Dining 1" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden shadow-xl mb-12"
                >
                  <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" alt="Dining 2" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <span className="text-label-sm text-primary/40 mb-4 block">GASTRONOMY</span>
              <h2 className="text-headline-lg text-primary mb-8">Culinary Whispers</h2>
              <p className="text-body-lg text-on-surface-variant mb-10 font-light">
                Indulge in a symphony of flavors inspired by the Mediterranean and crafted with the freshest local ingredients. From sunrise breakfasts on the terrace to candlelight dinners under the stars, every meal is an event.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <Wind size={20} />, name: "Azure Breeze", type: "Seafood & Grill" },
                  { icon: <Coffee size={20} />, name: "Horizon Lounge", type: "Cocktails & Tapas" },
                  { icon: <Flame size={20} />, name: "Terra Cotta", type: "Authentic Mediterranean" }
                ].map((venue) => (
                  <div key={venue.name} className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      {venue.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-xl">{venue.name}</h4>
                      <p className="text-label-sm text-primary/40">{venue.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Gallery Carousel Section */}
      <section className="py-section-padding bg-surface-bright overflow-hidden" id="gallery">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-edge text-center mb-16">
          <span className="text-label-sm text-primary/40 mb-4 block">MOMENTS IN TIME</span>
          <h2 className="text-headline-lg text-primary">A 3D Visual Journey</h2>
        </div>
        
        <div className="pb-10">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="w-full py-12"
          >
            {[
              { img: IMAGES.room, label: "Resort Room" },
              { img: IMAGES.bathroom, label: "Spa Bathroom" },
              { img: IMAGES.dining, label: "Exquisite Dining" },
              { img: IMAGES.balcony, label: "Private Balcony" },
              { img: IMAGES.campfire, label: "Twilight Campfire" },
              { img: IMAGES.pool, label: "Infinity Pool" }
            ].map((slide, i) => (
              <SwiperSlide key={i} className="!w-[300px] sm:!w-[500px] md:!w-[700px] !h-[450px] sm:!h-[600px]">
                <div className="w-full h-full relative group overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src={slide.img} 
                    alt={slide.label} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <h3 className="text-white text-headline-md">{slide.label}</h3>
                    <p className="text-white/60 text-label-sm">View Details</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-section-padding bg-white px-6 md:px-margin-edge" id="experiences">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <span className="text-label-sm text-primary/40 mb-4 block">CURATED OFFERINGS</span>
            <h2 className="text-headline-lg text-primary">Elevated Experiences</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Hotel className="text-primary-container" size={24} />,
                title: "Refined Accommodation",
                description: "Spacious suites featuring minimalist decor, premium linens, and breathtaking ocean panoramas designed for ultimate rest."
              },
              {
                icon: <Utensils className="text-primary-container" size={24} />,
                title: "Gastronomic Dining",
                description: "Locally sourced, masterfully prepared cuisine served in an airy, sophisticated setting overlooking the azure waters."
              },
              {
                icon: <Flame className="text-primary-container" size={24} />,
                title: "Twilight Campfire",
                description: "Exclusive evening gatherings around modern fire pits, offering artisanal cocktails and curated tranquility under the stars."
              }
            ].map((offering, idx) => (
              <motion.div 
                key={offering.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface-bright p-10 rounded-2xl shadow-ambient hover:-translate-y-1 transition-all duration-300 border border-black/5"
              >
                <div className="w-14 h-14 bg-surface-dim/30 rounded-full flex items-center justify-center mb-6">
                  {offering.icon}
                </div>
                <h3 className="text-headline-md text-primary mb-4 leading-tight">{offering.title}</h3>
                <p className="text-on-surface-variant leading-relaxed font-light">
                  {offering.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-section-padding px-6 md:px-margin-edge bg-primary relative overflow-hidden" id="booking">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        
        <div className="max-w-[900px] mx-auto relative z-10 glass-effect bg-white/5 border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-headline-lg text-white mb-4">Reserve Your Sanctuary</h2>
            <p className="text-white/60 text-body-lg font-light">Begin your journey to uncompromised tranquility.</p>
          </div>
          
          <form onSubmit={handleBookingSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex flex-col gap-3">
                <label className="text-label-sm text-white/50 tracking-widest">FULL NAME</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name" 
                  className="bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/20 font-light"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-label-sm text-white/50 tracking-widest">MOBILE NUMBER</label>
                <input 
                  required
                  type="tel" 
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  placeholder="+91 00000 00000" 
                  className="bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/20 font-light"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-label-sm text-white/50 tracking-widest">CHECK-IN DATE</label>
                <input 
                  required
                  type="date" 
                  value={formData.checkInDate}
                  onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                  className="bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/20 font-light"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-label-sm text-white/50 tracking-widest">CHECK-OUT DATE</label>
                <input 
                  required
                  type="date" 
                  value={formData.checkOutDate}
                  onChange={(e) => setFormData({...formData, checkOutDate: e.target.value})}
                  className="bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/20 font-light"
                />
              </div>
            </div>
            
            <div className="pt-8 flex justify-center">
              <button 
                type="submit"
                className="w-full md:w-auto bg-white text-primary px-20 py-5 rounded-full text-label-sm shadow-xl hover:bg-surface-bright transition-all active:scale-95 font-bold tracking-widest"
              >
                PROCEED TO WHATSAPP
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white px-6 md:px-margin-edge border-t border-black/5">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
            <div className="flex-1">
              <div className="text-[20px] font-serif tracking-[0.3em] text-primary mb-8">
                AZURE SERENITY
              </div>
              <p className="text-on-surface-variant max-w-sm mb-10 leading-relaxed font-light">
                Whispering luxury on the pristine coast. A sanctuary designed for absolute tranquility.
              </p>
              <div className="flex gap-6">
                {/* Social icons could go here */}
                <div className="w-10 h-10 rounded-full bg-surface-dim/20 flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <Waves size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-dim/20 flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <Wind size={18} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8">
              <div className="flex flex-col gap-4">
                <span className="text-label-sm text-primary mb-2">DISCOVER</span>
                {["Sustainability", "Concierge", "Privacy Policy", "Press Room", "Careers"].map(link => (
                  <a key={link} href="#" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-light">{link}</a>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-label-sm text-primary mb-2">RESORT</span>
                {[
                  { name: "The Suites", id: "rooms" },
                  { name: "Dining", id: "dining" },
                  { name: "Experiences", id: "experiences" },
                  { name: "Gallery", id: "gallery" }
                ].map(link => (
                   <button key={link.name} onClick={() => scrollToSection(link.id)} className="text-left text-on-surface-variant hover:text-primary transition-colors text-sm font-light">{link.name}</button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center md:items-end">
              <div className="w-full max-w-md h-56 relative rounded-2xl overflow-hidden group shadow-ambient cursor-pointer">
                <img 
                  src={IMAGES.map} 
                  alt="Resort Location" 
                  className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md text-primary p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                    <MapPin size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-label-sm text-primary/40">
              © 2026 DATAZYNC
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-label-sm text-primary/40 hover:text-primary transition-colors">TERMS OF SERVICE</a>
              <a href="#" className="text-label-sm text-primary/40 hover:text-primary transition-colors">COOKIES</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


