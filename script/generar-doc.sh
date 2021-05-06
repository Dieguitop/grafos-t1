#!/bin/bash

for path in $(find lib -type f -name "*.js")
do
  file=$(basename "$path")
  filename="${file%.*}"
  out="doc/${filename}.md"
  echo -e "\e[1;32m${path}\e[0m -> ${out}"
  jsdoc2md "$path" > "$out"
done
