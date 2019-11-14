const promisic = func => {
  return (params = {}) => {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
      func(args)
    })
  }
}
