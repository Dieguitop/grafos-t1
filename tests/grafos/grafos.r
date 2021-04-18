library(igraph)
library(jsonlite)

mostrar <- function(i, grafo, aristas, adyacentes) {
    cat("\nGrafo ", i, " (1-index):\n",
        "==================\n", sep = "")
    print(grafo)

    cat("\nGrafo ", i, ", lista de aristas (0-index):\n",
        "====================================\n", sep = "")
    print(toJSON(aristas, pretty = TRUE))

    cat("\nGrafo ", i, ", matriz de adyacencia:\n",
        "==============================\n", sep = "")
    print(toJSON(adyacentes, pretty = TRUE))
}

json <- fromJSON(txt = "casos.json")

i <- 1
for (grafo in json$grafo) {
    aristas    <- grafo
    grafo      <- graph_from_edgelist(aristas + 1, directed = FALSE)
    adyacentes <- as_adjacency_matrix(grafo,     sparse = FALSE)

    mostrar(i, grafo, aristas, adyacentes)
    i <- i + 1
}
