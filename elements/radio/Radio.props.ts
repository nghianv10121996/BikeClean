export interface IRadio {
    checked: boolean;
    onChange: (value: boolean) => void;
    label?: string
}