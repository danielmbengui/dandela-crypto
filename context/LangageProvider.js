import React, { createContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { DEFAULT_LANGAGE, STORAGE_LANGAGE } from "../constants";
import { useTranslation } from "next-i18next";
import moment from 'moment';
import 'moment/locale/fr';

export const LangageModeProviderContext = createContext({ toggleLangageMode: () => { } });

export default function LangageProvider({children, langageMode}){
    
    const {i18n} = useTranslation();
    const router = useRouter();
    const [langage, setLangage] = useState(router.locale || langageMode);
    
    useEffect(() => {
      setLangage(langageMode);
      //moment.locale(langMode);
      }, [langageMode])

      useEffect(() => {
        console.log("ACTUAL locale website address DEFAULT lang", router.defaultLocale);
        console.log("ACTUAL locale website address", router.locale);
        if (router.locale) {
          setLangage(router.locale);
          //moment.locale(lang);
        }
      }, [])

      useEffect(() => {
        //setLangage(langMode);
        document.documentElement.setAttribute(STORAGE_LANGAGE, langage);
        //i18n.changeLanguage(lang);
        window.localStorage.setItem(STORAGE_LANGAGE, langage);
        router.replace(router.asPath, router.asPath, { locale: langage })
        moment.locale(langage);
    }, [langage]);

    const internationalMode = useMemo(
      () => ({
        toggleLangageMode: (_langageMode) => {
          setLangage(_langageMode);
        },
      }),
      [],
    );
/*
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
        isReady
        && locales.includes(langage)  
        if (shouldChangeLocale) {
          router.push(
            {
                //...router,
              pathname,
              //query,
              query: {...query},
            },
            asPath,
            { locale: langage, }
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
    */

    return (
      <LangageModeProviderContext.Provider value={internationalMode} langage={langage}>
       {children}
      </LangageModeProviderContext.Provider>
    );
  }