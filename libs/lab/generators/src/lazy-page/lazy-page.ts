import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from "@nx/devkit";
import * as path from "path";
import { LazyPageGeneratorSchema } from "./schema";

export async function lazyPageGenerator(
  tree: Tree,
  options: LazyPageGeneratorSchema,
) {
  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: "library",
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, "files"), projectRoot, options);
  await formatFiles(tree);
}

export default lazyPageGenerator;
