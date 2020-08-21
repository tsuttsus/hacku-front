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
const submit=document.getElementById("submit");

submit.addEventListener("click",function(){
    console.log('ボタン');
})

/**
 * 3.resを表示
 */