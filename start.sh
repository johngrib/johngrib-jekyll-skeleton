bundle update && bundle install
./generateData.js

if [[ $1 = "docker" ]]; then
    docker-compose up
elif [[ $1 = "watch" ]]; then
    bundle exec jekyll server --watch
elif [[ $1 = "inc" ]]; then
    bundle exec jekyll server --incremental --trace
fi
