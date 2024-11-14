const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)

export const URI_BACKEND = isLocalhost
        ? 'http://localhost:8800'
        : 'http://194.87.214.60:8800'