import Http from "@/plugins/Http";
import {
    mapPopularMovieNetworkRepositoryStructResponse,
    MovieNetworkRepositoryStructResponse
} from "@/repositories/struct/MovieNetworkRepositoryStructResponse";
import Lazy from "@/plugins/Lazy";
import Config from "@/config/Config";
const get = async () => {
    const url = `${Config.api}/trending/all/day?api_key=${Config.api_key}`
    const response = await Http.get(url, false, false)
    if (response.code === 200) {
        let data = []
        for (const obj of response.data.results) {
            console.log(obj.title)
            data.push(
                await Lazy.transform(
                    obj,
                    new MovieNetworkRepositoryStructResponse(),
                    mapPopularMovieNetworkRepositoryStructResponse
                )
            )
        }
        response.data.results = data
    }
    return response
}

const TrendingMovieNetworkRepository = {
    get
}
export default TrendingMovieNetworkRepository
