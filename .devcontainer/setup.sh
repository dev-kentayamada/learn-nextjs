#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash \
&& echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm' >> ~/.bash_profile \
&& source ~/.bash_profile \
&& nvm install node \
&& nvm install-latest-npm \
&& npm install -g npm-check-updates \
&& npm --prefix /workspaces/learn-nextjs/front-end install /workspaces/learn-nextjs/front-end \
&& git config user.email "kentayamada.tech@gmail.com" \
&& git config user.name "Kenta Yamada" \
&& pip3 install black pylint \
&& curl https://cli-assets.heroku.com/install.sh | sh