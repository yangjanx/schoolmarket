var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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
    conn.query("select *from v_user where user_id=?", [params.id], function (err, result) {
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
    conn.query("select * from v_user where user_id=?", [params.id], function (err, result) {
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
    conn.query("select *from v_user where user_id=?", [params.id], function (err, result) {
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
    var classifyid=params.classifyid;
    var searchtext=params.searchtext;
    var selectsql='';
    if(!classifyid&&!searchtext)
        selectsql="select *from v_goods order by goods_addtime DESC";
    else if(classifyid&&!searchtext)
        selectsql="select *from v_goods where classify_id=? order by goods_addtime DESC";
    else
        selectsql="select *from v_goods where goods_name like '%"+searchtext.trim()+"%' order by goods_addtime DESC";
    conn.query(selectsql, [params.classifyid], function (err, result) {
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
    conn.query("select *from v_user where user_id=?",[params.id],function(err,result){
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

router.post('/getGoodsbyuser', (req, res) => {
    var params = req.body;
    conn.query("select * from v_goods where goods_sellerid=?", [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/addToCart', (req, res) => {
    var params = req.body;
    conn.query("select *from cart where cart_goods_id=? and cart_user_id=?", [params.goodsid,params.userid], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            if (result.length > 0) {
                jsonWrite(res, {
                    code: -1,
                    msg: '该商品已在购物车中！'
                });
            } else {
                conn.query("INSERT INTO cart(cart_goods_id,cart_user_id,cart_addtime) VALUES(?,?,?)", [params.goodsid, params.userid,datetime.format(new Date(),'YYYY-MM-DD HH:mm:ss')], function (err, result) {
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

router.post('/getCartinfo', (req, res) => {
    var params = req.body;
    conn.query("select *from v_cart where cart_user_id=? order by cart_addtime DESC", [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/getCollectinfo', (req, res) => {
    var params = req.body;
    conn.query("select *from v_collect where collect_user_id=? order by collect_addtime DESC", [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/removefromCart', (req, res) => {
    var params = req.body;
    conn.query("delete from cart where cart_goods_id=? and cart_user_id=?", [params.goodsid,params.userid], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/removefromCollect', (req, res) => {
    var params = req.body;
    conn.query("delete from collect where collect_goods_id=? and collect_user_id=?", [params.goodsid,params.userid], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/deleteGoods', (req, res) => {
    var params = req.body;
    conn.query("select goods_picture from goods where goods_id=?",[params.goodsid],function(err, result){
        if (err) {
            console.log(err);
        }
        if (result) {
            var pictures=result[0].goods_picture.split('#');
            for(var i=0;i<pictures.length;i++){
                fs.unlinkSync('static/public/uploads/'+pictures[i]);
            }
        }
    conn.query("delete from goods where goods_id=?", [params.goodsid], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
    })
});

router.post('/addToCollection', (req, res) => {
    var params = req.body;
    conn.query("select *from collect where collect_goods_id=? and collect_user_id=?", [params.goodsid,params.userid], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            if (result.length > 0) {
                jsonWrite(res, {
                    code: -1,
                    msg: '该商品已在收藏夹中！'
                });
            } else {
                conn.query("INSERT INTO collect(collect_goods_id,collect_user_id,collect_addtime) VALUES(?,?,?)", [params.goodsid, params.userid,datetime.format(new Date(),'YYYY-MM-DD HH:mm:ss')], function (err, result) {
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

router.post('/addComment', (req, res) => {
    var params = req.body;
    conn.query("insert into comment(comment_id,comment_user_id,comment_goods_id,comment_content,comment_addtime) values(?,?,?,?,?)", [UUID.v1(),params.userid,params.goodsid,params.content,datetime.format(new Date(),'YYYY-MM-DD HH:mm:ss')], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/getComment', (req, res) => {
    var params = req.body;
    conn.query("select *from v_comment where comment_goods_id=? order by comment_addtime DESC", [params.goodsid], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            for(var i=0;i<result.length;i++){
                result[i].comment_addtime=datetime.format(new Date(result[i].comment_addtime),'YYYY-MM-DD HH:mm:ss')
            }
            jsonWrite(res, result);
        }
    })
});

module.exports = router;
