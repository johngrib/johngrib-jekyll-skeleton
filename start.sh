# gem install github-pages
bundle install
# bundle exec jekyll serve --watch
./generateData.js

if [ $1 = "-I" ]; then
    bundle exec jekyll server --watch -I
else
    bundle exec jekyll server --watch
fi
