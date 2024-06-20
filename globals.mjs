globalThis.newReadableStream = function(input) {
    return new Response(input).body;
}

globalThis.znewReadableStream = function(input) {
    try {
        return newReadableStream(input);
    } catch (e) {
        return newReadableStream(e.message);
    }
}

globalThis.newArrayBuffer = function(input) {
    var buf = new ArrayBuffer(input.length * 2);
    var bufView = new Uint16Array(buf);
    for (let i = 0, inputLen = input.length; i < inputLen; i++) {
        try {
            bufView[i] = input?.charCodeAt?.(i) || +input[i];
        } catch (e) { continue; }
    }
    return buf;
}

globalThis.znewArrayBuffer = function(input) {
    try {
        return newArrayBuffer(input);
    } catch (e) {
        return newArrayBuffer(e.message);
    }
}

globalThis.responseText = async function(res) {
    return await Response.prototype.text.apply(res);
};

globalThis.zresponseText = async function(re) {
    try {
        return await responseText(re);
    } catch (e) {
        return e.message;
    }
}

globalThis.responseArrayBuffer = async function(res) {
    return await Response.prototype.arrayBuffer.apply(res);
};

globalThis.zresponseArrayBuffer = async function(re) {
    try {
        return await responseArrayBuffer(re);
    } catch (e) {
        return znewArrayBuffer(e.message);
    }
}


globalThis.appendZResponseMethods = function(res) {
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
globalThis.zfetch = async function() {
    let res;
    try {
        return appendZResponseMethods(await fetch.apply(this, arguments));
    } catch (e) {
        try {
            return appendZResponseMethods(await fetch.call(this, arguments[0]));
        } catch (r) {
            console.log(e);
            return appendZResponseMethods(new Response(arguments[0] + '\n' + e.message + '\n' + e.stack, {
                status: 569,
                statusText: e.message
            }));
        }
    }
};

globalThis.znewRequest = function(input, options) {
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

globalThis.znewResponse = function(body, options) {
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

globalThis.zfetchText = async function() {
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



globalThis.zdecoder = function() {
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