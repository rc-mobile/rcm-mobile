import React from 'react'
import PropTypes from 'prop-types'
import Props from 'rsg-components/Props'
import Methods from 'rsg-components/Methods'
import isEmpty from 'lodash/isEmpty'

export default function Usage({ props: { props, methods } }) {
  const propsNode = !isEmpty(props) && <Props props={ props } />
  const methodsNode = !isEmpty(methods) && <Methods methods={ methods } />

  if (!propsNode && !methodsNode) {
    return null
  }
  // 过滤无用属性
  // const newPropsNode = React.cloneElement(propsNode, {
  //   props: propsNode.props.props.filter(i => !~i.name.indexOf('aria-'))
  // })
  return (
    <div>
      { propsNode }
      { methodsNode }
    </div>
  )
}

Usage.propTypes = {
  props: PropTypes.shape({
    props: PropTypes.array,
    methods: PropTypes.array
  }).isRequired
}
