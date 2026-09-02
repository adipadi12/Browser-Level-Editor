// hierarchy.ts provides utilities for building and navigating the scene hierarchy tree.
import type { SceneObject } from '../types/scene';

export interface HierarchyNode {
  object: SceneObject;
  children: HierarchyNode[];
  depth: number;
}

/**
 * Build a nested hierarchy tree from the flat object array.
 * Root objects (parentId === null or undefined) go at the top level.
 */
export function buildHierarchyTree(objects: SceneObject[]): HierarchyNode[] {
  const objectMap = new Map<string, SceneObject>();
  const nodeMap = new Map<string, HierarchyNode>();

  // Create map for quick lookup
  for (const obj of objects) {
    objectMap.set(obj.id, obj);
  }

  // Build nodes
  for (const obj of objects) {
    nodeMap.set(obj.id, {
      object: obj,
      children: [],
      depth: 0,
    });
  }

  // Assemble parent-child relationships
  const rootNodes: HierarchyNode[] = [];

  for (const obj of objects) {
    const node = nodeMap.get(obj.id)!;

    if (obj.parentId && nodeMap.has(obj.parentId)) {
      const parentNode = nodeMap.get(obj.parentId)!;
      parentNode.children.push(node);
      node.depth = parentNode.depth + 1;
    } else {
      rootNodes.push(node);
    }
  }

  return rootNodes;
}

/**
 * Flatten the hierarchy tree back to a flat array (depth-first traversal).
 */
export function flattenHierarchy(tree: HierarchyNode[]): SceneObject[] {
  const result: SceneObject[] = [];

  function traverse(node: HierarchyNode) {
    result.push(node.object);
    for (const child of node.children) {
      traverse(child);
    }
  }

  for (const root of tree) {
    traverse(root);
  }

  return result;
}

/**
 * Get all children (recursive) of an object by ID.
 */
export function getAllChildren(
  objectId: string,
  objects: SceneObject[]
): string[] {
  const children: string[] = [];

  function collect(id: string) {
    const obj = objects.find((o) => o.id === id);
    if (obj && obj.children) {
      for (const childId of obj.children) {
        children.push(childId);
        collect(childId);
      }
    }
  }

  collect(objectId);
  return children;
}
