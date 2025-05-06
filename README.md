
### Axpo Asset Inspector

Single Page Application (SPA) built using Vite, TypeScript, and React.
I alse used React testing library and Vitest as a runner.


The app fetches the Swiss GeoPortal API data (Drone/Population) for asset locations and displays responses/errors.

I fixed the population density API layer name provided: ch.bfs.volkszaehlungbevoelkerungsstatistik_einwohner to ch.bfs.volkszaehlung-bevoelkerungsstatistik_einwohner. Population response didn't have much info to display though.

#### Structure & State
`App.tsx` manages core state (mode, asset, results, loading, error) and orchestrates data fetching. Child components (`ModeSelector`, `AssetSelector`, `ResultsCard`) handle UI and communicate via props/callbacks. 
For the UI i quickly designed a Figma mockup. and build some simple componets based on that.

[https://www.figma.com/proto/ZwXfHk2Z6hi08kVyUCYKrC/-shadcn-ui---Design-System--Community-?node-id=116-1152&t=FY1zu0DONRM0RIBq-1&scaling=scale-down&content-scaling=fixed](https://www.figma.com/proto/ZwXfHk2Z6hi08kVyUCYKrC/-shadcn-ui---Design-System--Community-?node-id=116-1152&t=FY1zu0DONRM0RIBq-1&scaling=scale-down&content-scaling=fixed)

A planned extension was to add a language switch using React Context for internationalization.


#### How to Run

Install dependencies:

```
npm install
```
Start the development server:
```
npm run dev
```
Run tests:

```
npm run test
```




