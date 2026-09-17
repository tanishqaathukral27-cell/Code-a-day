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

    const params =
        new URLSearchParams({
            response_type: "code",
            client_id: clientId,
            scope: scope,
            state: state,
            code_challenge_method: "S256",
            code_challenge: codeChallenge,
            redirect_uri: redirectUri
        });

    console.log("Redirecting to Spotify...");

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


    // User cancelled Spotify access

    if (error) {

        showSpotifyMessage(
            "Spotify connection cancelled.",
            "You can return to Code-a-Day."
        );

        console.log(
            "Spotify authorization error:",
            error
        );

        return;
    }


    // No authorization code

    if (!code) {

        console.log(
            "No Spotify authorization code found."
        );

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

        showSpotifyMessage(
            "Spotify authentication failed.",
            "The authorization could not be verified."
        );

        console.log(
            "Spotify state verification failed."
        );

        return;
    }


    // Get PKCE verifier

    const codeVerifier =
        localStorage.getItem(
            "spotify_code_verifier"
        );

    if (!codeVerifier) {

        showSpotifyMessage(
            "Spotify authentication failed.",
            "The PKCE verifier could not be found."
        );

        console.log(
            "No PKCE code verifier found."
        );

        return;
    }


    // Exchange authorization code for access token

    try {

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


        console.log(
            "Spotify token response:",
            data
        );

        console.log(
            "HTTP status:",
            response.status
        );


        // Authentication failed

        if (!response.ok) {

            showSpotifyMessage(
                "Spotify authentication failed.",
                data.error_description ||
                "Spotify could not complete the authentication."
            );

            return;
        }


        // Authentication successful

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


            showSpotifyMessage(
                "Spotify connected!",
                "You're ready to create your playlist."
            );


            console.log(
                "Spotify connected!"
            );

        } else {

            showSpotifyMessage(
                "Spotify authentication failed.",
                "No access token was returned."
            );

            console.log(
                "No access token received.",
                data
            );
        }


    } catch (error) {

        console.error(
            "Spotify request failed:",
            error
        );

        showSpotifyMessage(
            "Spotify authentication failed.",
            "Something went wrong while connecting to Spotify."
        );
    }
}


// =========================
// SHOW MESSAGE
// =========================

function showSpotifyMessage(
    statusText,
    messageText
) {

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
            statusText;
    }


    if (message) {
        message.textContent =
            messageText;
    }
}


// =========================
// CONNECT BUTTON
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const spotifyButton =
            document.getElementById(
                "spotify-btn"
            );


        if (spotifyButton) {

            spotifyButton.addEventListener(
                "click",
                loginWithSpotify
            );

            console.log(
                "Spotify button connected."
            );
        }


        // Run callback only on callback.html

        if (
            window.location.pathname.endsWith(
                "callback.html"
            )
        ) {

            handleCallback();
        }
    }
);