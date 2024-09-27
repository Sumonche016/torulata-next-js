import Image from "next/image";

const Images = ({ handleImage, uploadProgress, imageUrl }) => {
  return (
    <div className="border-primary rounded-[10px] p-5 mt-6">
      <h1 className="text-[1.125rem] font-medium mb-5 ">Images:</h1>
      <div className="flex gap-4 text-[15px] font-medium">
        <div className="basis-[70%] ">
          <div className="mt-4">
            {/* <label className="text-[0.875rem]  mb-1 inline-block font-medium mr-2">
                            Full Image :
                        </label> */}

            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Full Image
            </label>
            <input
              onChange={(event) => handleImage(event)}
              className="border-2 border-gray-300  border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
              id="file_input"
              type="file"
            />

            {/* <input className='border border-prim' type="file" /> */}
          </div>
          {uploadProgress > 0 && (
            <div className="progress-wrapper mt-3">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              >
                <span className="sr-only">{uploadProgress}% Complete</span>
              </div>
            </div>
          )}
        </div>
        {imageUrl && (
          <div className="basis-[30%]">
            <Image
              src={imageUrl}
              className="rounded-[10px]"
              alt="gf"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Images;
