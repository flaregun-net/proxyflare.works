/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useDocSearchKeyboardEvents } from "@docsearch/react"
import Link from "@docusaurus/Link"
import { useHistory } from "@docusaurus/router"
import { isRegexpStringMatch, useSearchPage } from "@docusaurus/theme-common"
import { useAlgoliaContextualFacetFilters } from "@docusaurus/theme-search-algolia/client"
import Translate, { translate } from "@docusaurus/Translate"
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { useProduct } from "@site/src/utils/useProduct"
import React, { Fragment, useCallback, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"

React

let DocSearchModal = null

// Customization START
// In the event of re-swizzling, just change this component others can be updated as whatever they are in new version.
function Hit({ hit, children }) {
  const { productName } = useProduct()

  return (
    <Fragment>
      <span className="docIdentifier badge badge--success">{productName}</span>

      <Link to={hit.url}>{children}</Link>
    </Fragment>
  )
}
// Customization END

function ResultsFooter({ state, onClose }) {
  const { generateSearchPageLink } = useSearchPage()
  return (
    <Link to={generateSearchPageLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{ count: state.context.nbHits }}
      >
        {"See all {count} results"}
      </Translate>
    </Link>
  )
}
function mergeFacetFilters(f1, f2) {
  const normalize = (f) => (typeof f === "string" ? [f] : f)
  return [...normalize(f1), ...normalize(f2)]
}
function DocSearch({ contextualSearch, externalUrlRegex, ...props }) {
  const { siteMetadata } = useDocusaurusContext()
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters()
  const configFacetFilters = props.searchParameters?.facetFilters ?? []
  const facetFilters = contextualSearch
    ? // Merge contextual search filters with config filters
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ... or use config facetFilters
      configFacetFilters
  // we let user override default searchParameters if he wants to
  const searchParameters = {
    ...props.searchParameters,
    facetFilters,
  }
  const { withBaseUrl } = useBaseUrlUtils()
  const history = useHistory()
  const searchContainer = useRef(null)
  const searchButtonRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState(undefined)
  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve()
    }
    return Promise.all([
      import("@docsearch/react/modal"),
      import("@docsearch/react/style"),
      import("./styles.css"),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal
    })
  }, [])
  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      searchContainer.current = document.createElement("div")
      document.body.insertBefore(
        searchContainer.current,
        document.body.firstChild,
      )
      setIsOpen(true)
    })
  }, [importDocSearchModalIfNeeded, setIsOpen])
  const onClose = useCallback(() => {
    setIsOpen(false)
    searchContainer.current?.remove()
  }, [setIsOpen])
  const onInput = useCallback(
    (event) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true)
        setInitialQuery(event.key)
      })
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery],
  )
  const navigator = useRef({
    navigate({ itemUrl }) {
      // Algolia results could contain URL's from other domains which cannot
      // be served through history and should navigate with window.location
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl
      } else {
        history.push(itemUrl)
      }
    },
  }).current
  const transformItems = useRef((items) =>
    items.map((item) => {
      // If Algolia contains a external domain, we should navigate without
      // relative URL
      if (isRegexpStringMatch(externalUrlRegex, item.url)) {
        return item
      }
      // We transform the absolute URL into a relative URL.
      const url = new URL(item.url)
      return {
        ...item,
        url: withBaseUrl(`${url.pathname}${url.hash}`),
      }
    }),
  ).current
  const resultsFooterComponent = useMemo(
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components
      (footerProps) =>
        <ResultsFooter {...footerProps} onClose={onClose} />,
    [onClose],
  )
  const transformSearchClient = useCallback(
    (searchClient) => {
      searchClient.addAlgoliaAgent("docusaurus", siteMetadata.docusaurusVersion)
      return searchClient
    },
    [siteMetadata.docusaurusVersion],
  )
  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })
  const translatedSearchLabel = translate({
    id: "theme.SearchBar.label",
    message: "Search",
    description: "The ARIA label and placeholder for search button",
  })
  return (
    <>
      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            {...props}
            searchParameters={searchParameters}
          />,
          searchContainer.current,
        )}
    </>
  )
}
export default function SearchBar() {
  const { siteConfig } = useDocusaurusContext()
  return <DocSearch {...siteConfig.themeConfig.algolia} />
}
