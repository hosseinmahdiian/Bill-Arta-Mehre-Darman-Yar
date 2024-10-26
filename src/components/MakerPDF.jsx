import React, { useContext, useEffect, useRef, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosCalendar,
  IoMdClose,
} from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import uuid from "react-uuid";
import Logo from "../assets/svg/LOGO.svg";
import { numberToPersianWords, sp } from "../Functions/Fonctions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { reducerContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const typeOfBillsDS = [
  { title: "پیش فاکتور", id: 1 },
  { title: "فاکتور فروش", id: 2 },
];

const typeOFSellDS = [
  { title: "نقدی", id: 1 },
  { title: "غیر نقدی", id: 2 },
  { title: "سایت", id: 3 },
  { title: "سر رسید ", id: 4 },
];

const consumerDS = [
  {
    title: "بیمارستان عشایر",
    addres: "  لرستان - خرم آباد - خیابان انقلاب بیمارستان شهدای عشایر",
    id: 14013528778,
    tell: "06633236401",
    nationalID: 14002438448,
    economic: 411399958955,
    addCode: 6816991451,
  },
];

const MakerPDF = () => {
  const newUuid = uuid();
  let sumNum = 0;
  let sumPay = 0;
  let sumOff = 0;
  // let lodaer = false;
  const datTime = new Date();
  let time = {
    day: datTime.toLocaleDateString("fa-Ir"),
    time: datTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  const navigate = useNavigate();

  const reducer = useContext(reducerContext);
  const [reduce, dispach] = reducer;

  const [loadaer, setLoader] = useState(false);

  // useEffect(() => {
  //   if (!reduce.Login) {
  //     navigate("/");
  //   }
  // }, []);

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
  const [products, setProducts] = useState([
    {
      id: "a57d2c70-d973-6476-1627-f8873af59688",
      IRC: "234",
      LotNO: "234",
      discription: "sdgsd",
      number: "23",
      off: "23424",
      pay: "234234234234",
      text: "2342342342342342",
      unit: "3",
    },
    {
      id: "08aed9ae-23b5-9f91-e82b-b39b250b80c0",
      IRC: "23423",
      LotNO: "342",
      discription: "42342",
      number: "423",
      off: "23423423423",
      pay: "234234234",
      text: "4234234",
      unit: "23",
    },
    {
      id: "e1d624e9-15a6-eec2-264a-8f61bda3faa2",
      IRC: "3242",
      LotNO: "4234",
      discription: "242",
      number: "243234",
      off: "442323",
      pay: "23423",
      text: "4234324234",
      unit: "4234234",
    },
    {
      id: "43a19e64-b57e-3361-3fde-c890e57c772c",
      IRC: "234234",
      LotNO: "23",
      discription: "324423",
      number: "23",
      off: "23423423",
      pay: "23423",
      text: "4234",
      unit: "23",
    },
    {
      id: "53da574f-1427-b48e-a251-fadee031d3e5",
      IRC: "234234",
      LotNO: "3432423",
      discription: "234",
      number: "2423",
      off: "234",
      pay: "4234",
      text: "234234423423",
      unit: "23",
    },
    {
      id: "e1d624e9-15a6-eec2-264a-8f61bda3faa2",
      IRC: "3242",
      LotNO: "4234",
      discription: "242",
      number: "243234",
      off: "442323",
      pay: "23423",
      text: "4234324234",
      unit: "4234234",
    },
    {
      id: "43a19e64-b57e-3361-3fde-c890e57c772c",
      IRC: "234234",
      LotNO: "23",
      discription: "324423",
      number: "23",
      off: "23423423",
      pay: "23423",
      text: "4234",
      unit: "23",
    },
    {
      id: "53da574f-1427-b48e-a251-fadee031d3e5",
      IRC: "234234",
      LotNO: "3432423",
      discription: "234",
      number: "223423",
      off: "234",
      pay: "4234",
      text: "234234423423",
      unit: "23",
    },
  ]);

  const ref1 = useRef();
  const ref2 = useRef();
  const diabalBTN =
    !!product?.discription &&
    !!product?.number &&
    !!product?.unit &&
    !!product?.pay;

  products?.map((i) => {
    sumNum = Number(i?.number) + Number(sumNum);
    sumOff = Number(i?.off) + Number(sumOff);
    sumPay = Number(i?.number) * Number(i?.pay) + Number(sumPay);
  });

  const handelPDF1 = async () => {
    const input1 = ref1.current;

    try {
      const canvas = await html2canvas(input1, { scale: 1 });
      const imageData = canvas.toDataURL("image/png");
      const PDF = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
        compress: true,
      });

      const width = PDF.internal.pageSize.getWidth();
      const heigth = (canvas.height * width) / canvas.width;

      PDF.addImage(imageData, "PNG", 0, 0, width, heigth);
      PDF.save(`${billNO}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };
  const handelPDF2 = async () => {
    setLoader((i) => !i);
    const input1 = ref1.current;
    const input2 = ref2.current;

    try {
      const PDF = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
        compress: true,
      });

      const canvas1 = await html2canvas(input1, { scale: 1 });
      const imageData1 = canvas1.toDataURL("image/png");
      const width1 = PDF.internal.pageSize.getWidth();
      const heigth1 = (canvas1.height * width1) / canvas1.width;
      PDF.addImage(imageData1, "PNG", 0, 0, width1, heigth1);

      PDF.addPage();

      const canvas2 = await html2canvas(input2, { scale: 1 });
      const imageData2 = canvas2.toDataURL("image/png");
      const width2 = PDF.internal.pageSize.getWidth();
      const heigth2 = (canvas2.height * width2) / canvas2.width;
      PDF.addImage(imageData2, "PNG", 0, 0, width2, heigth2);

      PDF.save(`${billNO}.pdf`);
    } catch (error) {
      console.log(error);
    }
    setLoader((i) => !i);
  };

  useEffect(() => {
    console.log(loadaer);
  }, [loadaer]);
  return (
    <>
      <div
        className={`${
          !loadaer ? `hidden` : `fixed`
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
          <Calendar
            className={` p-5  mx-auto border-none rounded-[10px] `}
            value={billDate?.dateOver}
            id="expirDate"
            name="expirDate"
            calendar={persian}
            locale={persian_fa}
            // minDate={new Date()}
            calendarPosition="bottom-right"
            onChange={(date) => {
              setBillDate(() => ({
                dateOver: `${date?.year}/${date?.month.number}/${date?.day}`,
              }));
            }}
          />
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
      <div className=" max-w-7xl  min-w-[80rem]  mx-auto">
        <div className=" w-full     ">
          <div className="flex  justify-between  mx-auto  mt-4 text-center">
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
                  {consumerDS?.map((i) => (
                    <h2 key={i.id} onClick={() => setDataConsumer(i)}>
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
                  {typeOfBillsDS?.map((i) => (
                    <h2 key={i.id} onClick={() => setTypeOfBills(i)}>
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
              className="border w-40 border-black px-4 pt-0.5 rounded-[10px]"
              onClick={() =>
                products?.length > 5 ? handelPDF2() : handelPDF1()
              }
            >
              خروجی PDF
            </div>
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
            disabled={!diabalBTN}
            className={`w-40   h-9   block pb-1.5  rounded-[10px] ${
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
      {products.length > 6 ? (
        <>
          <div
            className="border-t my-5 max-w-7xl  min-w-[80rem] mx-auto px-5  "
            ref={ref1}
          >
            <div className="flex items-center justify-between  mt-5 relative">
              <div>
                <div>
                  شماره فاکتور : <span className="  ">{billNO}</span>
                </div>
                <div>
                  تاریخ صدور :
                  <span className=" pr-2">{date?.CreationDate}</span>
                </div>
                <div>صفحه2 از 1</div>
              </div>
              <div className=" absolute right-0 left-0 mx-auto w-fit ">
                <h1 className="mx-auto w-fit font-bold mb-3 ">
                  {!!typeOfBills?.title ? typeOfBills?.title : "فاکتور"}
                </h1>
                <p>شرکت تجهیزات پزشکی آرتا مهر درمان یار</p>
              </div>
              <img src={Logo} alt="" />
            </div>

            {/* header ==================================================================================================== */}

            <div>
              <div className="border border-black rounded-2xl overflow-hidden relative h-16 mt-2">
                <div className="border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 ">
                  فروشنده
                </div>
                <div className="flex justify-between mx-9 my-1.5">
                  <div className="text-sm ">
                    <p className="mb-2">
                      نام فروشنده : شرکت آرتا مهر درمان یار
                    </p>
                    <p>
                      آدرس : لرستان - خرم آباد - شهرک صنعتی شماره یک - خیابان
                      ابتکار 4
                    </p>
                  </div>
                  <div className="text-sm ">
                    <p className="mb-2">شماره کارت ملت : 6104338800754794</p>
                    <p>شماره شبای ملت : IR 730120000000002292606004</p>
                  </div>
                  <div className="text-sm ">
                    <p className="mb-2"> شناسه ملی : 14013528778</p>
                    <p> تلفن : 09216919291 </p>
                  </div>
                  <div className="text-sm ">
                    <p className="mb-2">کدپستی : 14013528778</p>
                    <p>شماره اقتصادی : 092116919261 </p>
                  </div>
                </div>
              </div>

              <div className="border border-black rounded-2xl overflow-hidden relative h-16 mt-2">
                <div className="border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 ">
                  خریدار
                </div>
                <div className="flex justify-between mx-9 my-1.5 ">
                  <div className="text-sm ">
                    <p className="mb-2">
                      نام فروشنده :
                      <span className="">{dataConsumer?.title}</span>
                    </p>
                    <p>
                      آدرس :<span className="">{dataConsumer?.addres}</span>
                    </p>
                  </div>

                  <div className="text-sm ">
                    <p className="mb-2">
                      شناسه ملی :
                      <span className="">{dataConsumer?.nationalID}</span>
                    </p>
                    <p>
                      تلفن :<span className="">{dataConsumer?.tell}</span>
                    </p>
                  </div>
                  <div className="text-sm ">
                    <p className="mb-2">
                      کدپستی :<span className="">{dataConsumer?.addCode}</span>
                    </p>
                    <p>
                      شماره اقتصادی :
                      <span className="">{dataConsumer?.economic}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/*body======================================================================================================== */}
            <div className="border border-black rounded-2xl overflow-hidden relative  mt-2">
              <div className="flex justify-between  mt-2">
                <div></div>
                <div className="absolute m-auto right-0 left-0  w-fit">
                  مشخصات کالا یا خدمات مورد معامله
                </div>
                <div className="ml-5"> مبالغ به ریال است</div>
              </div>
              <div className=" border-black  overflow-hidden relative  mt-2  ">
                <div className="bg-[#f2f2f2]">
                  <div className=" text-sm pt-[1px]  border-black w-10 h-12 absolute -right-5 -top-1 text-center   -rotate-90 ">
                    ردیف
                  </div>
                  <div className="flex   border-y border-black border-opacity-50 h-10 ">
                    <div className=" w-6  border-l text-center text-nowrap text-sm borde  py-2.5 border-black"></div>
                    <div className=" w-44 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      IRC
                    </div>
                    <div className=" w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      شرح کالا یا خدمات
                    </div>
                    <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      Lot NO
                    </div>
                    <div className=" w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      مقدار
                    </div>
                    <div className=" w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      واحد
                    </div>
                    <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      بهای واحد
                    </div>
                    <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      بهای کل
                    </div>
                    <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      تخفیف
                    </div>
                    <div className=" w-36 text-center text-nowrap text-sm   py-2.5 border-black">
                      قابل پرداخت
                    </div>
                  </div>
                </div>
                <div>
                  {!!products?.length > 0 ? (
                    products.map(
                      (i, index) =>
                        index < 6 && (
                          <div
                            className={` ${
                              index % 2 != 0 ? `bg-[#f2f2f2]` : ``
                            } relative`}
                            key={index}
                          >
                            <div
                              className=" text-sm    border-black w-6 h-10 absolute -right- -top- text-center    "
                              onClick={() =>
                                setProducts(
                                  products.filter((item) => item.id != i.id)
                                )
                              }
                            >
                              <p className="pt-2.5">{index + 1}</p>
                            </div>
                            <div className="flex    border-b border-black border-opacity-50 h-10 ">
                              <div className=" w-6   text-center text-nowrap text-sm border-l  py-2.5 border-black"></div>
                              <div className=" w-44  text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.IRC}
                              </div>
                              <div className=" w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.discription}
                              </div>
                              <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.LotNO}
                              </div>
                              <div className=" w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.number}
                              </div>
                              <div className=" w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.unit}
                              </div>
                              <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {sp(i?.pay)}
                              </div>
                              <div className=" w-32  text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {sp(i?.pay * i?.number)}
                              </div>
                              <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {sp(i?.off)}
                              </div>
                              <div className=" w-36 text-center text-nowrap text-sm   py-2.5 border-black">
                                {sp(i?.pay * i?.number - i?.off)}
                              </div>
                            </div>
                            {!!i?.text && (
                              <div className="border-b border-black px-4 text-justify">
                                {" "}
                                توضیحات : {i?.text}
                              </div>
                            )}
                          </div>
                        )
                    )
                  ) : (
                    <p className=" text-center border-b border-black py-2">
                      محصولی برای ارائه وجود ندارد
                    </p>
                  )}
                </div>
                <div className="  ">
                  <div className="flex justify-between ">
                    <span className="flex   gap-6 pt-2 pr-2">
                      نحوه فروش :
                      {typeOFSellDS.map((i, index) => (
                        <span
                          key={index}
                          className={`${
                            typeOFSell?.id == i?.id
                              ? `text-black  font-bold`
                              : `text-gray-500`
                          }`}
                        >
                          {i.title}
                        </span>
                      ))}
                      <p className="">{billDate?.dateOver}</p>
                    </span>
                    <div className="flex  ">
                      <span className=" border-l border-black pt-1.5 pl-3">
                        جمع فاکتور
                      </span>
                      <div className="   w-[52px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sp(sumNum)}
                      </div>
                      <div className="   w-[164px] text-center text-nowrap text-sm border-l py-2.5 border-black"></div>
                      <div className="   w-[119px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sp(sumPay)}
                      </div>
                      <div className="    w-[105px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sumOff}
                      </div>
                      <div className="    w-36 -mr-2.5 text-center text-nowrap text-sm   py-2.5 border-black">
                        {sp(sumPay - sumOff)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* fotter =========================================================================================================== */}
            <div className="flex gap-2 items-center   mt-2">
              <div className="border rounded-2xl border-black w-1/2 h-32 flex justify-between px-5 py-2 text-gray-500">
                <p>مهر وامضای خریدار</p>
                <p>مهر و امضای فروشنده</p>
              </div>
              <div className="border flex rounded-2xl border-black w-1/2 h-32 text-gray-500">
                <div className="w-5/12 border-l border-black h-full text-[12px] relative">
                  <div className="pt-1 text-justify px-2 w-full ">
                    توضیحات : <br />{" "}
                    <span className="text-black w-11/12 ">{text}</span>
                  </div>
                  <div className="w-full absolute bottom-0 py-1 pr-2 border-t border-black">
                    کاربر سیستم : {reduce?.User?.name} {time?.day}{" "}
                    <span> </span>
                    {time?.time}
                  </div>
                </div>
                <div className="w-7/12 child:h-[41px] text-black text-sm">
                  <div className=" flex justify-between px-2 items-center border-b border-black">
                    <span> تخفیف:</span>
                    <span className="">{sp(sumOff)}</span>
                  </div>
                  <div className="flex justify-between px-2 items-center border-b border-black">
                    <span> جمع کل:</span>
                    <span className="">{sp(sumPay)}</span>
                  </div>
                  <div className=" text-justify  px-2 items-center">
                    <p className="inline"> جمع به حروف : </p>
                    <p className=" inline">
                      {numberToPersianWords(sumPay - sumOff)} ریال
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* =-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-==-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-= */}
          <div
            className="border-t my-5 max-w-7xl  min-w-[80rem] mx-auto px-5  "
            ref={ref2}
          >
            <div className="flex items-center justify-between  mt-5 relative">
              <div>
                <div>
                  شماره فاکتور : <span className="  ">{billNO}</span>
                </div>
                <div>
                  تاریخ صدور :
                  <span className=" pr-2">{date?.CreationDate}</span>
                </div>
                <div>صفحه 2 از 2</div>
              </div>
              <div className=" absolute right-0 left-0 mx-auto w-fit ">
                <h1 className="mx-auto w-fit font-bold mb-3 ">
                  {!!typeOfBills?.title ? typeOfBills?.title : "فاکتور"}
                </h1>
                <p>شرکت تجهیزات پزشکی آرتا مهر درمان یار</p>
              </div>
              <img src={Logo} alt="" />
            </div>

            {/* ==================================================================================================== */}

            <div className="border border-black rounded-2xl overflow-hidden relative h-16 mt-2">
              <div className="border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 ">
                فروشنده
              </div>
              <div className="flex justify-between mx-9 my-1.5">
                <div className="text-sm ">
                  <p className="mb-2">نام فروشنده : شرکت آرتا مهر درمان یار</p>
                  <p>
                    آدرس : لرستان - خرم آباد - شهرک صنعتی شماره یک - خیابان
                    ابتکار 4
                  </p>
                </div>
                <div className="text-sm ">
                  <p className="mb-2">شماره کارت ملت : 6104338800754794</p>
                  <p>شماره شبای ملت : IR 730120000000002292606004</p>
                </div>
                <div className="text-sm ">
                  <p className="mb-2"> شناسه ملی : 14013528778</p>
                  <p> تلفن : 09216919291 </p>
                </div>
                <div className="text-sm ">
                  <p className="mb-2">کدپستی : 14013528778</p>
                  <p>شماره اقتصادی : 092116919261 </p>
                </div>
              </div>
            </div>

            <div className="border border-black rounded-2xl overflow-hidden relative h-16 mt-2">
              <div className="border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 ">
                خریدار
              </div>
              <div className="flex justify-between mx-9 my-1.5 ">
                <div className="text-sm ">
                  <p className="mb-2">
                    نام فروشنده :<span className="">{dataConsumer?.title}</span>
                  </p>
                  <p>
                    آدرس :<span className="">{dataConsumer?.addres}</span>
                  </p>
                </div>

                <div className="text-sm ">
                  <p className="mb-2">
                    شناسه ملی :
                    <span className="">{dataConsumer?.nationalID}</span>
                  </p>
                  <p>
                    تلفن :<span className="">{dataConsumer?.tell}</span>
                  </p>
                </div>
                <div className="text-sm ">
                  <p className="mb-2">
                    کدپستی :<span className="">{dataConsumer?.addCode}</span>
                  </p>
                  <p>
                    شماره اقتصادی :
                    <span className="">{dataConsumer?.economic}</span>
                  </p>
                </div>
              </div>
            </div>
            {/*qqqqqqqqqqqqqqqqqqqqqqqqqqqqq======================================================================================================== */}
            <div className="border border-black rounded-2xl overflow-hidden relative  mt-2">
              <div className="flex justify-between  mt-2">
                <div></div>
                <div className="absolute m-auto right-0 left-0  w-fit">
                  مشخصات کالا یا خدمات مورد معامله
                </div>
                <div className="ml-5"> مبالغ به ریال است</div>
              </div>
              <div className=" border-black  overflow-hidden relative  mt-2  ">
                <div className="bg-[#f2f2f2]">
                  <div className=" text-sm pt-[1px]  border-black w-10 h-12 absolute -right-5 -top-1 text-center   -rotate-90 ">
                    ردیف
                  </div>
                  <div className="flex   border-y border-black border-opacity-50 h-10 ">
                    <div className=" w-6  border-l text-center text-nowrap text-sm borde  py-2.5 border-black"></div>
                    <div className=" w-44 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      IRC
                    </div>
                    <div className=" w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      شرح کالا یا خدمات
                    </div>
                    <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      Lot NO
                    </div>
                    <div className=" w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      مقدار
                    </div>
                    <div className=" w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      واحد
                    </div>
                    <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      بهای واحد
                    </div>
                    <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      بهای کل
                    </div>
                    <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      تخفیف
                    </div>
                    <div className=" w-36 text-center text-nowrap text-sm   py-2.5 border-black">
                      قابل پرداخت
                    </div>
                  </div>
                </div>
                <div>
                  {!!products?.length > 0 ? (
                    products.map(
                      (i, index) =>
                        index >= 6 && (
                          <div
                            className={` ${
                              index % 2 != 0 ? `bg-[#f2f2f2]` : ``
                            } relative`}
                            key={index}
                          >
                            <div
                              className=" text-sm    border-black w-6 h-10 absolute -right- -top- text-center    "
                              onClick={() =>
                                setProducts(
                                  products.filter((item) => item.id != i.id)
                                )
                              }
                            >
                              <p className="pt-2.5">{index + 1}</p>
                            </div>
                            <div className="flex    border-b border-black border-opacity-50 h-10 ">
                              <div className=" w-6   text-center text-nowrap text-sm border-l  py-2.5 border-black"></div>
                              <div className=" w-44  text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.IRC}
                              </div>
                              <div className=" w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.discription}
                              </div>
                              <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.LotNO}
                              </div>
                              <div className=" w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.number}
                              </div>
                              <div className=" w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {i?.unit}
                              </div>
                              <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {sp(i?.pay)}
                              </div>
                              <div className=" w-32  text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {sp(i?.pay * i?.number)}
                              </div>
                              <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                                {sp(i?.off)}
                              </div>
                              <div className=" w-36 text-center text-nowrap text-sm   py-2.5 border-black">
                                {sp(i?.pay * i?.number - i?.off)}
                              </div>
                            </div>
                            {!!i?.text && (
                              <div className=" border-b border-black px-4 text-justify">
                                {" "}
                                توضیحات : {i?.text}
                              </div>
                            )}
                          </div>
                        )
                    )
                  ) : (
                    <p className=" text-center border-b border-black py-2">
                      محصولی برای ارائه وجود ندارد
                    </p>
                  )}
                </div>
                <div className="  ">
                  <div className="flex justify-between ">
                    <span className="flex   gap-6 pt-2 pr-2">
                      نحوه فروش :
                      {typeOFSellDS.map((i, index) => (
                        <span
                          key={index}
                          className={`${
                            typeOFSell?.id == i?.id
                              ? `text-black  font-bold`
                              : `text-gray-500`
                          }`}
                        >
                          {i.title}
                        </span>
                      ))}
                      <p className="">{billDate?.dateOver}</p>
                    </span>
                    <div className="flex  ">
                      <span className=" border-l border-black pt-1.5 pl-3">
                        جمع فاکتور
                      </span>
                      <div className="   w-[52px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sp(sumNum)}
                      </div>
                      <div className="   w-[164px] text-center text-nowrap text-sm border-l py-2.5 border-black"></div>
                      <div className="   w-[119px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sp(sumPay)}
                      </div>
                      <div className="    w-[105px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sumOff}
                      </div>
                      <div className="    w-36 -mr-2.5 text-center text-nowrap text-sm   py-2.5 border-black">
                        {sp(sumPay - sumOff)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================================================================== */}
            <div className="flex gap-2 items-center   mt-2">
              <div className="border rounded-2xl border-black w-1/2 h-32 flex justify-between px-5 py-2 text-gray-500">
                <p>مهر وامضای خریدار</p>
                <p>مهر و امضای فروشنده</p>
              </div>
              <div className="border flex rounded-2xl border-black w-1/2 h-32 text-gray-500">
                <div className="w-5/12 border-l border-black h-full text-[12px] relative">
                  <div className="pt-1 text-justify px-2 w-full ">
                    توضیحات : <br />{" "}
                    <span className="text-black w-11/12 ">{text}</span>
                  </div>
                  <div className="w-full absolute bottom-0 py-1 pr-2 border-t border-black">
                    کاربر سیستم : {reduce?.User?.name} {time?.day}{" "}
                    <span> </span>
                    {time?.time}
                  </div>
                </div>
                <div className="w-7/12 child:h-[41px] text-black text-sm">
                  <div className=" flex justify-between px-2 items-center border-b border-black">
                    <span> تخفیف:</span>
                    <span className="">{sp(sumOff)}</span>
                  </div>
                  <div className="flex justify-between px-2 items-center border-b border-black">
                    <span> جمع کل:</span>
                    <span className="">{sp(sumPay)}</span>
                  </div>
                  <div className=" text-justify  px-2 items-center">
                    <p className="inline"> جمع به حروف : </p>
                    <p className=" inline">
                      {numberToPersianWords(sumPay - sumOff)} ریال
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="border-t my-5 max-w-7xl  min-w-[80rem] mx-auto px-5  "
          ref={ref1}
        >
          <div className="flex items-center justify-between  mt-5 relative">
            <div>
              <div>
                شماره فاکتور : <span className="  ">{billNO}</span>
              </div>
              <div>
                تاریخ صدور :<span className=" pr-2">{date?.CreationDate}</span>
              </div>
              <div>صفحه 1 از 1</div>
            </div>
            <div className=" absolute right-0 left-0 mx-auto w-fit ">
              <h1 className="mx-auto w-fit font-bold mb-3 ">
                {!!typeOfBills?.title ? typeOfBills?.title : "فاکتور"}
              </h1>
              <p>شرکت تجهیزات پزشکی آرتا مهر درمان یار</p>
            </div>
            <img src={Logo} alt="" />
          </div>

          {/*  header ==================================================================================================== */}

          <div>
            <div className="border border-black rounded-2xl overflow-hidden relative h-16 mt-2">
              <div className="border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 ">
                فروشنده
              </div>
              <div className="flex justify-between mx-9 my-1.5">
                <div className="text-sm ">
                  <p className="mb-2">نام فروشنده : شرکت آرتا مهر درمان یار</p>
                  <p>
                    آدرس : لرستان - خرم آباد - شهرک صنعتی شماره یک - خیابان
                    ابتکار 4
                  </p>
                </div>
                <div className="text-sm ">
                  <p className="mb-2">شماره کارت ملت : 6104338800754794</p>
                  <p>شماره شبای ملت : IR 730120000000002292606004</p>
                </div>
                <div className="text-sm ">
                  <p className="mb-2"> شناسه ملی : 14013528778</p>
                  <p> تلفن : 09216919291 </p>
                </div>
                <div className="text-sm ">
                  <p className="mb-2">کدپستی : 14013528778</p>
                  <p>شماره اقتصادی : 092116919261 </p>
                </div>
              </div>
            </div>

            <div className="border border-black rounded-2xl overflow-hidden relative h-16 mt-2">
              <div className="border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 ">
                خریدار
              </div>
              <div className="flex justify-between mx-9 my-1.5 ">
                <div className="text-sm ">
                  <p className="mb-2">
                    نام فروشنده :<span className="">{dataConsumer?.title}</span>
                  </p>
                  <p>
                    آدرس :<span className="">{dataConsumer?.addres}</span>
                  </p>
                </div>

                <div className="text-sm ">
                  <p className="mb-2">
                    شناسه ملی :
                    <span className="">{dataConsumer?.nationalID}</span>
                  </p>
                  <p>
                    تلفن :<span className="">{dataConsumer?.tell}</span>
                  </p>
                </div>
                <div className="text-sm ">
                  <p className="mb-2">
                    کدپستی :<span className="">{dataConsumer?.addCode}</span>
                  </p>
                  <p>
                    شماره اقتصادی :
                    <span className="">{dataConsumer?.economic}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*body ======================================================================================================== */}
          <div className="border border-black rounded-2xl overflow-hidden relative  mt-2">
            <div className="flex justify-between  mt-2">
              <div></div>
              <div className="absolute m-auto right-0 left-0  w-fit">
                مشخصات کالا یا خدمات مورد معامله
              </div>
              <div className="ml-5"> مبالغ به ریال است</div>
            </div>
            <div className=" border-black  overflow-hidden relative  mt-2  ">
              <div className="bg-[#f2f2f2]">
                <div className=" text-sm pt-[1px]  border-black w-10 h-12 absolute -right-5 -top-1 text-center   -rotate-90 ">
                  ردیف
                </div>
                <div className="flex   border-y border-black border-opacity-50 h-10 ">
                  <div className=" w-6  border-l text-center text-nowrap text-sm borde  py-2.5 border-black"></div>
                  <div className=" w-44 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    IRC
                  </div>
                  <div className=" w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    شرح کالا یا خدمات
                  </div>
                  <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    Lot NO
                  </div>
                  <div className=" w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    مقدار
                  </div>
                  <div className=" w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    واحد
                  </div>
                  <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    بهای واحد
                  </div>
                  <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    بهای کل
                  </div>
                  <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    تخفیف
                  </div>
                  <div className=" w-36 text-center text-nowrap text-sm   py-2.5 border-black">
                    قابل پرداخت
                  </div>
                </div>
              </div>
              <div>
                {!!products?.length > 0 ? (
                  products.map((i, index) => (
                    <div
                      className={` ${
                        index % 2 != 0 ? `bg-[#f2f2f2]` : ``
                      } relative`}
                      key={index}
                    >
                      <div
                        className=" text-sm  h-full  border-black w-6  absolute -right- -top- text-center    "
                        onClick={() =>
                          setProducts(
                            products.filter((item) => item.id != i.id)
                          )
                        }
                      >
                        <p className="pt-2.5 h-full">{index + 1}</p>
                      </div>
                      <div className="flex    border-b border-black border-opacity-50 h-10 ">
                        <div className=" w-6   text-center text-nowrap text-sm border-l  py-2.5 border-black"></div>
                        <div className=" w-44  text-center text-nowrap text-sm border-l  py-2.5 border-black">
                          {i?.IRC}
                        </div>
                        <div className=" w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                          {i?.discription}
                        </div>
                        <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                          {i?.LotNO}
                        </div>
                        <div className=" w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                          {i?.number}
                        </div>
                        <div className=" w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                          {i?.unit}
                        </div>
                        <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                          {sp(i?.pay)}
                        </div>
                        <div className=" w-32  text-center text-nowrap text-sm border-l  py-2.5 border-black">
                          {sp(i?.pay * i?.number)}
                        </div>
                        <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                          {sp(i?.off)}
                        </div>
                        <div className=" w-36 text-center text-nowrap text-sm   py-2.5 border-black">
                          {sp(i?.pay * i?.number - i?.off)}
                        </div>
                      </div>
                      {!!i?.text && (
                        <div className="border-b border-black px-7 text-justify">
                          {" "}
                          توضیحات : {i?.text}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className=" text-center border-b border-black py-2">
                    محصولی برای ارائه وجود ندارد
                  </p>
                )}
              </div>
              <div className="  ">
                <div className="flex justify-between ">
                  <span className="flex   gap-6 pt-2 pr-2">
                    نحوه فروش :
                    {typeOFSellDS.map((i, index) => (
                      <span
                        key={index}
                        className={`${
                          typeOFSell?.id == i?.id
                            ? `text-black  font-bold`
                            : `text-gray-500`
                        }`}
                      >
                        {i.title}
                      </span>
                    ))}
                    <p className="">{billDate?.dateOver}</p>
                  </span>
                  <div className="flex  ">
                    <span className=" border-l border-black pt-1.5 pl-3">
                      جمع فاکتور
                    </span>
                    <div className="   w-[52px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      {sp(sumNum)}
                    </div>
                    <div className="   w-[164px] text-center text-nowrap text-sm border-l py-2.5 border-black"></div>
                    <div className="   w-[119px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      {sp(sumPay)}
                    </div>
                    <div className="    w-[105px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                      {sumOff}
                    </div>
                    <div className="    w-36 -mr-2.5 text-center text-nowrap text-sm   py-2.5 border-black">
                      {sp(sumPay - sumOff)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* foter =========================================================================================================== */}
          <div className="flex gap-2 items-center   mt-2">
            <div className="border rounded-2xl border-black w-1/2 h-32 flex justify-between px-5 py-2 text-gray-500">
              <p>مهر وامضای خریدار</p>
              <p>مهر و امضای فروشنده</p>
            </div>
            <div className="border flex rounded-2xl border-black w-1/2 h-32 text-gray-500">
              <div className="w-5/12 border-l border-black h-full text-[12px] relative">
                <div className="pt-1 text-justify px-2 w-full ">
                  توضیحات : <br />{" "}
                  <span className="text-black w-11/12 ">{text}</span>
                </div>
                <div className="w-full absolute bottom-0 py-1 pr-2 border-t border-black">
                  کاربر سیستم : {reduce?.User?.name} {time?.day} <span> </span>
                  {time?.time}
                </div>
              </div>
              <div className="w-7/12 child:h-[41px] text-black text-sm">
                <div className=" flex justify-between px-2 items-center border-b border-black">
                  <span> تخفیف:</span>
                  <span className="">{sp(sumOff)}</span>
                </div>
                <div className="flex justify-between px-2 items-center border-b border-black">
                  <span> جمع کل:</span>
                  <span className="">{sp(sumPay)}</span>
                </div>
                <div className=" text-justify  px-2 items-center">
                  <p className="inline"> جمع به حروف : </p>
                  <p className=" inline">
                    {numberToPersianWords(sumPay - sumOff)} ریال
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
      <div
        className="border-t my-5 max-w-7xl  min-w-[80rem] mx-auto px-5  "
        ref={ref1}
      >
        <div className="flex items-center justify-between  mt-5 relative">
          <div>
            <div>
              شماره فاکتور : <span className="  ">{billNO}</span>
            </div>
            <div>
              تاریخ صدور :<span className=" pr-2">{date?.CreationDate}</span>
            </div>
            <div>صفحه 1 از 1</div>
          </div>
          <div className=" absolute right-0 left-0 mx-auto w-fit ">
            <h1 className="mx-auto w-fit font-bold mb-3 ">
              {!!typeOfBills?.title ? typeOfBills?.title : "فاکتور"}
            </h1>
            <p>شرکت تجهیزات پزشکی آرتا مهر درمان یار</p>
          </div>
          <img src={Logo} alt="" />
        </div>


        <div className="border border-black rounded-2xl overflow-hidden relative h-16 mt-2">
          <div className="border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 ">
            فروشنده
          </div>
          <div className="flex justify-between mx-9 my-1.5">
            <div className="text-sm ">
              <p className="mb-2">نام فروشنده : شرکت آرتا مهر درمان یار</p>
              <p>
                آدرس : لرستان - خرم آباد - شهرک صنعتی شماره یک - خیابان ابتکار 4
              </p>
            </div>
            <div className="text-sm ">
              <p className="mb-2">شماره کارت ملت : 6104338800754794</p>
              <p>شماره شبای ملت : IR 730120000000002292606004</p>
            </div>
            <div className="text-sm ">
              <p className="mb-2"> شناسه ملی : 14013528778</p>
              <p> تلفن : 09216919291 </p>
            </div>
            <div className="text-sm ">
              <p className="mb-2">کدپستی : 14013528778</p>
              <p>شماره اقتصادی : 092116919261 </p>
            </div>
          </div>
        </div>

        <div className="border border-black rounded-2xl overflow-hidden relative h-16 mt-2">
          <div className="border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 ">
            خریدار
          </div>
          <div className="flex justify-between mx-9 my-1.5 ">
            <div className="text-sm ">
              <p className="mb-2">
                نام فروشنده :<span className="">{dataConsumer?.title}</span>
              </p>
              <p>
                آدرس :<span className="">{dataConsumer?.addres}</span>
              </p>
            </div>

            <div className="text-sm ">
              <p className="mb-2">
                شناسه ملی :<span className="">{dataConsumer?.nationalID}</span>
              </p>
              <p>
                تلفن :<span className="">{dataConsumer?.tell}</span>
              </p>
            </div>
            <div className="text-sm ">
              <p className="mb-2">
                کدپستی :<span className="">{dataConsumer?.addCode}</span>
              </p>
              <p>
                شماره اقتصادی :
                <span className="">{dataConsumer?.economic}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border border-black rounded-2xl overflow-hidden relative  mt-2">
          <div className="flex justify-between  mt-2">
            <div></div>
            <div className="absolute m-auto right-0 left-0  w-fit">
              مشخصات کالا یا خدمات مورد معامله
            </div>
            <div className="ml-5"> مبالغ به ریال است</div>
          </div>
          <div className=" border-black  overflow-hidden relative  mt-2  ">
            <div className="bg-[#f2f2f2]">
              <div className=" text-sm pt-[1px]  border-black w-10 h-12 absolute -right-5 -top-1 text-center   -rotate-90 ">
                ردیف
              </div>
              <div className="flex   border-y border-black border-opacity-50 h-10 ">
                <div className=" w-6  border-l text-center text-nowrap text-sm borde  py-2.5 border-black"></div>
                <div className=" w-44 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                  IRC
                </div>
                <div className=" w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                  شرح کالا یا خدمات
                </div>
                <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                  Lot NO
                </div>
                <div className=" w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                  مقدار
                </div>
                <div className=" w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                  واحد
                </div>
                <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                  بهای واحد
                </div>
                <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                  بهای کل
                </div>
                <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                  تخفیف
                </div>
                <div className=" w-36 text-center text-nowrap text-sm   py-2.5 border-black">
                  قابل پرداخت
                </div>
              </div>
            </div>
            <div>
              {!!products?.length > 0 ? (
                products.map((i, index) => (
                  <div
                    className={` ${
                      index % 2 != 0 ? `bg-[#f2f2f2]` : ``
                    } relative`}
                    key={index}
                  >
                    <div
                      className=" text-sm    border-black w-6 h-10 absolute -right- -top- text-center    "
                      onClick={() =>
                        setProducts(products.filter((item) => item.id != i.id))
                      }
                    >
                      <p className="pt-2.5">{index + 1}</p>
                    </div>
                    <div className="flex    border-b border-black border-opacity-50 h-10 ">
                      <div className=" w-6   text-center text-nowrap text-sm border-l  py-2.5 border-black"></div>
                      <div className=" w-44  text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {i?.IRC}
                      </div>
                      <div className=" w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {i?.discription}
                      </div>
                      <div className=" w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {i?.LotNO}
                      </div>
                      <div className=" w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {i?.number}
                      </div>
                      <div className=" w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {i?.unit}
                      </div>
                      <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sp(i?.pay)}
                      </div>
                      <div className=" w-32  text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sp(i?.pay * i?.number)}
                      </div>
                      <div className=" w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black">
                        {sp(i?.off)}
                      </div>
                      <div className=" w-36 text-center text-nowrap text-sm   py-2.5 border-black">
                        {sp(i?.pay * i?.number - i?.off)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className=" text-center border-b border-black py-2">
                  محصولی برای ارائه وجود ندارد
                </p>
              )}
            </div>
            <div className="  ">
              <div className="flex justify-between ">
                <span className="flex   gap-6 pt-2 pr-2">
                  نحوه فروش :
                  {typeOFSellDS.map((i, index) => (
                    <span
                      key={index}
                      className={`${
                        typeOFSell?.id == i?.id
                          ? `text-black  font-bold`
                          : `text-gray-500`
                      }`}
                    >
                      {i.title}
                    </span>
                  ))}
                  <p className="">{billDate?.dateOver}</p>
                </span>
                <div className="flex  ">
                  <span className=" border-l border-black pt-1.5 pl-3">
                    جمع فاکتور
                  </span>
                  <div className="   w-[52px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    {sp(sumNum)}
                  </div>
                  <div className="   w-[164px] text-center text-nowrap text-sm border-l py-2.5 border-black"></div>
                  <div className="   w-[119px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    {sp(sumPay)}
                  </div>
                  <div className="    w-[105px] text-center text-nowrap text-sm border-l  py-2.5 border-black">
                    {sumOff}
                  </div>
                  <div className="    w-36 -mr-2.5 text-center text-nowrap text-sm   py-2.5 border-black">
                    {sp(sumPay - sumOff)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center   mt-2">
          <div className="border rounded-2xl border-black w-1/2 h-32 flex justify-between px-5 py-2 text-gray-500">
            <p>مهر وامضای خریدار</p>
            <p>مهر و امضای فروشنده</p>
          </div>
          <div className="border flex rounded-2xl border-black w-1/2 h-32 text-gray-500">
            <div className="w-5/12 border-l border-black h-full text-[12px] relative">
              <div className="pt-1 text-justify px-2 w-full ">
                توضیحات : <br />{" "}
                <span className="text-black w-11/12 ">{text}</span>
              </div>
              <div className="w-full absolute bottom-0 py-1 pr-2 border-t border-black">
                کاربر سیستم : {reduce?.User?.name} {time?.day} <span> </span>
                {time?.time}
              </div>
            </div>
            <div className="w-7/12 child:h-[41px] text-black text-sm">
              <div className=" flex justify-between px-2 items-center border-b border-black">
                <span> تخفیف:</span>
                <span className="">{sp(sumOff)}</span>
              </div>
              <div className="flex justify-between px-2 items-center border-b border-black">
                <span> جمع کل:</span>
                <span className="">{sp(sumPay)}</span>
              </div>
              <div className=" text-justify  px-2 items-center">
                <p className="inline"> جمع به حروف : </p>
                <p className=" inline">
                  {numberToPersianWords(sumPay - sumOff)} ریال
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MakerPDF;
