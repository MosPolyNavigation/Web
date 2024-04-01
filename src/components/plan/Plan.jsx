import React, { useEffect, useMemo, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Routes, Route, Navigate } from "react-router-dom";

// components //
import Button from "../button/Button";
import AdditionalInfo from "../additionalInfo/AdditionalInfo";
import FloorScroll from "../floorsScroll/FloorScroll";
import ScaleButton from "../scaleButton/ScaleButton";
import Menu from "../menu/Menu";
import SearchMenu from "../searchMenu/SearchMenu";
import SearchPsevdoInput from "../searchPsevdoInput/SearchPsevdoInput";

//floors
import FloorZero from "../../floors/FloorZero";
import FloorOne from "../../floors/FloorOne";
import FloorTwo from "../../floors/FloorTwo";
import FloorThree from "../../floors/FloorThree";
import FloorFour from "../../floors/FloorFour";
import FloorFive from "../../floors/FloorFive";

// icons //
import burgerIcon from "../../images/burgerIcon.svg";
import heartIcon from "../../images/heartIcon.svg";
import homeIcon from "../../images/homeIcon.svg";

const Plan = () => {
  const [isShowAddInfoClass, setIsShowAddInfoClass] = useState("");
  const [isShowAddInfoFlag, setIsShowAddInfoFlag] = useState(true);
  const [isActive, setIsActive] = useState(() => {
    return parseInt(localStorage.getItem("activeFloor")) || 0;
  });
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowMenuClass, SetisShowMenuClass] = useState("");
  const [startYAdditionalInfo, setStartYAdditionalInfo] = useState(0);
  const [startXMenu, setStartXMenu] = useState(0);

  const handleTouchStartAdditionalInfo = (e) => {
    setStartYAdditionalInfo(e.touches[0].clientY);
  };

  const handleTouchMoveAdditionalInfo = (e) => {
    const deltaY = e.touches[0].clientY - startYAdditionalInfo;
    if (deltaY >= 50) {
      setIsShowAddInfoClass("hideAddInfo");
    }
  };

  const handleTouchMoveMenu = (e) => {
    const deltaX = e.touches[0].clientX - startXMenu;
    if (deltaX <= -100) {
      SetisShowMenuClass("hideMenu");
    }
  };

  const handleTouchStartMenu = (e) => {
    setStartXMenu(e.touches[0].clientX);
  };

  const toggleShowMenu = (currClass) => {
    if (currClass === "") {
      SetisShowMenuClass("showMenu");
      return;
    }
    if (currClass === "showMenu") {
      SetisShowMenuClass("hideMenu");
      return;
    }
    if (currClass === "hideMenu") {
      SetisShowMenuClass("showMenu");
      return;
    }
  };

  const toggleAddInfo = (currClass) => {
    if (currClass === "" && isShowAddInfoFlag) {
      setIsShowAddInfoFlag((prev) => !prev);
      setIsShowAddInfoClass("showAddInfo");
      return;
    }
    if (currClass === "" && !isShowAddInfoFlag) {
      setIsShowAddInfoFlag((prev) => !prev);
      setIsShowAddInfoClass("hideAddInfo");

      return;
    }
    if (currClass === "showAddInfo") {
      setIsShowAddInfoFlag(true);
      setIsShowAddInfoClass("hideAddInfo");

      return;
    }
    if (currClass === "hideAddInfo") {
      setIsShowAddInfoFlag(true);
      setIsShowAddInfoClass("showAddInfo");

      return;
    }
  };

  useEffect(() => {
    localStorage.setItem("activeFloor", isActive.toString());
  }, [isActive]);

  const countFloors = [0, 1, 2, 3, 4, 5];
  return (
    <div className="plan">
      <div className="plan__wrapper">
        <TransformWrapper>
          <div className="scaleButton_wrapper">
            <ScaleButton />
          </div>
          <TransformComponent>
            <Routes>
              <Route path={`/floor/0`} element={<FloorZero />} />
              <Route path={`/floor/1`} element={<FloorOne />} />
              <Route path={`/floor/2`} element={<FloorTwo />} />
              <Route path={`/floor/3`} element={<FloorThree />} />
              <Route path={`/floor/4`} element={<FloorFour />} />
              <Route path={`/floor/5`} element={<FloorFive />} />
              <Route path="*" element={<Navigate to="/floor/0" />} />
            </Routes>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="button_wrapper button_burger">
        <div onClick={() => toggleShowMenu("")}>
          <Button icon={burgerIcon} />
        </div>
      </div>
      <div className="boxshadow"></div>
      <div className="name__wrapper">
        <span className="text__name">
          Большая Семёновская <br /> Корпус А
        </span>
      </div>
      <div className="floorScroll_wrapper">
        <FloorScroll
          countFloors={countFloors}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </div>
      <div className="common__wrapper">
        <div className="common__wrapper_top">
          <div className="button_wrapper button_home">
            <Button icon={homeIcon} />
          </div>
          <div
            className="searchPsevdoInput_wrapper"
            onClick={() => setIsShowSearch((prev) => !prev)}
          >
            <SearchPsevdoInput />
          </div>
          <div
            onClick={() => toggleAddInfo("")}
            className="button_wrapper button_heart"
          >
            <Button icon={heartIcon} />
          </div>
        </div>
        <div
          onTouchStart={handleTouchStartAdditionalInfo}
          onTouchMove={handleTouchMoveAdditionalInfo}
          className={`additionalInfo__wrapper ${isShowAddInfoClass}`}
        >
          <AdditionalInfo
            toggleAddInfo={toggleAddInfo}
            nameAudience={"Н405 - Аудитория"}
            descAudience={"Корпус Н, 4-й этаж"}
          />
        </div>
      </div>
      <div
        onTouchStart={handleTouchStartMenu}
        onTouchMove={handleTouchMoveMenu}
        className={`menu_wrapper ${isShowMenuClass}`}
      >
        <Menu toggleShowMenu={toggleShowMenu} />
      </div>

      <div
        className={`searchMenu_wrapper ${
          isShowSearch ? "showSearchMenu" : "hideSearchMenu"
        }`}
      >
        <SearchMenu
          setIsShowSearch={setIsShowSearch}
          isShowSearch={isShowSearch}
        />
      </div>
    </div>
  );
};
// onTouchStart={handleTouchStartAdditionalInfo}
// onTouchMove={handleTouchMoveAdditionalInfo}
// onTouchStart={handleTouchStartMenu}
// onTouchMove={handleTouchMoveMenu}

export default Plan;
