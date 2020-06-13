module.exports.validateUser =function(req,res,next){
    var errors=[];
    if(!req.body.name){
        errors.push('Error');
    }
    if(!req.body.username){
        errors.push('Error');
    }
    if(errors.length){
        res.render('create',{errors:errors});
        return;
    }
    next();
}