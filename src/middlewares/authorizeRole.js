

export const authorise = (...roles) =>{
    return (req,res,next)=>{
            const role = req.user.role;
            if(!roles.includes(role)){
                res.status(401).json({
                    status:"failed",
                    message:"Only authorized can perform this action"
                })
            }
            next();
    }
}