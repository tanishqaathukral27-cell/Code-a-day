// ================================
// SPOTIFY SETTINGS
// ================================

const clientId = "f1b95c39c3824794a14b55f49d6f10f4";

const redirectUri =
    "https://tanishqaathukral27-cell.github.io/Code-a-day/callback.html";

const scope = "playlist-modify-private";


// ================================
// GENERATE RANDOM STATE
// ================================

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


// ================================
// GENERATE PKCE VERIFIER
// ================================

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


// ================================
// GENERATE PKCE CHALLENGE
// ================================

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


// ================================
// LOGIN WITH SPOTIFY
// ================================

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

            client_id:
                clientId,

            scope:
                scope,

            state:
                state,

            code_challenge_method:
                "S256",

            code_challenge:
                codeChallenge,

            redirect_uri:
                redirectUri

        });


    console.log(
        "Redirecting to Spotify..."
    );


    window.location.href =
        `${authUrl}?${params.toString()}`;
}


// ================================
// HANDLE SPOTIFY CALLBACK
// ================================

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


    // User cancelled Spotify login

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


    // ================================
    // CHECK STATE
    // ================================

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


    // ================================
    // GET PKCE VERIFIER
    // ================================

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


    // ================================
    // EXCHANGE CODE FOR TOKEN
    // ================================

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

                    body:
                        new URLSearchParams({

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


        // ================================
        // AUTHENTICATION FAILED
        // ================================

        if (!response.ok) {

            showSpotifyMessage(
                "Spotify authentication failed.",
                data.error_description ||
                "Spotify could not complete authentication."
            );

            return;
        }


        // ================================
        // AUTHENTICATION SUCCESSFUL
        // ================================

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


            console.log(
                "Spotify connected!"
            );


            // Return to final page

            window.location.href =
                "final.html";

        }

    }

    catch (error) {

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


// ================================
// SHOW SPOTIFY MESSAGE
// ================================

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


// ================================
// CREATE SPOTIFY PLAYLIST
// ================================
const musicVibes = {

    // MORNING

    "Have a proper breakfast.": "happy morning",
    "Get ready while listening to music.": "upbeat morning",
    "Take some quiet time before starting the day": "peaceful morning",

    "Keep snoozing your alarm.": "sleepy morning",
    "Scroll through your phone instead of getting ready.": "lazy morning",
    "Rush through the morning without eating.": "chaotic morning",


    // AFTERNOON

    "Have lunch and take a proper break": "feel good afternoon",
    "Get some work done before relaxing": "focus chill",
    "Go out and do something fun": "fun afternoon",

    "Put everything off until later": "lazy afternoon",
    "Spend the whole afternoon scrolling": "chill bedroom pop",
    "Forget to take a break and burn yourself out": "overwhelmed chill",


    // EVENING

    "Go for an evening walk": "sunset chill",
    "Hang out with friends or family": "feel good friends",
    "Do something you've been looking forward to": "excited feel good",

    "Stay in your room all evening": "quiet evening",
    "Keep scrolling instead of doing anything": "lazy evening",
    "Leave everything until the last minute": "late evening chaos",


    // NIGHT

    "Watch something comforting before bed": "comforting night",
    "Write down how your day went": "late night reflective",
    "Put your phone away and wind down": "peaceful night",

    "Stay up scrolling for hours": "late night chill",
    "Procrastinate until way too late": "late night chaos",
    "Go to bed without winding down": "dreamy night"

};

async function createSpotifyPlaylist() {

    const accessToken =
        localStorage.getItem(
            "spotify_access_token"
        );


    // No Spotify token

    if (!accessToken) {

        showSpotifyMessage(
            "Spotify not connected.",
            "Please connect Spotify first."
        );

        loginWithSpotify();

        return;
    }


    // ================================
    // GET CODE-A-DAY CHOICES
    // ================================

    const choices = [

        sessionStorage.getItem(
            "morningChoice"
        ),

        sessionStorage.getItem(
            "afternoonChoice"
        ),

        sessionStorage.getItem(
            "eveningChoice"
        ),

        sessionStorage.getItem(
            "nightChoice"
        )

    ].filter(Boolean);


    console.log(
        "Code-a-Day choices:",
        choices
    );


    try {

        // ================================
        // GET SPOTIFY USER
        // ================================

        const userResponse =
            await fetch(
                "https://api.spotify.com/v1/me",
                {

                    headers: {

                        Authorization:
                            `Bearer ${accessToken}`

                    }

                }
            );


        const userData =
            await userResponse.json();


        console.log(
            "Spotify user:",
            userData
        );


        if (!userResponse.ok) {

            console.error(
                "Could not get Spotify user:",
                userData
            );


            localStorage.removeItem(
                "spotify_access_token"
            );


            showSpotifyMessage(
                "Spotify connection expired.",
                "Please connect Spotify again."
            );


            loginWithSpotify();

            return;
        }


        const userId =
            userData.id;


        // ================================
        // SEARCH FOR SONGS
        // ================================

        const trackUris = [];


        for (const choice of choices) {

           const vibe =
    musicVibes[choice] || choice;

const searchQuery =
    encodeURIComponent(vibe);


            const searchResponse =
                await fetch(
                    `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=1`,
                    {

                        headers: {

                            Authorization:
                                `Bearer ${accessToken}`

                        }

                    }
                );


            const searchData =
                await searchResponse.json();


            console.log(
                "Spotify search:",
                choice,
                searchData
            );


            if (
                searchResponse.ok &&
                searchData.tracks &&
                searchData.tracks.items.length > 0
            ) {

                trackUris.push(
                    searchData.tracks.items[0].uri
                );

            }

        }


        // ================================
        // NO SONGS FOUND
        // ================================

        if (trackUris.length === 0) {

            showSpotifyMessage(
                "No songs found.",
                "Spotify couldn't find tracks for your choices."
            );

            return;
        }


        // ================================
        // CREATE PLAYLIST
        // ================================

        const playlistResponse =
            await fetch(
                "https://api.spotify.com/v1/me/playlists",
                {

                    method: "POST",

                    headers: {

                        Authorization:
                            `Bearer ${accessToken}`,

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            name:
                                "My Code-a-Day",

                            description:
                                "A playlist created from my Code-a-Day.",

                            public:
                                false

                        })

                }
            );


        const playlistData =
            await playlistResponse.json();


        console.log(
            "Created playlist:",
            playlistData
        );


        if (!playlistResponse.ok) {

            showSpotifyMessage(
                "Playlist creation failed.",
                playlistData.error?.message ||
                "Spotify couldn't create your playlist."
            );

            return;
        }


        // ================================
        // ADD TRACKS
        // ================================

        const addTracksResponse =
            await fetch(
                `https://api.spotify.com/v1/playlists/${playlistData.id}/items`,
                {

                    method: "POST",

                    headers: {

                        Authorization:
                            `Bearer ${accessToken}`,

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            uris:
                                trackUris

                        })

                }
            );


        const addTracksData =
            await addTracksResponse.json();


        console.log(
            "Added tracks:",
            addTracksData
        );


        if (!addTracksResponse.ok) {

            showSpotifyMessage(
                "Playlist created!",
                "The playlist was created, but the songs couldn't be added."
            );

            return;
        }


        // ================================
        // SUCCESS
        // ================================

       showSpotifyMessage(
    "Playlist created!",
    "Your Code-a-Day playlist is ready on Spotify."
);

const spotifyLink =
    playlistData.external_urls.spotify;

const spotifyMessage =
    document.getElementById("spotify-message");

if (spotifyMessage) {

    spotifyMessage.innerHTML =
        `Your playlist is ready! <a href="${spotifyLink}" target="_blank">Open it on Spotify →</a>`;

}

console.log(
    "Code-a-Day Spotify playlist created!"
);

    }

    catch (error) {

        console.error(
            "Playlist creation error:",
            error
        );


        showSpotifyMessage(
            "Something went wrong.",
            "Check the browser console for details."
        );

    }

}


// ================================
// CONNECT BUTTON
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const spotifyButton =
            document.getElementById(
                "spotify-btn"
            );


        if (spotifyButton) {

            spotifyButton.addEventListener(
                "click",
                function() {

                    const accessToken =
                        localStorage.getItem(
                            "spotify_access_token"
                        );


                    if (accessToken) {

                        createSpotifyPlaylist();

                    }

                    else {

                        loginWithSpotify();

                    }

                }
            );


            console.log(
                "Spotify button connected."
            );

        }


        // ================================
        // CALLBACK PAGE
        // ================================

        if (
            window.location.pathname.endsWith(
                "callback.html"
            )
        ) {

            handleCallback();

        }

    }
);