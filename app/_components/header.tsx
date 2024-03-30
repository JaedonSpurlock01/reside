export default function Header({ mapOnly }: { mapOnly: boolean }) {
  return (
    <div
      className="absolute top-0 w-full h-20 py-4 px-16 flex items-center justify-center z-10 backdrop-filter backdrop-blur-[0.5rem]"
      style={
        !mapOnly
          ? {
              opacity: 1,
              backgroundColor: "rgb(38 38 38)",
              borderBottomWidth: "1px",
              borderColor: "rgb(55 55 55)",
            }
          : { opacity: 0.8 }
      }
    >
      <div className="w-full h-full relative font-light text-white">
        <div className="absolute left-1/2 top-1/2 text-3xl tracking-wider font-semibold transform -translate-x-1/2 -translate-y-1/2">
          <a href="/">RESIDE</a>
        </div>
        <div className="absolute left-0 top-1/2 text-lg transform -translate-y-1/2">
          <a href="/">Rent</a>
        </div>
        <div className="absolute right-0 top-1/2 text-lg transform -translate-y-1/2 flex flex-row space-x-8">
          <button>Favorites</button>
          <button>Settings</button>
          <button>Help</button>
          <button>Sign Out</button>
        </div>
      </div>
    </div>
  );
}
