import axios from "axios";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { NextFunction, Request, Response } from "express";

const providerUrl = process.env.PROVIDER_URL

export const searchMedia = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let { mediaName } = req.params
        let url = `${providerUrl}/${mediaName}`
        let response = await axios.get(url)

        res.send(response.data).status(200)
    })
export const streamUrls = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let { episodeId } = req.query

        let url = `${providerUrl}/watch/${episodeId}`

        const response = await axios.get(url)
        res.status(200).send(response.data)
    })
export const mediaInfo = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let { id } = req.query
        let url = `${providerUrl}/info/${id}`
        const response = await axios.get(url)
        res.status(200).send(response.data)
    })