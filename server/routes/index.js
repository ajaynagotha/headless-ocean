import express from 'express'
const apiRoutes = express.Router()

apiRoutes.get('/', (req, res) => {
    res.json({version: "1.0.0"})
})

export default apiRoutes;
