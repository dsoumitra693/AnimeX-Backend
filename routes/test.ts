import axios from "axios";
import { Router } from "express";

const testRouter = Router()

const url = "https://img.flixhq.to/xxrz/250x400/379/85/a0/85a064832dcda25e88285be7f88aec4f/85a064832dcda25e88285be7f88aec4f.jpg"

testRouter.get('/', async (req, res) => {
     // Make a GET request to the specified URL to fetch the image
     let response = await axios.get(url, {
        responseType: 'arraybuffer' // Set responseType to 'arraybuffer' to get binary data
    });

    // Set the content type header to indicate that the response contains an image
    res.setHeader('Content-Type', 'image/jpeg');

    // Send the image data in the response body
    res.send(response.data);

})

export default testRouter