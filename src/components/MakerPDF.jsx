import React, { useContext, useEffect, useRef, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosCalendar } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import uuid from "react-uuid";
import Logo from "../assets/svg/LOGO.svg";
import { numberToPersianWords, sp } from "../Functions/Fonctions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  consumerDS,
  reducerContext,
  typeOfBillsDS,
  typeOFSellDS,
} from "../context/context";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import Page from "./Page";
import { use } from "react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";

const MakerPDF = () => {
  const newUuid = uuid();
  // const datTime = new Date();
  // let time = {
  //   day: datTime.toLocaleDateString("fa-Ir"),
  //   time: datTime.toLocaleTimeString("en-GB", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   }),
  // };
  const navigate = useNavigate();

  // const reducer = useContext(reducerContext);
  // const [reduce, dispach] = reducer;

  // const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   if (loader) {
  //     document.documentElement.classList.add(`overflow-y-hidden`);
  //   } else {
  //     document.documentElement.classList.remove(`overflow-y-hidden`);
  //   }
  // }, [loader == true]);

  const [dataConsumer, setDataConsumer] = useState();
  const [consumer, setConsumer] = useState(false);
  const [typeOfBills, setTypeOfBills] = useState();
  const [typeOfBill, setTypeOfBill] = useState(false);
  const [billNO, setBillNO] = useState();
  const [date, setDate] = useState();
  const [calendar, setCalendar] = useState(!false);
  const [typeOFSell, setTypeOFSell] = useState();
  const [sell, setSell] = useState(!false);
  const [billDate, setBillDate] = useState();
  const [text, setText] = useState();
  const [Discription, setDiscription] = useState(!false);
  const [product, setProduct] = useState({
    IRC: "",
    LotNO: "",
    discription: "",
    number: 0,
    off: 0,
    pay: 0,
    text: "",
    unit: "",
  });
  const [products, setProducts] = useState([]);
  // let refs = [{ ref: useRef() }];

  // const ref1 = useRef();
  // console.log(ref1);

  // const ref2 = useRef();
  const disabalBTN =
    !!product?.discription &&
    !!product?.number &&
    !!product?.unit &&
    !!product?.pay;

  // console.log(Math.ceil(11 / 10 - 1));
  // const [refs, setRefs] = useState([]);

  // useEffect(() => {
  //   const requiredRefsCount = Math.ceil(products.length / 10);
  //   setRefs((prevRefs) => {
  //     if (requiredRefsCount > prevRefs.length) {
  //       // اضافه کردن ارجاعات جدید
  //       return [
  //         ...prevRefs,
  //         ...Array.from(
  //           { length: requiredRefsCount - prevRefs.length },
  //           () => ({ ref: React.createRef() })
  //         ),
  //       ];
  //     } else if (requiredRefsCount < prevRefs.length) {
  //       // حذف ارجاعات اضافی
  //       return prevRefs.slice(0, requiredRefsCount);
  //     }
  //     return prevRefs;
  //   });
  // }, [products]);

  useEffect(() => {
    !calendar && setCalendar((i) => !i);
  }, [date?.CreationDate]);

  useEffect(() => {
    !sell && setSell((i) => !i);
  }, [billDate?.dateOver]);

  useEffect(() => {
    const employee = JSON.parse(sessionStorage.getItem("bill"));
    if (!employee) {
      navigate("/");
      console.log(employee);
    }
  }, []);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: billNO,
    // fonts: {
    //   family: "IRANSansFaNum",
    //   source: "../assets/fonts/IranSans/IRANSansFaNum.ttf",
    // },
  });

  return (
    <>
      {/* modal ============================================================== */}
      <div>
        <div
          className={`${
            !false ? `hidden` : `fixed`
          }   bg-black top-0 h-screen w-full bg-opacity-30  right-0 z-20 `}
        >
          <div className=" rounded-xl w-80 h-80 bg-white !bg-opacity-100 top-1/4 right-0 left-0 fixed z-40 mx-auto ">
            <img src={Logo} alt="" className="mx-auto mt-16 " />
            <h1 className=" mt-5 mx-auto w-fit">درحال ساخت PDF </h1>
            <BarLoader
              color="#0909A3"
              width={180}
              height={5}
              className=" mt-20 mx-auto"
            />
          </div>
        </div>
        <div
          className={`${
            calendar ? `hidden` : `fixed`
          }   bg-black top-0 h-screen w-full opacity-30  right-0 z-20`}
          onClick={() => {
            !calendar && setCalendar((i) => !i);
          }}
        ></div>
        <div
          className={`${
            sell ? `hidden` : `fixed`
          }   bg-black top-0 h-screen w-full opacity-30  right-0 z-20`}
          onClick={() => {
            !sell && setSell((i) => !i);
          }}
        ></div>
        <div
          className={`${
            Discription ? `hidden` : `fixed`
          }   bg-black top-0 h-screen w-full opacity-30  right-0 z-20`}
          onClick={() => {
            !Discription && setDiscription((i) => !i);
          }}
        ></div>
        <div className="  relative mx-2">
          <Calendar
            className={` p-5 border fixed right-0 left-0 mx-auto  top-1/4  rounded-[10px] ease-in-out  z-50 
                 ${calendar && `hidden `}
                 `}
            value={date?.CreationDate}
            id="expirDate"
            name="expirDate"
            calendar={persian}
            locale={persian_fa}
            // minDate={new Date()}
            calendarPosition="bottom-right"
            onChange={(date) => {
              setDate({
                CreationDate: `${date?.year}/${date?.month.number}/${date?.day}`,
              });
            }}
          />
        </div>
        <div className="  relative mx-2 ">
          <div
            className={`bg-white  p-5 border fixed right-0 left-0 mx-auto  top-1/4 w-[600px]  rounded-[10px] ease-in-out  z-50 
                 ${sell && `hidden `}
                 `}
          >
            <p className="text-center">نحوه فروش را وارد کنید</p>
            {typeOFSellDS?.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-2"
                onClick={() => setTypeOFSell(i)}
              >
                {i.id == typeOFSell?.id ? (
                  <BsCheck2Circle className="mt-1.5" />
                ) : (
                  <MdRadioButtonUnchecked className="mt-1.5" />
                )}
                <h1>{i.title}</h1>
              </div>
            ))}
            {typeOFSell?.id == 4 && (
              <Calendar
                className={` p-5  mx-auto border-none rounded-[10px] `}
                value={billDate?.dateOver}
                id="expirDate"
                name="expirDate"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                onChange={(date) => {
                  setBillDate(() => ({
                    dateOver: `${date?.year}/${date?.month.number}/${date?.day}`,
                  }));
                }}
              />
            )}
            <button
              className="w-[calc(100%-20px)] mx-auto  h-12 bg-blue-500 block  mt-5 rounded-[10px] text-white "
              onClick={() => {
                setSell((i) => !i);
              }}
            >
              ذخیره اطلاعات
            </button>
          </div>
        </div>
        <div className="  relative mx-2 ">
          <div
            className={`bg-white  p-5 border fixed right-0 left-0 mx-auto  top-1/4 w-[600px]  rounded-[10px] ease-in-out  z-50 
                ${Discription && `hidden `}
                `}
          >
            <p className="text-center">توضیحات را وارد کنید</p>
            <textarea
              className="w-full mx-auto min-h-40 px-5 border mt-10 rounded-[10px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
              className="w-full mx-auto  h-12 bg-blue-500 block  mt-5 rounded-[10px] text-white "
              onClick={() => {
                setDiscription((i) => !i);
              }}
            >
              ذخیره اطلاعات
            </button>
          </div>
        </div>
      </div>
      {/* tools  ====================================================================== */}
      <div className=" max-w-7xl  min-w-[80rem]  mx-auto ">
        <div className="flex w-full justify-between  mx-auto  mt-4 text-center">
          <div className="flex gap-2  child:w-36 child:border child:border-black child:px-4 child:h-8 child:pt-0.5 child:rounded-[10px] ">
            <div
              className="relative flex items-center justify-center gap-2 pb-2 "
              onClick={() => setConsumer((i) => !i)}
            >
              {!!dataConsumer ? (
                <h1 className="text-nowrap text-sm mt-1 ">
                  {dataConsumer.title}
                </h1>
              ) : (
                <h2>خریدار</h2>
              )}
              {!consumer ? (
                <IoIosArrowDown className="mt-1.5" />
              ) : (
                <IoIosArrowUp className="mt-1.5" />
              )}
              <div
                className={` ${
                  consumer ? `absolute` : `hidden`
                } absolute top-14 border w-36 right-0 rounded-xl bg-white child-hover:bg-slate-200 child:py-1 z-20 `}
              >
                {consumerDS?.map((i, index) => (
                  <h2 key={index} onClick={() => setDataConsumer(i)}>
                    {i.title}
                  </h2>
                ))}
              </div>
            </div>
            <div
              className="relative flex items-center justify-center gap-2 pb-2 "
              onClick={() => setTypeOfBill((i) => !i)}
            >
              {!!typeOfBills ? (
                <h1 className="text-nowrap text-sm mt-1 ">
                  {typeOfBills.title}
                </h1>
              ) : (
                <h2>نوع فاکتور</h2>
              )}
              {!typeOfBill ? (
                <IoIosArrowDown className="mt-1.5" />
              ) : (
                <IoIosArrowUp className="mt-1.5" />
              )}
              <div
                className={` ${
                  typeOfBill ? `absolute` : `hidden`
                } absolute top-14 border w-36 right-0 rounded-xl bg-white child-hover:bg-slate-200 child:py-1 z-20 `}
              >
                {typeOfBillsDS?.map((i, index) => (
                  <h2 key={index} onClick={() => setTypeOfBills(i)}>
                    {i.title}
                  </h2>
                ))}
              </div>
            </div>
            <div className=" relative !pt-0 ">
              <input
                className="peer  h-5  rounded-[10px] outline-none   w-full mt-2  "
                placeholder=" "
                id="BillNO"
                name="BillNO"
                onChange={(e) => setBillNO(e.target.value)}
              />
              <label
                htmlFor="BillNO"
                className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                  !!billNO ? `start-2.5 -top-2 !text-[12px]` : `top-0.5`
                }`}
              >
                شماره فاکتور
              </label>
            </div>
            <div
              onClick={() => setCalendar((i) => !i)}
              className="flex gap-2 pb-2 items-center justify-center "
            >
              <IoIosCalendar />
              {!!date?.CreationDate ? (
                <h1 className="text-nowrap text-sm mt-1 ">
                  {date?.CreationDate}
                </h1>
              ) : (
                <h2> تاریخ</h2>
              )}
            </div>
            <div className="" onClick={() => setSell((i) => !i)}>
              {!!typeOFSell?.title ? (
                <h1 className="text-nowrap text-sm mt-1 ">
                  {typeOFSell.title}
                </h1>
              ) : (
                <h2>نحوه فروش</h2>
              )}
            </div>

            <div className="" onClick={() => setDiscription((i) => !i)}>
              توضیحات
            </div>
          </div>
          <div
            className="border w-40 cursor-pointer border-black px-4 pt-0.5 rounded-[10px]"
            onClick={() => {
              products.length > 0 && reactToPrintFn();
              products.length == 0 && toast.error("سطری وارد نکردید");
            }}
          >
            خروجی PDF
          </div>
        </div>
        {/* ======================================================= */}
        <div className="flex items-center justify-between w-full">
          <div className="">
            <div className="flex items-center gap-2 mt-10">
              <div className=" relative   border border-black  rounded-[10px] w-40">
                <input
                  className="peer  border rounded-[10px] outline-none px-3 border-none h-8 w-full  "
                  placeholder=" "
                  value={!!product?.IRC ? product?.IRC : ""}
                  id="IRC"
                  name="IRC"
                  onChange={(e) =>
                    setProduct((data) => ({ ...data, IRC: e.target.value }))
                  }
                />
                <label
                  htmlFor="IRC"
                  className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.IRC ? `start-2.5 -top-2 !text-[12px]` : `top-1`
                  }`}
                >
                  IRC
                </label>
              </div>
              <div className=" relative  border border-black  rounded-[10px] w-[450px]">
                <input
                  className="peer  border rounded-[10px] outline-none px-3 border-none h-8 w-full  "
                  placeholder=" "
                  value={!!product?.discription ? product?.discription : ""}
                  id="discription"
                  name="discription"
                  onChange={(e) =>
                    setProduct((data) => ({
                      ...data,
                      discription: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="discription"
                  className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.discription
                      ? `start-2.5 -top-2 !text-[12px]`
                      : `top-1`
                  }`}
                >
                  شرح
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-20">
                <input
                  className="peer  border rounded-[10px] outline-none px-3 border-none h-8 w-full  "
                  placeholder=" "
                  value={!!product?.LotNO ? product?.LotNO : ""}
                  id="LotNO"
                  name="LotNO"
                  onChange={(e) =>
                    setProduct((data) => ({ ...data, LotNO: e.target.value }))
                  }
                />
                <label
                  htmlFor="LotNO"
                  className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.LotNO ? `start-2.5 -top-2 !text-[12px]` : `top-1`
                  }`}
                >
                  Lot NO
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-16">
                <input
                  className="peer  border rounded-[10px] outline-none px-3 border-none h-8 w-full  "
                  placeholder=" "
                  value={!!product?.number ? product?.number : ""}
                  id="number"
                  name="number"
                  type="number"
                  onChange={(e) =>
                    setProduct((data) => ({ ...data, number: e.target.value }))
                  }
                />
                <label
                  htmlFor="number"
                  className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.number
                      ? `start-2.5 -top-2 !text-[12px]`
                      : `top-1`
                  }`}
                >
                  مقدار
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-16">
                <input
                  className="peer  border rounded-[10px] outline-none px-3 border-none h-8 w-full  "
                  placeholder=" "
                  value={!!product?.unit ? product?.unit : ""}
                  id="unit"
                  name="unit"
                  onChange={(e) =>
                    setProduct((data) => ({ ...data, unit: e.target.value }))
                  }
                />
                <label
                  htmlFor="unit"
                  className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.unit ? `start-2.5 -top-2 !text-[12px]` : `top-1`
                  }`}
                >
                  واحد
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-40">
                <input
                  className="peer  border rounded-[10px] outline-none px-3 border-none h-8 w-full  "
                  placeholder=" "
                  value={!!product?.pay ? product?.pay : ""}
                  id="pay"
                  name="pay"
                  type="number"
                  onChange={(e) =>
                    setProduct((data) => ({ ...data, pay: e.target.value }))
                  }
                />
                <label
                  htmlFor="pay"
                  className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.pay ? `start-2.5 -top-2 !text-[12px]` : `top-1`
                  }`}
                >
                  بهای واحد
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-20">
                <input
                  className="peer  border rounded-[10px] outline-none px-3 border-none h-8 w-full  "
                  placeholder=" "
                  value={!!product?.off ? product?.off : ""}
                  id="off"
                  name="off"
                  type="number"
                  onChange={(e) =>
                    setProduct((data) => ({ ...data, off: e.target.value }))
                  }
                />
                <label
                  htmlFor="off"
                  className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.off ? `start-2.5 -top-2 !text-[12px]` : `top-1`
                  }`}
                >
                  تخفیف
                </label>
              </div>
            </div>
            <div className=" relative mt-2  border border-black  rounded-[10px] w-full">
              <input
                className="peer  border rounded-[10px] outline-none px-3 border-none h-8 w-full  "
                placeholder=" "
                value={!!product?.text ? product?.text : ""}
                id="text"
                name="text"
                onChange={(e) =>
                  setProduct((data) => ({ ...data, text: e.target.value }))
                }
              />
              <label
                htmlFor="text"
                className={`absolute start-1     rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                  !!product?.text ? `start-2.5 -top-2 !text-[12px]` : `top-1`
                }`}
              >
                توضیحات
              </label>
            </div>
          </div>
          <button
            disabled={!disabalBTN}
            className={`w-40   h-9   block pb-1.5  rounded-[10px] cursor-pointer ${
              !!product?.discription &&
              !!product?.number &&
              !!product?.unit &&
              !!product?.pay
                ? `bg-blue-500 text-white `
                : `bg-gray-100 text-gray-800 `
            } `}
            onClick={() => {
              setProducts((i) => [...i, { id: newUuid, ...product }]);
              setProduct({
                IRC: "",
                LotNO: "",
                discription: "",
                number: 0,
                off: 0,
                pay: 0,
                text: "",
                unit: 0,
              });
            }}
          >
            افزودن
          </button>
        </div>
      </div>
      {/* =================================================================================================================================================== */}

      <div>
        {console.log(products)}
        <div ref={contentRef}>
          {products.map(
            (product, index) =>
              index % 10 == 0 && (
                <Page
                  key={index}
                  // useRef={refs}
                  billNO={billNO}
                  CreationDate={date?.CreationDate}
                  typeOfBills={typeOfBills}
                  dataConsumer={dataConsumer}
                  products={products}
                  billDate={billDate}
                  typeOFSell={typeOFSell}
                  text={text}
                  setProducts={setProducts}
                  numberToPersianWords={numberToPersianWords}
                  page={index / 10 + 1}
                />
              )
          )}
        </div>
        {products.length == 0 && (
          <Page
            // useRef={refs}
            billNO={billNO}
            CreationDate={date?.CreationDate}
            typeOfBills={typeOfBills}
            dataConsumer={dataConsumer}
            products={products}
            billDate={billDate}
            typeOFSell={typeOFSell}
            text={text}
            setProducts={setProducts}
            numberToPersianWords={numberToPersianWords}
            page={0}
          />
        )}
      </div>
    </>
  );
};

export default MakerPDF;
