var home = require("../home.json");
var fs = require("fs")
var p = require("path")
var log = console.log;
var utils= require("./utils")
require("shelljs/global")


function getItems(path, isDirectory = true) {
    var pa = fs.readdirSync(path);
    var list = [];
    pa.forEach(function (ele) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            if (isDirectory) {
                list.push(ele);
            }
        } else {
            if (!isDirectory) {
                list.push(ele);
            }
        }
    })
    //return list;
    return list.sort()
}

function addTime(items) {
    items.forEach(item => {
        if (!item.time) {
            item.time = new Date
        }
    })
}

function merge(path,e) {
    path=p.join(path,e);
    var files = getItems(path, false);
    var header = files.pop();
    if (header !== "header.json") return null;
    var header = require(p.resolve(path, header))
    header.url="/repos/wendux/gitme/contents/release/data/"+e;
    var items = [];
    files.forEach(e => {
        //log(require(p.resolve(path,e)));
        var _p = p.resolve(path, e);
        var json = require(_p);
        addTime(json);
        fs.writeFileSync(_p, JSON.stringify(json, null, 2));
        items = items.concat(json);
    })
    if(!items.length) return null;
    header.item_count=items.length;
    fs.writeFileSync(p.resolve(path,"header.json"), JSON.stringify(header,null,2));
    return {header, items}
}

function split(path,ob) {
    if(fs.existsSync(path)){
        getItems(path,false).forEach(e=>{
            fs.unlinkSync(p.resolve(path,e));
        })
    }else{
        if(!utils.mkdirsSync(path)) return;
        //fs.mkdirSync(_p);
    }
    let len;
    let i=0;
    do{
        len=Math.min(30,ob.items.length)
        fs.writeFileSync(p.resolve(path,"data-"+(i+1))+".json", JSON.stringify(ob.items.slice(i,i+len)));
        ++i;
    }while (len<ob.items.length)
    fs.writeFileSync(p.resolve(path,"header.json"), JSON.stringify(ob.header));

}

//path是文件夹名
function handle(path="data") {
  var list=[];
  getItems(path).forEach(e=>{
      var ob=merge(path,e);
      if(ob) {
          split(p.resolve("release",path,e), ob);
          list.push(ob);
      }
  })
  var home=list.map((ob)=>{
      let reserve=ob.header.reserve||5;
      delete ob.header.reserve;
      ob.items=ob.items.slice(0,Math.min(reserve,ob.items.length));
      return ob;
  });
  fs.writeFileSync(p.resolve(path,"index.json"),  JSON.stringify(home,null,2));
  fs.writeFileSync(p.resolve("release",path,"index.json"),  JSON.stringify(home));
  cp('-r',"en_US/.",".en_US")
  cp('-r',"zh_CH/.","en_US")
  cp('-r',".en_US/.","en_US")
}

handle();

// let ob=merge("data/1-rt");
// split("1-rt",ob);


// addTime();
// fs.writeFileSync("home.json",JSON.stringify(home,null, 2));
// fs.writeFileSync("./release/home.json",JSON.stringify(home));



