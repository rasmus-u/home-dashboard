# Home Dashboard

Home dashboard as a web service for displaying up-to-date weather and Helsinki public transport information. UI built to fit custom device requirements: not responsive as of Aug 18. 2024.

![Final screenshot](https://github.com/user-attachments/assets/ad52c92c-a16c-4411-8206-8f9693e1b2c1)
![Final device installation](https://github.com/user-attachments/assets/eb27d0c1-45d6-4267-971b-2ac6f39ffe32)

Frontend:
- Vite React with JavaScript
- TailwindCSS

Backend:
- Node.js
- Axios for making queries to APIs from backend
- Express REST API endpoints

Device:
- Huawei Tablet
- [Fully Kiosk Browser](https://play.google.com/store/apps/details?id=de.ozerov.fully&hl=en_US&pli=1) for 24/7 screen awake

## Running
1. Sign up to [HSL Api](https://digitransit.fi/en/developers/api-registration/).
2. Fill the `HSL_PRIMARY_KEY` and `HSL_API_URL` in `backend/.env.template` with credentials received from HSL API (above).
3. Rename `backend/.env.template` to `backend/.env`
4. In `/backend/` run `npm i` + `npm run dev`
5. In `/frontend/` run `npm i` + `npm run dev`
6. Done!

## 3rd party services
- [HSL api](https://digitransit.fi/en/developers/apis/1-routing-api/) (real time public transport + city bikes)
  - GraphQL queries to API in backend
- [Ilmatieteen laitos API](https://www.ilmatieteenlaitos.fi/avoin-data) for real time weather information.
  - WFS 2.0 standard using Javascript SDK in backend

## Retrospect
- Backend is not necessary but done as a practise
- GraphQL queries could have been done in frontend with e.g. Apollo Client instead of plain REST in backend
- Current UI is made to fit to exact device chosen with unique requirements for text size etc. due to age of the device --> Not responsive!
- Switch project over to TypeScript

***TODO**: Database access for user control to allow multiple people to access the dasboard.*\
***TODO**: Make the UI more responsive to different tablet screen sizes.*
