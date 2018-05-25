var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

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
    conn.query("update user set user_nick=?,true_name=?,phone=?,age=?,institute=?,qq=?,wechat=? where user_id=?", [params.nick, params.truename, params.phone, params.age, params.institute, params.qq, params.wechat, params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/modifypsd', (req, res) => {
    var params = req.body;
    conn.query("update user set password=? where user_id=?", [params.password, params.id], function (err, result) {
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
})

module.exports = router;
