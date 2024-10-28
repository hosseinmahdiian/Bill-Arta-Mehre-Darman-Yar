import React, { useContext } from "react";
import Logo from "../assets/svg/LOGO.svg";
import { reducerContext, typeOFSellDS } from "../context/context";
import { numberToPersianWords, sp } from "../Functions/Fonctions";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Page = ({
  numberToPersianWords,
  billNO,
  CreationDate,
  typeOfBills,
  dataConsumer,
  products,
  billDate,
  typeOFSell,
  text,
  setProducts,
  useRef,
  page1,
  page2,
}) => {
  let sumNum = 0;
  let sumPay = 0;
  let sumOff = 0;

  products?.map((i) => {
    sumNum = Number(i?.number) + Number(sumNum);
    sumOff = Number(i?.off) + Number(sumOff);
    sumPay = Number(i?.number) * Number(i?.pay) + Number(sumPay);
  });
  const loadaer = true;
  const datTime = new Date();
  let time = {
    day: datTime.toLocaleDateString(`fa-Ir`),
    time: datTime.toLocaleTimeString(`en-GB`, {
      hour: `2-digit`,
      minute: `2-digit`,
    }),
  };

  const navigate = useNavigate();
  const reducer = useContext(reducerContext);
  const [reduce, dispach] = reducer;

  console.log(page1, page2);

  return (
    <>
      <div
        className={`border-t my-5 max-w-7xl  min-w-[80rem] mx-auto px-5 ${
          loadaer && `!pb-3`
        }  `}
      >
        <div className={`flex items-center justify-between  mt-5 relative`}>
          <div>
            <div>
              شماره فاکتور : <span className={`  `}>{billNO}</span>
            </div>
            <div>
              تاریخ صدور :<span className={` pr-2`}>{CreationDate}</span>
            </div>
            <div>{!page2 != 2 && (page1 ? `صفحه 2 از 1` : ` صفحه 1 از 1`)}</div>
            <div>{page2 == 2 && `صفحه 2 از 2`}</div>{" "}
          </div>
          <div className={` absolute right-0 left-0 mx-auto w-fit `}>
            <h1 className={`mx-auto w-fit font-bold mb-3 `}>
              {!!typeOfBills?.title ? typeOfBills?.title : "فاکتور"}
            </h1>
            <p>شرکت تجهیزات پزشکی آرتا مهر درمان یار</p>
          </div>
          <img src={Logo} />
        </div>

        {/* header ==================================================================================================== */}

        <div>
          <div
            className={`border border-black rounded-2xl overflow-hidden relative h-16 mt-2`}
          >
            <div
              className={`border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 `}
            >
              فروشنده
            </div>
            <div className={`flex justify-between mx-9 my-1.5`}>
              <div className={`text-sm `}>
                <p className={`mb-2`}>نام فروشنده : شرکت آرتا مهر درمان یار</p>
                <p>
                  آدرس : لرستان - خرم آباد - شهرک صنعتی شماره یک - خیابان ابتکار
                  4
                </p>
              </div>
              <div className={`text-sm `}>
                <p className={`mb-2`}>شماره کارت ملت : 6104338800754794</p>
                <p>شماره شبای ملت : IR 730120000000002292606004</p>
              </div>
              <div className={`text-sm `}>
                <p className={`mb-2`}> شناسه ملی : 14013528778</p>
                <p> تلفن : 09216919291 </p>
              </div>
              <div className={`text-sm `}>
                <p className={`mb-2`}>کدپستی : 14013528778</p>
                <p>شماره اقتصادی : 092116919261 </p>
              </div>
            </div>
          </div>

          <div
            className={`border border-black rounded-2xl overflow-hidden relative h-16 mt-2`}
          >
            <div
              className={`border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 `}
            >
              خریدار
            </div>
            <div className={`flex justify-between mx-9 my-1.5 `}>
              <div className={`text-sm `}>
                <p className={`mb-2`}>
                  نام فروشنده :<span className={``}>{dataConsumer?.title}</span>
                </p>
                <p>
                  آدرس :<span className={``}>{dataConsumer?.addres}</span>
                </p>
              </div>

              <div className={`text-sm `}>
                <p className={`mb-2`}>
                  شناسه ملی :
                  <span className={``}>{dataConsumer?.nationalID}</span>
                </p>
                <p>
                  تلفن :<span className={``}>{dataConsumer?.tell}</span>
                </p>
              </div>
              <div className={`text-sm `}>
                <p className={`mb-2`}>
                  کدپستی :<span className={``}>{dataConsumer?.addCode}</span>
                </p>
                <p>
                  شماره اقتصادی :
                  <span className={``}>{dataConsumer?.economic}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*body======================================================================================================== */}
        <div
          className={`border-t border-x border-black rounded-2xl overflow-hidden relative  mt-2`}
        >
          <div className={`flex justify-between  mt-2`}>
            <div></div>
            <div className={`absolute m-auto right-0 left-0  w-fit`}>
              مشخصات کالا یا خدمات مورد معامله
            </div>
            <div className={`ml-5`}> مبالغ به ریال است</div>
          </div>
          <div className={` border-black  overflow-hidden relative  mt-2  `}>
            <div className={`bg-[#f2f2f2]`}>
              <div
                className={` text-sm pt-[1px]  border-black w-10 h-12 absolute -right-5 -top-1 text-center   -rotate-90 `}
              >
                ردیف
              </div>
              <div
                className={`flex   border-y border-black border-opacity-50 h-10 `}
              >
                <div
                  className={` w-6  border-l text-center text-nowrap text-sm borde  py-2.5 border-black`}
                ></div>
                <div
                  className={` w-36 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  IRC
                </div>
                <div
                  className={` w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  شرح کالا یا خدمات
                </div>
                <div
                  className={` w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  Lot NO
                </div>
                <div
                  className={` w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  مقدار
                </div>
                <div
                  className={` w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  واحد
                </div>
                <div
                  className={` w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  بهای واحد
                </div>
                <div
                  className={` w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  بهای کل
                </div>
                <div
                  className={` w-24 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  تخفیف
                </div>
                <div
                  className={` w-36 text-center text-nowrap text-sm   py-2.5 border-black`}
                >
                  قابل پرداخت
                </div>
              </div>
            </div>
            <div>
              {!!products?.length > 0 ? (
                products.map(
                  (i, index) =>
                    (page2 == 2 ? index >= 10 : index < 10) && (
                      <div
                        className={` ${
                          index % 2 != 0 ? `bg-[#f2f2f2]` : ``
                        }  relative`}
                        key={index}
                      >
                        <div
                          className={` text-sm  cursor-pointer  border-black w-6 h-10 absolute -right- -top- text-center    `}
                          onClick={() =>
                            setProducts(
                              products.filter((item) => item.id != i.id)
                            )
                          }
                        >
                          <p className={`pt-1`}>{index + 1}</p>
                        </div>
                        <div
                          className={`flex    border-b border-black border-opacity-50 h-8 `}
                        >
                          <div
                            className={` w-6   text-center text-nowrap text-sm border-l  py-1.2 border-black`}
                          ></div>
                          <div
                            className={` w-36  text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.IRC}
                          </div>
                          <div
                            className={` w-96 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.discription}
                          </div>
                          <div
                            className={` w-28 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.LotNO}
                          </div>
                          <div
                            className={` w-14 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.number}
                          </div>
                          <div
                            className={` w-16 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.unit}
                          </div>
                          <div
                            className={` w-28 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {sp(i?.pay)}
                          </div>
                          <div
                            className={` w-32  text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {sp(i?.pay * i?.number)}
                          </div>
                          <div
                            className={` w-24 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {sp(i?.off)}
                          </div>
                          <div
                            className={` w-36 text-center text-nowrap text-sm   py-1.5 border-black`}
                          >
                            {sp(i?.pay * i?.number - i?.off)}
                          </div>
                        </div>
                        {!!i?.text && (
                          <div
                            className={` border-b border-black px-4 text-[14px] text-justify`}
                          >
                            توضیحات : {i?.text}
                          </div>
                        )}
                      </div>
                    )
                )
              ) : (
                <p className={` text-center border-b border-black py-2`}>
                  محصولی برای ارائه وجود ندارد
                </p>
              )}
            </div>
          </div>
        </div>

        {/* fotter =========================================================================================================== */}
        {!page1 && (
          <div>
            <div className={` border border-black rounded-[10px] mt-2`}>
              <div className={`  `}>
                <div className={`flex justify-between `}>
                  <span className={`flex relative  gap-6 pt-2 pr-2`}>
                    نحوه فروش :
                    {typeOFSellDS.map((i, index) => (
                      <span
                        key={index}
                        className={`
                        flex  gap-2 ${
                          typeOFSell?.id == i?.id
                            ? `text-black  font-bold`
                            : `text-gray-500`
                        }`}
                      >
                        {typeOFSell?.id == i?.id && (
                          <FaCheck className={`mt-1`} />
                        )}
                        {i.title}
                      </span>
                    ))}
                    {typeOFSell?.id == 4 && (
                      <p className={`absolute -left-[75px] mt-0.5`}>
                        {billDate?.dateOver}
                      </p>
                    )}
                  </span>
                  <div className={`flex  `}>
                    <span className={` border-l border-black pt-1.5 pl-3`}>
                      جمع فاکتور
                    </span>
                    <div
                      className={`   w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                    >
                      {sp(sumNum)}
                    </div>
                    <div
                      className={`   w-[174px] text-center text-nowrap text-sm border-l py-2.5 border-black`}
                    ></div>
                    <div
                      className={`   w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                    >
                      {sp(sumPay)}
                    </div>
                    <div
                      className={`    w-24 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                    >
                      {sp(sumOff)}
                    </div>
                    <div
                      className={`    w-36 -mr-2.5 text-center text-nowrap text-sm   py-2.5 border-black`}
                    >
                      {sp(sumPay - sumOff)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex gap-2 items-center   mt-2`}>
              <div
                className={`border rounded-2xl border-black w-1/2 h-32 flex justify-between px-5 py-2 text-gray-500`}
              >
                <p>مهر وامضای خریدار</p>
                <p>مهر و امضای فروشنده</p>
              </div>
              <div
                className={`border flex rounded-2xl border-black w-1/2 h-32 text-gray-500`}
              >
                <div
                  className={`w-5/12 border-l border-black h-full text-[12px] relative`}
                >
                  <div className={`pt-1 text-justify px-2 w-full `}>
                    توضیحات : <br />
                    <span className={`text-black w-11/12 `}>{text}</span>
                  </div>
                  <div
                    className={`w-full absolute bottom-0 py-1 pr-2 border-t border-black`}
                  >
                    کاربر سیستم : {reduce?.User?.name} {time?.day}{" "}
                    <span> </span>
                    {time?.time}
                  </div>
                </div>
                <div className={`w-7/12 child:h-[41px] text-black text-sm`}>
                  <div
                    className={` flex justify-between px-2 items-center border-b border-black`}
                  >
                    <span> تخفیف:</span>
                    <span className={``}>{sp(sumOff)} ریال </span>
                  </div>
                  <div
                    className={`flex justify-between px-2 items-center border-b border-black`}
                  >
                    <span> جمع کل:</span>
                    <span className={``}>{sp(sumPay)} ریال </span>
                  </div>
                  <div className={` text-justify  px-2 items-center`}>
                    <p className={`inline`}> جمع به حروف : </p>
                    <p className={` inline`}>
                      {numberToPersianWords(sumPay - sumOff)} ریال
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ****************************************************************************************************************------------------------ */}
      <div
        ref={useRef}
        className={`border-t my-5 max-w-7xl  min-w-[80rem] mx-auto px-5 absolute right-[10000px]
            ${loadaer && `!pb-3`}  
        `}
      >
        <div
          className={`flex items-center justify-between  mt-5 relative
            ${!!loadaer && `!pb-3`}  
        `}
        >
          <div>
            <div>
              شماره فاکتور : <span className={`  `}>{billNO}</span>
            </div>
            <div>
              تاریخ صدور :<span className={` pr-2`}>{CreationDate}</span>
            </div>
            <div>{!page2 != 2 && (page1 ? `صفحه 2 از 1` : ` صفحه 1 از 1`)}</div>
            <div>{page2 == 2 && `صفحه 2 از 2`}</div>{" "}
          </div>
          <div className={` absolute right-0 left-0 mx-auto w-fit `}>
            <h1 className={`mx-auto w-fit font-bold mb-3 `}>
              {!!typeOfBills?.title ? typeOfBills?.title : "فاکتور"}
            </h1>
            <p>شرکت تجهیزات پزشکی آرتا مهر درمان یار</p>
          </div>
          <img src={Logo} />
        </div>

        {/* header ==================================================================================================== */}

        <div>
          <div
            className={`border border-black rounded-2xl overflow-hidden relative h-16 mt-2`}
          >
            <div
              className={`border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 `}
            >
              <span
                className={`${
                  loadaer ? ` absolute -right-0 left-0 -top-2.5  ` : ``
                }  
                `}
              >
                فروشنده
              </span>
            </div>
            <div className={`flex justify-between mx-9 my-1.5 `}>
              <div className={`text-sm   `}>
                <p
                  className={`${loadaer ? `-m-2  pb-2` : `mb-2`}  
 `}
                >
                  نام فروشنده : شرکت آرتا مهر درمان یار
                </p>
                <p>
                  آدرس : لرستان - خرم آباد - شهرک صنعتی شماره یک - خیابان ابتکار
                  4
                </p>
              </div>
              <div className={`text-sm `}>
                <p className={`${loadaer ? `-m-2  pb-2.5` : `mb-2`}`}>
                  شماره کارت ملت : 6104338800754794
                </p>
                <p>شماره شبای ملت : IR 730120000000002292606004</p>
              </div>
              <div className={`text-sm `}>
                <p className={`${loadaer ? `-m-2  pb-2.5` : `mb-2`}`}>
                  شناسه ملی : 14013528778
                </p>
                <p> تلفن : 09216919291 </p>
              </div>
              <div className={`text-sm `}>
                <p className={`${loadaer ? `-m-2  pb-2.5` : `mb-2`}`}>
                  کدپستی : 14013528778
                </p>
                <p>شماره اقتصادی : 092116919261 </p>
              </div>
            </div>
          </div>

          <div
            className={`border border-black rounded-2xl overflow-hidden relative h-16 mt-2`}
          >
            <div
              className={`border-t border-black w-24 h-5 absolute -right-9 top-5 text-center text-[12px]  -rotate-90 

                `}
            >
              <span
                className={`${
                  loadaer ? ` absolute -right-0 left-0 -top-2.5  ` : ``
                }  
                `}
              >
                خریدار
              </span>
            </div>
            <div className={`flex justify-between mx-9 my-1.5 `}>
              <div className={`text-sm `}>
                <p className={`${loadaer ? `-m-2  pb-2.5` : `mb-2`}`}>
                  نام فروشنده :<span className={``}>{dataConsumer?.title}</span>
                </p>
                <p>
                  آدرس :<span className={``}>{dataConsumer?.addres}</span>
                </p>
              </div>

              <div className={`text-sm `}>
                <p className={`${loadaer ? `-m-2  pb-2.5` : `mb-2`}`}>
                  شناسه ملی :
                  <span className={``}>{dataConsumer?.nationalID}</span>
                </p>
                <p>
                  تلفن :<span className={``}>{dataConsumer?.tell}</span>
                </p>
              </div>
              <div className={`text-sm `}>
                <p className={`${loadaer ? `-m-2  pb-2.5` : `mb-2`}`}>
                  کدپستی :<span className={``}>{dataConsumer?.addCode}</span>
                </p>
                <p>
                  شماره اقتصادی :
                  <span className={``}>{dataConsumer?.economic}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*body======================================================================================================== */}
        <div
          className={`border-t border-x border-black rounded-2xl overflow-hidden relative  mt-2`}
        >
          <div className={`flex justify-between  h-8`}>
            <div></div>
            <div
              className={`absolute m-auto right-0 left-0  w-fit
                ${loadaer ? `top-0` : `top-2`}  
            `}
            >
              مشخصات کالا یا خدمات مورد معامله
            </div>
            <div
              className={`ml-5 
                ${loadaer ? `` : `pt-2`}  
            `}
            >
              مبالغ به ریال است
            </div>
          </div>
          <div className={` border-black  overflow-hidden relative  mt-2  `}>
            <div className={`bg-[#f2f2f2]`}>
              <div
                className={` text-sm pt-[1px]  border-black w-10 h-12 absolute -right-5 -top-1 text-center   -rotate-90 
                    ${loadaer ? `!-right-2.5  ` : `pt-2`}  
                    `}
              >
                ردیف
              </div>
              <div
                className={`flex   border-y border-black border-opacity-50 h-10
                    ${loadaer && ` child:!py-0`}  
 `}
              >
                <div
                  className={` w-6  border-l text-center text-nowrap text-sm borde  py-2.5 border-black`}
                ></div>
                <div
                  className={` w-36 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  IRC
                </div>
                <div
                  className={` w-96 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  شرح کالا یا خدمات
                </div>
                <div
                  className={` w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  Lot NO
                </div>
                <div
                  className={` w-14 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  مقدار
                </div>
                <div
                  className={` w-16 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  واحد
                </div>
                <div
                  className={` w-28 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  بهای واحد
                </div>
                <div
                  className={` w-32 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  بهای کل
                </div>
                <div
                  className={` w-24 text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                >
                  تخفیف
                </div>
                <div
                  className={` w-36 text-center text-nowrap text-sm   py-2.5 border-black`}
                >
                  قابل پرداخت
                </div>
              </div>
            </div>
            <div>
              {!!products?.length > 0 ? (
                products.map(
                  (i, index) =>
                    (page2 == 2 ? index >= 10 : index < 10) && (
                      <div
                        className={` ${
                          index % 2 != 0 ? `bg-[#f2f2f2]` : ``
                        }  relative `}
                        key={index}
                      >
                        <div
                          className={` text-sm  cursor-pointer  border-black w-6 h-10 absolute -right- -top- text-center    `}
                          onClick={() =>
                            setProducts(
                              products.filter((item) => item.id != i.id)
                            )
                          }
                        >
                          <p className={`pt-1 ${loadaer && ` !py-0`}`}>
                            {index + 1}
                          </p>
                        </div>
                        <div
                          className={`flex    border-b border-black border-opacity-50 h-8 
                                                ${loadaer && ` child:!py-0`}  

                            `}
                        >
                          <div
                            className={` w-6   text-center text-nowrap text-sm border-l  py-1.2 border-black`}
                          ></div>
                          <div
                            className={` w-36  text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.IRC}
                          </div>
                          <div
                            className={` w-96 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.discription}
                          </div>
                          <div
                            className={` w-28 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.LotNO}
                          </div>
                          <div
                            className={` w-14 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.number}
                          </div>
                          <div
                            className={` w-16 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {i?.unit}
                          </div>
                          <div
                            className={` w-28 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {sp(i?.pay)}
                          </div>
                          <div
                            className={` w-32  text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {sp(i?.pay * i?.number)}
                          </div>
                          <div
                            className={` w-24 text-center text-nowrap text-sm border-l  py-1.5 border-black`}
                          >
                            {sp(i?.off)}
                          </div>
                          <div
                            className={` w-36 text-center text-nowrap text-sm   py-1.5 border-black`}
                          >
                            {sp(i?.pay * i?.number - i?.off)}
                          </div>
                        </div>
                        {!!i?.text && (
                          <div
                            className={` border-b border-black px-4 text-[14px] text-justify
                                 ${!!loadaer ? ` !pb-2.5` : `py-0`}
                                 `}
                          >
                            توضیحات : {i?.text}
                          </div>
                        )}
                      </div>
                    )
                )
              ) : (
                <p
                  className={`
                    ${loadaer ? ` pb-4` : `py-2.5`}
                   text-center border-b border-black `}
                >
                  محصولی برای ارائه وجود ندارد
                </p>
              )}
            </div>
          </div>
        </div>

        {/* fotter =========================================================================================================== */}
        {!page1 && (
          <div>
            <div className={` border border-black rounded-[10px] mt-2`}>
              <div className={`  `}>
                <div className={`flex justify-between relative `}>
                  <span
                    className={`flex relative h-8 gap-6 pt-0.5 pr-2
                    ${loadaer && `  absolute -right-0 left-0 -top-2.5 `}  
                    `}
                  >
                    نحوه فروش :
                    {typeOFSellDS.map((i, index) => (
                      <span
                        key={index}
                        className={`
                        flex  gap-2 ${
                          typeOFSell?.id == i?.id
                            ? `text-black  font-bold`
                            : `text-gray-500`
                        }`}
                      >
                        {typeOFSell?.id == i?.id && (
                          <FaCheck className={`mt-1`} />
                        )}
                        {i.title}
                      </span>
                    ))}
                    {typeOFSell?.id == 4 && (
                      <p className={`absolute -left-[75px] mt-0.5`}>
                        {billDate?.dateOver}
                      </p>
                    )}
                  </span>
                  <div
                    className={`flex
                                      

 `}
                  >
                    <span
                      className={`relative border-l pt-2 text-sm border-black  pl-3`}
                    >
                      <p
                        className={` ${
                          loadaer && ` text-nowrap absolute  -right-16 -top-1 `
                        }  `}
                      >
                        جمع فاکتور
                      </p>
                    </span>
                    <div
                      className={` relative  w-[55px] text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                    >
                      <p
                        className={` ${
                          loadaer &&
                          ` text-nowrap absolute  left-0 right-0 mx-auto -top-1 `
                        }  `}
                      >
                        {sp(sumNum)}
                      </p>
                    </div>
                    <div
                      className={`   w-[172px] text-center text-nowrap text-sm border-l py-2.5 border-black`}
                    ></div>
                    <div
                      className={` relative  w-[126px] text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                    >
                      <p
                        className={` ${
                          loadaer &&
                          ` text-nowrap absolute  left-0 right-0 mx-auto -top-1 `
                        }  `}
                      >
                        {sp(sumPay)}
                      </p>
                    </div>
                    <div
                      className={` relative   w-[94px] text-center text-nowrap text-sm border-l  py-2.5 border-black`}
                    >
                      <p
                        className={` ${
                          loadaer &&
                          ` text-nowrap absolute  left-0 right-0 mx-auto -top-1 `
                        }  `}
                      >
                        {sp(sumOff)}
                      </p>
                    </div>
                    <div
                      className={` relative   w-[151px] -mr-2.5 text-center text-nowrap text-sm   py-2.5 border-black`}
                    >
                      <p
                        className={` ${
                          loadaer &&
                          ` text-nowrap absolute  left-0 right-0 mx-auto -top-1 `
                        }  `}
                      >
                        {sp(sumPay - sumOff)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex gap-2 items-center   mt-2`}>
              <div
                className={`  relative border rounded-2xl border-black w-1/2 h-32 flex justify-between px-5 py-2 text-gray-500`}
              >
                <p
                  className={`${loadaer && `  absolute rigth-4  -top-2.5 `}  `}
                >
                  مهر وامضای خریدار
                </p>
                <p className={`${loadaer && `  absolute left-4  -top-2.5 `}  `}>
                  مهر و امضای فروشنده
                </p>
              </div>
              <div
                className={`border flex rounded-2xl border-black w-1/2 h-32 text-gray-500`}
              >
                <div
                  className={`w-5/12 border-l border-black h-full text-[12px] relative`}
                >
                  <div
                    className={`pt-1 text-justify px-2 w-full ${
                      loadaer && `  absolute rigth-4  -top-2.5 `
                    } `}
                  >
                    توضیحات : <br />
                    <span className={`text-black w-11/12 `}>{text}</span>
                  </div>
                  <div
                    className={`  w-full absolute bottom-0 py-1 pr-2 border-t border-black h-6`}
                  >
                    <div className="relative">
                      <p
                        className={`${
                          loadaer && `  absolute rigth-4  -top-2.5 `
                        }`}
                      >
                        کاربر سیستم : {reduce?.User?.name} {time?.day}{" "}
                        <span> </span>
                        {time?.time}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`w-7/12 child:h-[41px] text-black text-sm `}>
                  <div className={`relative  border-b border-black`}>
                    <div
                      className={`${
                        loadaer && `  absolute rigth-4  -top-2 `
                      }  flex justify-between px-2 items-center w-full  `}
                    >
                      <span className={``}> تخفیف:</span>
                      <span className={``}>{sp(sumOff)} ریال </span>
                    </div>
                  </div>

                  <div className={`relative  border-b border-black`}>
                    <div
                      className={`${
                        loadaer && `  absolute rigth-4  -top-2 `
                      }  flex justify-between px-2 items-center w-full  `}
                    >
                      <span> جمع کل:</span>
                      <span className={``}>{sp(sumPay)} ریال </span>
                    </div>
                  </div>
                  <div className={`relative   border-black`}>
                    <div
                      className={`${
                        loadaer && `  absolute rigth-4  -top-2.5 `
                      }  flex justify-between px-2 items-center w-full  `}
                    >
                      <div className={` text-justify  px-2 items-center`}>
                        <p className={`inline`}> جمع به حروف : </p>
                        <p className={` inline`}>
                          {numberToPersianWords(sumPay - sumOff)} ریال
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
