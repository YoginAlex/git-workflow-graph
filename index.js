import './main.css';

import { createGitgraph, Orientation, Mode, templateExtend} from "@gitgraph/js";
import { Template, TemplateName } from '@gitgraph/core/lib/template';

const graphContainer = document.getElementById("gitgraph");

const gitgraph = createGitgraph(graphContainer, {
  orientation: Orientation.VerticalReverse,
  template: templateExtend(TemplateName.Metro, {
    commit:{
      message: {
        displayAuthor: false,
        displayBranch: true,
        displayHash: false,
        font: "normal 12pt Arial",
      }
    },
  })
});

const master = gitgraph.branch("master");
master
  .commit("Init")
  .commit("Add README")
  .tag("v0.0.1");

const newEpic = gitgraph.branch("ZAR-1000-epic").commit("chore(build): ZAR-1000-epic");
const newEpic2 = gitgraph.branch("ZAR-1000-epic2").commit("chore(build): ZAR-1000-epic2");

const task1 = newEpic
  .branch("ZAR-1001")
  .commit("feat: ZAR-1001 new feature")
  .commit("fix: ZAR-1001 fix")
  .commit("feat: ZAR-1001 texts");

const task2 = newEpic
  .branch("ZAR-1002")
  .commit("feat: ZAR-1002 new feature")
  .commit("fix: ZAR-1002 fix")
  
newEpic.merge(task1, "ZAR-1001").merge(task2, "ZAR-1002");

const release = newEpic.branch("release").merge(newEpic, "Ready to test");
const bug1 = release
  .branch("ZAR-1003")
  .commit("fix: ZAR-1003 fix")
const bug2 = release
  .branch("ZAR-1004")
  .commit("fix: ZAR-1004 fix")

release.merge(bug1, "ZAR-1003").merge(bug2, "ZAR-1004");
release.tag("v0.1.0");

release.merge(newEpic2).tag("v0.2.0");

master.merge(release, "Release new version").tag("v1.0.0");

const productionBug = gitgraph.branch("ZAR-production-bug").commit("fix(prod): ZAR-production-bug");
master.merge(productionBug, "Bug fix").tag("v1.0.1");
