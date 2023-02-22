import axios from 'axios'
import queryString from 'query-string'
import {ResponseStruct} from './ResponseStruct'


axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTgwNzljMjk5OTVkM2QwMTQzMWM3MGY2MzQ5OTM4MiIsInN1YiI6IjYzNmY3YmQ4ODEzODMxMDBhYmY2MWExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RzfdysXJiH9Rje7QwumPaukmejtidM8RZdstoL4UTgc`
/**
 *
 * @param response
 * @param e
 * @returns {*}
 */
const errorResponse = (response, e) => {
    if (typeof e === 'undefined' || typeof e.response === 'undefined') {
        response.code = 500
        response.message = 'System Error Please Contact Administrator'
        response.subErrors = [
            {
                key: 'sub_errors_system_error_please_contact_administrator',
                message: 'System Error Please Contact Administrator',
            },
        ]
    } else {
        let r = e.response.data
        response.code = e.response.status
        response.message = r?.message || e.response.statusText
        response.subErrors = r?.detailErrors
    }
    return response
}

/**
 *
 * @param url
 * @param payload
 * @param isFormData - if payload is not JSON format
 * @param isResponseFile - response from server is not JSON format
 * @returns {Promise<*>}
 */
const post = async (
    url,
    payload,
    isFormData = false,
    isResponseFile = false,
    customConfig = {},
) => {
    const response = new ResponseStruct()
    try {
        let config = {timeout: 300000, ...customConfig}
        if (isFormData) {
            config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
                ...config,
            }
        }
        if (isResponseFile) {
            config = {...config, responseType: 'blob'}
        }
        let result = await axios.post(url, payload, config)
        response.code = result.status
        response.data = result.data
        response.message = result.statusText

        return response
    } catch (e) {
        return errorResponse(response, e)
    }
}
/**
 *
 * @param url
 * @param payload
 * @returns {Promise<*>}
 */
const put = async (url, payload) => {
    let response = new ResponseStruct()
    try {
        let result = await axios.put(url, payload)
        response.code = result.status
        response.data = result.data
        response.message = result.statusText
        return response
    } catch (e) {
        return errorResponse(response, e)
    }
}

/**
 * Remove unnecessary payload key
 * @param payload
 * @returns {*}
 */
const cleanUpPayload = (payload) => {
    for (const key in payload) {
        if (payload[key] === '' || payload[key] === null) {
            delete payload[key]
        }
    }
    return payload
}

/**
 *
 * @param url
 * @param payload
 * @param customConfig
 * @returns {Promise<ResponseStruct|*>}
 */
const get = async (url, payload = {}, customConfig = {}) => {
    let response = new ResponseStruct()
    payload = cleanUpPayload(payload)
    const config = {...customConfig}
    try {
        let query = queryString.stringify(payload || {})
        return await new Promise((resolve, reject) => {
            url = query !== '' ? `${url}?${query}` : url
            axios
                .get(url, config)
                .then(async (result) => {
                    response.code = result.status
                    response.message = result.statusText
                    response.data = result.data
                    response.pagination =
                        result.data?.detailPages ||
                        result.data?.detailPage ||
                        result.data?.detailOffsetPages
                    resolve(response)
                })
                .catch((result) => {
                    reject(result.response)
                })
        })
    } catch (e) {
        return errorResponse(response, e)
    }
}

const destroy = async (url, payload) => {
    let response = new ResponseStruct()
    try {
        let query = queryString.stringify(payload || {})
        return new Promise((resolve, reject) => {
            url = query !== '' ? `${url}?${query}` : url
            axios
                .delete(url)
                .then((result) => {
                    response.code = result.status
                    response.data = result.data
                    response.message = result.statusText
                    resolve(response)
                })
                .catch((result) => {
                    reject(result.response.data)
                })
        })
    } catch (e) {
        return errorResponse(response, e)
    }
}

const Http = {post, get, put, destroy}

export default Http
