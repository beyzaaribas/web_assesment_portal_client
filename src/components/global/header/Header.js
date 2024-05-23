"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import {
  BoxArrowInRight,
  CaretDownFill,
  CashCoin,
  CurrencyExchange,
  GiftFill,
  Search,
} from "react-bootstrap-icons";
import { Form } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const { user, setUser } = useUserContext();
  const router = useRouter();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      {pathname == "/" ? (
        <div className="search-box" style={{ display: "none" }}>
          <Search className="search-icon" />

          <Form.Control type="text" placeholder="Search anything..." />
        </div>
      ) : (
        ""
      )}

      <div
        className="profile-dropdown"
        ref={dropdownRef}
        onClick={toggleDropdown}
      >
        <span className="profile-name">
          {user ? user.username : <Skeleton width={70} height={20} />}
        </span>
        {/* <ul className={`profile-links ${isDropdownOpen ? 'open' : ''}`}>
        <li className="profile-link"><Link href="/profile">Profile</Link></li>
        <li className="profile-link"><Link href="/">Logout</Link></li>
      </ul> */}
      </div>

      <div className="logout">
        <span
          className="logout-btn"
          onClick={() => {
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            setUser(null);
            router.push("/login");
          }}
        >
          <BoxArrowInRight />
        </span>
      </div>
    </div>
  );
};

export default Header;
