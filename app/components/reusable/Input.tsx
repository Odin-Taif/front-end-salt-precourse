import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type Props = {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean | string;
  register: UseFormRegister<FieldValues>;
  onFocus?: () => void;
  onBlur?: () => void;
  validate?: FieldValues;
};

function Input({
  id,
  label,
  placeholder,
  type,
  disabled,
  required,
  validate,
  register,
  onFocus,
  onBlur,
}: Props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="w-full relative my-2">
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
          validate: validate,
        })}
        // ref={register({ requried: true, validate: validate })}
        placeholder=""
        type={
          type === "password" ? (passwordShown ? "text" : "password") : type
        }
        className={`peer relative z-10 w-full p-4 pl-4 font-light bg-transparent border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed `}
      />
      {type &&
        type === "password" &&
        (passwordShown ? (
          <AiFillEyeInvisible
            className="absolute top-5 right-5 cursor-pointer z-40"
            size={30}
            onClick={togglePassword}
          />
        ) : (
          <AiFillEye
            className="absolute top-5 right-5 cursor-pointer z-40"
            size={30}
            onClick={togglePassword}
          />
        ))}
      <label
        className={`absolute text-sm duration-150 transform -translate-y-4 top-5 left-4 z-9 origin-[0] peer-placeholder-shown:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
