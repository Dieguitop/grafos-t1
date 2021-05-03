#!/bin/bash

for path in src/grafos/*.js
do
  file=$(basename "$path")
  filename="${file%.*}"
  out="docs/grafos/${filename}.md"
  echo -e "\e[1;32m${path}\e[0m -> ${out}"
  jsdoc2md "$path" > "$out"
done
