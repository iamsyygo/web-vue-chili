type Callback<T> = (data: T, index: number) => number;

/**
 * 分片处理数据函数(利用浏览器空闲时间处理数据)
 * @template T
 * @param {number | T[]} data - 数据项数量或数据项数组
 * @param {Callback<T>} callback - 处理每个数据项的回调函数
 */
function sharding<T>(data: number | T[], callback: Callback<T>) {
  let dataArray: T[];

  if (typeof data === 'number') {
    dataArray = new Array(data).fill(undefined) as T[];
  } else {
    dataArray = data;
  }

  if (!dataArray.length) return;

  let index = 0;
  const length = dataArray.length;

  function run() {
    if (index >= length) return;

    /**
     * 处理分片数据函数
     * @param {IdleDeadline} deadline - 浏览器空闲时间的截止时间
     */
    const processBatch = (deadline: IdleDeadline) => {
      try {
        while (deadline.timeRemaining() > 0 && index < length) {
          const item = dataArray[index];
          callback(item, index);
          index++;
        }
      } catch (error) {
        console.error('Error processing item at index', index, error);
        return;
      }
      run();
    };

    if (typeof requestIdleCallback === 'function') {
      // 在浏览器空闲时间内处理数据
      requestIdleCallback(processBatch);
    } else {
      setTimeout(() => processBatch({ timeRemaining: () => 50 } as IdleDeadline), 0);
    }
  }

  run();
}

export { sharding };
export default sharding;
