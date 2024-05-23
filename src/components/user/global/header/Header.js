import Link from "next/link";
import React from "react";
import "./Header.css";
const Header = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  return (
    <div className="header-full">
      <div className="container-flex">
        <div className="logo-box-content">
          {" "}
          <img src={"/img/logo.svg"} />
        </div>

        <div className="nav-items">
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/"}>About Us</Link>
            </li>
            <li>
              <Link href={"/tests"}>Tests</Link>
            </li>
          </ul>
        </div>

        <div className="isLogin">
          {userId ? (
            <span className="login-button" >Welcome</span>
          ) : (
            <Link className="login-button" href={"/login"}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
