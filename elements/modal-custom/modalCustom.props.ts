import { ReactChild, ReactChildren, ReactFragment, ReactNode, ReactPortal } from "react";

export interface IModalCustom {
    isVisible: boolean;
    onClose: () => void;
    children: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
}