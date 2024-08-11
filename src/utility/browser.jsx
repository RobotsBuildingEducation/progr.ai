export const isUnsupportedBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  console.log("userAgent", userAgent);
  const isByteDanceWebview = /ByteDanceWebview/.test(userAgent) && "Tiktok";
  const isByteLocale = /ByteLocale/.test(userAgent) && "Tiktok";
  const isMusicalLy = /musical_ly/.test(userAgent) && "TIktok";
  const isInstagram = /Instagram/.test(userAgent) && "Instagram";
  const isPinterest = /Pinterest/.test(userAgent) && "Pinterest";
  const test = true && "XX";

  const isInAppBrowser =
    isByteDanceWebview ||
    isByteLocale ||
    isMusicalLy ||
    isInstagram ||
    isPinterest ||
    test;

  return isInAppBrowser;
};
