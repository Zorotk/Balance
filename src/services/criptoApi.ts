import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const headerApi = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '1403cc29ebmsh68bb05014e7301ap1cdb10jsn110b2df0d84b'
}
const baseUrl: string = 'https://coinranking1.p.rapidapi.com'
const createQuery = (url: string, headerApi: Record<string,string>) => ({url, headers: headerApi})


export const criptoApi = createApi({
    reducerPath: 'criptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCriptos: builder.query({
            query: (count: number = 5) => createQuery(`/coins?limit=${count}`,headerApi)
        })
    })
})

export const {useGetCriptosQuery} = criptoApi


