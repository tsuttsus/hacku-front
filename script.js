/**
 * 1.inputの中身をここで取出
*/
// inputDOMエレメントを取得
const input = document.getElementById("choice")

let file = null //選択したファイルの入るところ
//ファイルが変更されたら...
input.addEventListener("change",function(){
   file = input.files[0]; //中身を変える
})

/**
 * 2.post/getの処理
 * resが返ってくるので、それを変数に代入
 */

 let reponse = null;

 //送信ボタンのDOMを取得
const submit=document.getElementById("submit");
//クリックされたら...
submit.addEventListener("click",function(){
    console.log('ボタン');
    var formdata = new FormData();
    formdata.append("file",file);
    //生成
    var xmlhttp=new XMLHttpRequest();
    //準備
    xmlhttp.onreadystatechange = function () {
        // 成功した場合
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // alert(xmlhttp.responseText);
          var response=xmlhttp.responseText;
          showResponse(response)
        }
      };
    // APIを開いて
    xmlhttp.open("POST", "", true);
    // 叩く。
    xmlhttp.send(file);

})

/**
 * 3.resを表示
 */
function showReponse(responseText){
  console.log(responseText)
}