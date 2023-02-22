import Http from "@/plugins/Http";
import Lazy from "@/plugins/Lazy";
import {
    mapPopularMovieNetworkRepositoryStructResponse,
    MovieNetworkRepositoryStructResponse
} from "@/repositories/struct/MovieNetworkRepositoryStructResponse";
import Config from "@/config/Config";

const get = async () => {
    const url = `${Config.api}/movie/upcoming?api_key=${Config.api_key}`
    const response = await Http.get(url, false,  false)
    console.log(response)
    if (response.code === 200) {
        let newData = []
        for (const obj of response.data.results) {
            newData.push(
                await Lazy.transform(
                    obj,
                    new MovieNetworkRepositoryStructResponse(),
                    mapPopularMovieNetworkRepositoryStructResponse
                )
            )
        }
        response.data.results = newData
    }
    return response
}

const UpComingMovieNetworkRepository = {
    get
}
export default UpComingMovieNetworkRepository
