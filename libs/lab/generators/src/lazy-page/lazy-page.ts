import { formatFiles, generateFiles, names, Tree } from "@nx/devkit";
import * as path from "path";
import { LazyPageGeneratorSchema } from "./schema";

export async function lazyPageGenerator(
  tree: Tree,
  options: LazyPageGeneratorSchema,
) {
  const nameVariants = names(options.name);

  const projectRoot = nameVariants.fileName;

  generateFiles(tree, path.join(__dirname, "files"), projectRoot, {
    ...options,
    ...nameVariants,
    tmpl: "",
  });

  await formatFiles(tree);
}

export default lazyPageGenerator;
