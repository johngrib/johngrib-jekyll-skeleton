#!/usr/bin/env bash

RES_LIST=` find ./post-img -type f`

for FILE in $RES_LIST; do
    # echo $FILE
    FILE_PATH=`echo $FILE | sed "s/^\.//"`
    WIKI_COUNT=`grep -r "$FILE_PATH"  _wiki | wc -l`
    BLOG_COUNT=`grep -r "$FILE_PATH"  _posts | wc -l`

    FOUND_COUNT=$(($WIKI_COUNT + $BLOG_COUNT))

    if [[ "$FOUND_COUNT" -eq "0" ]]; then
        echo ".$FILE_PATH"
    fi
done
