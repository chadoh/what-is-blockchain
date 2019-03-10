const animationLength = 350

export const openBlock = (block: HTMLElement): void => {
  // 1. duplicate the element, position above old element
  const clone = block.cloneNode(true) as HTMLElement
  const rect = block.getBoundingClientRect()
  let styles = `
    position: absolute;
    top: calc(${rect.top}px + 1em);
    left: calc(${rect.left}px - 0.35em);
    width: ${block.offsetWidth}px;
    height: ${block.offsetHeight}px;
    transform: perspective(1000em) rotateY(330deg) scaleX(1.1) translateZ(1em);
    transition: all ${animationLength}ms linear;
    z-index: 1;
  `
  clone.style.cssText = clone.style.cssText + ";" + styles

  // save values for closing block later
  clone.dataset.top = clone.style.top
  clone.dataset.left = clone.style.left
  clone.dataset.width = clone.style.width
  clone.dataset.height = clone.style.height

  // 2. add to #opened-block, activate #opened-block
  const container = document.getElementById("opened-block")
  container.className = "active"
  container.appendChild(clone)

  // 3. set visibility=hidden using class which can be removed when closing
  block.className = block.className + " opened"

  // 4. make full screen
  setTimeout(() => {
    styles = `
      top: 1em;
      left: 1em;
      width: calc(100% - 2em);
      height: calc(100vh - 3em);
      transform: perspective(40em) rotateY(180deg);
    `
    clone.style.cssText = clone.style.cssText + ";" + styles

    // TODO: remove me!
    setTimeout(() => closeBlock(clone), animationLength * 5)
  }, 50)
}

export const closeBlock = function(clone: HTMLElement): void {
  // 1. set back to original dimensions
  let styles = `
    position: fixed;
    top: ${clone.dataset.top};
    left: ${clone.dataset.left};
    width: ${clone.dataset.width};
    height: ${clone.dataset.height};
    transform: rotateY(330deg) scaleX(1.1) translateZ(1em);
  `
  clone.style.cssText = clone.style.cssText + ";" + styles

  // 2. wait for animation to complete
  setTimeout(() => {
    // 3. make original block visible again
    const block = document.querySelector(".block.opened")
    block.className = block.className.replace(/ opened/, "")

    // 4. remove placeholder
    clone.remove()

    // 5. deactivate #opened-block
    const container = document.getElementById("opened-block")
    container.className = ""
  }, animationLength)
};

