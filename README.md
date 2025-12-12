# 🎬 The Watch List (watchlist_proj)

## Overview

**The Watch List** is a full‑stack movie and TV show favorites application built with a **Django REST API backend** and designed to be consumed by a modern frontend (e.g., React). The app allows users to browse movies and TV shows from external APIs and save their favorites to a personalized watchlist.

This project focuses on **clean backend architecture**, **authentication**, and **user‑specific data relationships**, making it ideal as a portfolio project for junior software engineering roles.

---

## ✨ Features

### User Stories

Users can:

* Create an account, log in, and log out
* Browse a list of movies and TV shows
* Add movies and TV shows to their personal favorites list
* View their saved favorites tied to their user account

---

## 📄 Pages / Views (Frontend Concept)

Although this repository is backend‑focused, it supports the following frontend pages:

1. Homepage
2. Create Account (Sign Up)
3. Login
4. Logout
5. Movie List
6. TV Shows List
7. Favorites
8. Profile Page

---

## 🧠 Project Architecture

### Backend

* **Framework:** Django + Django REST Framework
* **Authentication:** Token‑based authentication
* **Permissions:** Favorites are accessible only to authenticated users

### Apps

* `user_app` – Custom user model and authentication
* `favorites_app` – Handles favoriting movies and TV shows per user
* `most_favorited` – Aggregates most‑favorited movies/shows across users

---

## 🗄️ Data Models (High Level)

### User (Client)

* id
* email (used as username)
* password

### Movie

* id
* title
* overview
* release_date
* external_api_id

### Show

* id
* name
* summary
* premiere_date
* external_api_id

### Favorites

* id
* specific_user (ForeignKey → User)
* fav_movies (ManyToMany → Movie)
* fav_shows (ManyToMany → Show)

---

## 🔗 External APIs

This project integrates third‑party APIs to fetch movie and TV show data:

### 🎥 Movies

* **TMDB API**
* Documentation: [https://developer.themoviedb.org/docs/getting-started](https://developer.themoviedb.org/docs/getting-started)

### 📺 TV Shows

* **TVMaze API**
* Documentation: [https://www.tvmaze.com/api](https://www.tvmaze.com/api)

External API data is fetched in the backend and optionally persisted when a user favorites an item.

---

## 🔐 Authentication & Authorization

* Token‑based authentication using Django REST Framework
* Only authenticated users can:

  * Add movies or shows to favorites
  * View or delete their favorites
* Public users can:

  * Browse movie and TV show data (via frontend consumption)

---

## 📡 API Endpoints (Sample)

```http
POST   /users/register/
POST   /users/login/
POST   /users/logout/

GET    /favorites/movies/
GET    /favorites/movies/<id>/
POST   /favorites/movies/<id>/
DELETE /favorites/movies/<id>/

GET    /favorites/shows/
GET    /favorites/shows/<id>/
POST   /favorites/shows/<id>/
DELETE /favorites/shows/<id>/
```

> All `/favorites/*` routes require authentication.

---

## 🧑‍💻 Author

Built as a personal portfolio project to demonstrate:

* RESTful API design
* Django authentication
* User‑specific data relationships
* Integration with third‑party APIs

---

## 📌 Project Status

**Backend complete** ✅
Frontend integration in progress 🚧
