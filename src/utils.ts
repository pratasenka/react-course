export const constructUrl = (url: string, params: any): string => {
    return decodeURIComponent(
        url.concat(
            "?",
            Object.keys(params)
                .map((key: string) => `${key}=${params[key]}`)
                .join("&")
        )
    );
};
