var sqlMap = {
    blog: {
      insert:'INSERT INTO user(user_id,author,title,tyep,loadURL,tag,summary,posy_time,upd_time) VALUES(8023,陈亮,?,0,$,tag,?,?,?)',
      update:'update blog set name=?, age=? where id=?',
      delete: 'delete from blog where id=?',
      queryById: 'select * from blog where id=?',
      queryAll: 'select * from blog'
    },
  }
  
  module.exports = sqlMap;