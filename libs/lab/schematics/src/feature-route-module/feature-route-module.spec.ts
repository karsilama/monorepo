import { Tree } from "@nx/devkit";
import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";

import { featureRouteModuleGenerator } from "./feature-route-module";
import { FeatureRouteModuleGeneratorSchema } from "./schema";

describe("feature-route-module generator", () => {
  let tree: Tree;
  const options: FeatureRouteModuleGeneratorSchema = {
    name: "test",
    directory: "./feature-route-module.ts",
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await featureRouteModuleGenerator(tree, options);

    expect(
      tree.exists(
        `${options.directory}/${options.name}/src/${options.name}-routes.ts`,
      ),
    ).toBeTruthy();
    expect(
      tree.exists(
        `${options.directory}/${options.name}/src/${options.name}-feature.module.ts`,
      ),
    ).toBeTruthy();
  });
});
