#!/usr/bin/env bash

# 블로그의 컨텐츠를 모두 삭제하고 skeleton만 남깁니다.
git checkout master
git fetch upstream
git reset --hard upstream/master

rm -f ./_data/*
rm -rf ./_wiki
mkdir _wiki
cp ./resource/skeleton-post/* ./_wiki/

rm -rf ./post-img
mkdir post-img

## 등록 파일 삭제
rm -f ./naver*.html ./google*.html

## about.md 내용 삭제
head ./about.md > new-about.md
mv ./new-about.md about.md

git fetch skeleton
git reset skeleton/master

