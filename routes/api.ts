import express from 'express'
import { mediaInfo, searchMedia, streamUrls } from "../controllers/api"

const apiRouter = express.Router()

apiRouter.get('/v1/search/:mediaName', searchMedia)
apiRouter.get('/v1/watch', streamUrls)
apiRouter.get('/v1/info', mediaInfo)

export default apiRouter