const clientId = "f1b95c39c3824794a14b55f49d6f10f4";

const redirectUri =
    "https://tanishqaathukral27-cell.github.io/Code-a-day/callback.html";

const scope = "playlist-modify-private";


// =========================
// GENERATE RANDOM STRING
// =========================

function generateRandomString(length) {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {

        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );

    }

    return result;
}


// =========================
// GENERATE PKCE VERIFIER
// =========================

function generateCodeVerifier(length) {

    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

    let verifier = "";

    for (let i = 0; i < length; i++) {

        verifier += possible.charAt(
            Math.floor(Math.random() * possible.length)
        );

    }

    return verifier;
}


// =========================
// GENERATE PKCE CHALLENGE
// =========================

async function generateCodeChallenge(codeVerifier) {

    const data =
        new TextEncoder().encode(codeVerifier);

    const digest =
        await window.crypto.subtle.digest(
            "SHA-256",
            data
        );

    return btoa(
        String.fromCharCode(
            ...new Uint8Array(digest)
        )
    )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}


// =========================
// SPOTIFY LOGIN
// =========================

async function loginWithSpotify() {

    const codeVerifier =
        generateCodeVerifier(128);

    const state =
        generateRandomString(16);

    localStorage.setItem(
        "spotify_code_verifier",
        codeVerifier
    );

    localStorage.setItem(
        "spotify_state",
        state
    );

    const codeChallenge =
        await generateCodeChallenge(codeVerifier);

    const authUrl =
        "https://accounts.spotify.com/authorize";

    const params = new URLSearchParams({

        response_type: "code",

        client_id: clientId,

        scope: scope,

        state: state,

        code_challenge_method: "S256",

        code_challenge: codeChallenge,

        redirect_uri: redirectUri

    });

    window.location.href =
        `${authUrl}?${params.toString()}`;
}


// =========================
// HANDLE CALLBACK
// =========================

async function handleCallback() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const code =
        params.get("code");

    const returnedState =
        params.get("state");

    const error =
        params.get("error");


    // User denied Spotify access

    if (error) {

        document.getElementById(
            "spotify-status"
        ).textContent =
            "Spotify connection cancelled.";

        document.getElementById(
            "spotify-message"
        ).textContent =
            "You can return to Code-a-Day.";

        return;
    }


    // No authorization code

    if (!code) {
        return;
    }


    // Check state

    const savedState =
        localStorage.getItem(
            "spotify_state"
        );

    if (
        !savedState ||
        returnedState !== savedState
    ) {

        document.getElementById(
            "spotify-status"
        ).textContent =
            "Something went wrong.";

        document.getElementById(
            "spotify-message"
        ).textContent =
            "The Spotify authorization could not be verified.";

        return;
    }


    // Get PKCE verifier

    const codeVerifier =
        localStorage.getItem(
            "spotify_code_verifier"
        );


    // Exchange authorization code
    // for access token

    const response =
        await fetch(
            "https://accounts.spotify.com/api/token",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/x-www-form-urlencoded"

                },

                body: new URLSearchParams({

                    client_id:
                        clientId,

                    grant_type:
                        "authorization_code",

                    code:
                        code,

                    redirect_uri:
                        redirectUri,

                    code_verifier:
                        codeVerifier

                })

            }
        );


    const data =
        await response.json();


    // Successful connection

    if (data.access_token) {

        localStorage.setItem(
            "spotify_access_token",
            data.access_token
        );

        localStorage.removeItem(
            "spotify_state"
        );

        localStorage.removeItem(
            "spotify_code_verifier"
        );


        const status =
            document.getElementById(
                "spotify-status"
            );

        const message =
            document.getElementById(
                "spotify-message"
            );


        if (status) {

            status.textContent =
                "Spotify connected!";

        }


        if (message) {

            message.textContent =
                "You're ready to create your playlist.";

        }


        console.log(
            "Spotify connected!"
        );

    } else {

        console.log(
            "Spotify connection failed."
        );

        console.log(data);

        const status =
            document.getElementById(
                "spotify-status"
            );

        const message =
            document.getElementById(
                "spotify-message"
            );


        if (status) {

            status.textContent =
                "Something went wrong.";

        }


        if (message) {

            message.textContent =
                "We couldn't connect to Spotify.";

        }

    }

}


// =========================
// CONNECT BUTTON
// =========================

const spotifyButton =
    document.getElementById(
        "spotify-btn"
    );


if (spotifyButton) {

    spotifyButton.addEventListener(
        "click",
        loginWithSpotify
    );

}


// =========================
// RUN CALLBACK
// =========================

if (
    window.location.pathname.endsWith(
        "callback.html"
    )
) {

    handleCallback();

}