function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}

export { removeAllChildren };
