import { useRef } from 'react'
import './MarkdownImg.css'

export default function MarkdownImg({ src, alt, ...props }) {
  const imgRef = useRef()

  function setRectStyles(el, rect) {
    el.style.top = rect.top - 8 + 'px'
    el.style.left = rect.left - 10 + 'px'
    el.style.width = rect.width + 20 + 'px'
    el.style.height = rect.height + 17 + 'px'
  }

  function handleClick() {
    if (window.innerWidth < 768) return

    const original = imgRef.current
    if (!original || !original.complete || !original.naturalWidth) return

    const rect = original.getBoundingClientRect()

    const backdrop = document.createElement('div')
    backdrop.className = 'fullscreen_backdrop'
    document.body.appendChild(backdrop)

    const clone = document.createElement('div')
    clone.className = 'markdown_preview_img'

    const cloneImg = document.createElement('img')
    cloneImg.src = original.src
    cloneImg.alt = alt || 'Fullscreen preview'

    clone.appendChild(cloneImg)

    setRectStyles(clone, rect)
    document.body.appendChild(clone)

    requestAnimationFrame(function () {
      const naturalWidth = original.naturalWidth
      const naturalHeight = original.naturalHeight
      const aspectRatio = naturalWidth / naturalHeight

      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      let targetWidth = windowWidth
      let targetHeight = targetWidth / aspectRatio

      if (targetHeight > windowHeight) {
        targetHeight = windowHeight
        targetWidth = targetHeight * aspectRatio
      }

      const targetTop = (windowHeight - targetHeight) / 2
      const targetLeft = (windowWidth - targetWidth) / 2

      clone.style.top = targetTop + 'px'
      clone.style.left = targetLeft + 'px'
      clone.style.width = targetWidth + 'px'
      clone.style.height = targetHeight + 'px'
    })

    function revert() {
      const rect = original.getBoundingClientRect()
      const inViewport =
        rect.bottom > 0 &&
        rect.top < window.innerHeight &&
        rect.right > 0 &&
        rect.left < window.innerWidth

      clone.removeEventListener('click', revert)
      backdrop.removeEventListener('click', revert)

      function cleanup() {
        if (clone.parentNode) clone.remove()
        if (backdrop.parentNode) backdrop.remove()
      }

      backdrop.style.opacity = '0'

      if (inViewport) {
        setRectStyles(clone, rect)
      } else {
        clone.style.opacity = '0'
      }

      clone.addEventListener('transitionend', cleanup, { once: true })
      backdrop.addEventListener(
        'transitionend',
        () => {
          if (
            document.body.contains(clone) ||
            document.body.contains(backdrop)
          ) {
            cleanup()
          }
        },
        { once: true }
      )
    }

    clone.addEventListener('click', revert)
    backdrop.addEventListener('click', revert)
  }

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="markdown_preview_target"
        onClick={handleClick}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </>
  )
}
