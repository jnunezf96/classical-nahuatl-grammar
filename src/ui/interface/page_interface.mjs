// Static public pages share the same organizational model, without a grammar runtime.
import {installInterfaceTool} from './interface_runtime.mjs?v=20261012-interface-tool-3';
installInterfaceTool(document).catch(error=>console.error('Interface organization tool:',error));
