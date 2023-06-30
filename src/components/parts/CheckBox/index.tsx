import Box from "@mui/material/Box";
import CheckBox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormContext } from "react-hook-form";

import {
  CheckBoxFormControlLabelProps,
  CheckBoxFormControlProps,
} from "../../CheckBoxInput/CheckBoxInput";

type Option = {
  id: string;
  name: string;
};

export type CheckBoxInputProps = Omit<
  CheckboxProps,
  "error" | "defaultValue"
> & {
  name: string;
  error?: string;
  formControlProps?: CheckBoxFormControlProps;
  formControlLabelProps?: CheckBoxFormControlLabelProps;
  options: Option[];
  label: string;
  value?: string[];
  onChange?: (value: string[]) => void;
};

/**
 * 検索条件用のチェックボックス.
 * @param name - hook-formで管理するステートの名前
 * @param options - フィルターの選択肢
 * @param label - フィルターのタイトル
 */
const CheckBoxInput = (props: CheckBoxInputProps) => {
  const {
    error,
    disabled,
    formControlProps,
    formControlLabelProps,
    value,
    options,
    name,
    label,
    onChange,
    ...rest
  } = props;

  const { getValues } = useFormContext();

  return (
    <FormControl error={!!error} disabled={disabled} {...formControlProps}>
      <Box fontSize={14} fontWeight="bold">
        {label}
      </Box>
      {options.map((item, index) => (
        <FormControlLabel
          key={index}
          control={
            <CheckBox
              inputProps={{ "aria-label": "controlled" }}
              {...rest}
              checked={value?.some((id) => id === item.id)}
              value={item.id}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                event.target.checked
                  ? onChange?.(
                      getValues(name)
                        ? [...getValues(name), event.target.value]
                        : [event.target.value]
                    )
                  : onChange?.(
                      getValues(name).filter(
                        (value) => value !== event.target.value
                      )
                    );
              }}
            />
          }
          label={item.name}
          {...formControlLabelProps}
        />
      ))}
    </FormControl>
  );
};

export default CheckBoxInput;
