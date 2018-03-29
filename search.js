var fs = require('fs')
var path = require('path')
var readline = require('readline')
  
//解析需要遍历的文件夹
var filePath = path.resolve('D:/code/yimiedu/src')

var pathObj = null

//调用文件遍历方法  
fileDisplay( path.join(filePath, 'router') )

var closeRL = /class/

/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */  
function fileDisplay(filePath){  
  //根据文件路径读取文件，返回文件列表  
  fs.readdir(filePath, function(err,files){  
    if(err){  
        console.warn(err)  
    }else{  
      console.log('文件夹下面所有目录', files);
      // 遍历读取到的文件列表  
      files.forEach(function(filename){  
          //获取当前文件的绝对路径  
          var filedir = path.join(filePath, filename)
          
           //根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(filedir, function(eror, stats){
            if (eror) {
              console.warn('获取文件stats失败')
            } else {
              var isFile = stats.isFile()  //是文件
              var isDir = stats.isDirectory() //是文件夹
              if(isFile) {
                // 拿到文件
                var content = fs.createReadStream(filedir, 'utf-8')
                // 创建逐行读取对象
                var objReadline = readline.createInterface({  
                  input: content
                })
                // 逐行读取
                objReadline.on('line', (line)=>{  
                  // 符合条件终止读取
                  closeRL.test(line) && objReadline.removeAllListeners('line')
                  console.log(line);  
                })
              }
              // if(isDir){
              //     fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
              // }
            }
          })
      })
    }  
  })
}  


