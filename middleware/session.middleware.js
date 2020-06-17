var Session = require('../model/session.model');

module.exports.session = function (req, res, next) {
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {

    var session = new Session({
      tong_san_pham : 0,
      tong_tien: 0,
    });
    session.save();
    var sessionId = session._id;

    res.cookie('sessionId', sessionId, {
      signed: true
    });
  }
next();
  // var session = await Session.findById(sessionId);
  // res.locals.countItem = session.tong_san_pham ? session.totalProduct : 0;
}