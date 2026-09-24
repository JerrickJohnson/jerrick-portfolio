import { useState } from 'react';
import styles from './ConvergenceVisual.module.css';

interface Node {
  layer: string;
  label: string;
}

// Rows are paired by architectural layer, so "Data" sits level with "Data".
const enterprise: Node[] = [
  { layer: 'Platform', label: 'IBM i' },
  { layer: 'Programs', label: 'RPGLE · CL' },
  { layer: 'Data', label: 'SQL · IBM i files' },
  { layer: 'Logic', label: 'Business rules' },
  { layer: 'Output', label: 'Spool & print' },
];

const modern: Node[] = [
  { layer: 'Interface', label: 'React' },
  { layer: 'API', label: 'GraphQL · Apollo' },
  { layer: 'Data', label: 'MongoDB · MySQL' },
  { layer: 'Server', label: 'Node · Express' },
  { layer: 'Integration', label: 'REST APIs' },
];

const W = 560;
const CX = 280;
const CY = 232;
const ROW_Y = [56, 144, 232, 320, 408];
const NODE_W = 150;
const NODE_H = 52;
const LEFT_X = 8;
const RIGHT_X = W - 8 - NODE_W;

function leftPath(y: number) {
  const x0 = LEFT_X + NODE_W;
  return `M${x0},${y} C${x0 + 56},${y} ${CX - 72},${CY} ${CX - 46},${CY}`;
}

function rightPath(y: number) {
  const x0 = RIGHT_X;
  return `M${CX + 46},${CY} C${CX + 72},${CY} ${x0 - 56},${y} ${x0},${y}`;
}

export function ConvergenceVisual() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <figure className={styles.figure}>
      <p className="sr-only">
        Diagram: enterprise technologies (IBM i, RPGLE, CL, SQL, business rules, and print) and modern web technologies
        (React, GraphQL, Node, Express, MongoDB, MySQL, and REST APIs) converge on software engineering.
      </p>

      {/* Desktop / tablet: SVG architecture diagram */}
      <svg className={styles.svg} viewBox={`0 0 ${W} 464`} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="cv-ring" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--amber)" />
            <stop offset="1" stopColor="var(--cyan)" />
          </linearGradient>
          <radialGradient id="cv-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#1b2335" />
            <stop offset="1" stopColor="#0f141f" />
          </radialGradient>
        </defs>

        {/* Column captions */}
        <text x={LEFT_X} y={16} className={styles.caption}>
          ENTERPRISE
        </text>
        <text x={RIGHT_X + NODE_W} y={16} className={styles.caption} textAnchor="end">
          MODERN WEB
        </text>

        {/* Connectors */}
        {enterprise.map((_, i) => {
          const key = `e${i}`;
          return (
            <g key={key} className={styles.link} data-tone="amber" data-active={active === key}>
              <path d={leftPath(ROW_Y[i]!)} className={styles.track} />
              <path d={leftPath(ROW_Y[i]!)} className={styles.flow} style={{ animationDelay: `${i * -0.7}s` }} />
            </g>
          );
        })}
        {modern.map((_, i) => {
          const key = `m${i}`;
          return (
            <g key={key} className={styles.link} data-tone="cyan" data-active={active === key}>
              <path d={rightPath(ROW_Y[i]!)} className={styles.track} />
              <path d={rightPath(ROW_Y[i]!)} className={styles.flow} style={{ animationDelay: `${i * -0.7}s` }} />
            </g>
          );
        })}

        {/* Nodes */}
        {enterprise.map((n, i) => (
          <NodeBox
            key={n.label}
            x={LEFT_X}
            y={ROW_Y[i]! - NODE_H / 2}
            node={n}
            tone="amber"
            active={active === `e${i}`}
            onEnter={() => setActive(`e${i}`)}
            onLeave={() => setActive(null)}
          />
        ))}
        {modern.map((n, i) => (
          <NodeBox
            key={n.label}
            x={RIGHT_X}
            y={ROW_Y[i]! - NODE_H / 2}
            node={n}
            tone="cyan"
            active={active === `m${i}`}
            onEnter={() => setActive(`m${i}`)}
            onLeave={() => setActive(null)}
          />
        ))}

        {/* Core */}
        <g className={styles.core}>
          <circle cx={CX} cy={CY} r={78} className={styles.orbit} />
          <circle cx={CX} cy={CY} r={62} className={styles.orbitInner} />
          <circle cx={CX} cy={CY} r={46} fill="url(#cv-core)" stroke="url(#cv-ring)" strokeWidth="1.5" />
          <text x={CX} y={CY - 3} textAnchor="middle" className={styles.coreText}>
            Software
          </text>
          <text x={CX} y={CY + 13} textAnchor="middle" className={styles.coreText}>
            Engineering
          </text>
        </g>
      </svg>

      {/* Phone: stacked flow, enterprise → core → modern */}
      <div className={styles.stack} aria-hidden="true">
        <div className={styles.stackGroup} data-tone="amber">
          <span className={styles.stackCaption}>Enterprise</span>
          <ul>
            {enterprise.map((n) => (
              <li key={n.label}>{n.label}</li>
            ))}
          </ul>
        </div>
        <div className={styles.stackLine} />
        <div className={styles.stackCore}>Software Engineering</div>
        <div className={styles.stackLine} data-dir="down" />
        <div className={styles.stackGroup} data-tone="cyan">
          <span className={styles.stackCaption}>Modern web</span>
          <ul>
            {modern.map((n) => (
              <li key={n.label}>{n.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

interface NodeBoxProps {
  x: number;
  y: number;
  node: Node;
  tone: 'amber' | 'cyan';
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function NodeBox({ x, y, node, tone, active, onEnter, onLeave }: NodeBoxProps) {
  return (
    <g
      className={styles.node}
      data-tone={tone}
      data-active={active}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      transform={`translate(${x} ${y})`}
    >
      <rect width={NODE_W} height={NODE_H} rx={10} className={styles.nodeBox} />
      <rect width={3} height={NODE_H - 24} x={0} y={12} rx={1.5} className={styles.nodeTick} />
      <text x={14} y={20} className={styles.nodeLayer}>
        {node.layer.toUpperCase()}
      </text>
      <text x={14} y={38} className={styles.nodeLabel}>
        {node.label}
      </text>
    </g>
  );
}
