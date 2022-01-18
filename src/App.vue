<script setup lang="ts">
import type { SourceFile, AnalyzingMode, AlertType, OutputType } from "./types";
import { ref, reactive, onMounted } from "vue";
import { X, FileCode, DiffAdded } from "./icons";
import Alert from "./components/Alert.vue";
import Worker from "./worker?worker&inline";

const worker = new Worker();

const files: SourceFile[] = reactive([{ name: "file.txt", content: "" }]);
const viewing = ref(0);

const modes: AnalyzingMode[] = [
    "Ngram",
    "Authority",
    "Meaningful",
    "G_Ngram",
    "G_Authority",
    "G_Meaningful",
    "G_Coword",
    "G_TFIDF",
];
const mode = ref<AnalyzingMode>("Ngram");
const additionals = reactive({ n: 3, words: "" });
const output = ref<OutputType>("json");

const processing = ref(false);
const result = ref("");

const alerts: { type: AlertType; title: string; text: string }[] = reactive([]);
function add_alert(type: AlertType, title?: string, text?: string) {
    const alt = { type, title: title || "", text: text || "" };
    alerts.push(alt);
    setTimeout(() => {
        alerts.splice(alerts.indexOf(alt), 1);
    }, 3000);
}

onMounted(() => {
    console.log("mounted");
});

async function file_drop(e: DragEvent): Promise<void> {
    e.preventDefault();

    if (e.dataTransfer === null) {
        return;
    }

    const drops = e.dataTransfer.files;

    for (let i = 0; i < drops.length; i++) {
        if (drops[i].type.startsWith("text")) {
            const content = await process_file(drops[i]);
            files.push({ name: drops[i].name, content });
            console.log("Files", files);
            add_alert("success", "File Added", drops[i].name);
            viewing.value = files.length - 1;
        } else {
            console.log(`Ignoring file ${drops[i].name}`);
        }
    }
}

function process_file(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else if (reader.result instanceof ArrayBuffer) {
                resolve(reader.result.toString());
            } else {
                resolve("");
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

function add_file(): void {
    files.push({ name: `file-${files.length}.txt`, content: "" });
    viewing.value = files.length - 1;
}

function view_file(idx: number): void {
    viewing.value = idx;
}

function remove_file(idx: number): void {
    if (viewing.value === files.length - 1 && files.length > 1) {
        viewing.value = files.length - 2;
    }

    if (files.length === 1) {
        files[0] = { name: "file.txt", content: "" };
    } else {
        files.splice(idx, 1);
    }
}

async function parse(mode: AnalyzingMode) {
    console.log(mode, additionals, output.value);

    if (mode === "Ngram" || mode === "G_Ngram") {
        if (additionals.n < 1) {
            add_alert("error", "N must be greater than 0", `Now the value is ${additionals.n}`);
            return;
        }
    }
    if (mode === "Authority" || mode === "G_Authority" || mode === "G_Coword" || mode === "G_TFIDF") {
        if (additionals.words.length === 0) {
            add_alert("error", "Please enter dictionary words");
            return;
        }
    }

    const Start_Time = performance.now();
    processing.value = true;

    const response = new Promise<string>((r) => {
        worker.addEventListener("message", (e) => r(e.data), { once: true });
    });

    if (mode.startsWith("G_")) {
        worker.postMessage(JSON.stringify({ mode, files, additionals, output: output.value }));
    } else {
        worker.postMessage(JSON.stringify({ mode, file: files[viewing.value], additionals, output: output.value }));
    }

    result.value = await response;

    const Process_Time = performance.now() - Start_Time;
    add_alert("success", "Successfully Processed", `${Process_Time.toFixed(2)} ms`);
    processing.value = false;
}
</script>

<template>
    <div id="alerts">
        <Alert
            v-for="(alert, idx) in alerts"
            :key="'alert-' + idx"
            :type="alert.type"
            :title="alert.title"
            :text="alert.text"
            :style="{ top: idx * 4 + 0.5 + 'rem', left: '0.5rem' }"
        />
    </div>
    <div id="file" @drop="file_drop">
        <div id="file-browser">
            <div class="overflow-y-auto p-1 h-full">
                <div
                    v-for="(file, i) in files"
                    :key="'file-' + i"
                    :class="'file-item ' + (i === viewing ? 'viewing' : '')"
                >
                    <div class="file-item-name">
                        <span>{{ file.name }}</span>
                    </div>
                    <div class="file-item-buttons">
                        <button class="fill-lime-500" @click="view_file(i)"><FileCode /></button>
                        <!-- <button class="fill-indigo-500" @click="analyze_file(i)"><Search /></button> -->
                        <button class="fill-red-500" @click="remove_file(i)"><X /></button>
                    </div>
                </div>
                <div class="file-item add-file" @click="add_file()">
                    <DiffAdded class="fill-slate-700" /> <span class="mx-3 font-bold">Add File</span>
                </div>
            </div>
        </div>
        <div id="file-editor">
            <textarea
                placeholder="You can type something or drop a text file on me!"
                v-model="files[viewing].content"
            ></textarea>
        </div>
    </div>
    <div id="analysis">
        <div id="analysis-configs">
            <label class="flex flex-col my-2 justify-center">
                <a class="text-xl font-bold mr-3" href="https://github.com/JacobLinCool/STAP" target="_blank">
                    STAP: Simple Text Analysis Platform.
                </a>
                <a
                    class="text-gray-600 font-semibold mr-3"
                    href="https://github.com/JacobLinCool/Textual-Data-Analysis"
                    target="_blank"
                >
                    Using textual-data-analysis package to process textual data in your browser.
                </a>
            </label>
            <label class="flex my-2 items-center">
                <span class="font-bold mr-3">Mode</span>
                <select class="flex-1 h-10 rounded" v-model="mode">
                    <option v-for="m in modes" :key="m" :value="m">
                        {{ m.replace("G_", "Group ").replace("_", " ") }}
                    </option>
                </select>
            </label>
            <div v-if="mode === 'Ngram' || mode === 'G_Ngram'">
                <label class="flex my-2 items-center">
                    <span class="font-bold mr-3">N-gram's N:</span>
                    <input class="flex-1 px-3 h-10 rounded" type="number" min="1" v-model.number="additionals.n" />
                </label>
            </div>
            <div v-if="mode === 'Authority' || mode === 'G_Authority' || mode === 'G_Coword' || mode === 'G_TFIDF'">
                <label class="block my-2">
                    <span class="font-bold mr-3">Dictionary: (one line one word)</span><br />
                    <textarea class="w-full p-3 rounded resize-none" rows="5" v-model="additionals.words"></textarea>
                </label>
            </div>
            <label class="flex my-2 items-center">
                <span class="font-bold mr-3">Output</span>
                <select class="flex-1 h-10 rounded" v-model="output">
                    <option value="json">JSON</option>
                    <option value="text">Text</option>
                </select>
            </label>
            <div class="w-full text-right">
                <button id="analyze-btn" @click="parse(mode)" :disabled="processing">
                    {{ processing ? "Processing" : mode.startsWith("G_") ? "Group Analyze" : "Analyze" }}
                </button>
            </div>
        </div>
        <div id="analysis-result">
            <textarea placeholder="The analyzed result will be here!" :value="result"></textarea>
        </div>
    </div>
</template>

<style></style>
