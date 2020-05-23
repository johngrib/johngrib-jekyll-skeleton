#!/usr/bin/env bash

# github에 올린 user-images를 자동으로 다운로드합니다.

NUM=1855714
mkdir -p ./resource/$NUM

CHANGE_LIST=`git status --short | egrep -o '[^ ]*\.md$'`

for CHANGED_FILE in $CHANGE_LIST; do
    echo $CHANGED_FILE
    URI_LIST=`ag "https://user-images\.githubuser.*?\/$NUM\/.*?(png|jpg|gif)" -o $CHANGED_FILE`

    for URI in $URI_LIST; do
        FILE_NAME=`echo $URI | sed 's,^.*/,,'`
        echo "TARGET: $URI"
        curl -s $URI > ./resource/$NUM/$FILE_NAME

        if [ "$?" == "0" ]; then
            echo "DOWNLOAD SUCCESS: $FILE_NAME"
            sed -i '' -E 's, *https://.*('"$FILE_NAME"') *, /resource/'$NUM'/\1 ,g' $CHANGED_FILE

            git add resource $CHANGED_FILE
        else
            echo "DOWNLOAD FAIL: $FILE_NAME"
            rm -f ./resource/$NUM/$FILE_NAME
        fi
    done
done

