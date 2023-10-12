import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';


export const ResumeIcon = ({color = 'var(--text)', ...props}) => {
    return(
        <StickyNote2OutlinedIcon {...props} fontSize='medium' sx={{
            color:color
        }} />
    )
}