const InputFeild = ({ label, name, register, require, type }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[0.875rem] mb-1 inline-block font-medium"
      >
        {label}
      </label>

      <input
        onFocus={(e) =>
          e.target.addEventListener(
            "wheel",
            function (e) {
              e.preventDefault();
            },
            { passive: false }
          )
        }
        {...register(name, { required: require })}
        class="block w-full h-12 border px-3 py-1 text-sm focus:outline-none  leading-5 rounded-md bg-white   border-gray-200 "
        type={type}
        id={name}
      />
    </div>
  );
};

export default InputFeild;
