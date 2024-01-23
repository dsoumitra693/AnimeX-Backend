import { MOVIES } from "@consumet/extensions";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { NextFunction, Request, Response } from "express";
import createHttpError from 'http-errors';
import axios from "axios";

const API_URL = "https://consumet-api-951q.onrender.com"


const flixhq = new MOVIES.FlixHQ();
export const searchMedia = asyncErrorHandler( 
    async (req: Request, res: Response, next: NextFunction) => {
        let {mediaName} = req.params
        let response = await axios.get(`https://consumet-api-951q.onrender.com/movies/flixhq/${mediaName}?page=1`)

        console.log(response.data)
        if(response.data == null) return next(createHttpError(404, 'Movie not found'));
        res.send(response.data)
})
export const streamUrls = asyncErrorHandler( 
    async (req: Request, res: Response, next: NextFunction) => {
        let {episodeId, mediaId} = req.query
        let response = await axios.get(`https://consumet-api-951q.onrender.com/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaId}`)

        console.log(response.data)
        if(response.data == null) return next(createHttpError(404, 'Movie not found'));
        res.send(response.data)
})
export const mediaInfo = asyncErrorHandler( 
    async (req: Request, res: Response, next: NextFunction) => {
        let {id} = req.body.params
        let response = await axios.get(`https://consumet-api-951q.onrender.com/movies/flixhq/info?id=${id}`)

        console.log(response.data)
        if(response.data == null) return next(createHttpError(404, 'Movie not found'));
        res.send(response.data)
})