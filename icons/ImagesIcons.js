import Image from "next/image"


export const _SRC_LOGO_MIDJOURNEY_ = '/img/logos/midjourney.png';
export const _SRC_LOGO_SYNTHESIA_ = '/img/logos/synthesia.png';
export const _SRC_LOGO_NETBEANS_ = '/img/logos/netbeans.png';
export const _SRC_LOGO_I18N_ = '/img/logos/i18n.png';

export const MidjourneyIcon = ({size = 25}) => {
    return(
        <Image
        alt='midjourney-icon'
src={_SRC_LOGO_MIDJOURNEY_}
width={size}
height={size}
        />
    )
}

export const SynthesiaIcon = ({size = 25}) => {
    return(
        <Image
        alt='synthesia-icon'
src={_SRC_LOGO_SYNTHESIA_}
width={size}
height={size}
        />
    )
}


export const NetbeansIcon = ({size = 25}) => {
    return(
        <Image
        alt='netbeans-icon'
src={_SRC_LOGO_NETBEANS_}
width={size}
height={size}
        />
    )
}

export const I18nIcon = ({size = 25}) => {
    return(
        <Image
        alt='netbeans-icon'
src={_SRC_LOGO_I18N_}
width={size}
height={size}
        />
    )
}