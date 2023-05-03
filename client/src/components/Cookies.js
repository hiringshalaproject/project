import Cookies from "js-cookie";

//specifically for userCookies
export function setCookies(userName, userType, userId) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  Cookies.set("userName", userName, { expires, path: "/" });
  Cookies.set("userType", userType, { expires, path: "/" });
  Cookies.set("userId", userId, { expires, path: "/" });
}

export function getCookies() {
  const userName = Cookies.get("userName");
  const userType = Cookies.get("userType");
  const userId = Cookies.get("userId");

  const cookies = { userName, userType, userId };
  return cookies;
}

export function removeCookies() {
  Cookies.remove("userName");
  Cookies.remove("userType");
  Cookies.remove("userId");
}
