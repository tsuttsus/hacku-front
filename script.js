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
    
    //ここまで
    var formdata = new FormData();
    formdata.append("file",file);
    //生成
    var xmlhttp=new XMLHttpRequest();
    //準備
    xmlhttp.onreadystatechange = function() {
        // 成功した場合
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          response=JSON.parse(xmlhttp.responseText).img
          step1()
          step2()
        }
      };
    // APIを開いて
    xmlhttp.open("POST", "http://54.64.51.76:5000/api", true);
    // 叩く。
    xmlhttp.send(formdata);

})



/* ------------------------------------
画面遷移系の処理
------------------------------------ */

/**
 * 
 */
function step1() {
  document.getElementById("frame").innerHTML=
    `
    <div class="loader-container">
      <div class="loader"></div>
      <p class="loader-text">分割中...</p>
    </div>
    `
  //color => noncolor
  const step1Element = document.getElementById("step1");
  step1Element.classList.remove("color")
  step1Element.classList.add("noncolor")

  const step2Element = document.getElementById("step2");
  step2Element.classList.remove("noncolor")
  step2Element.classList.add("color")
  
}

/**
 * 
 */
function step2(){

  btnStr = ``
  console.log(response)
  const len=response.length;
  
 
  for(let i=1;i<=len; i++){
    btnStr += `<button id="img-btn-${i}">${i}</button>`
  }


  document.getElementById("frame").innerHTML = 
  `
  <div>
    <img id="result"/>    
  </div>
  <div>
     ${btnStr}
  </div>
  `

  for(let i=1;i<=len;i++){
    const show=document.getElementById(`img-btn-${i}`);
    show.addEventListener("click",function(){
      document.getElementById("result").src="data:image/png;base64," + response[i-1];
    })
  }

  document.getElementById("result").src="data:image/png;base64," + response[0];

  const step2Element = document.getElementById("step2");
  step2Element.classList.remove("color")
  step2Element.classList.add("noncolor")

  const step3Element = document.getElementById("step3");
  step3Element.classList.remove("noncolor")
  step3Element.classList.add("color")
}

/**
 * 
 */
function step3(){
  const step3Element = document.getElementById("step3");
  step3Element.classList.remove("color")
  step3Element.classList.add("noncolor")

  const step1Element = document.getElementById("step1");
  step1Element.classList.remove("noncolor")
  step1Element.classList.add("color")

}