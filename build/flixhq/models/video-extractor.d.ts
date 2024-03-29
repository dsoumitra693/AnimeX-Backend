/// <reference types="node" />
import Proxy from '../models/proxy';
import { ISource, IVideo } from './types';
declare abstract class VideoExtractor extends Proxy {
    /**
     * The server name of the video provider
     */
    protected abstract serverName: string;
    /**
     * list of videos available
     */
    protected abstract sources: IVideo[];
    /**
     * takes video link
     *
     * returns video sources (video links) available
     */
    protected abstract extract(videoUrl: URL, ...args: any): Promise<IVideo[] | ISource>;
}
export default VideoExtractor;
