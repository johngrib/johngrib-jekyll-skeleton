// 단축키 기능을 제공합니다.

;(function(){

    // 사이트 전체 문서 중 하나를 랜덤으로 선택해 열어줍니다.
    function goToRandomDocument() {
        fetch(`/data/total-document-url-list.json`)
            .then(response => response.json())
            .then(function(data) {
                const num = getRandomInt(0, data.length);
                window.location.href = data[num];
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    // 현재 보고 있는 문서에 포함된 링크 중 하나를 랜덤 선택해 열어줍니다.
    function openRandomLink() {
        const links = document.querySelectorAll('.post-content a[href]:not(.link-checked):not([href^="#"]):not([href^="mailto"]):not([href^="javascript"])');

        if (links == null || links.length == null || links.length == 0) {
            return;
        }

        const num = getRandomInt(0, links.length);
        const link = links[num];

        window.open(link.getAttribute('href'), '_blank');
        console.log('opened')
        console.log(link);

        link.classList.add('link-checked');
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    const helpText = `[도움말]
Ctrl + h : 도움말
Ctrl + i : 인덱스
Ctrl + f : 검색창
Ctrl + m : 메인화면
Ctrl + r : 랜덤 문서
Ctrl + Shift + r : 문서 내 랜덤 링크`;

    document.onkeydown = function(e){
        // 만약 포커스가 input, textarea, select 에 있으면 동작하지 않도록 바로 리턴한다.
        const target_tag = e.target.tagName.toLowerCase();
        if (target_tag == 'input' || target_tag == 'textarea' || target_tag == 'select') {
            return;
        }
        if (!e.ctrlKey) {
            return;
        }
        if (e.which == 72) {
            // Ctrl + h : 도움말
            alert(helpText);
            return;
        }
        if (e.which == 82 && e.shiftKey) {
            // Ctrl + Shift + r : 랜덤하게 문서 내 링크를 다른 탭에 열어준다
            openRandomLink();
            return;
        }
        if (e.which == 82) {
            // ctrl + r : random 문서로 이동
            goToRandomDocument();
            return;
        }
        if (e.which == 73) {
            // ctrl + i : index 페이지로 이동
            window.location.href = '/wiki/root-index/';
            return;
        }
        if (e.which == 70) {
            // ctrl + f : 검색창으로 포커스 이동
            document.querySelector('div.search > form > input.searchInput').focus();
            return;
        }
        if (e.which == 77) {
            // ctrl + m : main 화면으로 이동
            window.location.href = '/';
            return;
        }
    }

    document.getElementById('random-button')
        .addEventListener('click', goToRandomDocument);
})();
