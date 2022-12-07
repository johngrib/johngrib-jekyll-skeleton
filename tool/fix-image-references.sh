#!/usr/bin/env bash

IS_CORRECT_WORKING_DIRECTORY=`pwd | egrep "johngrib.github.io$" | wc -l`
if (( "$IS_CORRECT_WORKING_DIRECTORY" != 1 )); then
    echo "올바른 경로가 아닙니다. johngrib.github.io/ 에서 실행해 주세요."
    exit;
fi

# $1: 작업할 마크다운 문서의 경로
# $2: 마크다운 내에 있는 수정 대상 파일 경로
# $3: 마크다운 내에 삽입할 올바른 파일 경로
fix_resource_reference_in_markdown() {
    echo "[$1] 파일의 [$2] 문자열을 [$3]로 replace 합니다."
    sed -E -i '' "s,$2,$3,g" $1
}

# 모든 리소스 파일을 찾아 목록으로 만든다.
RES_LIST=` find ./post-img -type f`

for RESOURCE_FILE_ADDRESS in $RES_LIST; do
    # 리소스 파일의 경로
    RESOURCE_FILE_URL=`echo $RESOURCE_FILE_ADDRESS | sed "s/^\.//"`
    RESOURCE_FILE_NAME=`echo $RESOURCE_FILE_ADDRESS | sed -E "s,^.*/([^/]+)$,\1,"`
    echo "작업대상 파일: $RESOURCE_FILE_URL"

    # 리소스 파일을 사용하는 모든 마크다운 파일의 목록
    REFERENCE_LIST=`ag -l "$RESOURCE_FILE_URL" _wiki | egrep "\.md"`

    for MD_PATH in $REFERENCE_LIST; do
        VALID_DIR="./resource/"`echo "$MD_PATH" | sed 's/\.md$//' | sed -E "s/^_(wiki|blog)/\1/"`"/"
        VALID_FILE_ADDRESS="$VALID_DIR$RESOURCE_FILE_NAME"
        VALID_FILE_URL=`echo $VALID_FILE_ADDRESS | sed -E 's/^\.//'`

        echo "현재 리소스 경로: $RESOURCE_FILE_ADDRESS"
        echo "올바른 파일 경로: $VALID_FILE_ADDRESS"

        if [[ -f "$VALID_FILE_ADDRESS" ]]; then
            echo "올바른 파일이 이미 존재하고 있습니다."
            read -p "md 문서의 리소스 참조 경로를 올바른 경로로 수정합니까? [y|n] " -r;
            REPLY=${REPLY:-"y"};
            if [ $REPLY = "y" ]; then
                fix_resource_reference_in_markdown  $MD_PATH  $RESOURCE_FILE_URL  $VALID_FILE_ADDRESS
            fi
            continue;
        fi

        if [[ "$RESOURCE_FILE_ADDRESS" != "$VALID_FILE_ADDRESS" ]]; then
            echo "리소스 파일이 올바른 경로에 있지 않습니다."

            read -p "올바른 경로로 옮깁니까?? [y|n] " -r;
            REPLY=${REPLY:-"y"};
            if [ $REPLY = "y" ]; then

                echo "만들 디렉토리: $VALID_FILE_ADDRESS"

                if [[ -d "$VALID_DIR" ]]; then
                    printf ""
                else
                    echo "해당하는 디렉토리가 없습니다. 디렉토리를 새로 생성합니다."
                    mkdir -p $VALID_DIR
                fi

                echo "리소스 파일을 [$RESOURCE_FILE_ADDRESS]에서 [$VALID_FILE_ADDRESS]로 복사합니다."
                cp $RESOURCE_FILE_ADDRESS  $VALID_FILE_ADDRESS

                fix_resource_reference_in_markdown  $MD_PATH  $RESOURCE_FILE_URL  $VALID_FILE_URL

            else
                echo "다음 파일로 넘어갑니다."
            fi
        fi

        echo ''
    done

    rm $RESOURCE_FILE_ADDRESS
done

