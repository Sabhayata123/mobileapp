"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {

        // 1.localStorageが使えるかどうか（つかえるか）確認（かくにん）
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage(); // 2.localStorageへの保存（ほぞん）
            delLocalStorage();
            selectTable(); // 3.選択ボタン
        }

    }, false
);

// 2.localStorageへの保存（ほぞん）
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            // 値の入力チェック
            if (key === "" || value === "") {
                window.alert("Key、Memoはいずれも必須です。");
                return;
            } else {
                localStorage.setItem(key, value);
                viewStorage();
                let w_msg = "LocalStorageに「" + key + " " + value + "」を保存（ほぞん）しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }

        }, false
    );
};

function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = "0";
            w_sel = selectRadioBtn();

            if (w_sel === "1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = "LocalStorageから" + key + " " + value + "を削除（delete）しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};

function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectRadioBtn();
        }, false
    );
}
function selectRadioBtn() {
    let w_sel = "0"; // 選択（せんたく）されていれば、"1"にする
    const radiol = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");

    for (let i = 0; i < radiol.length; i++) {
        if (radiol[i].checked) {
            document.getElementById("textKey").value = table1.rows[i + 1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i + 1].cells[2].firstChild.data;
            return w_sel = "1";
        }
    }

    window.alert("1つ選択（select）してください。");
}

function viewStorage() {

    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

}

