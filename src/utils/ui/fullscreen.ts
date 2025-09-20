/**
 * 元素全屏
 * @param element 元素
 * @param success 成功回调
 * @param error 失败回调
 */
export function elementFullScreen(element: HTMLElement, success?: () => void, error?: () => void): void {
  if (!supportFullScreen()) {
    return error?.()
  }
  element.requestFullscreen().then(() => {
    success?.()
  }).catch(() => {
    error?.()
  })
}

export function exitFullScreen(): void {
  if (isFullScreen()) {
    document.exitFullscreen()
  }
}

export function isFullScreen(): boolean {
  return document.fullscreenElement !== null
}

function supportFullScreen(): boolean {
  return document.fullscreenEnabled
}