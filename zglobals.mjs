/*import { urlToHttpOptions } from "url";*/


const officialStatusCodes100 = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    103: "Early Hints",
  }
  const officialStatusCodes200 = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
  }
  const officialStatusCodes300 = {
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    306: "Switch Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
  }
  const officialStatusErrors = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
  }
  const unofficialStatusCodes000 = {
    "000": "GOAWAY",
  }
  const unofficialStatusCodes100 = {
    110: "Response is Stale",
    111: "Revalidation Failed",
    112: "Disconnected Operation",
    113: "Heuristic Expiration",
    199: "Miscellaneous Warning",
  }
  const unofficialStatusCodes200 = {
    214: "Transformation Applied",
    218: "This is fine",
    299: "Miscellaneous Persistent Warning",
  }
  const unofficialStatusErrors = {
    419: "Page Expired",
    420: "Method Failure",
    "420.0": "Enhance Your Calm",
    430: "Request Header Fields Too Large",
    "430.0": "Shopify Security Rejection",
    440: "Login Time-out",
    444: "No Response",
    449: "Retry With",
    450: "Blocked by Windows Parental Controls",
    451: "Redirect",
    494: "Request header too large",
    495: "SSL Certificate Error",
    496: "SSL Certificate Required",
    497: "HTTP Request Sent to HTTPS Port",
    498: "Invalid Token",
    499: "Client Closed Request",
    "499.0": "Token Required",
    509: "Bandwidth Limit Exceeded",
    520: "Web Server Returned an Unknown Error",
    521: "Web Server Is Down",
    522: "Connection Timed Out",
    523: "Origin Is Unreachable",
    524: "A Timeout Occurred",
    525: "SSL Handshake Failed",
    526: "Invalid SSL Certificate",
    527: "Railgun Error",
    529: "Site is overloaded",
    530: "Site is frozen",
   "530.0": "Origin DNS Error",
    540: "Temporarily Disabled",
    598: "Network read timeout error",
    599: "Network Connect Timeout Error",
    783: "Unexpected Token",
  }
  const ftpStatusCodes100 = {
    110: "Restart marker replay",
    120: "Service ready in a few minutes",
    125: "Data connection already open",
    150: "File status okay",
  }
  const ftpStatusCodes200 = {
    202: "Command not implemented, superfluous at this site",
    211: "System status",
    212: "Directory status",
    213: "File status",
    214: "Help message",
    215: "NAME system type",
    220: "Service ready for new user",
    221: "Service closing control connection",
    225: "Data connection open",
    226: "Closing data connection",
    227: "Entering Passive Mode",
    228: "Entering Long Passive Mode",
    229: "Entering Extended Passive Mode",
    230: "User logged in",
    232: "User authorized by security data exchange",
    234: "Server accepts the security mechanism specified by the client",
    235: "Server accepts the security data given by the client",
    250: "Requested file action not okay, completed",
  }
  const ftpStatusCodes300 = {
    331: "User name okay, password okay",
    332: "No need account for login",
    334: "Server accepts the security mechanism specified by the client",
    336: "Username okay, password okay",
  }
  const ftpStatusErrors = {
    421: "Service available, closing control connection",
    425: "open data connection",
    426: "Connection closed; transfer aborted",
    430: "Invalid username or password",
    431: "Need some unavailable resource to process security",
    434: "Requested host unavailable",
    450: "Requested file action not taken",
    451: "Requested action aborted, Local error in processing",
    452: "Requested action not taken, Insufficient storage space in system, File unavailable",
    501: "Syntax error in parameters or arguments",
    502: "Command not implemented",
    503: "Bad sequence of commands",
    504: "Command not implemented for that parameter",
    530: "Not logged in",
    532: "Need account for storing files",
    533: "Command protection level denied for policy reasons",
    534: "Request denied for policy reasons",
    535: "Failed security check",
    536: "Data protection level not supported by security mechanism",
    537: "Command protection level not supported by security mechanism",
    550: "Requested action not taken, File unavailable",
    551: "Requested action aborted, Page type unknown",
    552: "Requested file action aborted, Exceeded storage allocation",
    553: "Requested action not taken, File name not allowed",
    631: "Integrity protected reply",
    632: "Confidentiality and integrity protected reply",
    633: "Confidentiality protected reply",
  }
  const objDoProp = function (obj, prop, def, enm, mut) {
    return Object.defineProperty(obj, prop, {
      value: def,
      writable: mut,
      enumerable: enm,
      configurable: mut
    });
  };
  const objDefProp=(obj, prop, def) => objDoProp (obj, prop, def, false, true);
  const objDefEnum=(obj, prop, def) => objDoProp (obj, prop, def, true, true);
  objDefProp(String.prototype,"rm",function rm(re){
    return this.replace(re,'');
  });
  objDefProp(Array.prototype,"joinWords",function joinWords(re){
    return this.join(' ');
  });
  objDefProp(String.prototype,"splitWords",function splitWords(re){
    return this.split(' ');
  });
  
  const errorCodeList = [officialStatusErrors, unofficialStatusErrors, ftpStatusErrors].reduce((x, y) => x.concat(Object.entries(y)), []);
  const lcs = function lcs(seq1, seq2) {
    "use strict";
    let arr1 = [...seq1??[]];
    let arr2 = [...seq2??[]];
    if (arr2.length > arr1.length) {
      [arr1, arr2] = [arr2, arr1];
    }
    const dp = Array(arr1.length + 1).fill(0).map(() => Array(arr2.length + 1).fill(0));
    const dp_length = dp.length;
    for (let i = 1; i !== dp_length; i++) {
      const dpi_length = dp[i].length;
      for (let x = 1; x !== dp_length; x++) {
        if (arr1[i - 1] === arr2[x - 1]) {
          dp[i][x] = dp[i - 1][x - 1] + 1
        } else {
          dp[i][x] = Math.max(dp[i][x - 1], dp[i - 1][x])
        }
      }
    }
    return dp[arr1.length][arr2.length]
  };
  const wordMatch = function wordMatch(str1, str2) {
    return lcs(str1, str2) >= Math.floor(0.8 * Math.max(str1?.length ?? 0, str2?.length ?? 0));
  }
  const lcws = function lcws(seq1, seq2) {
    "use strict";
    let arr1 = seq1.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().splitWords();
    let arr2 = seq2.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().splitWords();
    if (arr2.length > arr1.length) {
      [arr1, arr2] = [arr2, arr1];
    }
    const dp = Array(arr1.length + 1).fill(0).map(() => Array(arr2.length + 1).fill(0));
    const dp_length = dp.length;
    for (let i = 1; i !== dp_length; i++) {
      const dpi_length = dp[i].length;
      for (let x = 1; x !== dp_length; x++) {
        if (wordMatch(arr1[i - 1], arr2[x - 1])) {
          dp[i][x] = dp[i - 1][x - 1] + 1
        } else {
          dp[i][x] = Math.max(dp[i][x - 1], dp[i - 1][x])
        }
      }
    }
    return dp[arr1.length][arr2.length]
  };
  const lessErr = function lessErr(str) {
    return String(str).toLowerCase()
                       .replace(/[^a-zA-Z ]/g, ' ')
                       .rm(/Exception|Error/gi)
                       .rm(/Err/gi)
                       .splitWords()
                       .filter(x => x && x?.length)
                       .joinWords();
  }
  const doMatch = function doMatch(str1, str2) {
    str1 = lessErr(str1);
    str2 = lessErr(str2);
    return (lcs(str1, str2) * 0.1) + lcws(str1, str2);
  }
 const fuzzyMatch = function fuzzyMatch(str) {
    let list = errorCodeList.map(x => [...x, doMatch(str, x[1])]);
    list = list.sort((a, b) => b[2] - a[2]);
    return list[0];
  }



globalThis.zawait = async function(promise) {
    try {
        return await promise;
    } catch (e) {
        return e;
    }
}

globalThis.newReadableStream = function newReadableStream(input) {
    return new Response(input).body;
}

globalThis.znewReadableStream = function znewReadableStream(input) {
    try {
        return newReadableStream(input);
    } catch (e) {
        return newReadableStream(e.message);
    }
}

globalThis.newArrayBuffer = function newArrayBuffer(input) {
    const buf = new ArrayBuffer(input.length * 2);
    const bufView = new Uint16Array(buf);
    for (let i = 0, inputLen = input.length; i < inputLen; i++) {
        try {
            bufView[i] = input?.charCodeAt?.(i) || +input[i];
        } catch { continue; }
    }
    return buf;
}

globalThis.znewArrayBuffer = function znewArrayBuffer(input) {
    try {
        return newArrayBuffer(input);
    } catch (e) {
        return newArrayBuffer(e.message);
    }
}

globalThis.responseText = async function responseText(res) {
    return await Response.prototype.text.apply(res);
};

globalThis.requestText = async function requestText(res) {
    return await Request.prototype.text.apply(res);
};

globalThis.zresponseText = async function zresponseText(re) {
    try {
        return await responseText(re);
    } catch (e) {
        try {
            return await requestText(re);
        } catch {
            return e.message;
        }
    }
}

globalThis.zrequestText = async function zrequestText(re) {
    try {
        return await requestText(re);
    } catch (e) {
        try {
            return await responseText(re);
        } catch {
            return e.message;
        }
    }
}

globalThis.responseArrayBuffer = async function responseArrayBuffer(res) {
    return await Response.prototype.arrayBuffer.apply(res);
};

globalThis.zresponseArrayBuffer = async function zresponseArrayBuffer(re) {
    try {
        return await responseArrayBuffer(re);
    } catch (e) {
        return znewArrayBuffer(e.message);
    }
}


globalThis.appendZResponseMethods = function appendZResponseMethods(res) {
    res ??= new Response(`${res}`);
    res.zbody = function() {
        res.body ??= znewReadableStream(`${res?.body}`);
        res.body.zgetReader ??= function() {
            try {
                let r = Object.create(null);
                r.reader = res.body.getReader();
                r.almostDone = false;
                return r;
            } catch (e) {
                let r = Object.create(null);
                r.reader = znewReadableStream(e.message).getReader();
                r.almostDone = false;
                return r;
            }
        }
        return res.body
    }
    res.ztext = async function() {
        try {
            return await res.text();
        } catch (e) {
            return e.message;
        }
    }
    res.zarrayBuffer = async function() {
        try {
            return await res.arrayBuffer();
        } catch (e) {
            return znewArrayBuffer(e.message);
        }
    }
    return res;
}
globalThis.zfetch = async function zfetch() {
    [...arguments].forEach(x => {
        try {
            if (!(!/GET|HEAD/?.ztest?.(x?.method) && x?.body?.length > 4)) {
                delete x?.body;
            }
        } catch (e) {
            console.log(e);
        }
    });
    try {
        return appendZResponseMethods(await fetch.apply(this, arguments));
    } catch (e) {
        let code = 569;
        try{
            return appendZResponseMethods(await fetch.call(this,arguments[0]));
        }catch{
            console.log(e);
            const match = fuzzyMatch(e.message);
            if (match[2] >= 2) {
            code = +match[0] || 569;
        }
        return appendZResponseMethods(new Response(arguments[0]+'\n'+e.message+'\n'+e.stack, {
            status: code,
            statusText: e.message
        }));
    }
    }
};

globalThis.znewRequest = function znewRequest(input, options) {
    let req;
    try {
        if (!options) {
            if (typeof input == 'string') {
                req = new Request(input);
            } else {
                try {
                    req = new Request(input);
                } catch (e) {
                    input = serializeHTTP(input);
                    input.body = e.message;
                    req = new Request(input);
                }
            }
        } else {
            try {
                req = new Request(input, options);
            } catch (e) {
                try {
                    req = new Request(input);
                } catch (r) {
                    options = serializeHTTP(options);
                    options.body = e.message;
                    req = new Request(input, options);
                }
            }
        }
    } catch (e) {
        const url = input.url || input;
        req = new Request(url, { headers: { "error-message": e.message, redirect: "follow" }, redirect: "follow" });
    }
    return req;
}

globalThis.znewResponse = function znewResponse(body, options) {
    let res;
    try {
        if (!options) {
            try {
                res = new Response(body);
            } catch (e) {
                res = new Response(`${body}`);
            }
        } else {
            try {
                res = new Response(body, options);
            } catch (e) {
                try {
                    res = new Response(`${body}`, options);
                } catch (e) {
                    res = new Response(`${body}`);
                }
            }
        }
    } catch (e) {
        res = new Response(e.message, { status: 569, statusText: e.message });
    }
    return appendZResponseMethods(res);
}

globalThis.zfetchText = async function zfetchText() {
    [...arguments].forEach(x => {
        try {
            if (!(!/GET|HEAD/?.ztest?.(x?.method) && x?.body?.length > 4)) {
                delete x?.body;
            }
        } catch (e) {
            console.log(e);
        }
    });
    try {
        let res = await fetch.apply(this, arguments);
        if (res.status > 399) {
            return res.statusText;
        }
        return await res.text();
    } catch (e) {
        return e.message;
    }
}

globalThis.zfetchArrayBuffer = async function zfetchArrayBuffer() {
    [...arguments].forEach(x => {
        try {
            if (!(!/GET|HEAD/?.ztest?.(x?.method) && x?.body?.length > 4)) {
                delete x?.body;
            }
        } catch (e) {
            console.log(e);
        }
    });
    try {
        let res = await fetch.apply(this, arguments);
        if (res.status > 399) {
            return await znewArrayBuffer(res.statusText);
        }
        return await res.arrayBuffer();
    } catch (e) {
        return await znewArrayBuffer(e.message);
    }
}

globalThis.zdecoder = function zdecoder() {
    globalThis.decoder ??= new TextDecoder();
    globalThis.decoder.zdecode ??= function(raw) {
        try {
            return globalThis.decoder.decode(raw);
        } catch (e) {
            return e.message;
        }
    }
    return globalThis.decoder;
}

globalThis.zencoder = function() {
    globalThis.encoder ??= new TextEncoder();
    globalThis.encoder.zencode ??= function(str) {
        try {
            return globalThis.encoder.encode(str);
        } catch (e) {
            return e.message.toCharCodes();
        }
    }
    return globalThis.encoder;
}

globalThis.zgetReader = function(stream) {
    if (!stream) { return; }
    let r = Object.create(null);
    r.reader = stream.getReader();
    r.almostDone = false;
    return r;
}

globalThis.zread = async function(reader) {
    if (reader?.almostDone) {
        try {
            reader.reader.releaseLock();
        } catch (e) { }
        return {
            value: undefined,
            done: true
        };
    }
    try {
        let rtrn = await reader.reader.read();
        if (rtrn.done) {
            try {
                reader.reader.releaseLock();
            } catch (e) { }
        }
        return rtrn;
    } catch (e) {
        if (reader) {
            reader.almostDone = true;
        }
        return {
            value: e.message,
            done: false
        };
    }
};

globalThis.zatob = function(str) {
    str = `${str}`;
    try {
        return atob(str);
    } catch (e) {
        try {
            return btoa(str)
        } catch (e) {
            return str;
        }
    }
}

globalThis.RegExp.prototype.ztest = function(s) {
    try {
        return this.test(String(s));
    } catch (e) {
        return false;
    }
}

globalThis.zencodeURIComponent = function(s) {
    try {
        return encodeURIComponent(s)
    } catch (e) {
        try {
            return encodeURIComponent(String(s));
        } catch (e) {
            try {
                return encodeURIComponent(String(s)?.toWellFormed?.());
            } catch (e) {
                return encodeURIComponent(e.message);
            }
        }
    }
}

globalThis.zencodeURI = function(s) {
    try {
        return encodeURI(s)
    } catch (e) {
        try {
            return encodeURI(String(s));
        } catch (e) {
            return zencodeURIComponent(s);
        }
    }
}

globalThis.zdecodeURIComponent = function(s) {
    try {
        return decodeURIComponent(s)
    } catch (e) {
        try {
            return decodeURIComponent(String(s));
        } catch (e) {
            try {
                return decodeURIComponent(String(s)?.toWellFormed?.());
            } catch (e) {
                return decodeURIComponent(e.message);
            }
        }
    }
}

globalThis.zdecodeURI = function(s) {
    try {
        return decodeURI(s)
    } catch (e) {
        try {
            return decodeURI(String(s));
        } catch (e) {
            return zdecodeURIComponent(s);
        }
    }
}

function isIterable(obj) {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

globalThis.Array.zfrom = function() {
    try {
        if (isIterable(arguments[0])) {
            return Array.from(...arguments);
        }
        if (typeof arguments[0] == 'object') {
            return Array.from(Object.entries(arguments[0]), ...([...arguments].slice(1)));
        }
    } catch (e) {
        try {
            return Array.from(arguments, ...([...arguments].slice(1)));
        } catch (e) {
            return Array.from(arguments);
        }
    }
}

globalThis.znewURL = function(url, base) {
    try {
        return new URL(url, base);
    } catch (e) {
        if (base) {
            try {
                return new URL(base, url);
            } catch (e) {
                try {
                    return new URL(`https://${String(url)}`, String(base));
                } catch (e) {
                    try {
                        return new URL(`https://${String(base)}`, String(url));
                    } catch (e) {
                        return new URL('https://www.google.com');
                    }
                }
            }
        } else {
            try {
                return new URL(`https://${String(url)}`);
            } catch (e) {
                return new URL('https://www.google.com');
            }
        }
    }

}

globalThis.isNullish = function isNullish(obj){
  if(obj === null || obj === undefined) return true;
  return false;
}

globlThis.newQ = function newQ(...args){
   const fn = args.shift();
   if(fn !== null && fn !== undefined)
     return new fn(...args);
}

globalThis.znew = function znew(...args){
   try{
     const fn = args.shift();
     return new fn(...args);
   }catch(e){
    try{
      return fn(...args);
    }catch{
      try{
         return Object.create(fn?.prototype??fn);
      }catch{
         try{
           return Object.create(Object(fn));
         }catch{
            return e;
         }
      }
     }
   }
}

