import { useState } from 'react'
import { FullScreenText } from '../constants/game-menu'

interface DocumentWithFullscreen extends HTMLDocument {
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
  msExitFullscreen?: () => void
  mozCancelFullScreen?: () => void
  webkitExitFullscreen?: () => void
}

interface DocumentElementWithFullscreen extends HTMLElement {
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
  webkitRequestFullscreen?: () => void
}

const checkFullScreen = (): boolean => {
  const doc = document as DocumentWithFullscreen

  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  )
}

const requestFullScreen = (element: DocumentElementWithFullscreen) => {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  }
}

const exitFullScreen = (doc: DocumentWithFullscreen) => {
  if (doc.exitFullscreen) {
    doc.exitFullscreen()
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen()
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen()
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen()
  }
}

export const useFullScreen = (): [
  clickFullScreen: () => void,
  textContent: FullScreenText
] => {
  const [textContent, setTextContent] = useState<FullScreenText>(
    FullScreenText.full
  )

  const changeFullScreen = () => {
    const isFull = checkFullScreen()

    if (isFull) {
      exitFullScreen(document)
      setTextContent(FullScreenText.full)
      return
    }

    requestFullScreen(document.documentElement)
    setTextContent(FullScreenText.default)
  }

  return [changeFullScreen, textContent]
}
