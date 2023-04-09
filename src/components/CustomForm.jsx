import styled from "@mui/material/styles/styled";
import { unstable_styleFunctionSx } from "@mui/system";

const CustomForm = styled("form", {
    name: "MyCustomForm",
    overridesResolver: (props, styles) => styles.root,
})(unstable_styleFunctionSx);

export default CustomForm;
