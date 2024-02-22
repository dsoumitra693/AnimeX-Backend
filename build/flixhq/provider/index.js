"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const extractors_1 = require("../extractors");
const types_1 = require("../models/types");
const movie_parser_1 = __importDefault(require("../models/movie-parser"));
class FlixHQ extends movie_parser_1.default {
    constructor() {
        super(...arguments);
        this.name = 'FlixHQ';
        this.baseUrl = 'https://flixhq.ws';
        this.logo = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png';
        this.classPath = 'MOVIES.FlixHQ';
        this.supportedTypes = new Set([types_1.TvType.MOVIE, types_1.TvType.TVSERIES]);
        /**
         *
         * @param query search query string
         * @param page page number (default 1) (optional)
         */
        this.search = (query, page = 1) => __awaiter(this, void 0, void 0, function* () {
            const searchResult = {
                currentPage: page,
                hasNextPage: false,
                results: [],
            };
            try {
                const { data } = yield this.client.get(`${this.baseUrl}/search/${query.replace(/[\W_]+/g, '-')}?page=${page}`);
                const $ = (0, cheerio_1.load)(data);
                const navSelector = 'div.pre-pagination > nav > ul';
                searchResult.hasNextPage =
                    $(navSelector).children().length > 0 ? $(navSelector).children().last().hasClass('active') : false;
                $('.film_list-wrap > div.flw-item').each((i, el) => {
                    var _a;
                    const releaseDate = $(el).find('div.film-detail > div.fd-infor > span:nth-child(1)').text();
                    searchResult.results.push({
                        id: (_a = $(el).find('div.film-poster > a').attr('href')) === null || _a === void 0 ? void 0 : _a.slice(18, -1),
                        title: $(el).find('div.film-detail > h3 > a').attr('title'),
                        url: `${$(el).find('div.film-poster > a').attr('href')}`,
                        image: $(el).find('div.film-poster > img').attr('src'),
                        releaseDate: isNaN(parseInt(releaseDate)) ? undefined : releaseDate,
                        seasons: releaseDate.includes('SS') ? parseInt(releaseDate.split('SS')[1]) : undefined,
                        type: $(el).find('div.film-detail > div.fd-infor > span.float-right').text() === 'Movie'
                            ? types_1.TvType.MOVIE
                            : types_1.TvType.TVSERIES,
                    });
                });
                return searchResult;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
        /**
         *
         * @param mediaId media link or id
         */
        this.fetchMediaInfo = (mediaId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let url = mediaId;
            if (!mediaId.startsWith(this.baseUrl)) {
                url = `${this.baseUrl}/${mediaId}`;
            }
            const movieInfo = {
                id: mediaId,
                title: '',
                url: `${this.baseUrl}/${mediaId}`,
            };
            try {
                const { data } = yield this.client.get(url);
                const $ = (0, cheerio_1.load)(data);
                const recommendationsArray = [];
                $('div.film_list-wrap > div.flw-item').each((i, el) => {
                    var _a, _b, _c;
                    recommendationsArray.push({
                        id: (_a = $(el).find('div.film-poster > a').attr('href')) === null || _a === void 0 ? void 0 : _a.slice(18, -1),
                        title: $(el).find('div.film-detail > h3.film-name > a').text(),
                        image: $(el).find('div.film-poster > img').attr('src'),
                        duration: (_b = $(el).find('div.film-detail > div.fd-infor > span.fdi-duration').text().replace('m', 'min')) !== null && _b !== void 0 ? _b : null,
                        type: $(el).find('div.film-detail > div.fd-infor > span.fdi-type').text().toLowerCase() === 'tv'
                            ? types_1.TvType.TVSERIES
                            : (_c = types_1.TvType.MOVIE) !== null && _c !== void 0 ? _c : null,
                    });
                });
                const uid = mediaId.split('-')[mediaId.split('-').length - 1];
                movieInfo.cover = (_a = $('div.w_b-cover').attr('style')) === null || _a === void 0 ? void 0 : _a.slice(22).replace(')', '').replace(';', '');
                movieInfo.title = $('.heading-name > a:nth-child(1)').text();
                movieInfo.image = $('.m_i-d-poster > div:nth-child(1) > img:nth-child(1)').attr('src');
                movieInfo.description = $('.description').text().trim();
                movieInfo.type = movieInfo.id.split('/')[0] === 'series' ? types_1.TvType.TVSERIES : types_1.TvType.MOVIE;
                movieInfo.releaseDate = $('div.col-xl-5 > div.row-line:nth-child(1)').text().replace('Released: ', '').trim();
                movieInfo.genres = $('div.row-line:nth-child(2) > a')
                    .map((i, el) => $(el).text().split('&'))
                    .get()
                    .map(v => v.trim());
                movieInfo.casts = $('div.col-xl-5 > div.row-line:nth-child(3) > a')
                    .map((i, el) => $(el).text())
                    .get();
                movieInfo.tags = $('div.row-line:nth-child(6) > h2')
                    .map((i, el) => $(el).text())
                    .get();
                movieInfo.production = $('div.col-xl-6 > div.row-line:nth-child(3)').text().replace("Production: ", '').trim();
                movieInfo.country = $('div.col-xl-6 > div.row-line:nth-child(2)').text().replace("Country: ", '').trim();
                movieInfo.duration = $('div.col-xl-6 > div.row-line:nth-child(1)').text().includes("Duration") ?
                    $('div.col-xl-6 > div.row-line:nth-child(1)').text().replace("Duration: ", '').trim() : undefined;
                movieInfo.rating = parseFloat($('div.dp-i-stats > span.item:nth-child(3) > button').text().replace("IMDB: ", '').trim());
                movieInfo.recommendations = recommendationsArray;
                const ajaxReqUrl = (id, type, isSeasons = false) => `${this.baseUrl}/ajax/${type === 'movie' ? type : `v2/${type}`}/${isSeasons ? 'seasons' : 'episodes'}/${id}`;
                if (movieInfo.type === types_1.TvType.TVSERIES) {
                    const { data } = yield this.client.get(ajaxReqUrl(uid, 'series', true));
                    const $$ = (0, cheerio_1.load)(data);
                    const seasonsIds = $$('.dropdown-menu > a')
                        .map((i, el) => $(el).attr('data-id'))
                        .get();
                    movieInfo.episodes = [];
                    let season = 1;
                    for (const id of seasonsIds) {
                        const { data } = yield this.client.get(ajaxReqUrl(id, 'season'));
                        const $$$ = (0, cheerio_1.load)(data);
                        console.log(data);
                        $$$('.nav > li')
                            .map((i, el) => {
                            var _a;
                            const episode = {
                                id: $$$(el).find('a').attr('id').split('-')[1],
                                title: $$$(el).find('a').attr('title'),
                                number: parseInt($$$(el).find('a').attr('title').split(':')[0].slice(3).trim()),
                                season: season,
                                url: `${this.baseUrl}/ajax/v2/episode/servers/${$$$(el).find('a').attr('id').split('-')[1]}`,
                            };
                            (_a = movieInfo.episodes) === null || _a === void 0 ? void 0 : _a.push(episode);
                        })
                            .get();
                        season++;
                    }
                }
                else {
                    movieInfo.episodes = [
                        {
                            id: uid,
                            title: movieInfo.title + ' Movie',
                            url: `${this.baseUrl}/ajax/movie/episodes/${uid}`,
                        },
                    ];
                }
                return movieInfo;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
        /**
         *
         * @param episodeId episode id
         * @param mediaId media id
         * @param server server type (default `VidCloud`) (optional)
         */
        this.fetchEpisodeSources = (episodeId, mediaId, server = types_1.StreamingServers.UpCloud) => __awaiter(this, void 0, void 0, function* () {
            if (episodeId.startsWith('http')) {
                const serverUrl = new URL(episodeId);
                switch (server) {
                    case types_1.StreamingServers.MixDrop:
                        return {
                            headers: { Referer: serverUrl.href },
                            sources: yield new extractors_1.MixDrop(this.proxyConfig, this.adapter).extract(serverUrl),
                        };
                    case types_1.StreamingServers.VidCloud:
                        return Object.assign({ headers: { Referer: serverUrl.href } }, (yield new extractors_1.VidCloud(this.proxyConfig, this.adapter).extract(serverUrl, true)));
                    case types_1.StreamingServers.UpCloud:
                        return Object.assign({ headers: { Referer: serverUrl.href } }, (yield new extractors_1.VidCloud(this.proxyConfig, this.adapter).extract(serverUrl)));
                    default:
                        return {
                            headers: { Referer: serverUrl.href },
                            sources: yield new extractors_1.MixDrop(this.proxyConfig, this.adapter).extract(serverUrl),
                        };
                }
            }
            try {
                const servers = yield this.fetchEpisodeServers(episodeId, mediaId);
                const i = servers.findIndex(s => s.name === server);
                if (i === -1) {
                    throw new Error(`Server ${server} not found`);
                }
                const { data } = yield this.client.get(`${this.baseUrl}/ajax/get_link/${servers[i].url.split('.').slice(-1).shift()}`);
                const serverUrl = new URL(data.link);
                return yield this.fetchEpisodeSources(serverUrl.href, mediaId, server);
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
        /**
         *
         * @param episodeId takes episode link or movie id
         * @param mediaId takes movie link or id (found on movie info object)
         */
        this.fetchEpisodeServers = (episodeId, mediaId) => __awaiter(this, void 0, void 0, function* () {
            if (!episodeId.startsWith(this.baseUrl + '/ajax') && !mediaId.includes('movie'))
                episodeId = `${this.baseUrl}/ajax/v2/episode/servers/${episodeId}`;
            else
                episodeId = `${this.baseUrl}/ajax/movie/episodes/${episodeId}`;
            console.log(episodeId);
            try {
                const { data } = yield this.client.get(episodeId);
                const $ = (0, cheerio_1.load)(data);
                const servers = $('.nav > li')
                    .map((i, el) => {
                    const server = {
                        name: mediaId.includes('movie')
                            ? $(el).find('a').attr('title').toLowerCase()
                            : $(el).find('a').attr('title').slice(6).trim().toLowerCase(),
                        url: `${this.baseUrl}/${mediaId}.${!mediaId.includes('movie')
                            ? $(el).find('a').attr('data-id')
                            : $(el).find('a').attr('data-linkid')}`.replace(!mediaId.includes('movie') ? /\/tv\// : /\/movie\//, !mediaId.includes('movie') ? '/watch-tv/' : '/watch-movie/'),
                    };
                    return server;
                })
                    .get();
                return servers;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
        this.fetchRecentMovies = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.client.get(`${this.baseUrl}/home`);
                const $ = (0, cheerio_1.load)(data);
                const movies = $('section.block_area:contains("Latest Movies") > div:nth-child(2) > div:nth-child(1) > div.flw-item')
                    .map((i, el) => {
                    var _a;
                    const releaseDate = $(el).find('div.film-detail > div.fd-infor > span:nth-child(1)').text();
                    const movie = {
                        id: (_a = $(el).find('div.film-poster > a').attr('href')) === null || _a === void 0 ? void 0 : _a.slice(1),
                        title: $(el).find('div.film-detail > h3.film-name > a').attr('title'),
                        url: `${this.baseUrl}${$(el).find('div.film-poster > a').attr('href')}`,
                        image: $(el).find('div.film-poster > img').attr('data-src'),
                        releaseDate: isNaN(parseInt(releaseDate)) ? undefined : releaseDate,
                        duration: $(el).find('div.film-detail > div.fd-infor > span.fdi-duration').text() || null,
                        type: $(el).find('div.film-detail > div.fd-infor > span.float-right').text() === 'Movie'
                            ? types_1.TvType.MOVIE
                            : types_1.TvType.TVSERIES,
                    };
                    return movie;
                })
                    .get();
                return movies;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
        this.fetchRecentTvShows = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.client.get(`${this.baseUrl}/home`);
                const $ = (0, cheerio_1.load)(data);
                const tvshows = $('section.block_area:contains("Latest TV Shows") > div:nth-child(2) > div:nth-child(1) > div.flw-item')
                    .map((i, el) => {
                    var _a;
                    const tvshow = {
                        id: (_a = $(el).find('div.film-poster > a').attr('href')) === null || _a === void 0 ? void 0 : _a.slice(1),
                        title: $(el).find('div.film-detail > h3.film-name > a').attr('title'),
                        url: `${this.baseUrl}${$(el).find('div.film-poster > a').attr('href')}`,
                        image: $(el).find('div.film-poster > img').attr('data-src'),
                        season: $(el).find('div.film-detail > div.fd-infor > span:nth-child(1)').text(),
                        latestEpisode: $(el).find('div.film-detail > div.fd-infor > span:nth-child(3)').text() || null,
                        type: $(el).find('div.film-detail > div.fd-infor > span.float-right').text() === 'Movie'
                            ? types_1.TvType.MOVIE
                            : types_1.TvType.TVSERIES,
                    };
                    return tvshow;
                })
                    .get();
                return tvshows;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
        this.fetchTrendingMovies = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.client.get(`${this.baseUrl}/home`);
                const $ = (0, cheerio_1.load)(data);
                const movies = $('div#trending-movies div.film_list-wrap div.flw-item')
                    .map((i, el) => {
                    var _a;
                    const releaseDate = $(el).find('div.film-detail > div.fd-infor > span:nth-child(1)').text();
                    const movie = {
                        id: (_a = $(el).find('div.film-poster > a').attr('href')) === null || _a === void 0 ? void 0 : _a.slice(1),
                        title: $(el).find('div.film-detail > h3.film-name > a').attr('title'),
                        url: `${this.baseUrl}${$(el).find('div.film-poster > a').attr('href')}`,
                        image: $(el).find('div.film-poster > img').attr('data-src'),
                        releaseDate: isNaN(parseInt(releaseDate)) ? undefined : releaseDate,
                        duration: $(el).find('div.film-detail > div.fd-infor > span.fdi-duration').text() || null,
                        type: $(el).find('div.film-detail > div.fd-infor > span.float-right').text() === 'Movie'
                            ? types_1.TvType.MOVIE
                            : types_1.TvType.TVSERIES,
                    };
                    return movie;
                })
                    .get();
                return movies;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
        this.fetchTrendingTvShows = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.client.get(`${this.baseUrl}/home`);
                const $ = (0, cheerio_1.load)(data);
                const tvshows = $('div#trending-tv div.film_list-wrap div.flw-item')
                    .map((i, el) => {
                    var _a;
                    const tvshow = {
                        id: (_a = $(el).find('div.film-poster > a').attr('href')) === null || _a === void 0 ? void 0 : _a.slice(1),
                        title: $(el).find('div.film-detail > h3.film-name > a').attr('title'),
                        url: `${this.baseUrl}${$(el).find('div.film-poster > a').attr('href')}`,
                        image: $(el).find('div.film-poster > img').attr('data-src'),
                        season: $(el).find('div.film-detail > div.fd-infor > span:nth-child(1)').text(),
                        latestEpisode: $(el).find('div.film-detail > div.fd-infor > span:nth-child(3)').text() || null,
                        type: $(el).find('div.film-detail > div.fd-infor > span.float-right').text() === 'Movie'
                            ? types_1.TvType.MOVIE
                            : types_1.TvType.TVSERIES,
                    };
                    return tvshow;
                })
                    .get();
                return tvshows;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
// (async () => {
//   const movie = new FlixHQ();
//   const search = await movie.search('the flash');
//   // const movieInfo = await movie.fetchEpisodeSources('1168337', 'tv/watch-vincenzo-67955');
//   // const recentTv = await movie.fetchTrendingTvShows();
//   console.log(search);
// })();
exports.default = FlixHQ;
