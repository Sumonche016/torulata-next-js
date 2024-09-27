import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

const Tags = ({ englishTag, setEnglishTags, banglaTags, setBanglaTags }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleEnglishSubmit = (data) => {
    const id = Math.floor(Math.random() * 100);
    const newTag = { id: id, tag: data.englishTag };
    setEnglishTags((prevTags) => [...prevTags, newTag]);
  };

  const handleBanglaSubmit = (data) => {
    const id = Math.floor(Math.random() * 100);
    const newTag = { id: id, tag: data.banglaTag };
    setBanglaTags((prevTags) => [...prevTags, newTag]);
  };

  const handleKeyDownEnglish = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(handleEnglishSubmit)();
      reset();
    }
  };

  const handleKeyDownBangla = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(handleBanglaSubmit)();
      reset();
    }
  };

  const handleDeleteTag = (id) => {
    const updateArray = englishTag.filter((element) => element.id !== id);
    setEnglishTags(updateArray);
  };

  const handleDeleteTagBangla = (id) => {
    const updateArray = banglaTags.filter((element) => element.id !== id);
    setBanglaTags(updateArray);
  };

  return (
    <div className="bg-white border-primary rounded-[10px] p-5">
      <h1 className="mb-5">Tags:</h1>

      <div className="flex flex-wrap gap-2 text-[15px] font-medium mb-3">
        {englishTag.length !== 0 &&
          englishTag?.map((element) => {
            return (
              <div
                key={element.id}
                className="bg-[#E6E6E6] rounded-md flex items-center mb-2"
              >
                <p className="p-[3px] pl-[6px]"> {element.tag}</p>
                <div
                  onClick={() => handleDeleteTag(element.id)}
                  className="hover:bg-[#FFBDAD] hover:text-[#DE350B] cursor-pointer h-full flex justify-center items-center"
                >
                  <RxCross2 className="hover:text-[#DE350B] p-[4px]" />
                </div>
              </div>
            );
          })}
      </div>

      <div>
        <form onSubmit={handleSubmit(handleEnglishSubmit)}>
          <div>
            <label
              htmlFor="englishTag"
              className="text-[0.875rem] mb-1 inline-block font-medium"
            >
              English Tag
            </label>

            <input
              onKeyDown={handleKeyDownEnglish}
              {...register("englishTag")}
              className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-white border-gray-200"
              type="text"
              id="englishTag"
            />
          </div>
        </form>
      </div>

      {/* for bangla  */}

      <form onSubmit={handleSubmit(handleBanglaSubmit)} className="mt-4">
        <div>
          <label
            htmlFor="banglaTag"
            className="text-[0.875rem] mb-1 inline-block font-medium"
          >
            Bangla
          </label>

          <div className="flex flex-wrap gap-2 text-[15px] font-medium mb-3">
            {banglaTags.length !== 0 &&
              banglaTags?.map((element) => {
                return (
                  <div
                    key={element.id}
                    className="bg-[#E6E6E6] rounded-md flex items-center mb-2"
                  >
                    <p className="p-[3px] pl-[6px]"> {element.tag}</p>
                    <div
                      onClick={() => handleDeleteTagBangla(element.id)}
                      className="hover:bg-[#FFBDAD] hover:text-[#DE350B] cursor-pointer h-full flex justify-center items-center"
                    >
                      <RxCross2 className="hover:text-[#DE350B] p-[4px]" />
                    </div>
                  </div>
                );
              })}
          </div>

          <input
            onKeyDown={handleKeyDownBangla}
            {...register("banglaTag")}
            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-white border-gray-200"
            type="text"
            id="banglaTag"
          />
        </div>
      </form>
    </div>
  );
};

export default Tags;
