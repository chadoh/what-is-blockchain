import blockies from "blockies-identicon"

const identicons = {}

export default (): void => {
  Array.from(
    document.querySelectorAll(`[data-behavior="identicon"]`)
  ).forEach((div: HTMLElement) => {
    const title = div.getAttribute("title")
    identicons[title] = identicons[title] || blockies.create({ seed: title }).toDataURL()

    // use image rather than canvas so that cloning element works correctly
    const img = new Image()
    img.src = identicons[title]
    div.appendChild(img)

    // make sure we don't call this on the same element twice
    delete div.dataset.behavior
  })
}
