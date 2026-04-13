export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-6 mt-10">
      <div className="text-center">
        <p>© {new Date().getFullYear()} My Café. All rights reserved.</p>
        <p className="mt-2">
          Made with ❤️ in your neighborhood.
        </p>
      </div>
    </footer>
  );
}
