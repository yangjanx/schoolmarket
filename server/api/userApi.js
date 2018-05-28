var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var multer = require('multer');
var fs = require('fs');
var path = require('path')
var UUID = require('uuid')
var datetime=require('silly-datetime');

var storage = multer.diskStorage({  
    destination: function (req, file, cb) {  
        cb(null, 'static/public/uploads')  
    },  
    filename: function (req, file, cb) {  
        var str = file.originalname.split('.');  
        cb(null, UUID.v1()+'.'+str[1]);  
    }  
})
var upload = multer({storage: storage})

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
// 增加用户接口
router.post('/addUser', (req, res) => {
    var params = req.body;
    conn.query("select *from user where user_id=?", [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            if (result.length > 0) {
                jsonWrite(res, {
                    code: -1,
                    msg: '该学号/工号已注册！'
                });
            } else {
                conn.query("INSERT INTO user(user_id,user_nick,gender,password) VALUES(?,?,?,?)", [params.id, params.nick, params.gender, params.password], function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        jsonWrite(res, result);
                    }
                })
            }
        }
    })

});

router.post('/login', (req, res) => {
    var params = req.body;
    conn.query("select * from user where user_id=?", [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            if (result.length == 0) {
                jsonWrite(res, {
                    code: -1,
                    msg: '用户名不存在！'
                });
            } else {
                if (result[0].password == params.password) {
                    jsonWrite(res, result);
                }
                else {
                    jsonWrite(res, {
                        code: -1,
                        msg: '密码不正确！'
                    });
                }
            }
        }
    })
});

router.post('/editProfile', (req, res) => {
    var params = req.body;
    conn.query("update user set user_nick=?,true_name=?,phone=?,age=?,institute=?,qq=?,wechat=?,selfsign=? where user_id=?", [params.nick, params.truename, params.phone, params.age, params.institute, params.qq, params.wechat,params.selfsign,params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/getUserinfo', (req, res) => {
    var params = req.body;
    conn.query("select *from user where user_id=?", [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/getGoodsinfo', (req, res) => {
    var params = req.body;
    conn.query("select *from v_goods order by goods_addtime DESC", [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/modifyPsd', (req, res) => {
    var params = req.body;
    conn.query("select *from user where user_id=?",[params.id],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            if(result[0].password!=params.oldpsd){
                jsonWrite(res,{
                    code:-1,
                    msg:"原密码不正确！"
                })
            }else{
                conn.query("update user set password=? where user_id=?",[params.newpsd,params.id],function(err,result){
                    if(err){
                        console.log(err);
                    }
                    if(result){
                        jsonWrite(res,{
                            code:0,
                            msg:"修改密码成功！"
                        })
                    }
                })
            }
        }
    })
});

router.post('/addGoods',upload.array('file',3), (req, res) => {
    var params = req.body;
    var u=UUID.v1();
    var goods_picture="";
    for(var i=0;i<req.files.length-1;i++){
        goods_picture += req.files[i].filename+'#'
    }
    goods_picture += req.files[i].filename;
    conn.query("insert into goods(goods_id,goods_name,goods_originprice,goods_price,classify_id,goods_recommend,goods_picture,goods_sellerid,goods_addtime,goods_newold) values(?,?,?,?,?,?,?,?,?,?)", [UUID.v1(),params.goodsname,params.oldprice,params.price,params.goodstype,params.recommend,goods_picture,params.sellerid,datetime.format(new Date(),'YYYY-MM-DD HH:mm:ss'),params.goodsnewold], function (err, result) {
        if (err) {
            for(var i=0;i<req.files.length;i++){
                fs.unlinkSync('static/public/uploads/'+req.files[i].filename)
            }
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/getClassifyOptions', (req, res) => {
    var params = req.body;
    conn.query("select *from classify order by classify_id", [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/uploadheadphoto',upload.single('file'), (req, res) => {
    var params = req.body;
    try{
        fs.unlinkSync('static/public/uploads/'+params.oldheadphoto);
    }catch(e){}
    conn.query("update user set headphoto=? where user_id=?", [req.file.filename,params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, {
                'headphoto':req.file.filename
            });
        }
    })
});

router.post('/getSinglegood', (req, res) => {
    var params = req.body;
    conn.query("select * from v_goods where goods_id=?", [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;
