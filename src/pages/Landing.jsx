import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaPlus, FaTimes, FaPlay } from 'react-icons/fa';
import Footer from '../components/Footer';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate('/register', { state: { email } });
  };

  const faqs = [
    {
      question: "What is Netflix?",
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices."
    },
    {
      question: "How much does Netflix cost?",
      answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $19.99 a month."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device."
    },
    {
      question: "How do I cancel?",
      answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks."
    },
    {
      question: "What can I watch on Netflix?",
      answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
      question: "Is Netflix good for kids?",
      answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="absolute top-0 w-full z-50 px-4 lg:px-16 py-6">
        <div className="flex justify-between items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
            alt="Netflix" 
            className="h-7 lg:h-8"
          />
          <div className="flex items-center space-x-4">
            <select className="bg-gray-800 border border-gray-600 text-white px-3 py-1 rounded text-sm">
              <option>English</option>
              <option>Español</option>
            </select>
            <Link 
              to="/login" 
              className="bg-netflix-red px-4 py-2 rounded text-white font-medium hover:bg-red-700 transition text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/c745f8b7-64f8-43dd-8cf8-d7b687b30bc8/US-en-20240805-popsignuptwoweeks-perspective_alpha_website_large.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 leading-tight max-w-5xl mx-auto">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-4 font-normal">Starts at USD 2.99. Cancel anytime.</p>
          <p className="text-base md:text-lg lg:text-xl mb-8 font-normal max-w-2xl mx-auto">Ready to watch? Enter your email to create or restart your membership.</p>
          
          <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 md:py-4 text-black rounded-md text-base md:text-lg border border-gray-500 bg-black/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
              required
            />
            <button 
              type="submit"
              className="bg-netflix-red px-6 md:px-8 py-3 md:py-4 rounded-md text-lg md:text-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center whitespace-nowrap min-w-fit"
            >
              Get Started <FaChevronRight className="ml-2" size={14} />
            </button>
          </form>
        </div>
      </section>

      {/* TV Section */}
      <section className="py-20 px-4 lg:px-16 border-t-8 border-gray-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl lg:text-5xl font-black mb-6">Enjoy on your TV</h2>
            <p className="text-lg lg:text-xl text-gray-300">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
            </p>
          </div>
          <div className="relative">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="TV" className="relative z-10" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
              <video autoPlay muted loop className="w-full h-full object-cover">
                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-4 lg:px-16 border-t-8 border-gray-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div className="lg:order-2">
            <h2 className="text-3xl lg:text-5xl font-black mb-6">Download your shows to watch offline</h2>
            <p className="text-lg lg:text-xl text-gray-300">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
          <div className="relative lg:order-1">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="Mobile" className="w-full" />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black border-2 border-gray-600 rounded-xl px-4 py-3 flex items-center space-x-4 w-4/5">
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="Stranger Things" className="h-16" />
              <div className="flex-1">
                <p className="font-medium">Stranger Things</p>
                <p className="text-blue-500 text-sm">Downloading...</p>
              </div>
              <div className="w-12 h-12 border-2 border-netflix-red rounded-full animate-spin border-t-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Watch Everywhere Section */}
      <section className="py-20 px-4 lg:px-16 border-t-8 border-gray-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl lg:text-5xl font-black mb-6">Watch everywhere</h2>
            <p className="text-lg lg:text-xl text-gray-300">
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
            </p>
          </div>
          <div className="relative">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="Devices" className="relative z-10" />
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1/2">
              <video autoPlay muted loop className="w-full">
                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Kids Section */}
      <section className="py-20 px-4 lg:px-16 border-t-8 border-gray-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div className="lg:order-2">
            <h2 className="text-3xl lg:text-5xl font-black mb-6">Create profiles for kids</h2>
            <p className="text-lg lg:text-xl text-gray-300">
              Send kids on adventures with their favorite characters in a space made just for them—free with your membership.
            </p>
          </div>
          <div className="lg:order-1">
            <img src="https://occ-0-2851-2186.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d" alt="Kids" className="w-full" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 lg:px-16 border-t-8 border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-black text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-2 mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left text-xl lg:text-2xl hover:bg-gray-700 transition font-normal"
                >
                  {faq.question}
                  <span className="text-3xl">{openFaq === index ? '×' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="p-6 border-t border-black text-lg lg:text-xl bg-gray-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg lg:text-xl mb-8">Ready to watch? Enter your email to create or restart your membership.</p>
            <form onSubmit={handleGetStarted} className="flex flex-col lg:flex-row gap-2 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-4 text-black rounded text-lg border-0 outline-none"
                required
              />
              <button 
                type="submit"
                className="bg-netflix-red px-6 lg:px-8 py-4 rounded text-lg lg:text-xl font-medium hover:bg-red-700 transition flex items-center justify-center whitespace-nowrap"
              >
                Get Started <FaChevronRight className="ml-2" size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;