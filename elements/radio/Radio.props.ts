export interface IRadio {
    checked: boolean;
    value?: string;
    onChange: (value: boolean) => void;
    label?: string
}