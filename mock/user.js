const usernames = ['ant.design', 'admin', 'superuser'];
const passwords = ['ant.design', 'admin'];

module.exports = {
  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;

    if (!usernames.includes(username) || !passwords.includes(password)) {
      res.status(400).send({
        data: {
          isLogin: true
        },
        errorMessage: '账户或密码错误',
        success: false
      });
      return;
    }

    // 模拟请求延迟
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 800);
    }).then(() => {
      res.send({
        type: 'account',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PObw1E6dwD2Mo9vLQUO8CQxzITNXx4ABu7mS2zWLeJk',
        success: true
      });
    });
  },

  'POST /api/logout': (req, res) => {
    // 模拟请求延迟
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 800);
    }).then(() => {
      res.send({
        success: true
      });
    });
  },

  'POST /api/register': (req, res) => {
    const body = req.body;
    // 模拟请求延迟
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 800);
    }).then(() => {
      res.send({
        data: body,
        success: true
      });
    });
  }
};
