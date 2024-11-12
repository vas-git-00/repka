import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    //console.log('1 stage', token)
    if (token) {
        //console.log('2 stage', token)
        try {
            const decoded = jwt.verify(token, "secretkey")
            //console.log('decoded: ', decoded)
            req.userId = decoded.user_id
            req.companyId = decoded.company_id
            //console.log('uId', req.userId)
            //console.log('cId', req.companyId)
            next()
            
        } catch (error) {
            return res.status(403).json({ message: "Токен не действителен!" })
        }

    } else {
        return res.status(403).json({ message: "Токена нет!" })
    }
}