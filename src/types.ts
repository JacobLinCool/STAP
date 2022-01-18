export interface SourceFile {
    name: string;
    content: string;
}

export type AnalyzingMode =
    | "Ngram"
    | "Authority"
    | "Meaningful"
    | "G_Ngram"
    | "G_Authority"
    | "G_Meaningful"
    | "G_Coword"
    | "G_TFIDF";

export type AlertType = "success" | "error" | "warning";

export type OutputType = "text" | "json";
