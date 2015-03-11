Botnana Blog View based on Yahoo's fluxible architecture.

Note:

目前提供的採用 server side routing。Blog 中指向 Post 的連結會導致整個頁面刷新。
Yahoo's 的 flux-router-component 也能以做到 client side routing。但要如何做還待研究。
而且連結固定指向 /post/。這也必須在未來修改。

此外，在 examples 中的 routes.js 內使用了 action，是否應只使用 dispatch？還再研究。聽說 Facebook 內部，action 內只單純執行 dispatch，並不叫用另一個 action。
