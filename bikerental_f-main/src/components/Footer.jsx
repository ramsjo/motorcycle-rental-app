export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white p-4 text-center mt-8">
        &copy; {new Date().getFullYear()} MotoRental. All rights reserved.
      </footer>
    );
  }