
#  KoToKo: Japanese concentration game app
This mobile application is originally developed as my Fullstack capstone project for [Java Development Bootcamp at neue fische](https://www.neuefische.de/en/bootcamp/java-development) 2023.

![KoToKo_ver1](https://github.com/kohei-s/kotoko-concentration-app/assets/82062401/b4132c77-a729-490f-ac6c-150da692cf4d)
(device pixel ratio: 390x844)
---
Code analysis with SonarCloud
- Frontend\
  [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=kohei-s_kotoko-concentration-app-frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=kohei-s_kotoko-concentration-app-frontend)
  [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=kohei-s_kotoko-concentration-app-frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=kohei-s_kotoko-concentration-app-frontend)
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kohei-s_kotoko-concentration-app-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kohei-s_kotoko-concentration-app-frontend)
  [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=kohei-s_kotoko-concentration-app-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=kohei-s_kotoko-concentration-app-frontend)
- Backend\
  [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=kohei-s_kotoko-concentration-app-backend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=kohei-s_kotoko-concentration-app-backend)
  [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=kohei-s_kotoko-concentration-app-backend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=kohei-s_kotoko-concentration-app-backend)
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kohei-s_kotoko-concentration-app-backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kohei-s_kotoko-concentration-app-backend)
  [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=kohei-s_kotoko-concentration-app-backend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=kohei-s_kotoko-concentration-app-backend)
---
## 1. Concept 📱
New concentration game app aims to support learning Japanese for so called [third culture kids](https://en.wikipedia.org/wiki/Third_culture_kid) growing up speaking a different language in kindergarten or school (👉 [references & sources in research](https://github.com/kohei-s/kotoko-concentration-app/wiki/References-&-Internet-Sourcese)). The name of the app *KoToKO (言と言)* is a neologism that could mean *Word & Word*. 
## 2. Problem 😦
- Difficulty of staying motivated to learn the Japanese language in non-Japanese speaking countries
- Frustration of not being properly understood in Japanese by their own families
## 3. Target group 🧒🏾🧒🏼🧒🏿🧒🏻🧒🏽
Children between 5-15 years old learning Japanese as (one of) their home language(s), as well as their parents who want to support the learning journey
## 4. Core function
  🎌 Simple concentration game with elementary Japanese characters \
  🪄 Personalize game contents with your favorite Japanese characters \
  📖 Add new characters you're about to learn \
  🗻 Show game records you achieved \
  📚 Expand your Hiragana & Katakana knowledge with additional diacritics cards \
  🔎 Search Japanese character in your strongest language e.g. English (or German**) \
  ❤️ Praise your kids for their achievements and keep cheering them (feature for parents)** \
  🛝 Child friendly design \
  (** upcoming features)
## 5. Tech Stack
### Backend
Java, Spring Boot, Maven, REST, MongoDB, DeepL API, goo API
### Frontend
JavaScript, TypeScript, CSS, HTML, React, Vite, MUI
### Testing / Debugging
JUnit, Mockito, SonarLint, SonarCloud
### DevOps
GitHub Projects, Docker, GitHub Actions, AWS
