import jwt from 'jsonwebtoken'
import config from 'config'

const authorize = async (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).json({msg:"Token doesn't exist"})

    try {
        const decoded = jwt.verify(token, config.get('jsecretkey'))
        req.user = decoded.userRegister
        next()
    } catch (error) {
        return res.status(401).json({msg:"Token is invaild"})
    }
}

export default authorize