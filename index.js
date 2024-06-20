void (async function () {
  await import("./globals.mjs");

  console.log(await zfetchText("https://www.google.com"));
})();
