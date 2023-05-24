
export interface IDateTimePicker {
  data: Record<string, any>;
  onChangeDate?: (data: Record<string, any>) => void;
  isDisabled?: boolean;
  isError?: boolean
}