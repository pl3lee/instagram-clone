import { Dispatch, SetStateAction, useState } from "react";

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="stick-header px-3 py-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for accounts"
        className="w-full rounded-lg p-2 border-borderGray border border-solid bg-white dark:bg-black focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;