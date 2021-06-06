import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import log from "../lib/log.js";
import Content from "./Content.js";
import Links from "./Links.js";
import Algorithms from "./Algorithms.js";

export default function Main({ isDirected }) {
  const [links, setLinks] = useState([
    { from: "A", to: "B", text: "1", key: 0 },
    { from: "B", to: "C", text: "1", key: 1 },
  ]);

  const names = useMemo(() => computeNames(links), [links]);
  const indexedLinks = useMemo(() => computeIndexedLinks(links), [links]);

  function computeNames(links) {
    return [
      ...new Set(
        links
          .flatMap(({ from, to }) => [from, to])
          .filter((name) => name.length > 0)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }

  function computeIndexedLinks(links) {
    return links.map((link) => {
      const from = names.indexOf(link.from);
      const to = names.indexOf(link.to);
      return {
        from: from === -1 ? undefined : from,
        to: to === -1 ? undefined : to,
        text: link.text.length === 0 ? undefined : Number(link.text),
      };
    });
  }

  function computeNodesData(names) {
    return names.map((name, index) => {
      return { text: name, key: index, color: "lightskyblue" };
    });
  }

  function handleAdd() {
    log("Main::handleAdd => empty link, key = %d", links.length);
    setLinks(links.concat([{ from: "", to: "", text: "", key: links.length }]));
  }

  function handleChange(oldLink, newLink) {
    log("Main::handleChange => oldLink = %o, newLink = %o", oldLink, newLink);
    setLinks(
      links
        .filter(({ from, to }) => from !== oldLink.from && to !== oldLink.to)
        .concat([newLink])
        .map(({ from, to, text, key }) => {
          return {
            from,
            to,
            text: from.length === 0 || to.length === 0 ? "" : text,
            key,
          };
        })
        .sort((a, b) => a.key - b.key)
    );
  }

  function handleRemove(removedLink) {
    log("Main::handleRemove => removedLink = %o", removedLink);
    setLinks(
      links
        .filter(
          ({ from, to }) => from !== removedLink.from && to !== removedLink.to
        )
        .map(({ from, to, text, key }, index) => {
          return {
            from,
            to,
            text,
            key: index >= removedLink.key ? key - 1 : key,
          };
        })
        .sort((a, b) => a.key - b.key)
    );
  }

  // Loggear la modificación de la lista de links.
  useEffect(() => {
    log("Lista de links: %o (context = %o)", links, { names });
  }, [links]);

  // Loggear la modificación de la lista de nombres de los nodos..
  useEffect(() => {
    log("Nombres de los nodos: %o (context = %o)", names, { links });
  }, [names]);

  return (
    <Box display="flex" className="main_view">
      <div className="main_options">
        <Links
          values={links}
          onAdd={handleAdd}
          onChange={handleChange}
          onRemove={handleRemove}
        />
        <hr />
        <Algorithms
          links={indexedLinks}
          names={names}
          isDirected={isDirected}
        />
      </div>

      <Content
        isDirected={isDirected}
        data={computeNodesData(names)}
        linksData={indexedLinks}
      />
    </Box>
  );
}
