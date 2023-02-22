import Http from "@/plugins/Http";
import Lazy from "@/plugins/Lazy";
import {
    mapPopularMovieNetworkRepositoryStructResponse,
    MovieNetworkRepositoryStructResponse
} from "@/repositories/struct/MovieNetworkRepositoryStructResponse";
import Config from "@/config/Config";

const get = async () => {
    const url = `${Config.api}/movie/popular?api_key=${Config.api_key}`
    console.log(url)
    const response = await Http.get(url,false, false)
    if (response.code === 200) {
        let data = []
        for (const obj of response.data.results) {
            data.push(
                await Lazy.transform(
                    obj,
                    new MovieNetworkRepositoryStructResponse(),
                    mapPopularMovieNetworkRepositoryStructResponse
                )
            )
        }
        response.data.results = data
    } else {
        response.subErrors = [{message: response.message}]
    }
    return response
}

const PopularMovie = {
    get,
}

export default PopularMovie
