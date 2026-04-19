import { FiPhone, FiInstagram, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Copyright Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Cakery TV</h3>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
            <p className="mt-2">Made with ❤️ in your neighborhood.</p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-center md:justify-start">
                <FiPhone className="mr-2" />
                <a href="tel:9260928528" className="hover:text-amber-200 transition-colors">9260928528</a>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <FiInstagram className="mr-2" />
                <a href="https://www.instagram.com/cakery_tv" target="_blank" rel="noreferrer" className="hover:text-amber-200 transition-colors">@cakery_tv</a>
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Find Us</h3>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <FiMapPin className="mr-2" />
              Mahadev Bakery Harhua
            </p>
            <p className="text-sm mb-2">Lat: 25.3878739, Lng: 82.8981297</p>
            <a
              href="https://www.google.com/maps/place/Mahadev+Bakery+Harhua/@25.3879247,82.8980549,21z/data=!4m6!3m5!1s0x398e2d764ff95569:0x4c529c1ebbb3af01!8m2!3d25.3878739!4d82.8981297!16s%2Fg%2F11s35gzwd8?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-amber-700 hover:bg-amber-600 px-3 py-1 rounded transition-colors"
            >
              View on Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
