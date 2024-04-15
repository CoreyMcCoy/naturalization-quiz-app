import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="flex items-center px-12 h-14 w-full">
      <Link className="mr-4" href="#">
        Naturalization Quiz App
      </Link>
      <nav className="ml-auto flex items-center space-x-4">
        <Link
          className="font-medium rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
          href="#"
        >
          About
        </Link>
        <Link
          className="font-medium rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
          href="#"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};
export default Navbar;
