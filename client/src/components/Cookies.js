import Cookies from "js-cookie";

//specifically for userCookies
export function setCookies(userName, userType, userId) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  Cookies.set("userName", userName, { expires, path: "/" });
  Cookies.set("userType", userType, { expires, path: "/" });
  Cookies.set("userId", userId, { expires, path: "/" });
}

export function setTheme(theme){
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  
  Cookies.set("theme", theme, { expires, path: "/" });
  

}

export function getCookies() {
  const userName = Cookies.get("userName");
  const userType = Cookies.get("userType");
  const userId = Cookies.get("userId");
  const theme=Cookies.get("theme")
  const cookies = { userName, userType, userId ,theme};
  return cookies;
}
export function removeTheme(){
  Cookies.remove('theme');
}
export function removeCookies() {
  Cookies.remove("userName");
  Cookies.remove("userType");
  Cookies.remove("userId");
  // Cookies.remove("theme")
}
