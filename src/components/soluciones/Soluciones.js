"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const Soluciones = () => {
  //estados
  const [actualSlide, setActualSlide] = useState(1);
  const [buttonNextActive, setButtonNextActive] = useState(true);
  const [buttonPrevActive, setButtonPrevActive] = useState(false);
  const [showContent, setShowContent] = useState(true);

  //variables
  const t = useTranslations("Home.solutions");
  const sliderData = [
    {
      img: "./images/pages/home/solutions/card-1-desktop.png",
      title: t("title1"),
      text: t("text1"),
    },
    {
      img: "./images/pages/home/solutions/card-2-desktop.png",
      title: t("title2"),
      text: t("text2"),
    },
    {
      img: "./images/pages/home/solutions/card-3-desktop.png",
      title: t("title3"),
      text: t("text3"),
    },
    {
      img: "./images/pages/home/solutions/card-4-desktop.png",
      title: t("title4"),
      text: t("text4"),
    },
  ];
  const titleSection = [t("section1"), t("section2"), t("section3"), t("section4")];
  const pathLength = 1000;
  const progressPercentage = (actualSlide / sliderData.length) * 100;
  const strokeDashoffset = pathLength - (pathLength * progressPercentage) / 100;

  const backgroundStyle = {
    backgroundImage: `
        linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 60%),    
        linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 60%),
        url(${sliderData[actualSlide - 1].img})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  //funciones
  const changeSlideNext = () => {
    const nextSlide = actualSlide + 1;
    nextSlide === 5 ? setActualSlide(1) : setActualSlide(nextSlide);
  };
  const changeSlidePrev = () => {
    const prevSlide = actualSlide - 1;
    prevSlide === 0 ? setActualSlide(4) : setActualSlide(prevSlide);
  };
  const handlePrevButton = (e) => {
    e.preventDefault();
    if (buttonPrevActive) {
      const havePrev = buttonPrevActive;
      if (havePrev) changeSlidePrev();
    }
  };
  const handleNextButton = (e) => {
    e.preventDefault();
    if (buttonNextActive) {
      const haveNext = buttonNextActive;
      if (haveNext) changeSlideNext();
    }
  };

  //efectos
  useEffect(() => {
    setShowContent(false);
    const reEnableTimer = setTimeout(() => {
      setShowContent(true);
    }, 150);
    const timer = setTimeout(() => {
      changeSlideNext();
    }, 6000);

    actualSlide + 1 === 5 ? setButtonNextActive(false) : setButtonNextActive(true);
    actualSlide - 1 === 0 ? setButtonPrevActive(false) : setButtonPrevActive(true);

    return () => {
      clearTimeout(timer);
      clearTimeout(reEnableTimer);
    };
  }, [actualSlide]);

  //slider tablet
  const [actualSlideTablet, setActualSlideTablet] = useState(0);
  const [buttonNextActiveTablet, setButtonNextActiveTablet] = useState(true);
  const [buttonPrevActiveTablet, setButtonPrevActiveTablet] = useState(false);
  const [transformValue, setTrasnformValue] = useState(0);

  // Estas funciones modifican actualSlideTablet, y el render se encargará de mover el track.
  const handleNextButtonSlide = () => {
    if (actualSlideTablet + 1 <= 3) {
      setActualSlideTablet(actualSlideTablet + 1);
      setTrasnformValue((Math.abs(transformValue) + 40) * -1);
    }
    if (actualSlideTablet + 1 < 3) {
      setButtonNextActiveTablet(true);
      setButtonPrevActiveTablet(true);
    } else {
      setButtonNextActiveTablet(false);
      setButtonPrevActiveTablet(true);
    }
  };
  const handlePrevButtonSlide = () => {
    if (actualSlideTablet - 1 >= 0) {
      setActualSlideTablet(actualSlideTablet - 1);
      setTrasnformValue(transformValue + 40);
    }
    if (actualSlideTablet - 1 > 0) {
      setButtonPrevActiveTablet(true);
      setButtonNextActiveTablet(true);
    } else {
      setButtonPrevActiveTablet(false);
      setButtonNextActiveTablet(true);
    }
  };

  return (
    <>
      {/* desktop */}
      <section className="w-full h-[100dvh] relative bg-grey-10 hidden xl:block">
        <div className="w-full h-full bg-grey-40 rounded-[35px]">
          {/* <div
            className="w-full h-full rounded-[35px]"
            style={backgroundStyle}
          ></div> */}
          <div className="w-full h-full bg-grey-40 rounded-[35px] overflow-hidden">
            <div
              className="w-[400%] h-full flex flex-row transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(actualSlide - 1) * (100 / sliderData.length)}%)`,
              }}>
              {sliderData.map((slide, index) => (
                <div
                  key={index}
                  className="w-1/4 h-full flex-shrink-0"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 60%), linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 60%), url(${slide.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full lg:h-[35%] xxl:h-[30%] flex flex-row lg:px-[64px] lg:pb-[64px] xxl:px-[128px]">
          <div className="h-full w-[15%] flex flex-row items-start justify-center">
            <div onClick={(e) => handlePrevButton(e)} className={`cursor-pointer w-auto h-auto px-[32px] py-[16px] rounded-[900px] translate-x-[10px] ${buttonPrevActive ? "glass" : "bg-grey-10 border-[1px] border-grey-20"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.8125 12C20.8125 12.1492 20.7532 12.2923 20.6477 12.3978C20.5423 12.5032 20.3992 12.5625 20.25 12.5625H5.10843L10.8975 18.3525C10.9528 18.404 10.9971 18.4661 11.0278 18.5351C11.0586 18.6041 11.0751 18.6786 11.0764 18.7541C11.0778 18.8296 11.0639 18.9047 11.0356 18.9747C11.0073 19.0447 10.9652 19.1084 10.9118 19.1618C10.8584 19.2152 10.7947 19.2573 10.7247 19.2856C10.6546 19.3139 10.5796 19.3278 10.5041 19.3265C10.4286 19.3251 10.3541 19.3086 10.2851 19.2778C10.2161 19.2471 10.154 19.2028 10.1025 19.1475L3.35249 12.3975C3.24716 12.292 3.18799 12.1491 3.18799 12C3.18799 11.8509 3.24716 11.708 3.35249 11.6025L10.1025 4.85251C10.2091 4.75315 10.3502 4.69905 10.4959 4.70163C10.6416 4.7042 10.7806 4.76323 10.8837 4.86629C10.9868 4.96935 11.0458 5.10839 11.0484 5.25411C11.0509 5.39984 10.9969 5.54088 10.8975 5.64751L5.10843 11.4375H20.25C20.3992 11.4375 20.5423 11.4968 20.6477 11.6023C20.7532 11.7077 20.8125 11.8508 20.8125 12Z"
                  fill="white"
                />
              </svg>
            </div>
            <div onClick={(e) => handleNextButton(e)} className={`cursor-pointer w-auto h-auto px-[32px] py-[16px] rounded-[900px] translate-x-[-10px] ${buttonNextActive ? "glass" : "bg-grey-10 border-[1px] border-grey-20"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.6475 12.3975L13.8975 19.1475C13.7909 19.2469 13.6498 19.301 13.5041 19.2984C13.3584 19.2958 13.2193 19.2368 13.1163 19.1337C13.0132 19.0307 12.9542 18.8916 12.9516 18.7459C12.949 18.6002 13.0031 18.4591 13.1025 18.3525L18.8916 12.5625H3.75C3.60082 12.5625 3.45774 12.5032 3.35225 12.3978C3.24676 12.2923 3.1875 12.1492 3.1875 12C3.1875 11.8508 3.24676 11.7077 3.35225 11.6023C3.45774 11.4968 3.60082 11.4375 3.75 11.4375H18.8916L13.1025 5.64751C13.0031 5.54088 12.949 5.39984 12.9516 5.25411C12.9542 5.10839 13.0132 4.96935 13.1163 4.86629C13.2193 4.76323 13.3584 4.7042 13.5041 4.70163C13.6498 4.69905 13.7909 4.75315 13.8975 4.85251L20.6475 11.6025C20.7528 11.708 20.812 11.8509 20.812 12C20.812 12.1491 20.7528 12.292 20.6475 12.3975Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="h-full w-[55%] flex flex-col lg:pl-[64px] lg:pr-[150px]">
            <div className={`w-full h-[20%] flex flex-row items-start justify-start gap-[8px] transition-opacity duration-500 ease-out ${showContent ? "opacity-100" : "opacity-0"}`}>
              <svg className="translate-y-[2.5px]" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="6" fill="#FF4D00" />
              </svg>
              <p className="text-[16px] font-[500] leading-[120%] text-white">{t("sectionTitle")}</p>
            </div>
            <div className="w-full h-[60%] flex flex-col gap-[8px] items-start justify-center">
              <h2 className={`text-white transition-opacity duration-500 ease-out ${showContent ? "opacity-100" : "opacity-0"} !leading-[100%]`}>{sliderData[actualSlide - 1].title}</h2>
              <p className={`text-white text-[16px] font-[400] leading-[120%] transition-opacity duration-500 ease-out ${showContent ? "opacity-100" : "opacity-0"}`}>{sliderData[actualSlide - 1].text}</p>
            </div>
            <div className={`w-full h-[20%] flex flex-col gap-[8px] justify-end items-start`}>
              <p className="text-[16px] font-[400] leading-[110%] tracking-[-0.32px] text-white">
                0{actualSlide}/0{sliderData.length}
              </p>
              <div className="w-full h-[2px] bg-white">
                <svg className="w-full h-full" viewBox={`0 0 ${pathLength} 2`} preserveAspectRatio="none">
                  <path
                    d={`M0 1 L${pathLength} 1`}
                    stroke="#FF4D00"
                    strokeWidth="2"
                    fill="none"
                    style={{
                      strokeDasharray: pathLength,
                      strokeDashoffset: strokeDashoffset,
                      transition: "stroke-dashoffset 0.5s ease-in-out",
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-full w-[30%] flex flex-col items-start justify-between">
            <div className="w-full h-auto flex flex-col items-start justify-start gap-[8px]">
              {titleSection.map((title, index) => {
                const isActive = index === actualSlide - 1;
                return (
                  <div key={index} className={`flex items-center gap-[8px] transition-all duration-500 ${isActive ? "text-white" : "text-[#9e9e9e]"}`}>
                    {isActive && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="translate-y-[-1px]">
                        <circle cx="6" cy="6" r="6" fill="#FF4D00" />
                      </svg>
                    )}
                    <p className="text-[16px] font-[500] leading-[120%]">{title.toUpperCase()}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-full h-auto flex flex-row items-center justify-start gap-[10px]">
              <p className="text-[16px] font-[400] leading-[120%] text-[#9e9e9e]">Secure</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#9E9E9E" />
              </svg>
              <p className="text-[16px] font-[400] leading-[120%] text-[#9e9e9e]">Scalable</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#9E9E9E" />
              </svg>
              <p className="text-[16px] font-[400] leading-[120%] text-[#9e9e9e]">{"Shipped in <90 Days"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* tablet */}
      <section className="w-full h-[100dvh] relative bg-grey-10 hidden md:block overflow-hidden xl:hidden pt-[64px]">
        <div style={{ transform: `translateX(${transformValue}vw)` }} className="w-[calc(160vw+64px+64px)] h-[80%] flex flex-row gap-[16px] overflow-x-hidden mx-[64px] translate-0.5 transition-transform duration-700 ease-in-out">
          {sliderData.map((slides, index) => {
            const backgroundStyleTablet = {
              backgroundImage: `
                linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 60%),    
                linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 60%),
                url(${slides.img})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            };
            return (
              <div key={index} className={`w-[40vw] h-full rounded-[16px] relative`} style={backgroundStyleTablet}>
                <div className="absolute bottom-0 left-0 w-full h-auto flex flex-col gap-[8px] items-center px-[16px] pb-[32px]">
                  <div className="w-full h-[20%] flex flex-row items-center justify-center gap-[8px]">
                    <svg className="translate-y-[-1px]" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="6" fill="#FF4D00" />
                    </svg>
                    <p className="text-[16px] font-[500] leading-[120%] text-white">{t("sectionTitle")}</p>
                  </div>
                  <div className="w-full h-[60%] flex flex-col items-center justify-center">
                    <h2 className="text-white text-center text-[24px] font-[400] leading-[110%] tracking-[-0.24px]">{slides.title}</h2>
                    <p className="text-white text-[16px] font-[400] leading-[120%] text-center mt-[2px]">{slides.text}</p>
                  </div>
                  <div className="w-full h-auto flex flex-row items-center justify-center gap-[6px] mt-[24px]">
                    <p className="!text-[12px] md2:text-[14px] font-[400] leading-[120%] text-[#9e9e9e]">Secure</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                      <circle cx="2" cy="2" r="2" fill="#9E9E9E" />
                    </svg>
                    <p className="!text-[12px] md2:text-[14px] font-[400] leading-[120%] text-[#9e9e9e]">Scalable</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                      <circle cx="2" cy="2" r="2" fill="#9E9E9E" />
                    </svg>
                    <p className="!text-[12px] md2:text-[14px] font-[400] leading-[120%] text-[#9e9e9e]">{"Shipped in <90 Days"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-[32px] button-0 left-0 w-full h-auto flex flex-row items-end px-[64px]">
          <div className="h-full w-full flex flex-row items-center justify-end">
            <div onClick={(e) => handlePrevButtonSlide(e)} className={`cursor-pointer w-auto h-auto px-[32px] py-[16px] rounded-[900px] translate-x-[20px] ${buttonPrevActiveTablet ? "glass" : "bg-grey-10 border-[1px] border-grey-20"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.8125 12C20.8125 12.1492 20.7532 12.2923 20.6477 12.3978C20.5423 12.5032 20.3992 12.5625 20.25 12.5625H5.10843L10.8975 18.3525C10.9528 18.404 10.9971 18.4661 11.0278 18.5351C11.0586 18.6041 11.0751 18.6786 11.0764 18.7541C11.0778 18.8296 11.0639 18.9047 11.0356 18.9747C11.0073 19.0447 10.9652 19.1084 10.9118 19.1618C10.8584 19.2152 10.7947 19.2573 10.7247 19.2856C10.6546 19.3139 10.5796 19.3278 10.5041 19.3265C10.4286 19.3251 10.3541 19.3086 10.2851 19.2778C10.2161 19.2471 10.154 19.2028 10.1025 19.1475L3.35249 12.3975C3.24716 12.292 3.18799 12.1491 3.18799 12C3.18799 11.8509 3.24716 11.708 3.35249 11.6025L10.1025 4.85251C10.2091 4.75315 10.3502 4.69905 10.4959 4.70163C10.6416 4.7042 10.7806 4.76323 10.8837 4.86629C10.9868 4.96935 11.0458 5.10839 11.0484 5.25411C11.0509 5.39984 10.9969 5.54088 10.8975 5.64751L5.10843 11.4375H20.25C20.3992 11.4375 20.5423 11.4968 20.6477 11.6023C20.7532 11.7077 20.8125 11.8508 20.8125 12Z"
                  fill="white"
                />
              </svg>
            </div>
            <div onClick={(e) => handleNextButtonSlide(e)} className={`cursor-pointer w-auto h-auto px-[32px] py-[16px] rounded-[900px] ${buttonNextActiveTablet ? "glass" : "bg-grey-10 border-[1px] border-grey-20"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.6475 12.3975L13.8975 19.1475C13.7909 19.2469 13.6498 19.301 13.5041 19.2984C13.3584 19.2958 13.2193 19.2368 13.1163 19.1337C13.0132 19.0307 12.9542 18.8916 12.9516 18.7459C12.949 18.6002 13.0031 18.4591 13.1025 18.3525L18.8916 12.5625H3.75C3.60082 12.5625 3.45774 12.5032 3.35225 12.3978C3.24676 12.2923 3.1875 12.1492 3.1875 12C3.1875 11.8508 3.24676 11.7077 3.35225 11.6023C3.45774 11.4968 3.60082 11.4375 3.75 11.4375H18.8916L13.1025 5.64751C13.0031 5.54088 12.949 5.39984 12.9516 5.25411C12.9542 5.10839 13.0132 4.96935 13.1163 4.86629C13.2193 4.76323 13.3584 4.7042 13.5041 4.70163C13.6498 4.69905 13.7909 4.75315 13.8975 4.85251L20.6475 11.6025C20.7528 11.708 20.812 11.8509 20.812 12C20.812 12.1491 20.7528 12.292 20.6475 12.3975Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* mobile */}
      <section className="w-full h-[100dvh] relative bg-grey-10 md:hidden py-[64px]">
        <div className="w-auto h-[80%] mx-[16px] bg-grey-40 rounded-[16px] relative">
          {/* <div className="w-full h-full rounded-[35px]" style={backgroundStyle}></div> */}
          <div className="w-full h-full bg-grey-40 rounded-[35px] overflow-hidden">
            <div
              className="w-[400%] h-full flex flex-row transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(actualSlide - 1) * (100 / sliderData.length)}%)`,
              }}>
              {sliderData.map((slide, index) => (
                <div
                  key={index}
                  className="w-1/4 h-full flex-shrink-0"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 60%), linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 60%), url(${slide.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-auto gap-[8px] flex flex-col items-center pb-[32px] px-[16px]">
            <div className={`text-center w-full h-[20%] flex flex-row items-center justify-center gap-[8px] transition-opacity duration-500 ease-out ${showContent ? "opacity-100" : "opacity-0"}`}>
              <svg className="translate-y-[-1px]" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="6" fill="#FF4D00" />
              </svg>
              <p className="text-[16px] font-[500] leading-[120%] text-white">{t("sectionTitle")}</p>
            </div>
            <div className={`text-center w-full h-[60%] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${showContent ? "opacity-100" : "opacity-0"}`}>
              <h2 className="text-white">{sliderData[actualSlide - 1].title}</h2>
              <p className="text-white text-[16px] font-[400] leading-[120%]">{sliderData[actualSlide - 1].text}</p>
            </div>
            <div className={`w-full h-auto flex flex-row items-center justify-center gap-[10px] transition-opacity duration-500 ease-out mt-[24px] ${showContent ? "opacity-100" : "opacity-0"}`}>
              <p className="text-[16px] font-[400] leading-[120%] text-[#9e9e9e]">Secure</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#9E9E9E" />
              </svg>
              <p className="text-[16px] font-[400] leading-[120%] text-[#9e9e9e]">Scalable</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#9E9E9E" />
              </svg>
              <p className="text-[16px] font-[400] leading-[120%] text-[#9e9e9e]">{"Shipped in <90 Days"}</p>
            </div>
          </div>
        </div>
        <div className="mt-[32px] button-0 left-0 w-full h-auto flex flex-row items-end px-[16px]">
          <div className="w-[50%] h-full flex flex-col gap-[8px] justify-end items-start">
            <p className="text-[16px] font-[400] leading-[110%] tracking-[-0.32px] text-grey-40">
              0{actualSlide}/0{sliderData.length}
            </p>
            <div className="w-full h-[2px] bg-grey-20">
              <svg className="w-full h-full" viewBox={`0 0 ${pathLength} 2`} preserveAspectRatio="none">
                <path
                  d={`M0 1 L${pathLength} 1`}
                  stroke="#FF4D00"
                  strokeWidth="2"
                  fill="none"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: strokeDashoffset,
                    transition: "stroke-dashoffset 0.5s ease-in-out",
                  }}
                />
              </svg>
            </div>
          </div>
          <div className="h-full w-[50%] flex flex-row items-center justify-end">
            <div onClick={(e) => handlePrevButton(e)} className={`cursor-pointer w-auto h-auto px-[32px] py-[16px] rounded-[900px] translate-x-[20px] ${buttonPrevActive ? "glass" : "bg-grey-10 border-[1px] border-grey-20"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.8125 12C20.8125 12.1492 20.7532 12.2923 20.6477 12.3978C20.5423 12.5032 20.3992 12.5625 20.25 12.5625H5.10843L10.8975 18.3525C10.9528 18.404 10.9971 18.4661 11.0278 18.5351C11.0586 18.6041 11.0751 18.6786 11.0764 18.7541C11.0778 18.8296 11.0639 18.9047 11.0356 18.9747C11.0073 19.0447 10.9652 19.1084 10.9118 19.1618C10.8584 19.2152 10.7947 19.2573 10.7247 19.2856C10.6546 19.3139 10.5796 19.3278 10.5041 19.3265C10.4286 19.3251 10.3541 19.3086 10.2851 19.2778C10.2161 19.2471 10.154 19.2028 10.1025 19.1475L3.35249 12.3975C3.24716 12.292 3.18799 12.1491 3.18799 12C3.18799 11.8509 3.24716 11.708 3.35249 11.6025L10.1025 4.85251C10.2091 4.75315 10.3502 4.69905 10.4959 4.70163C10.6416 4.7042 10.7806 4.76323 10.8837 4.86629C10.9868 4.96935 11.0458 5.10839 11.0484 5.25411C11.0509 5.39984 10.9969 5.54088 10.8975 5.64751L5.10843 11.4375H20.25C20.3992 11.4375 20.5423 11.4968 20.6477 11.6023C20.7532 11.7077 20.8125 11.8508 20.8125 12Z"
                  fill="white"
                />
              </svg>
            </div>
            <div onClick={(e) => handleNextButton(e)} className={`cursor-pointer w-auto h-auto px-[32px] py-[16px] rounded-[900px] ${buttonNextActive ? "glass" : "bg-grey-10 border-[1px] border-grey-20"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.6475 12.3975L13.8975 19.1475C13.7909 19.2469 13.6498 19.301 13.5041 19.2984C13.3584 19.2958 13.2193 19.2368 13.1163 19.1337C13.0132 19.0307 12.9542 18.8916 12.9516 18.7459C12.949 18.6002 13.0031 18.4591 13.1025 18.3525L18.8916 12.5625H3.75C3.60082 12.5625 3.45774 12.5032 3.35225 12.3978C3.24676 12.2923 3.1875 12.1492 3.1875 12C3.1875 11.8508 3.24676 11.7077 3.35225 11.6023C3.45774 11.4968 3.60082 11.4375 3.75 11.4375H18.8916L13.1025 5.64751C13.0031 5.54088 12.949 5.39984 12.9516 5.25411C12.9542 5.10839 13.0132 4.96935 13.1163 4.86629C13.2193 4.76323 13.3584 4.7042 13.5041 4.70163C13.6498 4.69905 13.7909 4.75315 13.8975 4.85251L20.6475 11.6025C20.7528 11.708 20.812 11.8509 20.812 12C20.812 12.1491 20.7528 12.292 20.6475 12.3975Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Soluciones;
