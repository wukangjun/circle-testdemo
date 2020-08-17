//为什么容量capacity必须是2的n次方
//在计算机中，直接取模运算的效率不如位运算（&）
//sun公司的大牛们发现，当容量为2的n次方时，hash & (capacity - 1) == hash % capacity，
//于是就在源码中做了优化，通过 hash & (capacity - 1) 来替代取模运算，而前提就是容量必须为2的n次方
const DEFAULT_INITIAL_CAPACITY: number = 1 << 4;
const DEFAULT_LOAD_FACTOR = 0.75;
const MAXINUM_CAPACITY = 2 << 32;

/**
 * HashMap的基本单位
 * 单链表结构
 */
export class Entry<K, V> {
  public key!: K;

  public value!: V;

  public next!: Entry<K, V>;

  public hash!: number;

  constructor(h: number, key: K, v: V, n: Entry<K, V>) {
    this.hash = h;
    this.key = key;
    this.value = v;
    this.next = n;
  }
}

/**
 * 这个函数的作用是取 i 这个数的二进制形式最左边的最高一位且高位后面全部补零
 * 
 * @param i 
 */
function heighestOneBit(i : number) {
  i |= (i >> 1);
  i |= (i >> 2);
  i |= (i >> 4);
  i |= (i >> 8);
  i |= (i >> 16);
  i |= (i >> 32);
  return i - (i >>> 1);
}

/**
 * 将capacity强制转换为2次n次方
 * 保证为2的n次方，要设置高位为1，低位都为0
 * 
 * @param capacity 
 */
function roundUpToPowerOf2(capacity: number): number {
  return capacity >= MAXINUM_CAPACITY
    ? MAXINUM_CAPACITY
    : capacity > 1 ? heighestOneBit((capacity -1) << 1) : 1;
}

export class HashMap<K, V> {
  /**
   * 实际存储key-value键值对的个数
   */
  public size: number = 0;

  /**
   * 装载因子
   * 默认大小为： 0.75
   */
  private loadfactor: number = DEFAULT_LOAD_FACTOR;

  /**
   * hash表数组的默认初始化长度
   * 默认大小: 16
   */
  private initialCapacity: number = DEFAULT_INITIAL_CAPACITY;

  /**
   * hashMap的初始化数组
   */
  private table: Entry<K, V>[] = [];

  constructor(initialCapacity: number, loadFactor: number) {
    if (initialCapacity > MAXINUM_CAPACITY) {
      initialCapacity = MAXINUM_CAPACITY;
    }
    if (loadFactor <= 0 || isNaN(loadFactor)) {
      throw new Error('illegal load factor:' + loadFactor);
    }

    this.initialCapacity = initialCapacity;
    this.loadfactor = loadFactor;
  }

  public put(k: K, v: V) {
    if (this.table.length === 0) {
      this.inflateTable(this.initialCapacity);
    }
  }

  private inflateTable(toSize: number) {
    const capacity = roundUpToPowerOf2(toSize);
    this.initialCapacity = Math.min(capacity * this.loadfactor, MAXINUM_CAPACITY);
    this.table = new Array(this.initialCapacity);
  }
}