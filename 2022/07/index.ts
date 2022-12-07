import { describe, expect, test } from 'vitest';
import { output, sumReducer } from '@/utils';
import { Challenge } from '@/utils/Challenge';

enum NodeType {
  FILE = 'file',
  FOLDER = 'folder',
}
interface File {
  type: NodeType.FILE;
  name: string;
  size: number;
}

interface Folder {
  type: NodeType.FOLDER;
  name: string;
  nodes: (File | Folder)[];
}

function findBy<T, K extends keyof T>(arr: T[], property: K, value: T[K]) {
  return arr.find(item => item[property] === value);
}

function recursivePath(node: Folder, path: string[]): Folder | File {
  const pathCopy = path.concat();
  if (pathCopy.length === 0) return node;

  const nextKey = pathCopy.shift()!;
  const next = findBy(node.nodes, 'name', nextKey)!

  if (pathCopy.length === 0) return next

  if (next.type === NodeType.FOLDER) {
    return recursivePath(next, pathCopy);
  }
  throw new Error('Can not read further path of file');
}

class Day7 extends Challenge<Folder> {
  public cdRegex = /^\$\scd\s(?<folder>.+)$/

  parseInput(str: string): Folder {
    const instructions = str.split('\n');
    const tree: Folder = {
      type: NodeType.FOLDER,
      name: '/',
      nodes: [],
    };


    let backtrack: string[] = [];
    
    instructions.slice(1).forEach((instruction, idx) => {
      let folderMatch: null | RegExpMatchArray;
      let fileMatch: null | RegExpMatchArray;

      if (instruction === '$ ls') {
        return
      }
      
      if ((folderMatch = instruction.match(/^\$\scd\s(?<folder>.+)$/)) !== null) {
        const targetDir = folderMatch.groups!.folder;
        if (targetDir === '..') {
          backtrack.pop();
        } else {
          backtrack.push(targetDir);
        }
      } else if (instruction.startsWith('dir')) {
        const folder: Folder = {
          type: NodeType.FOLDER,
          name: instruction.slice(4),
          nodes: [],
        }

        const node = recursivePath(tree, backtrack);
        if (node.type === NodeType.FOLDER) {
          node.nodes.push(folder);
        }
      } else if ((fileMatch = instruction.match(/^(?<size>\d+)\s(?<file>.+)$/)) !== null) {
        const file: File = {
          type: NodeType.FILE,
          name: fileMatch.groups!.file,
          size: +(fileMatch.groups!.size),
        }
        const node = recursivePath(tree, backtrack);
        if (node.type === NodeType.FOLDER) {
          node.nodes.push(file);
        }
      }
    });

    return tree;
  }

  public getNodeSize(node: Folder): number {
    return this._getNodeSize(node);
  }

  private _getNodeSize(node: Folder, size = 0): number {
    node.nodes.forEach(item => {
      if (item.type === NodeType.FILE) {
        size += item.size
      } else {
        size += this._getNodeSize(item)
      }
    })

    return size;
  }

  private filterNodesBySize(node: Folder, predicate: (size: number) => boolean, nodes: Folder[] = []): Folder[] {
    node.nodes.forEach(item => {
      if (item.type === NodeType.FOLDER) {
        if (predicate(this.getNodeSize(item)) === true) {
          nodes.push(item);
        }
        this.filterNodesBySize(item, predicate, nodes);
      }
    })

    return nodes;
  }

  public solve() {
    const nodes = this.filterNodesBySize(this.input, size => size <= 100_000);
    return nodes.map(node => this.getNodeSize(node)).reduce(sumReducer, 0);
  }

  public solve2() {
    const remainingSpace = 70_000_000 - this.getNodeSize(this.input);
    const nodes = this.filterNodesBySize(this.input, (size) => {
      return remainingSpace + size > 30_000_000;
    });
    return nodes.map(node => this.getNodeSize(node)).sort((a, b) => a - b).shift();
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day7(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(95437);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day7(__dirname, 'example.input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual(24933642);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day7(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(1182909);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day7(__dirname, 'input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual(2832508);
    })
  })
}