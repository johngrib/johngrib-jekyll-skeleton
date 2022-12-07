#!/usr/bin/env bash

# 문서에 있는 /resource/wiki , ./ 하위의 파일 리소스를 uuid 기반의 리소스 경로로 이주시킵니다.

FILE_ADDR="$1"

if [ ! -f "$FILE_ADDR" ]; then
  echo "파일이 존재하지 않습니다: $FILE_ADDR"
  exit 1
fi

if [[ "$FILE_ADDR" != *.md ]]; then
  echo "파일의 확장자가 md 가 아닙니다: $FILE_ADDR"
  exit 1
fi

echo "진행"

TO_RESOURCE_DIR=`head $FILE_ADDR | ag -o "[A-F0-9]{2}/[A-F0-9-]{34}$"`

# /resource/wiki/filename 리소스인 경우
RESOURCE_NAME_LIST=`ag "\/resource\/wiki\/.*?" "$FILE_ADDR" | ag -o "/resource/wiki/[^ ]*\.(jpg|png|gif|JPG|mp4|svg|jpeg|pdf|PNG|xlsm)"`

mkdir -p "./resource/$TO_RESOURCE_DIR"

for RESOURCE_NAME in $RESOURCE_NAME_LIST; do
    RESOURCE_FROM="$RESOURCE_NAME"
    RESOURCE_FILE_NAME="${RESOURCE_NAME##*/}"
    RESOURCE_TO="/resource/$TO_RESOURCE_DIR/$RESOURCE_FILE_NAME"
    echo "FROM: .$RESOURCE_FROM"
    echo "TO: .$RESOURCE_TO"
    mv ".$RESOURCE_FROM" ".$RESOURCE_TO"

    perl -i -pe "s|$RESOURCE_NAME|$RESOURCE_TO|g" "$FILE_ADDR"
done

# ./filename 리소스인 경우
RESOURCE_NAME_LIST=`ag "!\[.*?\]\( *\.\/.*?\)" "$FILE_ADDR" | ag -o "\./[^ ]*"`
FILE_ADDR_DIR=`sed 's,\.md$,,' <<< $FILE_ADDR`

for RESOURCE_NAME in $RESOURCE_NAME_LIST; do
    RESOURCE_FROM=`sed 's,^\./,,' <<< $RESOURCE_NAME`
    RESOURCE_FILE_NAME="${RESOURCE_NAME##*/}"
    RESOURCE_TO="/resource/$TO_RESOURCE_DIR/$RESOURCE_FILE_NAME"
    echo "FROM: $FILE_ADDR_DIR/$RESOURCE_FROM"
    echo "TO: .$RESOURCE_TO"
    mv "$FILE_ADDR_DIR/$RESOURCE_FROM" ".$RESOURCE_TO"

    perl -i -pe "s|$RESOURCE_NAME|$RESOURCE_TO|g" "$FILE_ADDR"
done
