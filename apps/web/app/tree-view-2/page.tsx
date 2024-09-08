"use client";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";

type Node = {
  name: string;
  nodes?: Node[];
};

let nodes: Node[] = [
  {
    name: "Home",
    nodes: [
      {
        name: "Movies",
        nodes: [
          {
            name: "Action",
            nodes: [
              {
                name: "2000s",
                nodes: [
                  { name: "Gladiator-mp4" },
                  { name: "American-Beauty.mp4" },
                ],
              },
              { name: "2010s", nodes: [] },
            ],
          },
        ],
      },
      {
        name: "Comedy",
        nodes: [{ name: "2000s", nodes: [{ name: "Superbad" }] }],
      },
      {
        name: "Music",
        nodes: [{ name: "Rock", nodes: [] }],
      },
      { name: "Classical", nodes: [] },
      { name: "Pictures", nodes: [] },
      { name: "Documents", nodes: [{ name: "passwords.txt" }] },
    ],
  },
];

export default function Index() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <ul>
        {nodes.map((node) => (
          <FilesystemItem node={node} key={node.name} />
        ))}
      </ul>
    </div>
  );
}

function FilesystemItem({ node }: { node: Node }) {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <li className="my-1.5" key={node.name}>
      <span className="flex items-center gap-1.5">
        {node.nodes && node.nodes.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronRightIcon
              className={`size-4 text-gray-500 ${isOpen ? "rotate-90" : ""}`}
            />
          </button>
        )}
        {node.nodes ? (
          <FolderIcon
            className={`size-6 text-sky-500 ${node.nodes.length === 0 ? "ml-[22px]" : ""}`}
          />
        ) : (
          <DocumentIcon className="ml-[22px) size-6 text-gray-900" />
        )}
        {node.name}
      </span>

      {isOpen && (
        <ul className="pl-6">
          {node.nodes?.map((folder) => (
            <FilesystemItem node={folder} key={folder.name} />
          ))}
        </ul>
      )}
    </li>
  );
}
