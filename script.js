let reponse = null;

// 入力されたファイルが入るところ
let inputOriginFile = null

/**
 * inputの中身が変更されたときに
 * 中身を取得するクリックアクションを付加
 */
function addGetInputClickAction() {

  // inputDOMエレメントを取得
  const input = document.getElementById("choice")

  //ファイルが変更されたら...
  input.addEventListener("change", function () {

    const tmp = input.files[0];
    if (tmp != void 0) {
      inputOriginFile = input.files[0]; //中身を変える
      //pdfファイルの場合のみ
      if (inputOriginFile.name.substr(-4) === ".pdf") {
        document.getElementById("file_name").innerText = inputOriginFile.name

        document.getElementById("submit").disabled = false
      } else {
        document.getElementById("attention").classList.add("red-font")
      }
    }
  })
}

addGetInputClickAction()

/**
 * 2.post/getの処理
 * resが返ってくるので、それを変数に代入
 */

function addSubmitClickAction() {
  //送信ボタンのDOMを取得
  const submit = document.getElementById("submit");
  //クリックされたら...
  submit.addEventListener("click", function () {
    step1()

    //ここまで
    var formdata = new FormData();
    formdata.append("file", inputOriginFile);
    //生成
    var xmlhttp = new XMLHttpRequest();
    //準備
    xmlhttp.onreadystatechange = function () {
      // 成功した場合
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        response = JSON.parse(xmlhttp.responseText)
        console.log(response)
        if(response.msg == "success"){
          step2()
        }
        else{
          stepError()
        }
        
      }
    };
    // APIを開いて
    xmlhttp.open("POST", "http://54.64.51.76:5000/api", true);
    // 叩く。
    xmlhttp.send(formdata);

  })
}

addSubmitClickAction();




/* ------------------------------------
画面遷移系の処理
------------------------------------ */

/**
 * 
 */
function step1() {
  document.getElementById("frame").innerHTML =
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
function step2() {

  btnStr = ``
  const responseImg = response.img
  const len = responseImg.length;


  for (let i = 1; i <= len; i++) {
    btnStr += `<button id="img-btn-${i}" class="img-change-btn">${i}</button>`
  }



  document.getElementById("frame").innerHTML =
    `
  <div class="img-change-frame" id="img_change_frame">
    <button id="empasize_btn" class="empasize_btn">拡大</button>
    <div class="img-change-container">
    <img id="result" class="img-change"/>    
    </div>
  </div>
  <div></div>
  <div class="img-change-btn-container">
     ${btnStr}
  </div>
  <div class="p-3"><button id="again_btn" class="common-btn mx-auto m-3">もう一度</button></div>
  `

  let lastselect = 1;
  document.getElementById("img-btn-1").classList.add("active");


  for (let i = 1; i <= len; i++) {
    const show = document.getElementById(`img-btn-${i}`);
    show.addEventListener("click", function () {
      document.getElementById("result").src = "data:image/png;base64," + responseImg[i - 1];
      document.getElementById(`img-btn-${lastselect}`).classList.remove("active");
      lastselect = i
      show.classList.add("active")
    })
  }

  document.getElementById("result").src = "data:image/png;base64," + responseImg[0];

  const step2Element = document.getElementById("step2");
  step2Element.classList.remove("color")
  step2Element.classList.add("noncolor")

  const step3Element = document.getElementById("step3");
  step3Element.classList.remove("noncolor")
  step3Element.classList.add("color")

  let emphasize = false;
  const emphasizeBtn = document.getElementById("empasize_btn")
  emphasizeBtn.addEventListener("click", () => {
    const emphasizeTarget = document.getElementById("result");
    if (emphasize) {
      emphasizeTarget.classList.add("emphasize")
      emphasize = false
      emphasizeBtn.innerText = "縮小"
    } else {
      emphasizeTarget.classList.remove("emphasize")
      emphasize = true
      emphasizeBtn.innerText = "拡大"
    }
  })

  document.getElementById("again_btn").addEventListener("click", () => {
    step3()
  })
}

/**
 * 
 */
function step3() {
  const step3Element = document.getElementById("step3");
  step3Element.classList.remove("color")
  step3Element.classList.add("noncolor")

  const step1Element = document.getElementById("step1");
  step1Element.classList.remove("noncolor")
  step1Element.classList.add("color")

  document.getElementById("frame").innerHTML =
    `<form class="upload-container mb-3">
    <!-- ドラッグ＆ドロップ -->
    <p id="attention">.pdf形式の楽譜ファイルを選択してください。</p>
    <div class="h-full p-3">
      <input id="choice" type="file" class="hide" accept="application/pdf"/>
      <label for="choice" class="d8d-container">
        <P>
        <span class="block">ドラッグ＆ドロップでファイルを追加</span>
        <span class="block pt-1">分割するファイル名:</span>
        <span id="file_name" class="block"></span>
        </P>
      </label>
    </div>
  </form>
  <div>
    <button id="submit" class="common-btn mx-auto" disabled>楽譜を分割する</button>
  </div>`

  addGetInputClickAction();
  addSubmitClickAction();

}

function stepError() {
  document.getElementById("frame").innerHTML = `
  <h1>Error</h1>
  <p class="mb-3">エラーが発生しました。アップロードいただいたデータは楽譜として読み取れないようです。申しわけありません。</p>
  <button id="again_btn" class="common-btn">もう一度遊ぶ</button>
  `

  document.getElementById("again_btn").addEventListener("click", () => {
    const step2Element = document.getElementById("step2");
    step2Element.classList.remove("color");
    step2Element.classList.add("noncolor");

    const step1Element = document.getElementById("step1");
    step1Element.classList.remove("noncolor");
    step1Element.classList.add("color");

    document.getElementById("frame").innerHTML =
      `<form class="upload-container mb-3">
    <!-- ドラッグ＆ドロップ -->
    <p id="attention">.pdf形式の楽譜ファイルを選択してください。</p>
    <div class="h-full p-3">
      <input id="choice" type="file" class="hide" accept="application/pdf"/>
      <label for="choice" class="d8d-container">
        <P>
        <span class="block">ドラッグ＆ドロップでファイルを追加</span>
        <span class="block pt-1">分割するファイル名:</span>
        <span id="file_name" class="block"></span>
        </P>
      </label>
    </div>
  </form>
  <div>
    <button id="submit" class="common-btn mx-auto" disabled>楽譜を分割する</button>
  </div>`

    addGetInputClickAction();
    addSubmitClickAction();
  })
}