import "./style.css";
import Worker from "./worker?worker&inline";

const worker = new Worker();

let cooldown = 0;

document.querySelector("#file").addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];

    let file_content = "";

    if (file.type.startsWith("text")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            file_content = e.target.result;
            document.querySelector("#file-content").value = file_content;

            parse();
        };
        reader.readAsText(file);
    }
});

document.querySelector("#file-content").addEventListener("input", parse);

async function parse() {
    if (cooldown > Date.now()) return;
    cooldown = Date.now() + 1000;

    const file_content = document.querySelector("#file-content").value;
    const size = file_content.length;

    console.time("parse: " + size);

    const words = new Promise((r) => {
        worker.onmessage = function (e) {
            r(e.data);
        };
    });

    worker.postMessage(file_content);

    console.log(await words);
    console.timeEnd("parse: " + size);

    document.querySelector("#meaningful-words").value = `Map(${(await words).size}) {\n${[
        ...(await words).entries(),
    ].reduce((acc, [word, count]) => acc + `    '${word}' => ${count},\n`, "")}}`;
}
