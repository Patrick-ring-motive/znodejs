/*import { urlToHttpOptions } from "url";*/

globalThis.zawait = async function zawait(promise) {
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
        try {
            return appendZResponseMethods(await fetch.call(this, arguments[0]));
        } catch {
            console.log(e);
            return appendZResponseMethods(new Response(arguments[0] + '\n' + e.message + '\n' + e.stack, {
                status: 569,
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