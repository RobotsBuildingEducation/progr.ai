import React, { useState, useEffect } from "react";
import ReactBash from "react-bash";

const fileSystem = {
  "/": {
    home: {
      user: {
        documents: {
          "file1.txt": "",
          "file2.txt": "",
        },
        pictures: {},
      },
    },
    etc: {
      config: {
        "config1.cfg": "",
        "config2.cfg": "",
      },
    },
    var: {
      log: {
        "log1.log": "",
        "log2.log": "",
      },
    },
  },
};

export const TerminalComponent = () => {
  const [structure, setStructure] = useState(fileSystem);
  const [history, setHistory] = useState([
    {
      value:
        "Welcome to the mock terminal. Use basic commands to navigate the file system.",
    },
  ]);
  const [cwd, setCwd] = useState("/");

  useEffect(() => {
    // Commands to run after initial render
    const commands = [
      "mkdir new_folder",
      "mkdir new_folder/sub_folder",
      "touch new_folder/file.txt",
    ];

    commands.forEach((command) => {
      const parts = command.split(" ");
      const cmd = parts[0];
      const arg = parts[1];

      const customExtensions = {
        mkdir: {
          exec: ({ structure, history, cwd }, command) => {
            const args = command.split(" ");
            const newDir = args[1];
            const currentDir =
              cwd === "/"
                ? structure
                : cwd
                    .split("/")
                    .filter((p) => p)
                    .reduce((acc, dir) => acc[dir], structure);

            if (!currentDir[newDir]) {
              currentDir[newDir] = {};
              setStructure({ ...structure });
              setHistory([
                ...history,
                { value: `Directory ${newDir} created.` },
              ]);
            } else {
              setHistory([
                ...history,
                {
                  value: `bash: mkdir: cannot create directory '${newDir}': File exists`,
                },
              ]);
            }
          },
        },
        touch: {
          exec: ({ structure, history, cwd }, command) => {
            const args = command.split(" ");
            const newFile = args[1];
            const currentDir =
              cwd === "/"
                ? structure
                : cwd
                    .split("/")
                    .filter((p) => p)
                    .reduce((acc, dir) => acc[dir], structure);

            if (!currentDir[newFile]) {
              currentDir[newFile] = "";
              setStructure({ ...structure });
              setHistory([...history, { value: `File ${newFile} created.` }]);
            } else {
              setHistory([
                ...history,
                {
                  value: `bash: touch: cannot create file '${newFile}': File exists`,
                },
              ]);
            }
          },
        },
      };

      customExtensions[cmd].exec({ structure, history, cwd }, command);
    });
  }, []);

  const customExtensions = {
    cd: {
      exec: ({ structure, history, cwd }, command) => {
        const args = command.split(" ");
        const newDir = args[1] || "/";
        const path = newDir === "/" ? [] : newDir.split("/").filter((p) => p);
        let currentDir = structure;
        let newCwd = "/";

        for (let i = 0; i < path.length; i++) {
          if (currentDir[path[i]]) {
            currentDir = currentDir[path[i]];
            newCwd += (newCwd === "/" ? "" : "/") + path[i];
          } else {
            return {
              structure,
              cwd,
              history: history.concat({
                value: `bash: cd: ${newDir}: No such file or directory`,
              }),
            };
          }
        }

        setCwd(newCwd);
        return {
          structure,
          cwd: newCwd,
          history: history.concat({ value: `user@mock-terminal:${newCwd}$` }),
        };
      },
    },
    ls: {
      exec: ({ structure, history, cwd }, command) => {
        const currentDir =
          cwd === "/"
            ? structure
            : cwd
                .split("/")
                .filter((p) => p)
                .reduce((acc, dir) => acc[dir], structure);
        const content = Object.keys(currentDir).join("  ");
        return {
          structure,
          cwd,
          history: history.concat({ value: content }),
        };
      },
    },
    mkdir: {
      exec: ({ structure, history, cwd }, command) => {
        const args = command.split(" ");
        const newDir = args[1];
        const currentDir =
          cwd === "/"
            ? structure
            : cwd
                .split("/")
                .filter((p) => p)
                .reduce((acc, dir) => acc[dir], structure);

        if (!currentDir[newDir]) {
          currentDir[newDir] = {};
          return {
            structure,
            cwd,
            history: history.concat({ value: `Directory ${newDir} created.` }),
          };
        } else {
          return {
            structure,
            cwd,
            history: history.concat({
              value: `bash: mkdir: cannot create directory '${newDir}': File exists`,
            }),
          };
        }
      },
    },
  };

  return (
    <ReactBash
      structure={structure}
      history={history}
      prefix={`user@mock-terminal:${cwd}$`}
      extensions={customExtensions}
    />
  );
};
