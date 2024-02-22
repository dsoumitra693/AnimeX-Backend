import axios from "axios";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import createHttpError from 'http-errors';

const providerUrl = "https://consumet-mauve.vercel.app/movies/flixhq/"

export const searchMedia = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let { mediaName } = req.params
        let url = `${providerUrl}/${mediaName}`
        let response = await axios.get(url)

        res.send(response.data).status(200)
    })
export const streamUrls = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let episodeId = req.body.episodeId as string
        let mediaId = req.body.mediaId as string

        let url = `${providerUrl}watch?episodeId=${episodeId}&mediaId=${mediaId}&server=mixdrop`

        const response = await axios.get(url)
        res.status(200).send(response.data)
    })
export const mediaInfo = asyncErrorHandler( 
    async (req: Request, res: Response, next: NextFunction) => {
        let { id } = req.body
        let url = `${providerUrl}info?id=${id}`
        const response = await axios.get(url)
        res.status(200).send(response.data)
    })