import { OutlinedInput, Typography } from "@mui/material"

export const NewTextInput = ({
    label,placeholder, 
    reactHookProps ={},
    error,
    
}) => {
    return(
    <>
            <Typography>{error}</Typography>
            <Typography variant="body2">
                {label}
            </Typography>
        
            <OutlinedInput placeholder={placeholder} 
            {
                ...reactHookProps
            }>

            </OutlinedInput>

    </>
    )
}