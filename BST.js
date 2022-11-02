import Node from './node.js';
import quickSort from './quickSort.js';

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const orderedArr = quickSort(arr, 0, arr.length - 1);

    if (this.root !== null) {
      this.root = null;
    }

    const sort = (arr, start, end) => {
      if (start > end) return null;

      const rootNode = Math.floor((start + end) / 2);

      const node = new Node(arr[rootNode]);

      if (this.root === null) {
        this.root = node;
      }

      node.left = sort(arr, start, rootNode - 1);
      node.right = sort(arr, rootNode + 1, end);
      return node;
    };

    sort(orderedArr, 0, arr.length - 1);
    return this.root;
  }

  prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  find(value) {
    const findVal = (node) => {
      if (node === null) return false;
      if (value === node.data) return node;
      if (value < node.data) return findVal(node.left);
      if (value > node.data) return findVal(node.right);
    };
    return findVal(this.root);
  }

  findMin(node) {
    const minimum = (node) => {
      if (node.left === null) return node;
      return minimum(node.left);
    };
    return minimum(node);
  }

  findMax(node) {
    const maximum = (node) => {
      if (node.right === null) return node;
      return maximum(node.right);
    };
    return maximum(node);
  }

  delete(value) {
    const delNode = (node, value) => {
      if (node === null) {
        return node;
      } if (value < node.data) {
        node.left = delNode(node.left, value);
      } else if (value > node.data) {
        node.right = delNode(node.right, value);
      } else if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null) {
        node = node.right;
      } else if (node.right === null) {
        node = node.left;
      } else {
        const temp = this.findMin(node.right);
        node.data = temp.data;
        node.right = delNode(node.right, temp.data);
      }
      return node;
    };
    return delNode(this.root, value);
  }

  insert(value) {
    const insertVal = (node) => {
      if (node === null) node = new Node(value);
      if (value < node.data) node.left = insertVal(node.left);
      if (value > node.data) node.right = insertVal(node.right);
      return node;
    };
    return insertVal(this.root);
  }

  depthTraversal() {
    const depth = (node) => {
      if (node === null) return [];
      // depth-frst traversal uses stack as a data structure
      const stack = [node];
      const arr = [];
      while (stack.length > 0) {
        const current = stack.pop();
        arr.push(current.data);

        if (current.right !== null) stack.push(current.right);
        if (current.left !== null) stack.push(current.left);
      }
      return arr;
    };
    return depth(this.root);
  }

  depthTraversal2() {
    const depth2 = (node) => {
      if (node === null) return [];
      const left = depth2(node.left);
      const right = depth2(node.right);
      return [node.data, ...left, ...right];
    };
    return depth2(this.root);
  }

  postOrder() {
    const arr = [];
    const post = (node) => {
      if (node === null) return;
      post(node.left);
      post(node.right);
      arr.push(node.data);
    };
    post(this.root);
    return arr;
  }

  preOrder() {
    const arr = [];
    const pre = (node) => {
      if (node === null) return;
      arr.push(node.data);
      pre(node.left);
      pre(node.right);
    };
    pre(this.root);
    return arr;
  }

  inOrder() {
    const arr = [];
    const inOrd = (node) => {
      if (node === null) return;
      inOrd(node.left);
      arr.push(node.data);
      inOrd(node.right);
    };
    inOrd(this.root);
    return arr;
  }

  breadthTraversal() {
    const breadth = (node) => {
      if (node === null) return [];
      // breadth-frst traversal uses queue as a data structure
      const queue = [node];
      const arr = [];
      while (queue.length > 0) {
        const current = queue.pop();
        arr.push(current.data);
        if (current.left !== null) queue.unshift(current.left);
        if (current.right !== null) queue.unshift(current.right);
      }
      return arr;
    };
    return breadth(this.root);
  }

  minHeight() {
    const checkMinHeight = (node) => {
      if (node === null) return -1;
      const left = checkMinHeight(node.left);
      const right = checkMinHeight(node.right);
      if (left < right) {
        return left + 1;
      }
      return right + 1;
    };
    return checkMinHeight(this.root);
  }

  maxHeight() {
    const checkmaxHeight = (node) => {
      if (node === null) return -1;
      const left = checkmaxHeight(node.left);
      const right = checkmaxHeight(node.right);
      if (left > right) {
        return left + 1;
      }
      return right + 1;
    };
    return checkmaxHeight(this.root);
  }

  isBalanced() {
    const max = this.maxHeight();
    const min = this.minHeight();

    if ((max - min) === 0
            || (max - min) === 1) {
      return true;
    }
    return false;
  }

  reBalance() {
    const array = this.inOrder();
    return this.buildTree(array);
  }
}
