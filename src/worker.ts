import type { AnalyzingMode, SourceFile, OutputType } from "./types";
import { Analyzer, GroupAnalyzer, Dictionary, sort_map } from "textual-data-analysis";

interface Additionals {
    n: number;
    words: string;
}

interface Data {
    mode: AnalyzingMode;
    file?: SourceFile;
    files?: SourceFile[];
    additionals: Additionals;
    output: OutputType;
}

interface SingleData extends Data {
    file: SourceFile;
    files: undefined;
}

interface GroupData extends Data {
    files: SourceFile[];
    file: undefined;
}

addEventListener("message", (e) => {
    const data = JSON.parse(e.data) as Data;

    let result: any = null;

    if (data.mode.startsWith("G_")) {
        const { mode, files, additionals } = data as GroupData;
        const analyzer = new GroupAnalyzer(files.map((f) => f.content)).split(Dictionary.punctuations);

        switch (mode) {
            case "G_Ngram":
                result = sort_map(analyzer.ngram(additionals.n));
                break;
            case "G_Authority":
                result = sort_map(analyzer.count(additionals.words.split("\n").map((w) => w.trim())));
                break;
            case "G_Meaningful":
                result = sort_map(analyzer.meaningful());
                break;
            case "G_Coword":
                result = sort_map(analyzer.coword(additionals.words.split("\n").map((w) => w.trim())));
                break;
            case "G_TFIDF":
                result = sort_map(analyzer.tfidf(additionals.words.split("\n").map((w) => w.trim())));
                break;
        }
    } else {
        const { mode, file, additionals } = data as SingleData;
        const analyzer = new Analyzer(file.content).split(Dictionary.punctuations);

        switch (mode) {
            case "Ngram":
                result = sort_map(analyzer.ngram(additionals.n));
                break;
            case "Authority":
                result = sort_map(analyzer.count(additionals.words.split("\n").map((w) => w.trim())));
                break;
            case "Meaningful":
                result = sort_map(analyzer.meaningful());
                break;
        }
    }

    if (data.output === "json") {
        postMessage(stringify(result));
    } else {
        postMessage(Object.keys(objectify(result)).join("\n"));
    }
});

function stringify(obj: any): string {
    return JSON.stringify(objectify(obj), null, 4);
}

function objectify(obj: any): object {
    let result: any;

    if (obj instanceof Map) {
        result = {};
        for (const [k, v] of obj) {
            result[k] = objectify(v);
        }
    } else if (obj instanceof Set) {
        result = [...obj];
    } else if (Array.isArray(obj)) {
        result = obj.map((v) => objectify(v));
    } else if (typeof obj === "object") {
        result = [...obj].reduce((acc, [k, v]) => ({ ...acc, [k]: objectify(v) }), {});
    } else {
        result = obj;
    }

    return result;
}
