import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar py-4 flex justify-between">
      <Link href="/" className="text-xl font-semibold tracking-tight">
        SaaS Boilerplate
      </Link>
      <nav className="gap-5">
        {/* <Link href="#" className="btn text-sm">
          Sign-out
        </Link>

        <Link className="text-sm" href="/login">
          Sign-in
        </Link>

        <Link className="text-sm" href="/register">
          Register
        </Link> */}
      </nav>
    </div>
  );
};
export default Navbar;
