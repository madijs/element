export const noduxMessages = {
  id: -1,
  data: [],
  tmpFunction: (t) => {},
  downScroll: () => {},
  st: { f: [() => {}] },
}

export const setnMessages = (mss) => {
  noduxMessages.data = mss
}
export const addnMessages = (ms) => {
  noduxMessages.data.push(ms)
}
export const cleannMessages = () => {
  noduxMessages.data = []
}
export const setnID = (id) => {
  noduxMessages.id = id
}

export const setnTmpFunction = (f) => {
  noduxMessages.tmpFunction = f
}

export const setDownScroll = (d) => {
  noduxMessages.downScroll = d
}

export const setCloseSocket = (st) => {
  noduxMessages.st = st
}
