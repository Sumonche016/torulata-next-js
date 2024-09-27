import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverUrl = process.env.NEXT_PUBLIC_SEVER_API;
// Define a service using a base URL and expected endpoints
export const ProductApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),

  endpoints: (builder) => ({
    getProductsById: builder.query({
      query: (data) => ({
        url: `/api/v1/product/findManyById/${data}`,
        method: "GET",
      }),
    }),
    getAllBanner: builder.query({
      query: () => ({
        url: `/banner`,
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    addBanner: builder.mutation({
      query: (data) => ({
        url: `/banner/add`,
        method: "POST",
        body: { url: data },
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: builder.mutation({
      query: (_id) => ({
        url: `/banner/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsByIdQuery,
  useAddBannerMutation,
  useGetAllBannerQuery,
  useDeleteBannerMutation,
} = ProductApi;
