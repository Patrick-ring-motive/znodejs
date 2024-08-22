/** Optional Chaining literally everything to try and idiot proof this code */
void async function ProxyServerExample () {
  await import("./zglobals.mjs");
  const zBuffer = (await import("./zbuffer.mjs"))?.zBuffer;
  const zhttp = (await import("./zhttp.mjs"))?.zhttp;
  
  const hostTarget = "www.google.com";

  const server = zhttp?.createServer?.();
  server?.zlisten?.(3000);
  server?.zonRequest?.(async function (req, res) {
    (req?.headers??{}).host = hostTarget;
    (req?.headers??{}).referer = hostTarget;

    /* start reading the body of the request*/
    let body = "";
    req?.zonReadable?.(async() => {
      body += req?.zread?.();
    });
    await zawait(new Promise((resolve) => {
        req?.zonEnd?.(resolve);
      }));
    /* finish reading the body of the request*/
    /* start copying over the other parts of the request */
    const options = {
      method: req?.method,
      headers: req?.headers,
      body: body
    };
    
    /* finish copying over the other parts of the request */

    /* fetch from your desired target */
    const response = await zfetch?.(znewURL(`https://${hostTarget}${req.url}`), options);

    /* copy over response headers*/
    res?.zsetHeaders?.(response?.headers);
    res?.zremoveHeader?.("content-length");
    res?.zremoveHeader?.("content-encoding");
    res?.zremoveHeader?.("x-frame-options");
    res?.zgetHeaderNames?.forEach?.(x=>{
      if(/security|policy/i?.ztest?.(x)){
        res?.zremoveHeader?.(x);
      }
    });
    /* check to see if the response is not a text format */

    /* Copy over target response and return */
    const resBody = await response?.zarrayBuffer?.();
    res?.zend?.(zBuffer?.zfrom?.(resBody));
  });
}();
