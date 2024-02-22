/// <reference types="node" />
import { IVideo } from "../models/types";
import VideoExtractor from "../models/video-extractor";
declare class MixDrop extends VideoExtractor {
    protected serverName: string;
    protected sources: IVideo[];
    extract: (videoUrl: URL) => Promise<IVideo[]>;
}
export default MixDrop;
