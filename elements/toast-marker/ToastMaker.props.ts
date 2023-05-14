export enum EToastMarker {
    success = "success",
    error = "error"
}

export interface IToastMarker {
    type: EToastMarker,
    text: string
}