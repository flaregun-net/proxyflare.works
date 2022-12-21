import Link from "@docusaurus/Link"
import GithubIcon from "@site/static/icons/github.svg"
import TwitterIcon from "@site/static/icons/twitter.svg"
import React from "react"
import gg from "../../../package.json"
import styles from "./styles.module.scss"

const CustomFooter = () => (
  <footer className={styles["custom-footer-wrapper"]}>
    {/* <div className={styles["logo-wrapper"]}>
      <img
        src={useBaseUrl("/img/flaregun.svg")}
        className={styles["dark-theme-logo"]}
      />
      <img
        src={useBaseUrl("/img/flaregun.svg")}
        className={styles["light-theme-logo"]}
      />
    </div> */}
    <div className={styles["copyright"]}>
      {JSON.stringify(gg)}
      {`© ${new Date().getFullYear()} yooo Flaregun Inc. All rights reserved`}
    </div>
    <div className={styles["footerSocialIconsWrapper"]}>
      <div className={styles["socialBrands"]}>
        <Link
          href={"https://github.com/flaregun-net"}
          rel="noopener noreferrer"
          aria-label={"Github"}
        >
          <GithubIcon />
        </Link>
      </div>
      <div className={styles["socialBrands"]}>
        <Link
          href={"https://twitter.com/flaregun_net"}
          rel="noopener noreferrer"
          aria-label={"Twitter"}
        >
          <TwitterIcon />
        </Link>
      </div>
    </div>
  </footer>
)

export default CustomFooter
