## this script solves two things
# 1. we need to install a private and public repo with the same scope (@flaregun-net) in different registries, which npm doesn't support
# 2. to get around this, we temporarily rename npmrc so the install below ignores it.
# However, the .npmrc file name is different on Cloudflare Pages (supplied via NPM_CONFIG_USERCONFIG environment variable),

NPMRC="${NPM_CONFIG_USERCONFIG:-.npmrc}"

mv $NPMRC .npmrc_moved
npm i @flaregun-net/proxyflare-for-pages
mv .npmrc_moved $NPMRC
