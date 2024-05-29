import { Graph } from '@antv/x6';

export function registerEdge() {
  Graph.registerEdge(
    'mindmap-edge',
    {
      inherit: 'edge',
      connector: {
        name: 'mindmap',
      },
      attrs: {
        line: {
          targetMarker: '',
          stroke: '#A2B1C3',
          strokeWidth: 2,
        },
      },
      zIndex: 0,
    },
    true
  );
}
