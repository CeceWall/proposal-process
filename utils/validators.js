export function rangeValidator (min = 0, max = 1000000) {
  return { max, min, message: `请输入${min}到${max}个字符` }
}

export function requireValidator (fieldName) {
  return { required: true, message: `请输入${fieldName}` }
}
