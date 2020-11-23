(function(){
    apiPrefix = "https://discord.com/api/v8";
    window.localStorage = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
    function apiCall(apiPath, body, method = "GET"){     
        return fetch(apiPrefix + apiPath, {
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                Accept: "*/*",
                "Accept-Language": "en-US",
                Authority: "discordapp.com",
                Authorization: token,
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.301 Chrome/56.0.2924.87 Discord/1.6.15 Safari/537.36",
            },
            method,
        }).then((res) => (res.status === 200 ? res.json() : Promise.resolve()))
          .catch(console.error);
    }
    window.dispatchEvent(new Event('beforeunload'));
    let token = JSON.parse(localStorage.token);
    apiCall("/auth/logout", {"provider":null,"voip_provider":null}, "POST");
    window.location.pathname = "/login";
    localStorage.token = "nothing";
}());
