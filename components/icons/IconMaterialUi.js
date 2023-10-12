import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';

export const ResumeIcon = ({color = 'var(--text)', ...props}) => {
    return(
        <StickyNote2OutlinedIcon {...props} fontSize='medium' sx={{
            color:color
        }} />
    )
}

export const PolicyIconMui = ({color = 'var(--text)', ...props}) => {
    return(
        <PolicyIcon {...props} fontSize='medium' sx={{
            color:color
        }} />
    )
}

export const TermsIconMui = ({color = 'var(--text)', ...props}) => {
    return(
        <GavelIcon {...props} fontSize='medium' sx={{
            color:color
        }} />
    )
}