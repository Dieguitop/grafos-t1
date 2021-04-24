library(igraph)
library(jsonlite)

mostrar <- function(i, grafo, listaDeAristas, matrizDeAdyacencia, matrizDeCaminos) {
    cat("\nGrafo ", i, " (1-index):\n",
        "==================\n", sep = "")
    print(grafo)

    cat("\nGrafo ", i, ", lista de listaDeAristas (0-index):\n",
        "====================================\n", sep = "")
    print(toJSON(listaDeAristas, pretty = TRUE))

    cat("\nGrafo ", i, ", matriz de adyacencia:\n",
        "==============================\n", sep = "")
    print(toJSON(matrizDeAdyacencia, pretty = TRUE))

    cat("\nGrafo ", i, ", matriz de caminos:\n",
        "==============================\n", sep = "")
    print(toJSON(matrizDeCaminos, pretty = TRUE))
}

calcularMatrizDeCaminos <- function(matrizDeAdyacencia, cantidadDeNodos) {
    matrizDeCaminos <- diag(cantidadDeNodos)
    ultimaMatriz <- matrizDeAdyacencia

    for (i in 2:cantidadDeNodos) {
        matrizDeCaminos <- matrizDeCaminos + ultimaMatriz
        ultimaMatriz <- ultimaMatriz %*% matrizDeAdyacencia
    }

    matrizDeCaminos
}

json <- fromJSON(txt = "tests/grafos/casos.json")

for (i in 1:(length(json$listaDeAristas))) {
    listaDeAristas <- json$listaDeAristas[[i]]
    cantidadDeNodos <- json$cantidadDeNodos[[i]]
    esDirigido <- json$esDirigido[[i]]
    grafo <- graph_from_edgelist(listaDeAristas + 1, directed = esDirigido)
    matrizDeAdyacencia <- as_adjacency_matrix(grafo, sparse = FALSE)
    matrizDeCaminos <- calcularMatrizDeCaminos(matrizDeAdyacencia, cantidadDeNodos);
    mostrar(i, grafo, listaDeAristas, matrizDeAdyacencia, matrizDeCaminos)
}
