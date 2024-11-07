import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {

        try {
            const decoded = jwt.verify(token, "secretkey")
    
            req.userId = decoded.user_id
            req.companyId = decoded.company_id

            next()
            
        } catch (error) {
            return res.status(403).json({ message: "Токен не действителен!" })
        }

    } else {
        return res.status(403).json({ message: "Токен не действителен!" })
    }
}