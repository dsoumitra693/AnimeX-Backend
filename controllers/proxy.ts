import axios from "axios";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import {Request, NextFunction, Response } from "express";


export const proxyController = asyncErrorHandler(
    async (req:Request, res:Response, next:NextFunction) => {
        let { imageid } = req.query
        let response = await axios.get(`https://img.flixhq.to/xxrz/${imageid}`, {
            responseType: 'arraybuffer'
        });

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(response.data);

    })