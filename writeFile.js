const fs = require('fs');
const file = fs.createWriteStream('./big.file');
for(let  i = 0;i<=1e7;i++) {
    file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit. \n');
}
file.end();

// file.write 文件写入
// 学习参考 https://blog.csdn.net/Buddha_ITXiong/article/details/81199173 
