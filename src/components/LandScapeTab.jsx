import Link from "next/link";

const LandScapeTab = ({ searchParams, categories }) => {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-end md:gap-4 gap-2">
      {categories.map((category) => (
        <Link
          scroll={false}
          key={category.value}
          href={`/?category=${searchParams?.category || ""}&landScape=${
            category.value
          }`}
        >
          <button
            className={`rounded-lg text-[13px] md:text-[.95rem] px-[18px] md:px-[27px] py-[8px] font-medium ${
              searchParams.landScape === category.value ||
              (!searchParams.landScape && category.value === "ছাদ বাগান")
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

export default LandScapeTab;
