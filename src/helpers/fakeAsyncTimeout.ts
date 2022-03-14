const fakeAsyncTimeout = (ms = 200) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
export default fakeAsyncTimeout
