/*
 * @Author: zhanggenyuan
 * @Date: 2020-06-01 15:01:56
 * @Description: mock文件
 */

module.exports = function (req, res, next) {
  const method = (req.method || 'GET').toLowerCase();
  const url = req.url.split('?')[0];
  if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
    const base = `../src/mock/${method}${url}/index.js`;
    delete require.cache[require.resolve(base)];
    const json = require(base)();
    res.send(json);
  }

  next();
};