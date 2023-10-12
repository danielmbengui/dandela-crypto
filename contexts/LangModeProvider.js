import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/fr';
import { STORAGE_LANG_MODE } from '../_mocks_/_settings_items_';


export const LangModeProviderContext = createContext(null);

export default function LangModeProvider({children, langMode}) {
    const { i18n } = useTranslation();
    const router = useRouter();
    const [lang, setLang] = useState(router.locale || langMode);


useEffect(() => {
setLang(langMode);
//moment.locale(langMode);
}, [langMode])

useEffect(() => {
  console.log("ACTUAL locale website address DEFAULT lang", router.defaultLocale);
  console.log("ACTUAL locale website address", router.locale);
  if (router.locale) {
    setLang(router.locale);
    //moment.locale(lang);
  }
}, [])
    
    useEffect(() => {
        //setLang(langMode);
        document.documentElement.setAttribute(STORAGE_LANG_MODE, lang);
        //i18n.changeLanguage(lang);
        window.localStorage.setItem(STORAGE_LANG_MODE, lang);
        router.replace(router.asPath, router.asPath, { locale: lang })
        moment.locale(lang);
        
        //console.log("ACTUAL locale website address DEFAULT lang", router.defaultLocale)
      //console.log("ACTUAL locale website address", router.locale)
        //router.push(url: router.asPath);
        /*
        router.push({
          pathname: router.asPath,
          query: { pid: post.id },
          
        })
        */
       
      //console.log("Theme MaterialUI : ", themeMode);
    }, [lang]);
  
    return (
      <LangModeProviderContext.Provider value={[lang, setLang]}>
        {children}
      </LangModeProviderContext.Provider>
    );
  }

  export const useLangMode = () => {
    return useContext(LangModeProviderContext);
  };