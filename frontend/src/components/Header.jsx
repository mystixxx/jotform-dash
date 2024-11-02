import React, { useState, useEffect, useCallback } from "react";
import { fetchUserInfo } from "../api/dashboard/userInfo";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfoData = useCallback(async () => {
    try {
      const data = await fetchUserInfo();
      setUserInfo(data);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  }, []);

  useEffect(() => {
    getUserInfoData();
  }, [getUserInfoData]);

  const userName = userInfo?.content?.name || "Stranger";

  return (
    <header>
      <h1 className="text-black font-semibold text-3xl">
        Hello, {userName} 👋🏻
      </h1>
    </header>
  );
};

export default Header;
