var Session = require('../model/session.model');

module.exports.cc = async function(req,res,next){
    var sessionId = req.signedCookies.sessionId;
  
    if (!sessionId) {
  
      var session = new Session;
      session.save();
      var sessionId = session._id;
  
      res.cookie('sessionId', sessionId, {
        signed: true
      });
    }
  
    var session = await Session.findById(sessionId);
    res.locals.countItem = session.totalProduct;
    next();
}