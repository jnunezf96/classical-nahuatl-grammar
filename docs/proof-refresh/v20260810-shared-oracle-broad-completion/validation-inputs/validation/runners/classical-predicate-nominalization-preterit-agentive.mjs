import oracle from "../oracles/classical-predicate-nominalization-preterit-agentive.mjs";
import config from "./nuclear-owner-configs/classical-predicate-nominalization-preterit-agentive.mjs";
import { createRoutineSemanticOwnerRunner } from "./_lesson2-owner-runner.mjs";
function projectTypedSource(runtime, input, project) { return project(runtime, input); }
function invokeProductionOwner(runtime, input, invoke) { return projectTypedSource(runtime, input, invoke); }
export default createRoutineSemanticOwnerRunner(config, oracle, Object.freeze({ projectTypedSource, invokeProductionOwner }));
