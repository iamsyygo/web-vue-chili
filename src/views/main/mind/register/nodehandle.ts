import { Graph } from '@antv/x6';

export function registerNode() {
  Graph.registerNode(
    'topic-child',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
        {
          tagName: 'path',
          selector: 'line',
        },
      ],
      attrs: {
        body: {
          fill: '#ffffff',
          strokeWidth: 0,
          stroke: '#5F95FF',
        },
        label: {
          fontSize: 14,
          fill: '#262626',
          textVerticalAnchor: 'bottom',
        },
        line: {
          stroke: '#5F95FF',
          strokeWidth: 2,
          d: 'M 0 15 L 60 15',
        },
      },
    },
    true
  );
}
