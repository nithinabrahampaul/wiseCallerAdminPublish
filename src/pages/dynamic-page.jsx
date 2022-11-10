import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { WCPreLoader } from "../common/components/wc-preloader";
import { useLoader, usePages } from "../common/hooks";
import NotFound from "./not-found";

const DynamicPage = () => {
  const { getPageByName } = usePages();
  const { loading } = useLoader();
  const [staticPage, setStaticPage] = useState(null);
  const params = useParams();

  const loadPage = useCallback(
    async (name) => {
      let page = await getPageByName(name);
      if (page) {
        setStaticPage(page);
      }
    },
    [getPageByName]
  );

  useEffect(() => {
    if (params?.page) {
      loadPage(params?.page);
    }
  }, [params, loadPage]);

  return loading ? (
    <WCPreLoader />
  ) : staticPage ? (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{ __html: staticPage.content }}></div>
    </React.Fragment>
  ) : (
    <NotFound />
  );
};

export default DynamicPage;
