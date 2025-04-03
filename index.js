let i;
let cnt;
let sheet;
let sheet_array;
const sleep = (time_ms) => new Promise(resolve => setTimeout(resolve, time_ms));

const url = "https://localhost/chimeraif/get_sheet.php";
axios.get(url)
    .then(response => {
        console.log("Get response of GET request!!");
        console.log("Data: ", response.data);
        console.log("Status: ", response.status);

        // 答えの受け取り
        sheet = response.data;
        sheet_array = sheet.values;
    })
    .catch(error => {
        console.log(error);
    })

function shuffle(array) {
    console.log("shuffle!");
    console.log(array.length);
    for (i = array.length - 1; 0 < i; i--) {
        let r = Math.floor(Math.random()*(i+1));

        let tmp = array[r];
        array[r] = array[i];
        array[i] = tmp;
    }
}

function add_text(parentId, text) {
    const parentElement = document.getElementById(parentId);
    const newElement = document.createElement("p");
    newElement.textContent = text;
    newElement.classList.add("fadeIn");

    parentElement.appendChild(newElement);
}

function remove_all_text(parentId) {
    const parentElement = document.getElementById(parentId);
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

async function make_chimera() {
    console.log("Do!!");
    remove_all_text("elements");
    shuffle(sheet_array);
    cnt = 0;
    let shareText = "完成した美少女は、\n";
    for (i = 0; i < 4; i++) {
        let text = sheet_array[cnt][0];
        shareText = shareText + "- " + text + "\n";
        cnt++;

        add_text("elements", text);
        await sleep(500);
    }
    const shareButton = document.getElementById("shareButton");
    const share_url = "https://chimeraif.com";
    const hashtags = "キメラif";
    const completeUrl = "https://twitter.com/intent/tweet?url=" + share_url +
                        "&text=" + encodeURIComponent(shareText) +
                        "&hashtags=" + hashtags;
    shareButton.setAttribute(
        "href",
        completeUrl
    );
    shareButton.style.display = "flex";
    shareButton.classList.add("fadeIn");
}

let doButton = document.getElementById("do");

doButton.addEventListener("click", make_chimera);

$(".modaalButton").modaal({
    overlay_close: true
})