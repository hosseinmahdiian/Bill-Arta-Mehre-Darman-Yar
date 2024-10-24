import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/svg/LOGO.svg";
import { ChengHandler } from "../Functions/Fonctions";

const Acconut = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState({ userName: "", password: "" });
  const [res, setRes] = useState();
  const [eye, setEye] = useState(true);

  return (
    <div className="  h-full bg-white  relative ont-IrSans mt-16 max-w-2xl mx-auto">
      <div className={` block`}>
        <NavLink>
          <img src={logo} alt="" className="mx-auto mb-20 w-56 mt-40 " />
        </NavLink>

        <div className=" ">
          <div className="relative  mx-[20px] ">
            <input
              className="peer px-5 border rounded-[10px] outline-gray-300 h-12 w-full  "
              placeholder=" "
              id="userName"
              name="userName"
              onChange={(e) => ChengHandler(e, setRole)}
            />
            <label
              htmlFor="userName"
              className={`absolute start-1 IrHomama    rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                !!role.userName ? `start-2.5 -top-2 !text-sm` : `top-2.5`
              }`}
            >
              نام کابری
            </label>
          </div>

          <div className="relative mx-[20px]  h-10 mt-5">
            <input
              className="peer border rounded-[10px] outline-gray-300 h-12 w-full px-5"
              placeholder=" "
              id="password"
              name="password"
              type={eye ? "Password" : "text"}
              onChange={(e) => ChengHandler(e, setRole)}
            />
            <label
              htmlFor="password"
              className={`absolute start-1 IrHomama    rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                !!role.password ? `start-2.5 -top-2 !text-sm` : `top-2.5`
              }`}
            >
              رمز عبور
            </label>
            <label
              className={`absolute end-1  w-10 h-full    bg-white px-2 pt-3 mt-1`}
              onClick={() => {
                setEye((i) => !i);
              }}
            >
              {eye ? <IoMdEyeOff /> : <IoMdEye />}
            </label>{" "}
          </div>

          <button
            className={` ${
              !(!!role.userName && role.password.length >= 8)
                ? ` bg-gray-200 text-gray-600`
                : ` bg-blue-500 text-white`
            } w-[calc(100%-40px)] mx-auto h-12  block mt-10 rounded-[10px] pb-2   `}
          >
            ورود
          </button>
        </div>
      </div>
    </div>
  );
};

export default Acconut;
