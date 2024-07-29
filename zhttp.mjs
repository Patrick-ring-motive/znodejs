import http from 'node:http';

http.Server.prototype.onRequest = function() {
  return this.on('request', ...arguments);
}
http.Server.prototype.zonRequest = function(handler) {
  const zhandler = async function(req, res) {
    try {
      return await handler(req, res);
    } catch (e) {
      try {
        console.log(e);
        res.end(e.message);
      } catch (e) {
        console.log(e);
      }
    }
  }
  this.onClientError((err, socket) => {
    try {
      console.log(err);
      socket.end(`HTTP/1.1 400 Bad Request ${err}\r\n\r\n`);
    } catch (e) {
      console.log(e);
    }
  });
  return this.onRequest(zhandler);
}

http.Server.prototype.onClientError = function() {
  return this.on('clientError', ...arguments);
}

http.Server.prototype.zlisten = function() {
  process.on('unhandledRejection', err => {
    console.log('unhandledRejection', err);
  });
  process.on('uncaughtException', err => {
    console.log('uncaughtException', err);
  });
  try {
    return this.listen(...arguments);
  } catch (e) {
    console.log(e);
  }
}

http.IncomingMessage.prototype.onReadable = function(){
  return this.on('readable',...arguments);
}

http.IncomingMessage.prototype.zonReadable = function(){
  try{
    return this.onReadable(...arguments);
  }catch(e){
    console.log(e);
    return e.message;
  }
}

http.IncomingMessage.prototype.onEnd = function(){
  return this.on('end',...arguments);
}

http.IncomingMessage.prototype.zonEnd = function(){
  try{
    return this.onEnd(...arguments);
  }catch(e){
    console.log(e);
    return e.message;
  }
}

http.IncomingMessage.prototype.zread = function(){
  try{
    return this.read(...arguments)||"";
  }catch(e){
    console.log(e);
    return e.message;
  }
}

http.ServerResponse.prototype.zsetHeader=function(key,values){
  try{
    if(values?.map?.call){
      return this.setHeader(String(key),values?.map?.(x=>String(x)));
    }else{
      return this.setHeader(String(key),String(values));
    }
  }catch(e){
    return this.setHeader(e.name,e.message);
  }
}

http.ServerResponse.prototype.zsetHeaders=function(headers){
  try{
    return this.zsetHeaders(headers);
  }catch(e){
    try{
      for(const x in headers){
        this.zsetHeader(x,headers[x]);
      }
      this.zsetHeader(e.name,e.message);
    }catch(e){
      console.log(e);
      this.zsetHeader(e.name,e.message);
    }
  }
}

http.ServerResponse.prototype.zend=function(note){
  try{
    if(note){
      return this.end(note);
    }
    return this.end();
  }catch(e){
    try{
      return this.end(String(note));
    }catch(e){
      try{
        return this.end();
      }catch(e){
        console.log(e);
        return e;
      }
    }
  }
}

String.prototype.zmatch = function(){
  try{
    return this.match(...arguments)||[];
  }catch(e){
    return [e.message];
  }
}

RegExp.prototype.ztest=function(str){
  try{
    return this.test(String(str));
  }catch(e){
    return false;
  }
}

export const zhttp = http;