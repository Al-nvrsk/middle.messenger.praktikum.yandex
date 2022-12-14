function merge (lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p], rhs[p])
      } else {
        lhs[p] = rhs[p]
      }
    } catch (e) {
      lhs[p] = rhs[p]
    }
  }

  return lhs
}

export default merge
