const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-16 px-4 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="mb-8">Questions? Contact us.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="space-y-3">
            <a href="#" className="block hover:underline">FAQ</a>
            <a href="#" className="block hover:underline">Investor Relations</a>
            <a href="#" className="block hover:underline">Privacy</a>
            <a href="#" className="block hover:underline">Speed Test</a>
          </div>
          
          <div className="space-y-3">
            <a href="#" className="block hover:underline">Help Center</a>
            <a href="#" className="block hover:underline">Jobs</a>
            <a href="#" className="block hover:underline">Cookie Preferences</a>
            <a href="#" className="block hover:underline">Legal Notices</a>
          </div>
          
          <div className="space-y-3">
            <a href="#" className="block hover:underline">Account</a>
            <a href="#" className="block hover:underline">Ways to Watch</a>
            <a href="#" className="block hover:underline">Corporate Information</a>
            <a href="#" className="block hover:underline">Only on Netflix</a>
          </div>
          
          <div className="space-y-3">
            <a href="#" className="block hover:underline">Media Center</a>
            <a href="#" className="block hover:underline">Terms of Use</a>
            <a href="#" className="block hover:underline">Contact Us</a>
          </div>
        </div>
        
        <div className="border border-gray-600 rounded px-4 py-2 inline-block mb-8">
          <select className="bg-transparent text-gray-400 outline-none">
            <option>English</option>
            <option>Español</option>
          </select>
        </div>
        
        <p className="text-sm">Netflix Clone</p>
      </div>
    </footer>
  );
};

export default Footer;