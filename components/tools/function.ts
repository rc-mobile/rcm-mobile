/**
 * 创建一个新函数，调用该函数后，延时调用原函数。如果在延时等待期间有新的调用，则重新开始计时。
 * @param fn 要调用的原函数。
 * @param timeout 延时的毫秒数。
 * @return 返回一个新函数。
 * @example document.onscroll = defer(() => console.log("延时执行"), 100);
 */
export function defer<T extends Function>(fn: T, duration = 0) {
  let timer: number
  return function (this: any) {
    const args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      timer = 0
      fn.apply(this, args)
    }, duration) as any
  } as any as T
}