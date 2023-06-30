import Box, { BoxProps } from "@mui/material/Box";
import React from "react";

/**
 * Properties for {@link FormBase}.
 */
interface FormBaseProps<V> extends Omit<BoxProps<"form">, "onSubmit"> {
  /**
   * Submission handler
   *
   * @param values - Submitted form values
   */
  onSubmit: (values: V) => void;
  /**
   * Form Content
   */
  children: React.ReactNode;
}

/**
 * Form component base.
 * Presing the Enter key will not trigger `onSubmit`
 *
 * @param props - See {@link FormBaseProps}
 */
const FormBase = <V,>(props: FormBaseProps<V>) => {
  const { onSubmit, children, ...rest } = props;
  /**
   * Enterキーを押したときに、フォームを送信しないようにする
   */
  const preventEnterKeySubmit = (e: any) => {
    if (
      e.key === "Enter" &&
      !(e.target?.nodeName?.toLowerCase() === "textarea") &&
      !(e.target?.className === "contentEditableText")
    ) {
      e.preventDefault();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      onKeyDown={preventEnterKeySubmit}
      /**
       * DataGrid用
       * DataGrid内にあるinputはonKeyDownがここまで届かないのでonKeyPressで対応する
       * 本来onKeyPressは非推奨だが、onKeyDownは効かないのでここでは使う
       */
      onKeyPress={preventEnterKeySubmit}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default FormBase;
