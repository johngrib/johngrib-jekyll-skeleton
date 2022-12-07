#!/usr/bin/env bash

MD_FILES=`find ./_posts -name "*.md"`

for FILE in $MD_FILES; do
    UUID=`uuidgen`
    UUID_HEAD=`echo $UUID | cut -c -2`
    UUID_TAIL=`echo $UUID | cut -c 3-`
    echo $FILE
    perl -i -pe "s,(^tag *:.*$),\1\nresource: $UUID_HEAD/$UUID_TAIL," $FILE
done
