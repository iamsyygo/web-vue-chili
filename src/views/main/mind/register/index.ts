import { register, getTeleport } from '@antv/x6-vue-shape';
import { registerNode } from './nodehandle';
import { registerConnector } from './connectorhandle';
import { registerEdge } from './edgehandle';
import { registerVueShape } from './vueshapehandle';

export const useRegisterHandler = () => {
  registerNode();
  registerConnector();
  registerEdge();
  registerVueShape();
  const TeleportShape = getTeleport();
  return {
    TeleportShape,
  };
};
