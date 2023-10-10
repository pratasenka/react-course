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

export const filterSearchParams = (searchOptions: any): any => {
    const searchParams: any = {};

    Object.keys(searchOptions).map((key) => {
        if (searchOptions[key]) searchParams[key] = searchOptions[key];
    });

    return searchParams;
};
