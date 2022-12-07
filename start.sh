#!/usr/bin/env bash

set -euo pipefail; IFS=$'\n\t'

if [[ $1 = "docker" ]]; then
    ./generateData.js
    docker-compose up

elif [[ $1 = "watch" ]]; then
    ./generateData.js
    bundle exec jekyll server --watch

elif [[ $1 = "inc" ]]; then
    bundle update && bundle install
    ./generateData.js
    bundle exec jekyll server --incremental --trace

elif [[ $1 = "null" ]]; then
    bundle update && bundle install
    ./generateData.js

    bundle exec jekyll serve --incremental --trace >> /dev/null 2>&1 &
    echo "Server started. But Logs are in /dev/null"

    pgrep 'jekyll serve' > .localhost.pid
    echo "PID is saved in .localhost.pid"

elif [[ $1 = "back" ]]; then
    # local server를 백그라운드로 띄웁니다.
    # 로그는 .localhost.log 파일에 추가로 기록합니다.
    # 종료할 때 ps -ef | grep jekyll 을 다시 하면 귀찮으니까 pid는 .localhost.pid 파일에 저장해 둡니다.

    bundle update && bundle install
    ./generateData.js

    bundle exec jekyll serve --incremental --trace >> .localhost.log 2>&1 &
    echo "Server started. Logs are in .localhost.log"

    pgrep 'jekyll serve' > .localhost.pid
    echo "PID is saved in .localhost.pid"

elif [[ $1 = "kill" && -f .localhost.pid ]]; then
    kill "$(cat .localhost.pid)"
    rm .localhost.pid
    echo "Server killed"

fi

