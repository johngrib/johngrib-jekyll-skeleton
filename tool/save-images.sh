#!/usr/bin/env bash

# github에 올린 user-images를 자동으로 다운로드합니다.

NUM=1855714

CHANGE_LIST=`git diff --exit-code --cached --name-only --diff-filter=ACM -- '*.md'`

SUCCESS_COUNT=0
FAIL_COUNT=0
for CHANGED_FILE in $CHANGE_LIST; do
    echo $CHANGED_FILE
    DIR_NAME=`echo $CHANGED_FILE | sed -E 's,^.+/([^\.]+)\.md$,\1,'`

    mkdir -p ./post-img/$DIR_NAME
    URI_LIST=`ag "https://user-images\.githubuser.*?\/$NUM\/.*?(png|jpg|gif)" -o $CHANGED_FILE`

    for URI in $URI_LIST; do
        FILE_NAME=`echo $URI | sed 's,^.*/,,'`
        echo "TARGET: $URI"
        curl -s $URI > ./post-img/$DIR_NAME/$FILE_NAME

        if [ "$?" == "0" ]; then
            echo "DOWNLOAD SUCCESS: $FILE_NAME"
            sed -i '' -E 's, *https://.*('"$FILE_NAME"') *, /post-img/'$DIR_NAME'/\1 ,g' $CHANGED_FILE

            git add post-img/$DIR_NAME/$FILE_NAME

            SUCCESS_COUNT=$((SUCCESS_COUNT+1))
        else
            echo "DOWNLOAD FAIL: $FILE_NAME"
            rm -f ./post-img/$DIR_NAME/$FILE_NAME
            FAIL_COUNT=$((FAIL_COUNT+1))
        fi
    done
    git add $CHANGED_FILE
done

printf "Success: %d, Fail: %d\n" $SUCCESS_COUNT $FAIL_COUNT
