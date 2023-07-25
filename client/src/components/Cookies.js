import Cookies from "js-cookie";
//specifically for userCookies
export function setUserCookies(userName, userType, userId) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  Cookies.set("hiringShala_userName", userName, { expires, path: "/" });
  Cookies.set("hiringShala_userType", userType, { expires, path: "/" });
  Cookies.set("hiringShala_userId", userId, { expires, path: "/" });
}

export function setCookies(key,value) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  Cookies.set(key, value, { expires, path: "/" });
}

export function getCookies() {
  const userName = Cookies.get("hiringShala_userName");
  const userType = Cookies.get("hiringShala_userType");
  const userId = Cookies.get("hiringShala_userId");
  const cookies = { userName, userType, userId};
  return cookies;
}

export function removeCookies() {
  Cookies.remove("hiringShala_userName");
  Cookies.remove("hiringShala_userType");
  Cookies.remove("hiringShala_userId");
  Cookies.remove("hiringShala_companyName");
  Cookies.remove("hiringShala_token");
  Cookies.remove("hiringShala_companyName");
  Cookies.remove("hiringShala_token");
}
