import Logo from "/logo.png";

export default function Navbar() {
    return (
        <nav className="w-11/12 p-4 mx-auto flex items-center justify-between gap-4">
            <div className="flex gap-2 items-center justify-center text-xl font-semibold">
                <img src={Logo} alt="logo" className="h-10 w-auto" />
                <p>Taxi <span className="text-amber-500">Kitchen</span></p>
            </div>
            <div className="sm:flex hidden gap-16">
                <a href="/" className="border-b-amber-300 border-b-3">Orders</a>
                <a href="/" className="border-b-amber-300 border-b-3">Foods</a>
                <a href="/" className="border-b-amber-300 border-b-3">Tables</a>
                <a href="/" className="border-b-amber-300 border-b-3">LogOut</a>
            </div>
        </nav>
    );
};