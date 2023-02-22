import PopularMovieNetworkRepository from "@/repositories/PopularMovieNetworkRepository";
import Lazy from "@/plugins/Lazy";
import {MovieServiceResultStruct} from "@/usecases/struct/MovieServiceResultStruct";
import UpComingMovieNetworkRepository from "@/repositories/UpComingMovieNetworkRepository";
import TrendingMovieNetworkRepository from "@/repositories/TrendingMovieNetworkRepository";

const getPosterPath = (payload) => {
    return `https://image.tmdb.org/t/p/w500${payload}`
}
const getListPopularMovies = async () => {
    const response  = await PopularMovieNetworkRepository.get()
    if (response.code === 200) {
        let data = []
        for (const obj of response.data.results) {
            data.push(
                await Lazy.transform(
                    obj,
                    new MovieServiceResultStruct()
                )
            )
        }
        response.data.results = data
    }
    return response
}

const getListUpComingMovies = async () => {
    const response = await UpComingMovieNetworkRepository.get()
    if (response.code === 200) {
        let data = []
        for (const obj of response.data.results) {
            data.push(
                await Lazy.transform(
                    obj,
                    new MovieServiceResultStruct()
                )
            )
        }
        response.data.results = data
    }
    return response
}

const getListTrendingMovies = async () =>{
    const response = await TrendingMovieNetworkRepository.get()
    if (response.code === 200) {
        let data = []
        for (const obj of response.data.results) {
            data.push(
                await Lazy.transform(
                    obj,
                    new MovieServiceResultStruct()
                )
            )
        }
        response.data.results = data
    }
    return response
}
const PopularMovieService = {
    getListPopularMovies,
    getListUpComingMovies,
    getListTrendingMovies,
    getPosterPath
}

export default PopularMovieService
