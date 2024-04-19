const SearchInput = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="border-1 border-gray-700 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none text-black"
      />
      <button
        type="submit"
        className="absolute sm:right-0 sm:top-0 sm:mt-3 sm:mr-4 text-black right-0 mr-2 top-[12px]"
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-5-5m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;
