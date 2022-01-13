import { Analyzer, Dictionary, sort_map } from "textual-data-analysis";

onmessage = function (e) {
    const file_content = e.data;
    const analyzer = new Analyzer(file_content).split(Dictionary.punctuations);
    const words = sort_map(analyzer.meaningful());

    postMessage(words);
};
