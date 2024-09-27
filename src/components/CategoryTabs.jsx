import Link from "next/link";

const CategoryTabs = ({ searchParams, categories }) => {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-end md:gap-4 gap-2">
      {categories.map((category) => (
        <Link
          scroll={false}
          key={category.value}
          href={`/?category=${category.value}&limit=${
            searchParams.limit ? searchParams.limit : 20
          }&skip=0`}
        >
          <button
            className={`rounded-lg text-[13px] md:text-[.95rem] px-[18px] md:px-[27px] py-[8px] font-medium ${
              searchParams.category === category.value ||
              (!searchParams.category && category.value === "")
                ? "bg-[#166e21] text-white"
                : "bg-white"
            }`}
          >
            {category.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default CategoryTabs;
