import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosCalendar } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import uuid from "react-uuid";
import Logo from "../assets/svg/LOGO.svg";

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
    tell: "",
    nationalID: 14002438448,
    economic: 411399958955,
    addCode: 6816991451,
  },
];

const MakerPDF = () => {
  const newUuid = uuid();

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
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  const diabalBTN =
    !!product?.discription &&
    !!product?.number &&
    !!product?.unit &&
    !!product?.pay;

  return (
    <>
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
          minDate={new Date()}
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
            minDate={new Date()}
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
                  <h1 className="text-nowrap text-sm mt-1 text-red-500">
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
                  <h1 className="text-nowrap text-sm mt-1 text-red-500">
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
                  className="peer text-red-500 h-5  rounded-[10px] outline-none  w-full mt-2  "
                  placeholder=" "
                  id="BillNO"
                  name="BillNO"
                  onChange={(e) => setBillNO(e.target.value)}
                />
                <label
                  htmlFor="BillNO"
                  className={`absolute start-1 IrHomama font-bold    rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
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
                  <h1 className="text-nowrap text-sm mt-1 text-red-500">
                    {date?.CreationDate}
                  </h1>
                ) : (
                  <h2> تاریخ</h2>
                )}{" "}
              </div>
              <div className="" onClick={() => setSell((i) => !i)}>
                {!!typeOFSell?.title ? (
                  <h1 className="text-nowrap text-sm mt-1 text-red-500">
                    {typeOFSell.title}
                  </h1>
                ) : (
                  <h2>نحوه فروش</h2>
                )}{" "}
              </div>

              <div className="" onClick={() => setDiscription((i) => !i)}>
                توضیحات
              </div>
            </div>
            <div className="border w-40 border-black px-4 pt-0.5 rounded-[10px]">
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
                  className="peer  border rounded-[10px] outline-none border-none h-8 w-full  "
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
                  className={`absolute start-1 IrHomama font-bold   rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.IRC ? `start-2.5 -top-2 !text-sm` : `top-1`
                  }`}
                >
                  IRC
                </label>
              </div>
              <div className=" relative  border border-black  rounded-[10px] w-[450px]">
                <input
                  className="peer  border rounded-[10px] outline-none border-none h-8 w-full  "
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
                  className={`absolute start-1 IrHomama font-bold   rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.discription
                      ? `start-2.5 -top-2 !text-sm`
                      : `top-1`
                  }`}
                >
                  شرح
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-20">
                <input
                  className="peer  border rounded-[10px] outline-none border-none h-8 w-full  "
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
                  className={`absolute start-1 IrHomama font-bold   rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.LotNO ? `start-2.5 -top-2 !text-sm` : `top-1`
                  }`}
                >
                  Lot NO
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-16">
                <input
                  className="peer  border rounded-[10px] outline-none border-none h-8 w-full  "
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
                  className={`absolute start-1 IrHomama font-bold   rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.number ? `start-2.5 -top-2 !text-sm` : `top-1`
                  }`}
                >
                  مقدار
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-16">
                <input
                  className="peer  border rounded-[10px] outline-none border-none h-8 w-full  "
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
                  className={`absolute start-1 IrHomama font-bold   rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.unit ? `start-2.5 -top-2 !text-sm` : `top-1`
                  }`}
                >
                  واحد
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-40">
                <input
                  className="peer  border rounded-[10px] outline-none border-none h-8 w-full  "
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
                  className={`absolute start-1 IrHomama font-bold   rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.pay ? `start-2.5 -top-2 !text-sm` : `top-1`
                  }`}
                >
                  بهای واحد
                </label>
              </div>
              <div className=" relative   border border-black  rounded-[10px] w-20">
                <input
                  className="peer  border rounded-[10px] outline-none border-none h-8 w-full  "
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
                  className={`absolute start-1 IrHomama font-bold   rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                    !!product?.off ? `start-2.5 -top-2 !text-sm` : `top-1`
                  }`}
                >
                  تخفیف
                </label>
              </div>
            </div>
            <div className=" relative mt-2  border border-black  rounded-[10px] w-full">
              <input
                className="peer  border rounded-[10px] outline-none border-none h-8 w-full  "
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
                className={`absolute start-1 IrHomama font-bold   rounded-2xl transition-all ease-linear peer-focus:start-2.5 peer-focus:-top-2 peer-focus:text-sm bg-white px-2 ${
                  !!product?.text ? `start-2.5 -top-2 !text-sm` : `top-1`
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
              setProduct({});
            }}
          >
            افزودن
          </button>
        </div>
      </div>
      {/* ================================================================================================== */}
      <div className="border-t mt-5 max-w-7xl  min-w-[80rem] mx-auto ">
        <div className="flex items-center justify-between  mt-5 relative">
          <div>
            <div>
              شماره فاکتور : <span className="text-red-500  ">{billNO}</span>
            </div>
            <div>
              تاریخ صدور :
              <span className="text-red-500 pr-2">{date?.CreationDate}</span>
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

        {/* ==================================================================================================== */}

        <div className="border border-black rounded-2xl overflow-hidden relative h-20 mt-2">
          <div className="border border-black w-24 h-8 absolute -right-9 top-6 text-center   -rotate-90 ">
            فروشنده
          </div>
          <div className="flex justify-around  py-3.5">
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

        <div className="border border-black rounded-2xl overflow-hidden relative h-20 mt-2">
          <div className="border border-black w-24 h-8 absolute -right-9 top-6 text-center   -rotate-90 ">
            خریدار
          </div>
          <div className="flex justify-around  py-3.5">
            <div className="text-sm ">
              <p className="mb-2">
                نام فروشنده :
                <span className="text-red-500">{dataConsumer?.title}</span>
              </p>
              <p>
                آدرس :
                <span className="text-red-500">{dataConsumer?.addres}</span>
              </p>
            </div>

            <div className="text-sm ">
              <p className="mb-2">
                شناسه ملی :
                <span className="text-red-500">{dataConsumer?.nationalID}</span>
              </p>
              <p>
                تلفن :<span className="text-red-500">{dataConsumer?.tell}</span>
              </p>
            </div>
            <div className="text-sm ">
              <p className="mb-2">
                کدپستی :
                <span className="text-red-500">{dataConsumer?.addCode}</span>
              </p>
              <p>
                شماره اقتصادی :
                <span className="text-red-500">{dataConsumer?.economic}</span>
              </p>
            </div>
          </div>
        </div>
        {/* ======================================================================================================== */}
        <div className="border border-black rounded-2xl overflow-hidden relative  mt-2">
          <div className="flex justify-between ">
            <div></div>
            <div  className="absolute m-auto right-0 left-0  w-fit">مشخصات کالا یا خدمات مورد معامله</div>
            <div className="ml-5"> مبالغ به ریال است</div>
          </div>
           <div>
            
           </div>
        </div>
      </div>
    </>
  );
};

export default MakerPDF;
