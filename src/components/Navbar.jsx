import navbarPhoto from "../assets/images/navbar-photo.jpg";

const Navbar = () => {
  return (
    <nav className="w-full px-4 py-3 sm:px-8 sm:py-4 flex items-center justify-between bg-white/40 backdrop-blur-md shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={navbarPhoto}
          alt="รูปข้างข้อความ To MINEMINT"
          className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
        />
        <h1 className="whitespace-nowrap text-lg font-semibold text-rose-600 sm:text-2xl">
          To MINEMINT 💗
        </h1>
      </div>

      <p className="text-right text-sm font-medium text-purple-600 sm:text-lg">
        Love you cutiee 💕
      </p>
    </nav>
  );
};

export default Navbar;
