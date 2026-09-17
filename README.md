# Code-a-Day

A little interactive game that turns your day into a story.

## What is Code-a-Day?

Code-a-Day is a small interactive project I made because I wanted to build something that felt fun rather than just making another normal website.

You go through different parts of a day — morning, afternoon, evening and night — and make choices along the way. By the end, you get a little summary of how your day turned out.

I also added Spotify integration, so the choices you make throughout the day are used to create a playlist that matches the overall vibe of your day.

## How it works

The game takes you through:

* Choosing a category
* Choosing a character
* Answering questions for different parts of the day
* Making choices based on your answers
* Seeing your completed day at the end
* Creating a Spotify playlist based on your choices

The choices are saved throughout the session so they can be shown together on the final page.

## Features

* Interactive question cards
* Morning, afternoon, evening and night sections
* Character selection
* Good and bad choices
* Final day summary
* Spotify playlist generation
* Spotify login using PKCE authentication
* Responsive design

## Spotify Integration

The Spotify feature uses the choices made during the game to create a playlist.

Once the day is complete, you can connect your Spotify account and Code-a-Day searches for songs based on the different moods from your choices. It then creates a private playlist called **My Code-a-Day** and gives you a link to open it on Spotify.

## Built With

* HTML5
* CSS3
* JavaScript
* Spotify Web API
* Git
* GitHub Pages

## Project Structure

```text
Code-a-Day/
│
├── assets/
├── index.html
├── loading.html
├── type.html
├── character.html
├── morning-loading.html
├── morningloading2.html
├── morningloading3.html
├── morning.html
├── afternoon.html
├── evening.html
├── night.html
├── final.html
├── callback.html
├── spotify.js
├── script.js
├── code.css
└── README.md
```

## Why I Made It

I wanted to make something that felt like more than a basic coding project.

I like the idea of turning ordinary things into something interactive, so I built Code-a-Day around something everyone already has — their day.

It was also a project where I could experiment with JavaScript, page-to-page interactions, session storage and working with an actual API.

## What's Next?

For now, Code-a-Day is complete.

There are definitely things I could add or change in the future, but I wanted to stop at a point where the project actually felt finished instead of endlessly adding features.

## Status

**Version 2 — Complete**
