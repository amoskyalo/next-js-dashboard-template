export type APIResponse<TData> = {
    //TODO: Write types for API response structure;
    statusCode: number;
    responseMessage: string;
    body: TData;
};
