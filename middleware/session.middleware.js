
module.exports = function (req, res, next) {
  if (!req.session.cart) {
    req.session.cart = {
        tong_tien: 0,
        tong_san_pham: 0,
        gio_hang:[]
    }
  }
  next();
  // var session = await Session.findById(sessionId);
  // res.locals.countItem = session.tong_san_pham ? session.totalProduct : 0;
}