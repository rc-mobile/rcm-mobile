import * as React from 'react'

/**
 * 最终获取一个元素节点
 * @param {any} Node 一个节点&组件&任意数据
 * */
export function getReactNode(Node: any) {
  return (React.isValidElement(Node) || typeof Node === 'string') ? Node : <Node />
}

/**
 * 设置元素 css3 transform 属性
 * @param {element} ele 一个节点
 * @param {string} attribute 属性值
 * */
export function setTransform(ele: HTMLElement, attribute: string) {
  const transformNames: any = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let name in transformNames) {
    if (ele.style[transformNames[name]] !== undefined) {
      ele.style[transformNames[name]] = attribute
    }
  }
}

/**
 * 获取meta标签的content值
 * @param {string} name meta中的name
 * */
export function getMetaValue(name: string) {
  const meta = Array.from(document.getElementsByTagName('meta'))
    .filter(item => item.name === name)[0]
  let value = meta ? meta.content && meta.content.toLowerCase() : null

  if (name === 'theme' && value !== 'ios' && value !== 'android') value = 'ios'

  return value
}

/**
 * 创建一个生成唯一标示的函数
 * */
export function getUuidFn(key: string) {
  let id = 0
  const nowDate = Date.now()
  return () => `${key}_${nowDate}_${id++}`
}
