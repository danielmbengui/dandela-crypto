import React, { createContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { DEFAULT_LANGAGE, STORAGE_LANGAGE } from "../constants";
import { getLangageStorage, updateLangageStorage } from "../lib/storage/UserStorageFunctions";
import { useTranslation } from "next-i18next";
export const LangageModeProviderContext = createContext({ toggleLangageMode: () => { } });

export default function LangageProvider({children, langageMode}){
    const [langage, setLangage] = useState(langageMode);
    const {i18n} = useTranslation();

    useEffect(() => {
      let _langageMode = DEFAULT_LANGAGE;
      if (typeof (Storage) !== "undefined") {
        if (window.localStorage.getItem(STORAGE_LANGAGE) === null) {
          window.localStorage.setItem(STORAGE_LANGAGE, _langageMode);
        }
        _langageMode = window.localStorage.getItem(STORAGE_LANGAGE);
      }
      setLangage(_langageMode);
    }, [langageMode]);
    
    //const {langage} = props;
    const router = useRouter();
  
    useEffect(() => {
      const {
        locales = [],
        locale,
        asPath,
        defaultLocale,
        pathname,
        query,
        isReady // here it is
      } = router
  
      const browserLanguage = window.navigator.language.slice(0, 2)
  
      const shouldChangeLocale =
        isReady// and here I use it
        //&& locale !== langage
        //&& locale !== browserLanguage
        //&& locale === defaultLocale
        && locales.includes(langage)
        //&& locales.includes(browserLanguage)
  
        if (shouldChangeLocale) {
          //document.documentElement.setAttribute("lang", langage);
    //window.localStorage.setItem(STORAGE_SCREEN_MODE, mode);
    //i18n.changeLanguage(langage);
    //updateLangageStorage(langage);
          router.push(
            {
                //...router,
              pathname,
              //query,
              query: {...query},
            },
            asPath,
            { locale: langage, scroll:false }
          )    
        }
    }, [langage]);

    const internationalMode = useMemo(
      () => ({
        toggleLangageMode: (_langageMode) => {
          setLangage(_langageMode);
        },
      }),
      [],
    );

    return (
      <LangageModeProviderContext.Provider value={internationalMode} langage={langage}>
       {children}
      </LangageModeProviderContext.Provider>
    );
  }