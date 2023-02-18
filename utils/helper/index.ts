const converParamsToUrl = (params: any) => {
    return Object.entries(params).reduce((links: any[], params) => {
        return [...links, `${encodeURIComponent(`${params[0]}=${params[1]}`)}`]
    }, []).join("")
}