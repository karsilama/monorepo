import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";
import { Tree, readProjectConfiguration } from "@nx/devkit";

import { lazyPageGenerator } from "./lazy-page";
import { LazyPageGeneratorSchema } from "./schema";

describe("lazy-page generator", () => {
  let tree: Tree;
  const options: LazyPageGeneratorSchema = { name: "test" };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await lazyPageGenerator(tree, options);
    const config = readProjectConfiguration(tree, "test");
    expect(config).toBeDefined();
  });
});
